import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {createWorkflow} from '../assets/demos/ticket-workflow.js';
import {fileRepository} from '../scripts/repair-demo/file-repository.mjs';
const ticket = {id:'DEMO-001',summary:'Synthetic service visit',status:'Open'};
async function fixture(fn) { const dir=await mkdtemp(join(tmpdir(),'afk-repair-demo-'));try{await fn(join(dir,'tickets.json'));}finally{await rm(dir,{recursive:true,force:true});} }
test('demonstration reproduces false save acknowledgement with an empty durable store',()=>fixture(async file=>{
 const workflow=createWorkflow(fileRepository(file),{broken:true});
 assert.equal((await workflow.save(ticket)).ok,true);
 assert.deepEqual(await workflow.reload(),[]);
 assert.deepEqual(await createWorkflow(fileRepository(file)).list(),[]);
}));
test('repaired demonstration persists across fresh instances and replaces the same ticket ID',()=>fixture(async file=>{
 await createWorkflow(fileRepository(file)).save(ticket);
 const fresh=createWorkflow(fileRepository(file));
 assert.deepEqual(await fresh.list(),[ticket]);
 await fresh.save({...ticket,status:'Scheduled'});
 assert.deepEqual(await createWorkflow(fileRepository(file)).list(),[{...ticket,status:'Scheduled'}]);
}));
test('repaired demonstration propagates persistence failures instead of acknowledging success',async()=>{
 let acknowledged=false;
 const workflow=createWorkflow({put:async()=>{throw new Error('Controlled write failure');},list:async()=>[]});
 await assert.rejects(async()=>{await workflow.save(ticket);acknowledged=true;},/Controlled write failure/);
 assert.equal(acknowledged,false);
});

import {JSDOM} from 'jsdom';
import {readFile} from 'node:fs/promises';
const demoHTML=await readFile(new URL('../work/saved-ticket-repair-demo.html',import.meta.url),'utf8');
const demoScript=(await readFile(new URL('../assets/demos/ticket-demo.js',import.meta.url),'utf8')).replace(/^import .*?;\n/,'');
const tick=()=>new Promise(resolve=>setTimeout(resolve,10));
function browserDemo(saved={}){const d=new JSDOM(demoHTML,{url:'https://afkcube.com/work/saved-ticket-repair-demo',runScripts:'outside-only'});for(const[k,v]of Object.entries(saved))d.window.localStorage.setItem(k,v);d.window.createWorkflow=createWorkflow;d.window.eval(demoScript);return d;}
test('browser demo keeps the repaired selection and record across a fresh page instance',async()=>{
 const d=browserDemo();const w=d.window;const mode=w.document.getElementById('demo-mode');mode.value='repaired';mode.dispatchEvent(new w.Event('change'));w.document.getElementById('demo-save').click();await tick();
 const saved=Object.fromEntries(Array.from({length:w.localStorage.length},(_,i)=>w.localStorage.key(i)).map(k=>[k,w.localStorage.getItem(k)]));
 const fresh=browserDemo(saved);await tick();assert.equal(fresh.window.document.getElementById('demo-mode').value,'repaired');assert.match(fresh.window.document.getElementById('demo-records').textContent,/DEMO-001/);d.window.close();fresh.window.close();
});
test('switching to the broken version does not borrow repaired-version records',async()=>{
 const d=browserDemo();const w=d.window;const mode=w.document.getElementById('demo-mode');mode.value='repaired';mode.dispatchEvent(new w.Event('change'));w.document.getElementById('demo-save').click();await tick();mode.value='broken';mode.dispatchEvent(new w.Event('change'));await tick();assert.equal(w.document.getElementById('demo-records').textContent,'No saved tickets.');w.document.getElementById('demo-save').click();await tick();assert.match(w.document.getElementById('demo-status').textContent,/Saved/);assert.equal(w.document.getElementById('demo-records').textContent,'No saved tickets.');d.window.close();
});
