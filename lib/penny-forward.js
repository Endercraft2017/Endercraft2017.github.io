import {createHmac,randomUUID} from 'node:crypto';

const ENDPOINT='https://calc.afkcube.com/webhooks/penny/website';
const PATH='/webhooks/penny/website';
const clean=(value,max)=>String(value??'').replace(/[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/g,'').trim().slice(0,max);
const email=value=>/^[^\s<>@,;]+@[^\s<>@,;]+\.[^\s<>@,;]+$/.test(value);

// The caller has already validated the actual form, not an arbitrary model or
// browser webhook. No feature IDs, staff rates, approval or private key supplied
// in visitor text can enter the signed administrative envelope.
export function pennyWebsiteMessage(fields,{clock=Date.now,eventId=randomUUID()}={}){
 const name=clean(fields.name,160),contactEmail=clean(fields.email,254).toLowerCase();
 if(!name||!email(contactEmail))return null;
 const company=clean(fields.company||fields.projectTitle||fields.school,200),problem=clean(fields.problem||fields.description,5000),today=clean(fields.today||fields.help,5000);
 if(!problem)return null;
 const intent=fields.intent==='referral'?'referral':fields.intent==='otom'?'otom':'workflow';
 const context=[['Inquiry type',intent],['Source',clean(fields.leadType,30)||'business'],['Needs',Array.isArray(fields.need)?fields.need.map(v=>clean(v,300)).join(', '):''],['Country',clean(fields.country,300)],['Budget',clean(fields.budget,300)],['Timeline',clean(fields.timeline||fields.deadline,300)],['Requested result',clean(fields.acceptanceResult,500)],['Website',clean(fields.website,300)],['Lead source',clean(fields.leadSource,300)]];
 const combined=problem+'\n'+today,urgent=/\b(?:urgent|complaint|refund|contract|legal)\b/i.test(combined),asksQuote=/\b(?:quote|quotation|estimate|proposal|pricing|how much|cost)\b/i.test(combined);
 const request_type=intent==='referral'?'general_question':urgent?'owner_decision':asksQuote?'quotation_request':'incomplete_requirements';
 const requirements=[];
 for(const [key,value] of [['problem',problem],['today',today]]){
  for(let offset=0;offset<value.length;offset+=2800)requirements.push({id:key+'-'+(Math.floor(offset/2800)+1),text:value.slice(offset,offset+2800),quantity:1});
 }
 const summary=context.filter(r=>r[1]).map(r=>r[0]+': '+r[1]).join('\n')+'\n\nProblem: '+problem.slice(0,1500)+(problem.length>1500?' [Full scope retained in requirements and owner email.]':'');
 return {event_id:'website-'+eventId,thread_id:'website-'+eventId,received_at:new Date(clock()).toISOString(),contact:{name,company,email:contactEmail},summary:summary.slice(0,4000),request_type,stage:/\b(?:ai app review|app review|paid diagnosis|vibe cod)\b/i.test(combined)?'app_fit':'custom_software',requirements};
}

// After any successful acknowledgment, the existing calculator SQLite volume
// owns durable intake. Before acknowledgment there is no caller-side durable
// outbox: SendFox remains the retained owner-mail fallback, not a fake persisted
// queue. Stable event/copy is reused within all three bounded network attempts.
export async function forwardPennyInquiry(fields,{env=process.env,fetchImpl=globalThis.fetch,clock=Date.now,pause=ms=>new Promise(resolve=>setTimeout(resolve,ms)),eventId}={}){
 const secret=env.PENNY_WEBSITE_INTAKE_SECRET;
 if(env.PENNY_WEBSITE_FORWARD_ENABLED!=='1'||typeof secret!=='string'||secret.length<32)return {state:'disabled',attempts:0,durable_acknowledgment:false};
 const message=pennyWebsiteMessage(fields,{clock,eventId});
 if(!message)return {state:'unsupported_contact',attempts:0,durable_acknowledgment:false};
 const body=JSON.stringify({message});
 for(let attempt=1;attempt<=3;attempt++){
  const timestamp=String(clock()),nonce=randomUUID(),signature=createHmac('sha256',secret).update(timestamp+'\n'+nonce+'\nPOST\n'+PATH+'\n'+body).digest('hex');
  try{
   const response=await fetchImpl(ENDPOINT,{method:'POST',redirect:'error',signal:AbortSignal.timeout(1500),headers:{'Content-Type':'application/json','X-Penny-Timestamp':timestamp,'X-Penny-Nonce':nonce,'X-Penny-Signature':'sha256='+signature},body});
   if(response.ok){
    const packet=await response.json();
    if(packet?.source==='website_inquiry'&&packet.client_quote_allowed===false&&Array.isArray(packet.results)&&packet.results.length===1&&typeof packet.results[0].inquiry_id==='string'&&packet.results[0].inquiry_id)return {state:'acknowledged',attempts:attempt,durable_acknowledgment:true};
    return {state:'invalid_acknowledgment',attempts:attempt,durable_acknowledgment:false};
   }
   if(response.status!==429&&response.status<500)return {state:'rejected',attempts:attempt,durable_acknowledgment:false};
  }catch{/* A response may be lost after durable acceptance. The same event makes retry safe. */}
  if(attempt<3)await pause(attempt*100);
 }
 return {state:'pending_owner_mail_recovery',attempts:3,durable_acknowledgment:false};
}
