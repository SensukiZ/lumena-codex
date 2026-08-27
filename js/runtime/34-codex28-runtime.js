(function(){
'use strict';
if(window.__codex28)return;window.__codex28=true;
const TYPES=['Normal','Fire','Water','Electric','Grass','Ice','Fighting','Poison','Ground','Flying','Psychic','Bug','Rock','Ghost','Dragon','Dark','Steel','Fairy'];
const FX={Normal:{Rock:.5,Ghost:0,Steel:.5},Fire:{Fire:.5,Water:.5,Grass:2,Ice:2,Bug:2,Rock:.5,Dragon:.5,Steel:2},Water:{Fire:2,Water:.5,Grass:.5,Ground:2,Rock:2,Dragon:.5},Electric:{Water:2,Electric:.5,Grass:.5,Ground:0,Flying:2,Dragon:.5},Grass:{Fire:.5,Water:2,Grass:.5,Poison:.5,Ground:2,Flying:.5,Bug:.5,Rock:2,Dragon:.5,Steel:.5},Ice:{Fire:.5,Water:.5,Grass:2,Ice:.5,Ground:2,Flying:2,Dragon:2,Steel:.5},Fighting:{Normal:2,Ice:2,Poison:.5,Flying:.5,Psychic:.5,Bug:.5,Rock:2,Ghost:0,Dark:2,Steel:2,Fairy:.5},Poison:{Grass:2,Poison:.5,Ground:.5,Rock:.5,Ghost:.5,Steel:0,Fairy:2},Ground:{Fire:2,Electric:2,Grass:.5,Poison:2,Flying:0,Bug:.5,Rock:2,Steel:2},Flying:{Electric:.5,Grass:2,Fighting:2,Bug:2,Rock:.5,Steel:.5},Psychic:{Fighting:2,Poison:2,Psychic:.5,Steel:.5},Bug:{Fire:.5,Grass:2,Fighting:.5,Poison:.5,Flying:.5,Psychic:2,Ghost:.5,Dark:2,Steel:.5,Fairy:.5},Rock:{Fire:2,Ice:2,Fighting:.5,Ground:.5,Flying:2,Bug:2,Steel:.5},Ghost:{Normal:0,Psychic:2,Ghost:2,Dark:.5},Dragon:{Dragon:2,Steel:.5,Fairy:0},Dark:{Fighting:.5,Psychic:2,Ghost:2,Dark:.5,Fairy:.5},Steel:{Fire:.5,Water:.5,Electric:.5,Ice:2,Rock:2,Steel:.5,Fairy:2},Fairy:{Fire:.5,Poison:.5,Steel:.5,Fighting:2,Dragon:2,Dark:2}};
const mult=(a,d)=>Object.prototype.hasOwnProperty.call(FX[a]||{},d)?FX[a][d]:1;
const against=(types,a)=>types.reduce((n,t)=>n*mult(a,t),1);
const esc=s=>String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const items=[...document.querySelectorAll('.sidebar .side-item[data-id]:not(.route-codex-item)')];
const details=[...document.querySelectorAll('.detail-view[data-id]')];
const byDetail=Object.fromEntries(details.map(x=>[x.dataset.id,x]));
const byItem=Object.fromEntries(items.map(x=>[x.dataset.id,x]));
function data(id){
 const i=byItem[id],d=byDetail[id];if(!i||!d)return null;
 const stats={};d.querySelectorAll('.stat-row').forEach(r=>{let k=r.querySelector('.stat-label')?.textContent.trim(),v=+r.querySelector('.stat-val')?.textContent.trim();if(k&&Number.isFinite(v))stats[k]=v});
 return{id,name:i.querySelector('.side-name')?.textContent.trim()||id,num:i.dataset.num||'',img:i.querySelector('.side-thumb')?.src||'',types:(i.dataset.types||d.dataset.types||'').split(/\s+/).filter(x=>TYPES.includes(x)),stats};
}
const ALL=items.map(x=>data(x.dataset.id)).filter(Boolean);
function moveTypes(id){
 const s=new Set();byDetail[id]?.querySelectorAll('.move-chip').forEach(c=>{const p=((c.title||'').split(/\r?\n/)[0]||'').split('·').map(x=>x.trim());if(p.length>=3&&TYPES.includes(p[1])&&!/^status$/i.test(p[2]))s.add(p[1])});return [...s];
}

/* 2: Team drag/drop + touch ordering */
function installDrag(){
 const slots=document.getElementById('team-builder-slots');if(!slots)return;
 let dragged=null;
 function enhance(){
  [...slots.querySelectorAll('.team-slot.filled')].forEach(slot=>{
   slot.draggable=true;
   const rem=slot.querySelector('[data-tb-remove]');const id=rem?.dataset.tbRemove;
   if(id&&!slot.querySelector('.tb-mobile-order')){
    const ctl=document.createElement('div');ctl.className='tb-mobile-order';
    ctl.innerHTML='<button type="button" data-team-shift="-1" title="Move left">‹</button><button type="button" data-team-shift="1" title="Move right">›</button>';
    slot.appendChild(ctl);
   }
  });
 }
 slots.addEventListener('dragstart',e=>{const s=e.target.closest('.team-slot.filled');if(!s)return;dragged=s;s.classList.add('tb-dragging');e.dataTransfer.effectAllowed='move'});
 slots.addEventListener('dragend',()=>{dragged?.classList.remove('tb-dragging');dragged=null;[...slots.children].forEach(x=>x.classList.remove('tb-drop-target'));saveOrder()});
 slots.addEventListener('dragover',e=>{const t=e.target.closest('.team-slot');if(!dragged||!t||t===dragged)return;e.preventDefault();t.classList.add('tb-drop-target')});
 slots.addEventListener('dragleave',e=>e.target.closest('.team-slot')?.classList.remove('tb-drop-target'));
 slots.addEventListener('drop',e=>{const t=e.target.closest('.team-slot');if(!dragged||!t||t===dragged)return;e.preventDefault();t.classList.remove('tb-drop-target');const kids=[...slots.children],a=kids.indexOf(dragged),b=kids.indexOf(t);if(a<b)t.after(dragged);else t.before(dragged);saveOrder()});
 slots.addEventListener('click',e=>{const b=e.target.closest('[data-team-shift]');if(!b)return;const s=b.closest('.team-slot'),dir=+b.dataset.teamShift;if(dir<0&&s.previousElementSibling)slots.insertBefore(s,s.previousElementSibling);if(dir>0&&s.nextElementSibling)slots.insertBefore(s.nextElementSibling,s);saveOrder()});
 function saveOrder(){const ids=[...slots.querySelectorAll('[data-tb-remove]')].map(x=>x.dataset.tbRemove);try{localStorage.setItem('lumenaTeamBuilder',JSON.stringify(ids))}catch(e){}}
 new MutationObserver(enhance).observe(slots,{childList:true,subtree:true});enhance();
 const h=document.createElement('div');h.className='tb-drag-hint';h.textContent='Drag team members to reorder them. On mobile, use ‹ ›.';slots.insertAdjacentElement('afterend',h);
}

/* 3: Evolution family view based on existing evo-card links */
function installEvo(){
 details.forEach(d=>{
  const panel=[...d.querySelectorAll('.panel')].find(p=>/evolution/i.test(p.querySelector('h4')?.textContent||''));if(!panel||panel.querySelector('.evo-family-plus'))return;
  const ids=[];panel.querySelectorAll('.evo-card[data-target]').forEach(x=>{if(byItem[x.dataset.target])ids.push(x.dataset.target)});
  if(!ids.includes(d.dataset.id))ids.unshift(d.dataset.id);
  const uniq=[...new Set(ids)];if(uniq.length<2)return;
  const box=document.createElement('div');box.className='evo-family-plus';
  box.innerHTML='<div class="evo-family-title">Evolution Family</div><div class="evo-family-strip">'+uniq.map((id,n)=>{const x=data(id);return (n?'<span class="evo-family-arrow">→</span>':'')+'<span class="evo-family-stage"><button type="button" class="evo-family-link '+(id===d.dataset.id?'current':'')+'" data-evo-plus="'+esc(id)+'"><img src="'+esc(x.img)+'"><span><b>'+esc(x.name)+'</b><small>'+(id===d.dataset.id?'Current Lumen':'Open stage')+'</small></span></button></span>'}).join('')+'</div>';
  panel.appendChild(box);
 });
 document.addEventListener('click',e=>{const b=e.target.closest('[data-evo-plus]');if(!b)return;byItem[b.dataset.evoPlus]?.click()});
}

/* 6: Lumen vs Lumen */
function installVS(){
 const menu=document.getElementById('battle-tools-menu');if(menu&&!document.getElementById('lumen-vs-launch')){const b=document.createElement('button');b.type='button';b.id='lumen-vs-launch';b.textContent='Lumen vs Lumen';menu.appendChild(b)}
 const ov=document.getElementById('lumen-vs-overlay'),a=document.getElementById('lumen-vs-a'),b=document.getElementById('lumen-vs-b'),res=document.getElementById('lumen-vs-results');if(!ov||!a||!b)return;
 const opts=ALL.map(x=>'<option value="'+esc(x.id)+'">#'+esc(x.num)+' '+esc(x.name)+'</option>').join('');a.innerHTML=opts;b.innerHTML=opts;if(ALL[1])b.value=ALL[1].id;
 function score(x,y){
  let s=50;const mt=moveTypes(x.id);const pressure=Math.max(1,...mt.map(t=>against(y.types,t)));if(pressure>=4)s+=18;else if(pressure>=2)s+=11;else if(pressure<1)s-=7;
  const opp=moveTypes(y.id),danger=Math.max(1,...opp.map(t=>against(x.types,t)));if(danger>=4)s-=18;else if(danger>=2)s-=11;else if(danger<1)s+=7;
  const sp=x.stats.Speed||x.stats.SPD||0,osp=y.stats.Speed||y.stats.SPD||0;if(sp>osp)s+=7;else if(sp<osp)s-=7;
  const total=Object.values(x.stats).reduce((n,v)=>n+v,0),ot=Object.values(y.stats).reduce((n,v)=>n+v,0);if(total>ot)s+=5;else if(total<ot)s-=5;
  return Math.max(0,Math.min(100,s));
 }
 function render(){
  const x=data(a.value),y=data(b.value);if(!x||!y)return;const sx=score(x,y),sy=score(y,x),adv=sx===sy?'Even':sx>sy?x.name:y.name;
  const card=(z,s)=>'<div class="vs-card"><div class="vs-head"><img src="'+esc(z.img)+'"><div><b>'+esc(z.name)+'</b><span>'+esc(z.types.join(' / '))+'</span></div><div style="margin-left:auto" class="vs-score">'+s+'</div></div><div class="vs-bars">'+Object.entries(z.stats).map(([k,v])=>'<div class="vs-row"><span>'+esc(k)+'</span><span class="vs-bar"><i style="width:'+Math.min(100,v/1.6)+'%"></i></span><b>'+v+'</b></div>').join('')+'</div></div>';
  const px=Math.max(1,...moveTypes(x.id).map(t=>against(y.types,t))),py=Math.max(1,...moveTypes(y.id).map(t=>against(x.types,t)));
  res.innerHTML='<div class="vs-summary">'+card(x,sx)+card(y,sy)+'<div class="vs-card wide"><div class="tb-upgrade-title">Matchup Advantage</div><div class="vs-note"><b style="color:#d9caff">'+esc(adv)+'</b> · '+esc(x.name)+' best recorded type pressure: '+px+'× · '+esc(y.name)+' best recorded type pressure: '+py+'×. This estimate uses base stats, speed, typing, and recorded damaging move types; it does not simulate an actual battle.</div></div></div>';
 }
 document.getElementById('lumen-vs-launch')?.addEventListener('click',()=>{ov.classList.add('open');ov.setAttribute('aria-hidden','false');render()});document.getElementById('lumen-vs-close')?.addEventListener('click',()=>{ov.classList.remove('open');ov.setAttribute('aria-hidden','true')});ov.addEventListener('click',e=>{if(e.target===ov)document.getElementById('lumen-vs-close').click()});a.addEventListener('change',render);b.addEventListener('change',render);
 /* quick VS button on each Lumen matchup panel */
 details.forEach(d=>{const p=d.querySelector('.lumen-matchup-panel h4');if(p&&!p.parentElement.querySelector('.vs-launch')){const q=document.createElement('button');q.className='vs-launch';q.type='button';q.textContent='Compare VS';q.dataset.vsFrom=d.dataset.id;p.insertAdjacentElement('afterend',q)}});
 document.addEventListener('click',e=>{const q=e.target.closest('[data-vs-from]');if(!q)return;a.value=q.dataset.vsFrom;document.getElementById('lumen-vs-launch')?.click()});
}

/* 7: Build Around This Lumen */
function installBuildAround(){
 const up=document.getElementById('team-builder-upgrade');if(!up||document.getElementById('build-around-box'))return;
 const box=document.createElement('div');box.id='build-around-box';box.className='build-around-box';
 box.innerHTML='<div class="tb-upgrade-title">Build Around This Lumen</div><div class="build-around-controls"><select id="build-around-select">'+ALL.map(x=>'<option value="'+esc(x.id)+'">#'+esc(x.num)+' '+esc(x.name)+'</option>').join('')+'</select><button class="tb-upgrade-btn" type="button" id="build-around-run">Suggest Team</button></div><div id="build-around-result" class="build-around-result"></div>';
 up.insertAdjacentElement('beforebegin',box);
 function run(){
  const core=data(document.getElementById('build-around-select').value);if(!core)return;
  const weak=TYPES.filter(t=>against(core.types,t)>1),coreMoves=moveTypes(core.id);
  const scored=ALL.filter(x=>x.id!==core.id).map(x=>{let s=0,re=[];weak.forEach(t=>{const m=against(x.types,t);if(m===0){s+=5;re.push('immune '+t)}else if(m<1){s+=3;re.push('resists '+t)}});const mt=moveTypes(x.id);TYPES.forEach(def=>{if(!coreMoves.some(t=>mult(t,def)>1)&&mt.some(t=>mult(t,def)>1))s+=.35});if(!x.types.some(t=>core.types.includes(t)))s+=1;return{x,s,re}}).sort((a,b)=>b.s-a.s).slice(0,5);
  document.getElementById('build-around-result').innerHTML=scored.map(r=>'<div class="build-around-lumen"><img src="'+esc(r.x.img)+'"><b>'+esc(r.x.name)+'</b><small>'+esc((r.re[0]||'adds coverage'))+'</small></div>').join('');
 }
 document.getElementById('build-around-run').addEventListener('click',run);run();
}

/* 8: Compact mobile accordion sections */
function installMobileSections(){
 details.forEach(d=>{
  if(d.dataset.mobileSections==='1')return;d.dataset.mobileSections='1';
  const groups=[
   ['Stats',p=>/base stats|stats/i.test(p.querySelector('h4')?.textContent||'')],
   ['Matchups',p=>p.classList.contains('lumen-matchup-panel')],
   ['Locations',p=>p.classList.contains('lumen-location-panel')||/location/i.test(p.querySelector('h4')?.textContent||'')],
   ['Evolution',p=>/evolution/i.test(p.querySelector('h4')?.textContent||'')],
   ['Moves',p=>/moves/i.test(p.querySelector('h4')?.textContent||'')],
   ['Coverage',p=>p.classList.contains('move-coverage-panel')]
  ];
  groups.forEach(([name,test],idx)=>{
   const ps=[...d.querySelectorAll(':scope > .panel')].filter(test);if(!ps.length)return;
   const w=document.createElement('section');w.className='mobile-section-wrap'+(idx===0?' open':'');const btn=document.createElement('button');btn.type='button';btn.className='mobile-section-toggle';btn.textContent=name;const c=document.createElement('div');c.className='mobile-section-content';ps[0].before(w);w.append(btn,c);ps.forEach(p=>c.appendChild(p));
  });
 });
 document.addEventListener('click',e=>{const b=e.target.closest('.mobile-section-toggle');if(b)b.parentElement.classList.toggle('open')});
}

/* 10: Install App button */
function installPWAButton(){
 const nav=document.getElementById('codex-app-nav');if(!nav||document.getElementById('install-codex-btn'))return;
 const btn=document.createElement('button');btn.type='button';btn.id='install-codex-btn';btn.className='codex-nav-btn';btn.textContent='Install App';nav.appendChild(btn);
 let promptEvent=null;
 window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();promptEvent=e;btn.classList.add('install-ready')});
 btn.addEventListener('click',async()=>{if(!promptEvent)return;promptEvent.prompt();try{await promptEvent.userChoice}catch(e){}promptEvent=null;btn.classList.remove('install-ready')});
 window.addEventListener('appinstalled',()=>{promptEvent=null;btn.classList.remove('install-ready')});
}

function go(){installDrag();installEvo();installVS();setTimeout(installBuildAround,80);installMobileSections();installPWAButton()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',go,{once:true});else go();
})();
