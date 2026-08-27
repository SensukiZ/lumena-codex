(function(){
  function getId(view){ return view && view.dataset ? view.dataset.id : ''; }

  function mergeLocationPanels(){
    document.querySelectorAll('.detail-view[data-id]').forEach(function(view){
      /* Remove the duplicate panel introduced by the map-integration feature. */
      view.querySelectorAll(':scope > .lumen-location-panel').forEach(function(p){p.remove();});

      var panel=view.querySelector(':scope > .detail-location-panel');
      if(!panel) return;
      var id=getId(view);
      var heading=panel.querySelector(':scope > h4');
      var list=panel.querySelector(':scope > .detail-location-list');
      if(!heading || !list) return;

      var chips=Array.from(list.querySelectorAll('.detail-location-chip'));
      if(!chips.length) return;

      /* Add one View All button to the ORIGINAL location panel. */
      if(!heading.querySelector('.detail-location-map-all')){
        var all=document.createElement('button');
        all.type='button';
        all.className='detail-location-map-all';
        all.textContent='View All on Map';
        all.addEventListener('click',function(e){
          e.preventDefault(); e.stopPropagation();
          if(typeof window.__lumenaShowLumenLocationsOnMap==='function'){
            window.__lumenaShowLumenLocationsOnMap(id,'');
          }
        });
        heading.appendChild(all);
      }

      /* Reuse the original location chips as the map buttons. */
      chips.forEach(function(oldChip){
        var loc=(oldChip.textContent||'').trim();
        var chip=oldChip;
        if(oldChip.tagName!=='BUTTON'){
          chip=document.createElement('button');
          chip.type='button';
          chip.className=oldChip.className;
          chip.textContent=loc;
          oldChip.replaceWith(chip);
        }
        if(chip.dataset.mapBound==='1') return;
        chip.dataset.mapBound='1';
        chip.title='Show '+loc+' on the World Map';
        chip.addEventListener('click',function(e){
          e.preventDefault(); e.stopPropagation();
          if(typeof window.__lumenaShowLumenLocationsOnMap==='function'){
            window.__lumenaShowLumenLocationsOnMap(id,loc);
          }
        });
      });
    });
  }

  function install(){
    mergeLocationPanels();
    /* Some older runtime scripts create detail panels after DOMContentLoaded. */
    setTimeout(mergeLocationPanels,0);
    setTimeout(mergeLocationPanels,250);
    setTimeout(mergeLocationPanels,700);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',install,{once:true});
  else install();
})();
