// Adapted from APTUS-Catalog: module-based copy, language persistence,
// query-string deep links, selectable detail panel and scroll-aware navigation.
import { company, services, copy } from './content.js';
const params = new URLSearchParams(location.search);
let lang = params.get('lang');
try { if (!['fa','en'].includes(lang)) lang = localStorage.getItem('orthen-language'); } catch {}
if (!['fa','en'].includes(lang)) lang = 'fa';
try { localStorage.setItem('orthen-language',lang); } catch {}
const ui = copy[lang], fa = lang === 'fa', app = document.querySelector('#app');
const safe = value => String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const lines = value => safe(value).replaceAll('\n','<br>');
const number = n => new Intl.NumberFormat(fa?'fa-IR':'en-US',{minimumIntegerDigits:2}).format(n);
const arrow = '<svg class="arrow" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6"/></svg>';
const linkIcon = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m10 13 4-4m-6 6-2 2a4 4 0 0 1-6-6l5-5a4 4 0 0 1 6 0m2 2 2-2a4 4 0 0 1 6 6l-5 5a4 4 0 0 1-6 0" transform="translate(1 1) scale(.92)"/></svg>';
const iconPaths = {
 design:'<path d="m7 36 22-22 9 9-22 22-12 3 3-12Zm19-19 9 9M7 36l9 9M35 8l5-5 9 9-5 5M8 12h10M13 7v10M37 39h12M43 33v12"/>',
 localization:'<path d="M28 3v9m0 32v9M3 28h9m32 0h9M10 10l7 7m22 22 7 7M10 46l7-7m22-22 7-7"/><circle cx="28" cy="28" r="13"/><path d="m21 28 5 5 10-11"/>',
 prototyping:'<path d="m28 5 22 12v24L28 53 6 41V17L28 5Zm0 24 22-12M28 29 6 17m22 12v24M17 11l22 12v12l-8 4"/>',
 biomechanics:'<path d="M8 5h40M12 5v46m32-46v46M8 51h40M21 5v12h14V5M21 51V39h14v12M28 17v22M18 27l5-5m0 0 5 5m-5-5v12m15 0-5 5m0 0-5-5m5 5V27"/>',
 research:'<circle cx="28" cy="28" r="7"/><ellipse cx="28" cy="28" rx="25" ry="10"/><ellipse cx="28" cy="28" rx="25" ry="10" transform="rotate(60 28 28)"/><ellipse cx="28" cy="28" rx="25" ry="10" transform="rotate(120 28 28)"/>',
 consulting:'<path d="M5 8h34v25H21L9 42v-9H5V8Zm16 32h14l12 9V24h-2M13 17h18M13 24h13"/>'
};
const icon = id => `<svg viewBox="0 0 56 56" fill="none" aria-hidden="true">${iconPaths[id]}</svg>`;
const sectionHead = (label,title,intro='') => `<div class="section-head"><div><span class="eyebrow">${label}</span><h2>${lines(title)}</h2></div>${intro?`<p>${intro}</p>`:''}</div>`;
const originalService = services.find(s=>s.id===params.get('service'));
let currentService = originalService || services[0];
document.documentElement.lang=lang; document.documentElement.dir=fa?'rtl':'ltr';
document.title=`Orthen | ${ui.heroA} ${ui.heroB}`;
document.querySelector('meta[name="description"]').content=ui.intro;
document.querySelector('meta[property="og:title"]').content=document.title;
document.querySelector('meta[property="og:description"]').content=ui.intro;

