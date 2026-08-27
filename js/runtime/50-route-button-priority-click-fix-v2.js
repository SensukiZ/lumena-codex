(function(){
  /* The old percentage-based document click detector can be inaccurate when
     the map is letterboxed. Give the exact transparent route buttons priority.
     Window capture runs before that older detector, so Ember Pass and every
     other printed route open from their real hitbox. */
  function install(){
    if(window.__lumenaRoutePriorityInstalled) return;
    window.__lumenaRoutePriorityInstalled=true;

    window.addEventListener('click', function(e){
      if(!document.body.classList.contains('world-map-full-page')) return;
      const target=e.target && e.target.closest ? e.target.closest('#lumena-world-map .map-route') : null;
      if(!target) return;
      const route=target.dataset.route;
      if(!route || typeof window.__lumenaOpenRoute!=='function') return;

      e.preventDefault();
      e.stopImmediatePropagation();
      window.__lumenaOpenRoute(route);
    }, true);

    window.addEventListener('pointerup', function(e){
      if(e.pointerType!=='touch') return;
      if(!document.body.classList.contains('world-map-full-page')) return;
      const target=e.target && e.target.closest ? e.target.closest('#lumena-world-map .map-route') : null;
      if(!target) return;
      const route=target.dataset.route;
      if(!route || typeof window.__lumenaOpenRoute!=='function') return;
      e.preventDefault();
      e.stopImmediatePropagation();
      window.__lumenaOpenRoute(route);
    }, true);
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',install,{once:true});
  else install();
})();
