(function(){
  if(window.__lumenaMobileMapFinalFix) return;
  window.__lumenaMobileMapFinalFix=true;

  function closeMap(){
    document.body.classList.remove('route-panel-open');
    document.body.classList.remove('world-map-full-page');
    document.documentElement.style.removeProperty('--route-panel-height');
    var results=document.getElementById('route-results');
    if(results) results.classList.remove('open');
    var toggle=document.getElementById('world-map-toggle');
    if(toggle) toggle.classList.remove('active');
  }

  function install(){
    var back=document.getElementById('world-map-back-btn');
    if(back && !back.dataset.mobileFinalBound){
      back.dataset.mobileFinalBound='1';
      back.addEventListener('pointerup',function(e){
        if(e.pointerType==='touch'){
          e.preventDefault();
          e.stopImmediatePropagation();
          closeMap();
        }
      },true);
    }

    /* Make touch taps on the SVG hotspots deterministic. A short pointer-up is
       converted directly to the location opener instead of waiting for a
       synthetic mobile click. */
    var svg=document.getElementById('lumena-svg-hotspots');
    if(svg && !svg.dataset.mobileTouchBound){
      svg.dataset.mobileTouchBound='1';
      svg.addEventListener('pointerup',function(e){
        if(e.pointerType!=='touch') return;
        var node=e.target && e.target.closest ? e.target.closest('.lumena-svg-hotspot') : null;
        if(!node) return;
        var name=node.dataset.location;
        if(!name || typeof window.__lumenaOpenRoute!=='function') return;
        e.preventDefault();
        e.stopImmediatePropagation();
        window.__lumenaOpenRoute(name);
      },true);
    }
  }

  function refresh(){
    install();
    requestAnimationFrame(install);
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',refresh,{once:true});
  else refresh();
  window.addEventListener('orientationchange',function(){setTimeout(refresh,80);setTimeout(refresh,300);},{passive:true});
  window.addEventListener('resize',refresh,{passive:true});

  var canvas=document.getElementById('world-map-canvas');
  if(canvas && window.MutationObserver){
    new MutationObserver(refresh).observe(canvas,{childList:true,subtree:true});
  }
})();