function detail(service) {
 return `<div class="service-detail-top"><span class="eyebrow">ORTHEN / ${String(services.indexOf(service)+1).padStart(2,'0')}</span><span class="service-symbol">${icon(service.icon)}</span></div><div class="detail-text"><p class="detail-kicker">${service.subtitle[lang]}</p><h3 id="detail-title">${service.title[lang]}</h3><p class="detail-description">${service.body[lang]}</p><ul class="detail-list">${service.items[lang].map(t=>`<li>${t}</li>`).join('')}</ul></div><div class="detail-actions"><a class="text-link" href="#contact">${ui.serviceContact}${arrow}</a><button type="button" class="share-service" aria-label="${ui.share}" title="${ui.share}">${linkIcon}<span>${ui.share}</span></button></div>`;
}
app.innerHTML=`
<a class="skip-link" href="#main">${ui.skip}</a>
<header class="site-header" id="top"><div class="header-inner">
 <a class="brand" href="#home" aria-label="Orthen — ${ui.home}"><img src="./assets/orthen-dark.webp" alt="Orthen" width="214" height="42"></a>
 <nav class="primary-nav" id="primary-nav" aria-label="${ui.menu}">${Object.entries(ui.nav).map(([id,label])=>`<a href="#${id}">${label}</a>`).join('')}</nav>
 <div class="header-actions"><div class="language-switch" role="group" aria-label="${ui.language}"><button data-lang="fa" type="button" lang="fa" aria-pressed="${fa}">فا</button><span aria-hidden="true">/</span><button data-lang="en" type="button" lang="en" aria-pressed="${!fa}">EN</button></div><a class="header-contact" href="#contact">${ui.start}${arrow}</a><button class="menu-toggle" aria-expanded="false" aria-controls="primary-nav" aria-label="${ui.menu}" type="button"><span></span><span></span></button></div>
</div></header>
<main id="main">
<section class="hero" id="home"><div class="hero-grid wrap">
 <div class="hero-copy"><span class="eyebrow light"><i></i>${ui.eyebrow}</span><h1>${ui.heroA}<br><span>${ui.heroB}</span></h1><p>${ui.intro}</p><div class="hero-actions"><a class="button" href="#services">${ui.explore}${arrow}</a><a class="quiet-link" href="#about">${ui.scroll}<span aria-hidden="true">↓</span></a></div><div class="hero-byline"><span>ORTHEN</span><span>${ui.catalog}</span></div></div>
 <div class="hero-art" role="img" aria-label="${ui.figureTop} — ${ui.figureBottom}"><div class="art-topline"><span>${ui.figureTop}</span><span class="mono">ORTHO / ENG</span></div><div class="orbit"><div class="orbit-track"></div><div class="orbit-inner"></div><div class="art-axis x"></div><div class="art-axis y"></div><span class="orbit-dot dot-one"></span><span class="orbit-dot dot-two"></span><img class="hero-mark" src="./assets/mark.webp" width="260" height="260" alt=""><span class="art-label clinical">${ui.figureClinical}</span><span class="art-label engineering">${ui.figureEngineering}</span><span class="coordinate top">+</span><span class="coordinate bottom">+</span></div><div class="art-bottomline"><span class="art-key"><i></i>${ui.figureBottom}</span><span class="mono">O + E</span></div></div>
</div><div class="hero-bottom wrap"><span class="mono">ORTHOPEDIC + ENGINEERING</span><a href="#about" aria-label="${ui.scroll}">↓</a></div></section>
<div class="discipline-band"><div class="wrap">${ui.band.map((t,i)=>`<span><b class="mono">0${i+1}</b>${t}</span>`).join('<i aria-hidden="true">+</i>')}</div></div>
<section class="section about-section wrap" id="about">${sectionHead(ui.aboutLabel,ui.aboutTitle)}<div class="about-grid"><div class="about-statement"><p>${ui.aboutLead}</p><div class="brand-equation" dir="ltr"><span>Orthopedic</span><b>+</b><span>Engineering</span><span class="equation-line"></span><strong>Orthen</strong></div></div><div class="about-body"><p>${ui.aboutBody}</p><p class="about-note">${ui.aboutNote}</p></div></div></section>
<section class="services-section section" id="services"><div class="wrap">${sectionHead(ui.servicesLabel,ui.servicesTitle,ui.servicesIntro)}<div class="service-explorer"><div class="service-list" role="group" aria-label="${ui.nav.services}">${services.map((s,i)=>`<button type="button" class="service-select ${s.id===currentService.id?'is-active':''}" data-service="${s.id}" aria-pressed="${s.id===currentService.id}" aria-controls="service-panel"><span class="service-number">${number(i+1)}</span><span>${s.title[lang]}</span>${arrow}</button>`).join('')}</div><article class="service-panel" id="service-panel" aria-labelledby="detail-title" aria-live="polite" aria-atomic="true">${detail(currentService)}</article></div></div></section>
<section class="section approach-section wrap" id="approach">${sectionHead(ui.approachLabel,ui.approachTitle,ui.approachIntro)}<div class="approach-grid">${ui.steps.map(([title,body],i)=>`<article class="approach-step"><span class="step-number">${number(i+1)}</span><div class="step-line"><i></i></div><h3>${title}</h3><p>${body}</p></article>`).join('')}</div></section>
<section class="research-section section" id="research"><div class="wrap"><div class="research-grid"><div class="research-copy"><span class="eyebrow light">${ui.researchLabel}</span><h2>${lines(ui.researchTitle)}</h2><span class="research-tag">SOBL <span aria-hidden="true">/</span> ${ui.researchTag}</span><p>${ui.researchBody}</p><p>${ui.researchMore}</p><p class="research-people">${ui.researchPeople}</p><small class="research-caption">${ui.researchCaption}</small></div><div class="research-topics">${ui.researchTopics.map(([title,body],i)=>`<article><span class="topic-icon">${icon(['biomechanics','research','design'][i])}</span><div><h3>${title}</h3><p>${body}</p></div><span class="topic-index">0${i+1}</span></article>`).join('')}</div></div><div class="collaboration"><span class="eyebrow light">${ui.collaboration}</span><h3>${ui.collabTitle}</h3><p>${ui.collabBody}</p></div></div></section>
<section class="section contact-section wrap" id="contact"><div class="contact-heading"><span class="eyebrow">${ui.contactLabel}</span><h2>${lines(ui.contactTitle)}</h2><p>${ui.contactBody}</p><a class="button dark" href="tel:${company.telephone}">${ui.call}${arrow}</a></div><div class="contact-details"><div class="contact-item"><span>${ui.phoneLabel}</span><a class="phone" dir="ltr" href="tel:${company.telephone}">${company.phone}</a></div><div class="contact-item"><span>${ui.addressLabel}</span><p>${company.address[lang]}</p></div><div class="contact-item"><span>${ui.webLabel}</span><a href="${company.website}" target="_blank" rel="noopener" dir="ltr">www.orthen.info <span aria-hidden="true">↗</span></a></div></div></section>
</main>
<footer class="site-footer"><div class="wrap"><a href="#home" aria-label="Orthen"><img src="./assets/orthen-light.webp" alt="Orthen" width="186" height="36"></a><p>${ui.rights}</p><div><button id="print-catalog" type="button">${ui.print} <span aria-hidden="true">↗</span></button><a href="#home">${ui.backTop} ↑</a></div></div></footer><div class="toast" id="toast" role="status"></div>`;

