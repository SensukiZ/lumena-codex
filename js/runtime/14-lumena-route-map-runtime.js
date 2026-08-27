(function(){
  function initRouteMap(){
    const map = document.getElementById('lumena-world-map');
    const toggle = document.getElementById('world-map-toggle');
    const results = document.getElementById('route-results');
    const title = document.getElementById('route-results-title');
    const count = document.getElementById('route-results-count');
    const grid = document.getElementById('route-lumen-grid');
    const close = document.getElementById('route-results-close');
    const locationFilter = document.getElementById('location-filter');
    if(!map || !toggle || !results || !grid) return;

    function allItems(){
      /* Only read the original Codex sidebar entries.
         Route-result clones must never become source entries, otherwise every
         subsequent route click would clone the already-cloned cards again. */
      return Array.from(document.querySelectorAll('.sidebar .side-item[data-id]:not(.route-codex-item)'));
    }
    /*
      World Map encounters follow the Lumen's ACTUAL Codex location data.
      If a Lumen has more than one recorded location, it appears at every
      matching route. Nothing is reassigned to a "first" location.
      Example: a Lumen recorded as "Glimmer Flats|Spark Woods" appears in
      both Glimmer Flats and Spark Woods, exactly as recorded in the Codex.
    */
    function routeItems(route){
      const wanted=String(route || '').trim();
      function getActualProbability(item){
        const id=String(item.dataset.id || '');
        if(!id) return -Infinity;
        const detail=document.querySelector('.detail-view[data-id="'+CSS.escape(id)+'"]');
        if(!detail) return -Infinity;
        const labels=Array.from(detail.querySelectorAll('dt'));
        const probabilityLabel=labels.find(function(dt){
          return String(dt.textContent || '').trim().toLowerCase()==='probability';
        });
        if(!probabilityLabel) return -Infinity;
        const dd=probabilityLabel.nextElementSibling;
        if(!dd) return -Infinity;
        const value=parseFloat(String(dd.textContent || '').replace('%','').trim());
        return Number.isFinite(value) ? value : -Infinity;
      }
      return allItems().filter(function(item){
        const locations=(item.dataset.locations || '')
          .split('|')
          .map(function(x){return x.trim();})
          .filter(Boolean);
        return locations.some(function(location){
          return location === wanted;
        });
      }).sort(function(a,b){
        const probabilityDiff=getActualProbability(b)-getActualProbability(a);
        if(probabilityDiff!==0) return probabilityDiff;
        return Number(a.dataset.num || 9999)-Number(b.dataset.num || 9999);
      });
    }
    function clearOtherFilters(){
      const search=document.getElementById('search');
      const rarity=document.getElementById('rarity-filter');
      const type=document.getElementById('type-filter');
      if(search){search.value='';search.dispatchEvent(new Event('input',{bubbles:true}));}
      if(rarity){rarity.value='';rarity.dispatchEvent(new Event('change',{bubbles:true}));}
      if(type){type.value='';type.dispatchEvent(new Event('change',{bubbles:true}));}
    }
    function syncLocationFilter(route){
      if(!locationFilter) return;
      const opt=Array.from(locationFilter.options).find(function(o){return o.value===route;});
      if(opt){
        locationFilter.value=route;
        locationFilter.dispatchEvent(new Event('change',{bubbles:true}));
      }
    }
    function openRoute(route){
      clearOtherFilters();
      syncLocationFilter(route);
      document.querySelectorAll('.map-route').forEach(function(b){b.classList.toggle('active',b.dataset.route===route);});
      const items=routeItems(route);
      title.textContent=route;
      count.textContent=items.length+' Lumen • sorted from highest to lowest encounter probability';
      grid.innerHTML='';
      if(!items.length){
        grid.innerHTML='<div class="route-empty">No Lumen are currently recorded for this location in the Codex.</div>';
      }else{
        items.forEach(function(item){
          /* Reuse the exact Codex Lumen row instead of creating a second card design.
             This keeps the number, artwork, name, type chips and responsive styling
             identical to the normal Codex. */
          const card=item.cloneNode(true);
          card.classList.add('route-codex-item');
          card.removeAttribute('id');
          const probability=getActualProbability(item);
          if(Number.isFinite(probability)){
            const probabilityBadge=document.createElement('span');
            probabilityBadge.className='route-probability-badge';
            probabilityBadge.textContent='Probability '+probability+'%';
            card.appendChild(probabilityBadge);
          }
          card.addEventListener('click',function(e){
            e.preventDefault();
            item.click();
          });
          grid.appendChild(card);
        });
      }
      results.classList.add('open');
      results.scrollIntoView({behavior:'smooth',block:'nearest'});
      window.__lumenaOpenRoute = openRoute;
    }
    window.__lumenaOpenRoute = openRoute;
    document.querySelectorAll('.map-route').forEach(function(btn){
      btn.addEventListener('click',function(){openRoute(btn.dataset.route);});
      if(routeItems(btn.dataset.route).length===0) btn.classList.add('no-data');
    });
    close.addEventListener('click',function(){
      results.classList.remove('open');
      document.querySelectorAll('.map-route').forEach(function(b){b.classList.remove('active');});
    });
    toggle.addEventListener('click',function(){
      map.classList.toggle('collapsed');
      toggle.classList.toggle('active',!map.classList.contains('collapsed'));
      if(!map.classList.contains('collapsed')) map.scrollIntoView({behavior:'smooth',block:'start'});
    });
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',initRouteMap); else initRouteMap();
})();
