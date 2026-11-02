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