function setService(id,updateUrl=true) {
 const next=services.find(s=>s.id===id); if(!next)return;
 currentService=next;
 document.querySelectorAll('[data-service]').forEach(el=>{const active=el.dataset.service===id;el.classList.toggle('is-active',active);el.setAttribute('aria-pressed',String(active));});
 const panel=document.querySelector('#service-panel');panel.innerHTML=detail(next);
 if(!matchMedia('(prefers-reduced-motion: reduce)').matches)panel.animate([{opacity:.4,transform:'translateY(6px)'},{opacity:1,transform:'translateY(0)'}],{duration:240});
 if(updateUrl){const url=new URL(location.href);url.searchParams.set('service',id);url.hash='services';history.replaceState({},'',url);}
}
const menu=document.querySelector('#primary-nav'),toggle=document.querySelector('.menu-toggle');
function closeMenu(){toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label',ui.menu);menu.classList.remove('is-open');}
toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?ui.closeMenu:ui.menu);menu.classList.toggle('is-open',open);});
menu.querySelectorAll('a').forEach(el=>el.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&toggle.getAttribute('aria-expanded')==='true'){closeMenu();toggle.focus();}});
document.addEventListener('click',event=>{if(!event.target.closest('.site-header'))closeMenu();});
document.querySelectorAll('[data-lang]').forEach(el=>el.addEventListener('click',()=>{if(el.dataset.lang===lang)return;try{localStorage.setItem('orthen-language',el.dataset.lang);}catch{}const url=new URL(location.href);url.searchParams.set('lang',el.dataset.lang);location.assign(url.href);}));
document.querySelectorAll('[data-service]').forEach(el=>el.addEventListener('click',()=>setService(el.dataset.service)));
document.querySelector('#service-panel').addEventListener('click',async event=>{
 if(!event.target.closest('.share-service'))return;
 const url=new URL(location.href);url.searchParams.set('service',currentService.id);url.searchParams.set('lang',lang);url.hash='services';
 let message=ui.shared;
 try{await navigator.clipboard.writeText(url.href);}catch{
  const field=document.createElement('textarea');field.value=url.href;field.setAttribute('aria-hidden','true');field.style.cssText='position:fixed;inset:0;opacity:0;pointer-events:none';document.body.append(field);field.select();
  let copied=false;try{copied=document.execCommand('copy');}catch{}field.remove();event.target.closest('.share-service')?.focus();
  if(!copied){history.replaceState({},'',url);message=ui.shareError;}
 }
 const toast=document.querySelector('#toast');toast.textContent=message;toast.classList.add('is-visible');clearTimeout(window.toastTimeout);window.toastTimeout=setTimeout(()=>toast.classList.remove('is-visible'),3000);
});
function preparePrint(){
 if(document.querySelector('.print-services'))return;
 const all=document.createElement('section');all.className='print-services';all.innerHTML=`<h2>${ui.nav.services}</h2>${services.map(s=>`<article><h3>${s.title[lang]}</h3><p>${s.body[lang]}</p><ul>${s.items[lang].map(t=>`<li>${t}</li>`).join('')}</ul></article>`).join('')}`;
 document.querySelector('#services .wrap').append(all);
}
addEventListener('beforeprint',preparePrint);
addEventListener('afterprint',()=>document.querySelector('.print-services')?.remove());
document.querySelector('#print-catalog').addEventListener('click',()=>{preparePrint();window.print();});
let ticking=false;
function updateActiveNav(){ticking=false;let active='home';for(const id of ['home','about','services','approach','research','contact']){if(document.getElementById(id).getBoundingClientRect().top<innerHeight*.34)active=id;}if(innerHeight+scrollY>=document.documentElement.scrollHeight-4)active='contact';menu.querySelectorAll('a').forEach(el=>{if(el.hash===`#${active}`)el.setAttribute('aria-current','location');else el.removeAttribute('aria-current');});document.querySelector('.site-header').classList.toggle('is-scrolled',scrollY>20);}
const onScroll=()=>{if(!ticking){ticking=true;requestAnimationFrame(updateActiveNav);}};
addEventListener('scroll',onScroll,{passive:true});addEventListener('resize',()=>{onScroll();if(innerWidth>1000)closeMenu();},{passive:true});updateActiveNav();
addEventListener('popstate',()=>{const p=new URLSearchParams(location.search);setService(p.get('service')||services[0].id,false);});
if(originalService&&!location.hash)requestAnimationFrame(()=>document.querySelector('#services').scrollIntoView());
else if(location.hash)requestAnimationFrame(()=>{try{document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView();}catch{}});
