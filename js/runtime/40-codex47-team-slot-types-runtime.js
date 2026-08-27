(function(){
'use strict';

const COLORS={
  Normal:'#87909d',Fire:'#e65a2f',Water:'#3e91d8',Electric:'#d9b928',
  Grass:'#4d9d59',Ice:'#63b7c8',Fighting:'#b95d44',Poison:'#9856a8',
  Ground:'#b88b4a',Flying:'#879bd7',Psychic:'#cf638d',Bug:'#79a83f',
  Rock:'#9a8a58',Ghost:'#66588f',Dragon:'#596dcc',Dark:'#5d5366',
  Steel:'#8092a4',Fairy:'#c978b1'
};

function esc(s){
  return String(s||'').replace(/[&<>"']/g,c=>({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[c]));
}

function ensureSlotTypes(){
  document.querySelectorAll('#team-builder-slots .team-slot').forEach(slot=>{
    if(slot.querySelector('.team-slot-types,.tb-slot-types')) return;

    const id=slot.dataset.id || slot.dataset.lumenId;
    if(!id) return;

    const source=document.querySelector('.sidebar .side-item[data-id="'+CSS.escape(id)+'"]');
    const types=String(source?.dataset.types||'').split(/\s+/).filter(Boolean);
    if(!types.length) return;

    const holder=document.createElement('span');
    holder.className='tb-slot-types';
    holder.innerHTML=types.map(type=>
      '<span class="type-chip" style="background:'+(COLORS[type]||'#657080')+
      ';border:1px solid rgba(255,255,255,.35);color:#fff">'+esc(type)+'</span>'
    ).join('');

    const name=slot.querySelector('.team-slot-name,b');
    if(name) name.insertAdjacentElement('afterend',holder);
    else slot.appendChild(holder);
  });
}

function run(){
  ensureSlotTypes();

  const slots=document.getElementById('team-builder-slots');
  if(slots && window.MutationObserver){
    let scheduled=false;
    new MutationObserver(()=>{
      if(scheduled)return;
      scheduled=true;
      requestAnimationFrame(()=>{
        scheduled=false;
        ensureSlotTypes();
      });
    }).observe(slots,{childList:true,subtree:true});
  }
}

if(document.readyState==='loading'){
  document.addEventListener('DOMContentLoaded',run,{once:true});
}else run();
})();
