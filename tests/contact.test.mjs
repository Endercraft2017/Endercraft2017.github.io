import test from 'node:test';
import assert from 'node:assert/strict';
import handler from '../api/contact.js';
const realFetch=global.fetch;
const sample={name:'TEST ONLY',email:'qa@example.test',company:'TEST ONLY',problem:'Controlled local inquiry test'};
const call=async(body,method='POST',headers={accept:'application/json'})=>{const result={headers:{}};const res={setHeader(k,v){result.headers[k]=v},status(s){result.status=s;return this},json(b){result.body=b;return this},end(){return this}};await handler({body,method,headers,socket:{remoteAddress:'127.0.0.1'}},res);return result;};
let sent=[];
test.before(()=>{delete process.env.AI_GATEWAY_API_KEY;delete process.env.UPSTASH_REDIS_REST_URL;delete process.env.KV_REST_API_URL;process.env.SENDFOX_API_KEY='local-test-only';process.env.INQUIRY_TO='owner@example.test';global.fetch=async(url,options)=>{assert.equal(url,'https://api.sendfox.com/transactional/emails');assert.equal(options.headers.Authorization,'Bearer local-test-only');sent.push(JSON.parse(options.body));return {ok:true,status:202,json:async()=>({id:'tm_test',status:'queued'})}};});
test.after(()=>{global.fetch=realFetch;delete process.env.SENDFOX_API_KEY;delete process.env.INQUIRY_TO;});
test('GET rejected before any provider call',async()=>{const n=sent.length;assert.equal((await call({},'GET')).status,405);assert.equal(sent.length,n)});
test('required fields reject before provider call',async()=>{const n=sent.length;assert.equal((await call({})).status,422);assert.equal(sent.length,n)});
test('honeypot gives no provider call',async()=>{const n=sent.length;assert.equal((await call({company_url:'bot'})).status,200);assert.equal(sent.length,n)});
test('business inquiry keeps reply destination and provenance in email',async()=>{const r=await call({...sample,lead_source:'test-source'});assert.equal(r.status,200);assert.equal(sent.at(-1).reply_to,sample.email);assert.match(sent.at(-1).text,/test-source/);assert.deepEqual(sent.at(-1).to,['owner@example.test']);});
test('HTML fields escaped in email markup',async()=>{await call({...sample,problem:'<script>alert(1)</script>'});assert.doesNotMatch(sent.at(-1).html,/<script>/);assert.match(sent.at(-1).html,/&lt;script&gt;/)});
test('student branch retained',async()=>{assert.equal((await call({lead_type:'student',name:'TEST ONLY',email:'qa@example.test',school:'Demo school',project_type:'School prototype',help:'Guidance',description:'Synthetic school project'})).status,200);assert.match(sent.at(-1).subject,/Student/)});
test('missing provider setup reports failure',async()=>{delete process.env.SENDFOX_API_KEY;assert.equal((await call(sample)).status,500);process.env.SENDFOX_API_KEY='local-test-only'});
test('provider rejection does not show success',async()=>{global.fetch=async()=>({ok:false,status:503,text:async()=>'controlled test failure'});assert.equal((await call(sample)).status,502);global.fetch=async(_,options)=>{sent.push(JSON.parse(options.body));return {ok:true,status:202,json:async()=>({id:'tm_test',status:'queued'})}}});
test('plain form success redirects to contact',async()=>{const r=await call(sample,'POST',{'content-type':'application/x-www-form-urlencoded'});assert.equal(r.status,303);assert.equal(r.headers.Location,'/contact?sent=1')});
test('oversized source rejected instead of silently clipped',async()=>{assert.equal((await call({...sample,lead_source:'x'.repeat(301)})).status,422)});
test('invalid structured source rejected',async()=>{assert.equal((await call({...sample,lead_source:JSON.stringify({r:'bad value'})})).status,422)});
test('maximum structured source and referral intent retained',async()=>{const source=JSON.stringify({s:'X'.repeat(40),m:'X'.repeat(40),c:'X'.repeat(40),r:'X'.repeat(40),i:'referral'});assert.equal((await call({...sample,company:'Independent marketer',intent:'referral',lead_source:source,acceptance_result:'Terms review'})).status,200);assert.match(sent.at(-1).text,/Inquiry type: referral/);assert.match(sent.at(-1).text,/Acceptance result: Terms review/);assert.ok(sent.at(-1).text.includes(source))});
test('no-JS normal form source is retained from a same-origin page',async()=>{const r=await call({...sample,lead_source:'contact_page',intent:'referral'},'POST',{'content-type':'application/x-www-form-urlencoded',referer:'https://afkcube.com/contact?utm_source=partner&ref=P01'});assert.equal(r.status,303);assert.match(sent.at(-1).text,/"r":"P01"/)});
test('external Referer cannot replace the form source',async()=>{await call({...sample,lead_source:'contact_page'},'POST',{accept:'application/json',referer:'https://example.org/?ref=evil'});assert.doesNotMatch(sent.at(-1).text,/evil/)});
test('acceptance result overflow is rejected without sending',async()=>{const n=sent.length;assert.equal((await call({...sample,acceptance_result:'x'.repeat(501)})).status,422);assert.equal(sent.length,n)});

test('quota refusal and malformed success cannot acknowledge an inquiry',async()=>{
  const previous=global.fetch;
  try {
    global.fetch=async()=>({ok:false,status:429});
    assert.equal((await call(sample)).status,502);
    global.fetch=async()=>({ok:true,status:202,json:async()=>({})});
    assert.equal((await call(sample)).status,502);
  } finally {global.fetch=previous;}
});
test('legacy Resend key never sends via the previous provider',async()=>{
  const previous=process.env.SENDFOX_API_KEY;delete process.env.SENDFOX_API_KEY;process.env.RESEND_API_KEY='legacy-test-only';
  const n=sent.length;
  try {assert.equal((await call(sample)).status,500);assert.equal(sent.length,n);}
  finally {process.env.SENDFOX_API_KEY=previous;delete process.env.RESEND_API_KEY;}
});
