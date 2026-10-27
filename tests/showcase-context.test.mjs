import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {JSDOM} from 'jsdom';

const read = path => readFile(new URL('../'+path,import.meta.url),'utf8');
const [home,contact,source,processSource,contextSource,showcaseSource] = await Promise.all(['index.html','contact.html','script.js','assets/home-process.js','assets/lead-context.js','assets/afk-showcase.js'].map(read));
function dom(html,url='https://afkcube.com/'){const d=new JSDOM(html,{url,runScripts:'outside-only',pretendToBeVisual:true});d.window.matchMedia=()=>({matches:true,addEventListener(){}});d.window.HTMLElement.prototype.scrollIntoView=()=>{};return d;}

test('showcase selection reaches an existing OTOM inquiry without losing campaign context',()=>{
  const d=dom(home,'https://afkcube.com/?utm_source=partner&ref=PARTNER01');const w=d.window;
  w.eval(contextSource);w.eval(showcaseSource);
  const root=w.document.querySelector('[data-product-showcase]');
  root.dispatchEvent(new w.CustomEvent('otom:screenchange',{bubbles:true,detail:{id:'production'}}));
  const url=new URL(root.querySelector('[data-afk-showcase-inquiry]').href);
  assert.equal(url.pathname,'/contact');assert.equal(url.searchParams.get('screen'),'production');assert.equal(url.searchParams.get('intent'),'otom');assert.equal(url.searchParams.get('ref'),'PARTNER01');assert.equal(url.searchParams.get('utm_source'),'partner');
  root.dispatchEvent(new w.CustomEvent('otom:screenchange',{detail:{id:'untrusted value'}}));
  assert.equal(root.querySelector('[data-afk-showcase-inquiry]').href,url.href);w.close();
});

test('known product screen suggests a message; unknown screens and other intents do not',()=>{
  for(const [query,expected] of [['intent=otom&screen=inventory',/warehouse/],['intent=otom&screen=sales',/development status/],['intent=otom&screen=unknown',/^$/],['intent=workflow&screen=production',/^$/]]){
    const d=dom(contact,'https://afkcube.com/contact?'+query);d.window.eval(source);assert.match(d.window.document.getElementById('f-problem').value,expected);d.window.close();
  }
});

test('screen suggestions preserve a visitor message restored before initialization',()=>{
  const d=dom(contact,'https://afkcube.com/contact?intent=otom&screen=production');const field=d.window.document.getElementById('f-problem');field.value='Our actual workflow and existing notes';d.window.eval(source);assert.equal(field.value,'Our actual workflow and existing notes');d.window.close();
});

test('delivery explorer has real static guidance and three manual button choices',()=>{
  const d=dom(home);const w=d.window;const root=w.document.querySelector('[data-process-explorer]');
  assert.equal(root.querySelectorAll('.engagement-map__steps li').length,3);assert.match(root.textContent,/spreadsheet, form or handoff/);
  w.eval(processSource);const buttons=[...root.querySelectorAll('.engagement-map__step')];assert.equal(buttons.length,3);
  buttons[1].click();assert.match(root.querySelector('[data-process-title]').textContent,/Build/);assert.equal(buttons[1].getAttribute('aria-pressed'),'true');assert.equal(buttons[0].getAttribute('aria-pressed'),'false');
  buttons[2].click();assert.match(root.querySelector('[data-process-title]').textContent,/Test/);assert.match(root.querySelector('[data-process-description]').textContent,/agreed outputs/);w.close();
});

test('home and OTOM bridge carry genuine capture fallbacks and visible development context',async()=>{
  for(const path of ['index.html','products/otom.html']){
    const d=dom(await read(path));const root=d.window.document.querySelector('[data-product-showcase]');
    assert.equal(root.querySelectorAll('[data-tour-screen]').length,6);assert.equal(root.querySelectorAll('[data-tour-fallback] a').length,6);
    assert.match(root.querySelector('.tour-provenance').textContent,/synthetic data/);assert.match(root.querySelector('[data-tour-screen=sales]').dataset.tourDescription,/in development/);
    assert.ok(root.querySelector('[data-afk-showcase-inquiry]').href.includes('intent=otom'));d.window.close();
  }
});
