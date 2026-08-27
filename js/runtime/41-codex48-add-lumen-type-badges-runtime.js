(function(){
'use strict';

const COLORS={
  Normal:'#87909d',Fire:'#e65a2f',Water:'#3e91d8',Electric:'#d9b928',
  Grass:'#4d9d59',Ice:'#63b7c8',Fighting:'#b95d44',Poison:'#9856a8',
  Ground:'#b88b4a',Flying:'#879bd7',Psychic:'#cf638d',Bug:'#79a83f',
  Rock:'#9a8a58',Ghost:'#66588f',Dragon:'#596dcc',Dark:'#5d5366',
  Steel:'#8092a4',Fairy:'#c978b1'
};
const esc=s=>String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

function ensureTypes(){
  const list=document.getElementById('team-builder-list');
  if(!list)return;

  list.querySelectorAll('[data-tb-add]').forEach(row=>{
    if(row.querySelector('.tb-option-types,.team-builder-option-types,.side-types'))return;

    const id=row.dataset.tbAdd;
    const source=document.querySelector('.sidebar .side-item[data-id="'+CSS.escape(id)+'"]');
    const types=String(source?.dataset.types||'').split(/\s+/).filter(Boolean);
    if(!types.length)return;

    const holder=document.createElement('span');
    holder.className='tb-option-types';
    holder.innerHTML=types.map(type=>
      '<span class="type-chip" style="background:'+(COLORS[type]||'#657080')+
      ';border:1px solid rgba(255,255,255,.35);color:#fff">'+esc(type)+'</span>'
    ).join('');

    const identity=row.querySelector('.team-builder-option-identity') ||
                   row.querySelector('span');
    if(identity && identity.parentElement){
      identity.parentElement.appendChild(holder);
    }
  });
}

function run(){
  ensureTypes();
  const list=document.getElementById('team-builder-list');
  if(list && window.MutationObserver){
    let pending=false;
    new MutationObserver(()=>{
      if(pending)return;
      pending=true;
      requestAnimationFrame(()=>{
        pending=false;
        ensureTypes();
      });
    }).observe(list,{childList:true,subtree:true});
  }
}

if(document.readyState==='loading'){
  document.addEventListener('DOMContentLoaded',run,{once:true});
}else run();
})();
