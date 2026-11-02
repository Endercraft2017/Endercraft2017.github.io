import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {JSDOM} from 'jsdom';
const html=await readFile(new URL('../contact.html',import.meta.url),'utf8');
const script=await readFile(new URL('../script.js',import.meta.url),'utf8');
function form(service,existing=''){
 const d=new JSDOM(html,{url:'https://afkcube.com/contact?intent=workflow&need=software&service='+encodeURIComponent(service),runScripts:'outside-only',pretendToBeVisual:true});
 d.window.matchMedia=()=>({matches:true,addEventListener(){}});d.window.IntersectionObserver=class{observe(){} disconnect(){}};
 d.window.document.getElementById('f-problem').value=existing;d.window.eval(script);return d;
}
test('app review CTA selects existing software workflow and suggests editable brief',()=>{const d=form('ai-app-review');assert.match(d.window.document.getElementById('f-problem').value,/AI App Review & Repair/);assert.equal(d.window.document.getElementById('f-intent').value,'workflow');assert.ok(d.window.document.querySelector('[name=need][value="Custom Software"]').checked);assert.equal(d.window.document.getElementById('f-problem').readOnly,false);d.window.close()});
test('service brief never replaces restored text and rejects unknown query values',()=>{for(const [token,prior] of [['ai-app-review','My own problem'],['<script>','']]){const d=form(token,prior);assert.equal(d.window.document.getElementById('f-problem').value,prior);d.window.close()}});
test('service is discoverable with matching metadata and real inquiry route',async()=>{
 for(const file of ['index.html','services.html','custom-software.html']){const d=new JSDOM(await readFile(new URL('../'+file,import.meta.url),'utf8'));assert.ok(d.window.document.querySelector('a[href="/ai-app-review-repair"]'));d.window.close()}
 const d=new JSDOM(await readFile(new URL('../ai-app-review-repair.html',import.meta.url),'utf8'));const doc=d.window.document;
 assert.equal(doc.querySelectorAll('h1').length,1);assert.equal(doc.querySelector('link[rel=canonical]').href,'https://afkcube.com/ai-app-review-repair');
 assert.ok(doc.querySelector('a[href*="service=ai-app-review"]'));assert.match(doc.body.textContent,/paid diagnosis|PAID DIAGNOSIS/i);assert.match(doc.body.textContent,/not a customer case/);JSON.parse(doc.querySelector('script[type="application/ld+json"]').textContent);d.window.close();
 for(const file of ['services.html','ai-app-review-repair.html']){const d=new JSDOM(await readFile(new URL('../'+file,import.meta.url),'utf8'));for(const s of d.window.document.querySelectorAll('script[type="application/ld+json"]'))JSON.parse(s.textContent);d.window.close()}
 assert.match(await readFile(new URL('../sitemap.xml',import.meta.url),'utf8'),/https:\/\/afkcube.com\/ai-app-review-repair/);
});

test('referenceable offer keeps visible answers, evidence and truthful limits in static HTML',async()=>{
 const d=new JSDOM(await readFile(new URL('../ai-app-review-repair.html',import.meta.url),'utf8'));const doc=d.window.document;
 assert.equal(doc.querySelectorAll('#questions-title').length,1);
 assert.equal(doc.querySelector('[aria-labelledby="questions-title"]').querySelectorAll('h3').length,6);
 assert.match(doc.querySelector('[aria-labelledby="internal-case-title"]').textContent,/internal AFK³ website repair/);
 assert.match(doc.querySelector('[aria-labelledby="internal-case-title"]').textContent,/Email delivery is mocked/);
 assert.equal(doc.querySelector('meta[name=robots]').content.includes('noindex'),false);
 const graph=JSON.parse(doc.querySelector('script[type="application/ld+json"]').textContent)['@graph'];
 assert.equal(graph.find(x=>x['@type']==='Service').url,doc.querySelector('link[rel=canonical]').href);
 assert.equal(doc.querySelectorAll('script[src*="lead-context"]').length,1);d.window.close();
});
