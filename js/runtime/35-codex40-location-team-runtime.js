(function(){
'use strict';
if(window.__codex40)return; window.__codex40=true;

const TYPE_COLORS={
 Normal:'#87909d',Fire:'#e65a2f',Water:'#3e91d8',Electric:'#d9b928',
 Grass:'#4d9d59',Ice:'#63b7c8',Fighting:'#b95d44',Poison:'#9856a8',
 Ground:'#b88b4a',Flying:'#879bd7',Psychic:'#cf638d',Bug:'#79a83f',
 Rock:'#9a8a58',Ghost:'#66588f',Dragon:'#596dcc',Dark:'#5d5366',
 Steel:'#8092a4',Fairy:'#c978b1'
};
const esc=s=>String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const norm=s=>String(s||'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();

function lumenData(){
  return [...document.querySelectorAll('.sidebar .side-item[data-id]:not(.route-codex-item)')].map(i=>{
    const id=i.dataset.id;
    const d=document.querySelector('.detail-view[data-id="'+CSS.escape(id)+'"]');
    return {
      id,
      num:String(i.dataset.num||'').replace(/\D/g,'').padStart(3,'0'),
      name:i.querySelector('.side-name')?.textContent.trim()||id,
      img:i.querySelector('.side-thumb')?.src||'',
      types:(i.dataset.types||d?.dataset.types||'').split(/\s+/).filter(Boolean),
      detail:d
    };
  });
}
const ALL=lumenData();

function locationsFor(l){
  const out=new Set();
  const d=l.detail;
  if(!d)return out;

  d.querySelectorAll('.lumen-location-panel [data-location], .lumen-location-panel [data-zone], .lumen-location-panel button, .lumen-location-panel a').forEach(el=>{
    const v=el.dataset.location||el.dataset.zone||el.textContent;
    if(v&&norm(v))out.add(norm(v));
  });

  /* Also inspect visible location-panel text, useful for older generated entries. */
  const panel=d.querySelector('.lumen-location-panel');
  if(panel){
    const txt=norm(panel.textContent);
    document.querySelectorAll('[data-zone-id],[data-location-id],.map-location,[data-zone]').forEach(z=>{
      const key=z.dataset.zoneId||z.dataset.locationId||z.dataset.zone||z.textContent;
      if(key && txt.includes(norm(key))) out.add(norm(key));
    });
  }
  return out;
}

const LOCS=new Map(ALL.map(l=>[l.id,locationsFor(l)]));

function findMapHost(){
  return document.querySelector(
    '#lumena-world-map .map-info-panel,'+
    '#lumena-world-map .map-details,'+
    '#lumena-world-map .location-details,'+
    '#lumena-world-map .map-sidebar,'+
    '#lumena-world-map .rebuilt-map-panel,'+
    '#lumena-world-map'
  );
}

function locationNameFrom(el){
  return el?.dataset?.locationName ||
         el?.dataset?.zoneName ||
         el?.dataset?.location ||
         el?.dataset?.zone ||
         el?.dataset?.zoneId ||
         el?.dataset?.locationId ||
         el?.getAttribute?.('aria-label') ||
         el?.textContent || '';
}

function renderEncounters(locationName){
  const host=findMapHost();
  if(!host)return;
  let panel=document.getElementById('location-encounter-panel');
  if(!panel){
    panel=document.createElement('section');
    panel.id='location-encounter-panel';
    panel.className='location-encounter-panel';
    host.appendChild(panel);
  }

  const key=norm(locationName);
  if(!key){panel.style.display='none';return;}

  const matches=ALL.filter(l=>{
    const ls=LOCS.get(l.id);
    if(!ls||!ls.size)return false;
    return [...ls].some(x=>x===key || x.includes(key) || key.includes(x));
  });

  panel.style.display='block';
  panel.innerHTML=
    '<div class="location-encounter-head"><div><b>'+esc(String(locationName).trim())+'</b><small> · Lumen Encounters</small></div><small>'+matches.length+' found</small></div>'+
    (matches.length
      ? '<div class="location-encounter-grid">'+matches.map(l=>
          '<button type="button" class="location-encounter-card" data-open-lumen="'+esc(l.id)+'">'+
            '<img src="'+esc(l.img)+'" alt="">'+
            '<span><span class="location-encounter-id">#'+esc(l.num)+'</span>'+
            '<span class="location-encounter-name">'+esc(l.name)+'</span>'+
            '<span class="location-encounter-types">'+l.types.map(t=>
              '<span class="location-encounter-type" style="background:'+(TYPE_COLORS[t]||'#657080')+'">'+esc(t)+'</span>'
            ).join('')+'</span></span>'+
          '</button>'
        ).join('')+'</div>'
      : '<div class="location-encounter-empty">No Lumen location entries are recorded for this location yet.</div>');
}

function installLocationEncounters(){
  document.addEventListener('click',e=>{
    const open=e.target.closest('[data-open-lumen]');
    if(open){
      const item=document.querySelector('.sidebar .side-item[data-id="'+CSS.escape(open.dataset.openLumen)+'"]');
      item?.click();
      document.getElementById('rebuilt-map-close')?.click();
      return;
    }

    const loc=e.target.closest(
      '#lumena-world-map [data-zone-id],'+
      '#lumena-world-map [data-location-id],'+
      '#lumena-world-map [data-location],'+
      '#lumena-world-map [data-zone],'+
      '#lumena-world-map .map-location,'+
      '#lumena-world-map .location-marker,'+
      '#lumena-world-map .map-hotspot'
    );
    if(loc){
      setTimeout(()=>renderEncounters(locationNameFrom(loc)),30);
    }
  },true);

  /* Existing map code may update a selected/highlighted location without a click. */
  const map=document.getElementById('lumena-world-map');
  if(map&&window.MutationObserver){
    new MutationObserver(()=>{
      const selected=map.querySelector(
        '[data-zone-id].active,[data-location-id].active,[data-location].active,[data-zone].active,'+
        '.map-location.active,.location-marker.active,.map-hotspot.active,'+
        '[data-zone-id].selected,[data-location-id].selected,.map-location.selected'
      );
      if(selected)renderEncounters(locationNameFrom(selected));
    }).observe(map,{attributes:true,subtree:true,attributeFilter:['class','aria-selected']});
  }
}

/* Mobile Team Builder: keep the six-member grid visible near the top. */
function improveTeamBuilderOrder(){
  const overlay=document.getElementById('team-builder-overlay');
  const slots=document.getElementById('team-builder-slots');
  if(!overlay||!slots)return;

  const modal=overlay.querySelector('.compare-modal,.team-builder-modal');
  if(!modal)return;

  /* If the picker was placed before the team slots, move slots above it. */
  const picker=overlay.querySelector('.team-builder-picker,.team-builder-add');
  if(picker && slots.compareDocumentPosition(picker)&Node.DOCUMENT_POSITION_PRECEDING){
    picker.before(slots);
  }

  /* Give the grid a compact heading if it does not already have one. */
  if(!document.getElementById('mobile-team-current-label')){
    const label=document.createElement('div');
    label.id='mobile-team-current-label';
    label.className='tb-upgrade-title';
    label.textContent='Current Team';
    slots.before(label);
  }
}

function go(){
  installLocationEncounters();
  improveTeamBuilderOrder();
  document.getElementById('team-builder-toggle-btn')?.addEventListener('click',()=>setTimeout(improveTeamBuilderOrder,50));
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',go,{once:true});else go();
})();
