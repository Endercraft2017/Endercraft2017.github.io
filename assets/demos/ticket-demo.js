import {createWorkflow} from './ticket-workflow.js';
const KEY='afk3_synthetic_ticket_demo_v1';
const MODE_KEY=KEY+'_mode';
const status=document.getElementById('demo-status');
const output=document.getElementById('demo-records');
const mode=document.getElementById('demo-mode');
const fail=document.getElementById('demo-fail');
const ticket={id:'DEMO-001',summary:'Synthetic service visit',status:'Open'};
let workflow;
try { if(localStorage.getItem(MODE_KEY)==='repaired') mode.value='repaired'; } catch (_) { /* Storage failure is reported when the workflow is used. */ }
function recordKey(){return KEY+'_'+mode.value;}
const repository={
 async list(){return JSON.parse(localStorage.getItem(recordKey())||'[]');},
 async put(row){if(fail.checked)throw Error('Controlled storage failure');const rows=await this.list();const index=rows.findIndex(x=>x.id===row.id);if(index<0)rows.push(row);else rows[index]=row;localStorage.setItem(recordKey(),JSON.stringify(rows));}
};
async function render(){try{const rows=await workflow.list();output.textContent=rows.length?rows.map(x=>x.id+' · '+x.summary+' · '+x.status).join('\n'):'No saved tickets.';}catch(_){output.textContent='Storage is unavailable in this browser.';}}
function choose(){try{localStorage.setItem(MODE_KEY,mode.value);}catch(_){}workflow=createWorkflow(repository,{broken:mode.value==='broken'});status.textContent=mode.value==='broken'?'Before repair: the save returns success without writing to storage.':'After repair: success waits for storage to accept the ticket.';render();}
mode.addEventListener('change',choose);
document.getElementById('demo-save').addEventListener('click',async()=>{try{await workflow.save(ticket);status.textContent='Saved: DEMO-001. Now check the saved records.';}catch(_){status.textContent='Not saved. Storage rejected the write; no success was acknowledged.';}await render();});
document.getElementById('demo-reload').addEventListener('click',async()=>{workflow=createWorkflow(repository,{broken:mode.value==='broken'});await render();status.textContent='Fresh workflow instance opened. Saved records read from browser storage.';});
document.getElementById('demo-reset').addEventListener('click',()=>{try{localStorage.removeItem(KEY);localStorage.removeItem(KEY+'_broken');localStorage.removeItem(KEY+'_repaired');fail.checked=false;choose();}catch(_){status.textContent='Unable to reset demonstration storage.';}});
choose();
