(function(){
  function install(){
    if(window.__routeLumenOpenCodexFixInstalled) return;
    window.__routeLumenOpenCodexFixInstalled=true;

    document.addEventListener('click', function(e){
      const card=e.target && e.target.closest ? e.target.closest('#route-results .route-codex-item[data-id]') : null;
      if(!card) return;

      const id=card.dataset.id;
      if(!id) return;

      const original=Array.from(document.querySelectorAll('.sidebar .side-item[data-id]')).find(function(el){
        return !el.classList.contains('route-codex-item') && el.dataset.id===id;
      });
      if(!original) return;

      /* A route result is shown while the World Map is in full-page mode.
         The normal Codex detail can open, but it remains hidden by the
         world-map-full-page CSS. Leave map mode first, then open the real
         sidebar entry on the next frame. */
      e.preventDefault();
      e.stopImmediatePropagation();

      const results=document.getElementById('route-results');
      if(results) results.classList.remove('open');
      document.body.classList.remove('route-panel-open');
      document.body.classList.remove('world-map-full-page');
      document.documentElement.style.removeProperty('--route-panel-height');

      const mapToggle=document.getElementById('world-map-toggle');
      if(mapToggle) mapToggle.classList.remove('active');
      document.querySelectorAll('#lumena-world-map .map-route.active').forEach(function(el){el.classList.remove('active');});

      requestAnimationFrame(function(){
        original.click();
        requestAnimationFrame(function(){
          const detail=document.querySelector('.detail-panel');
          if(detail) detail.scrollTop=0;
        });
      });
    }, true);
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',install,{once:true});
  else install();
})();
