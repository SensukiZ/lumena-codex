(function(){
  if(window.__lumenaEvolutionLocationIntegration) return;
  window.__lumenaEvolutionLocationIntegration=true;

  const NAME_ALIASES={
    'Emberpass':'Emberpass','Ember Pass':'Emberpass',
    'Tidemarsh City':'Tidemarsh','Tidemarsh':'Tidemarsh',
    'Emberfell':'Emberfall','Emberfall':'Emberfall',
    'Shadetrail':'Shade Trail','Shade Trail':'Shade Trail'
  };
  function canonical(name){
    name=String(name||'').trim();
    return NAME_ALIASES[name]||name;
  }
  function esc(s){ return (window.CSS&&CSS.escape)?CSS.escape(s):String(s).replace(/["\\]/g,'\\$&'); }
  function allSideItems(){return Array.from(document.querySelectorAll('.sidebar .side-item[data-id]:not(.route-codex-item)'));}
  function itemForId(id){return allSideItems().find(x=>x.dataset.id===id);}
  function detailForId(id){return document.querySelector('.detail-view[data-id="'+esc(id)+'"]');}

  /* -------- Feature 2: upgrade source-backed evolution lines -------- */
  function upgradeEvolutionTrees(){
    document.querySelectorAll('.detail-view').forEach(function(detail){
      const panels=Array.from(detail.querySelectorAll('.panel'));
      const panel=panels.find(function(p){const h=p.querySelector('h4');return h&&h.textContent.trim()==='Evolution Line';});
      if(!panel) return;
      panel.classList.add('evolution-tree-panel');
      const h=panel.querySelector('h4'); if(h) h.textContent='Evolution Tree';
      const chain=panel.querySelector('.evo-chain'); if(!chain||chain.classList.contains('evolution-tree-upgraded')) return;
      chain.classList.add('evolution-tree-upgraded');
      const currentId=detail.dataset.id;
      Array.from(chain.querySelectorAll('.evo-node')).forEach(function(node){
        let id=node.dataset.jump||'';
        if(!id && node.classList.contains('current')) id=currentId;
        if(!id){
          const name=(node.querySelector('.evo-name')||{}).textContent||'';
          const match=allSideItems().find(x=>(x.querySelector('.side-name')||{}).textContent?.trim()===name.trim());
          if(match) id=match.dataset.id;
        }
        if(!id) return;
        node.dataset.evoId=id;
        if(node.tagName!=='BUTTON'){
          node.setAttribute('tabindex','0'); node.setAttribute('role','button');
        }
        const source=itemForId(id);
        const src=source&&source.querySelector('.side-thumb')&&source.querySelector('.side-thumb').src;
        if(src && !node.querySelector('.evo-tree-art')){
          const img=document.createElement('img'); img.className='evo-tree-art'; img.src=src; img.alt=((node.querySelector('.evo-name')||{}).textContent||id).trim();
          const num=node.querySelector('.evo-num'); node.insertBefore(img,num||node.firstChild);
        }
        if(id===currentId && !node.querySelector('.evo-current-badge')){
          const badge=document.createElement('span'); badge.className='evo-current-badge'; badge.textContent='CURRENT'; node.appendChild(badge);
        }
        function jump(){
          const target=itemForId(id);
          if(target){ target.click(); setTimeout(function(){const d=detailForId(id); if(d) d.scrollIntoView({behavior:'smooth',block:'start'});},60); }
        }
        if(!node.dataset.evoEnhanced){
          node.addEventListener('click',function(e){if(node.tagName!=='BUTTON'){e.preventDefault();jump();}});
          node.addEventListener('keydown',function(e){if((e.key==='Enter'||e.key===' ')&&node.tagName!=='BUTTON'){e.preventDefault();jump();}});
          node.dataset.evoEnhanced='1';
        }
      });
    });
  }

  /* -------- Feature 3: Lumen -> Locations -> Map -------- */
  let highlightedLumenId='';
  let highlightedLocations=[];
  function getLocations(id){
    const item=itemForId(id);
    return item ? String(item.dataset.locations||'').split('|').map(canonical).filter(Boolean) : [];
  }
  function ensureBanner(){
    let b=document.getElementById('map-lumen-highlight-banner');
    if(!b){b=document.createElement('div');b.id='map-lumen-highlight-banner';b.className='map-lumen-highlight-banner';document.body.appendChild(b);}
    return b;
  }
  function clearMapHighlights(){
    document.querySelectorAll('.lumen-location-highlight,.lumen-location-primary').forEach(function(el){el.classList.remove('lumen-location-highlight','lumen-location-primary');});
  }
  function deactivateLumenMapHighlights(){
    /* A direct map selection ends the temporary Lumen-location highlighting mode. */
    highlightedLumenId='';
    highlightedLocations=[];
    clearMapHighlights();
    const banner=ensureBanner();
    banner.classList.remove('visible');
    banner.innerHTML='';
  }
  function applyMapHighlights(primary){
    clearMapHighlights();
    const wanted=new Set(highlightedLocations.map(canonical));
    document.querySelectorAll('#rebuilt-map-hotspots [data-location],#lumena-svg-hotspots [data-location],#lumena-merged-hotspots [data-location],#lumena-simplified-map [data-location]').forEach(function(el){
      const n=canonical(el.dataset.location);
      if(wanted.has(n)){
        el.classList.add('lumen-location-highlight');
        if(primary && n===canonical(primary)) el.classList.add('lumen-location-primary');
      }
    });
    const banner=ensureBanner();
    if(highlightedLumenId && highlightedLocations.length){
      const item=itemForId(highlightedLumenId), name=item&&item.querySelector('.side-name')?item.querySelector('.side-name').textContent.trim():highlightedLumenId;
      banner.innerHTML='<b>'+name+'</b> <span>• '+highlightedLocations.length+' recorded location'+(highlightedLocations.length===1?'':'s')+' highlighted</span>';
      banner.classList.add('visible');
    }else banner.classList.remove('visible');
  }
  function enterMapForLumen(id, primary){
    const locs=getLocations(id);
    if(!locs.length) return;
    highlightedLumenId=id; highlightedLocations=locs;
    const map=document.getElementById('lumena-world-map');
    const toggle=document.getElementById('world-map-toggle');
    if(!document.body.classList.contains('world-map-full-page')){
      if(toggle) toggle.click();
      else {document.body.classList.add('world-map-full-page'); if(map) map.classList.remove('collapsed');}
    }
    setTimeout(function(){applyMapHighlights(primary);},80);
    setTimeout(function(){applyMapHighlights(primary);},350);
    if(primary && typeof window.__lumenaOpenRoute==='function'){
      setTimeout(function(){window.__lumenaOpenRoute(canonical(primary));applyMapHighlights(primary);},120);
    }
  }
  window.__lumenaShowLumenLocationsOnMap=enterMapForLumen;

  /* Clear the ACTUAL private highlight state when the rebuilt map closes. */
  window.addEventListener("lumena-map-closed",function(){
    deactivateLumenMapHighlights();
  });

  function addLocationPanels(){
    document.querySelectorAll('.detail-view[data-id]').forEach(function(detail){
      if(detail.querySelector('.lumen-location-panel')) return;
      const id=detail.dataset.id, locs=getLocations(id);
      const panel=document.createElement('div'); panel.className='panel lumen-location-panel';
      const head=document.createElement('div'); head.className='lumen-location-head';
      const text=document.createElement('div');
      const h=document.createElement('h4'); h.textContent='Locations';
      const sub=document.createElement('p'); sub.className='lumen-location-sub'; sub.textContent=locs.length?'Click a location to open it on the World Map.':'No encounter location is currently recorded for this Lumen.';
      text.append(h,sub); head.appendChild(text);
      if(locs.length){
        const mapBtn=document.createElement('button'); mapBtn.type='button'; mapBtn.className='lumen-view-map-btn'; mapBtn.textContent='View All on Map';
        mapBtn.addEventListener('click',function(){enterMapForLumen(id,'');}); head.appendChild(mapBtn);
      }
      panel.appendChild(head);
      if(locs.length){
        const list=document.createElement('div'); list.className='lumen-location-list';
        locs.forEach(function(loc){
          const b=document.createElement('button');b.type='button';b.className='lumen-location-chip';b.textContent=loc;
          b.addEventListener('click',function(){enterMapForLumen(id,loc);});list.appendChild(b);
        }); panel.appendChild(list);
      }else{
        const empty=document.createElement('div');empty.className='lumen-no-location';empty.textContent='Location data unavailable in the current Codex.';panel.appendChild(empty);
      }
      /* Place after the Evolution Tree when present, otherwise after the profile grid. */
      const evo=Array.from(detail.querySelectorAll('.panel')).find(function(p){const hh=p.querySelector('h4');return hh&&/Evolution (Line|Tree)/.test(hh.textContent.trim());});
      if(evo) evo.insertAdjacentElement('afterend',panel);
      else {
        const grid=detail.querySelector('.entry-grid');
        if(grid) grid.insertAdjacentElement('afterend',panel); else detail.appendChild(panel);
      }
    });
  }

  /* Keep map highlights after the map runtime rebuilds SVG layers. */
  const mapCanvas=document.getElementById('lumena-world-map')||document.getElementById('world-map-canvas');
  if(mapCanvas && window.MutationObserver){
    new MutationObserver(function(){if(highlightedLocations.length)setTimeout(function(){applyMapHighlights();},0);}).observe(mapCanvas,{childList:true,subtree:true});
  }
  document.addEventListener('click',function(e){
    const closest=e.target&&e.target.closest?e.target.closest.bind(e.target):null;
    const back=closest?closest('#world-map-back-btn'):null;
    if(back){setTimeout(deactivateLumenMapHighlights,20);return;}

    /* If the user now chooses a waypoint directly on the World Map, remove the
       temporary highlights created by a Lumen's Locations / View All on Map.
       Do not prevent the map's own location click handler from running. */
    const directMapLocation=closest?closest(
      '#rebuilt-map-hotspots [data-location],'+
      '#lumena-svg-hotspots [data-location],'+
      '#lumena-merged-hotspots [data-location],'+
      '#lumena-simplified-map [data-location]'
    ):null;
    if(directMapLocation && highlightedLocations.length){
      deactivateLumenMapHighlights();
    }
  },true);

  function install(){upgradeEvolutionTrees();addLocationPanels();ensureBanner();}
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',install,{once:true}); else install();
})();
