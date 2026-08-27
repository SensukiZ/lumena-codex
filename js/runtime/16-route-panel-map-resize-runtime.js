(function(){
  function installRoutePanelMapResize(){
    const map=document.getElementById('lumena-world-map');
    const results=document.getElementById('route-results');
    if(!map || !results || map.dataset.routePanelResizeInstalled==='1') return;
    map.dataset.routePanelResizeInstalled='1';

    function update(){
      const full=document.body.classList.contains('world-map-full-page');
      const open=results.classList.contains('open');
      if(!full || !open){
        document.body.classList.remove('route-panel-open');
        document.documentElement.style.removeProperty('--route-panel-height');
        return;
      }

      const h=Math.ceil(results.getBoundingClientRect().height);
      document.documentElement.style.setProperty('--route-panel-height', h+'px');
      document.body.classList.add('route-panel-open');
    }

    const observer=new ResizeObserver(update);
    observer.observe(results);

    new MutationObserver(update).observe(results,{
      attributes:true,
      attributeFilter:['class','style']
    });

    window.addEventListener('resize',update,{passive:true});
    window.addEventListener('orientationchange',function(){setTimeout(update,80);},{passive:true});

    /* Patch the existing route open/close behavior without replacing it. */
    const originalOpen=window.__lumenaOpenRoute;
    const watch=setInterval(function(){
      if(window.__lumenaOpenRoute && window.__lumenaOpenRoute!==originalOpen){
        clearInterval(watch);
        const fn=window.__lumenaOpenRoute;
        window.__lumenaOpenRoute=function(name){
          const result=fn(name);
          requestAnimationFrame(function(){
            requestAnimationFrame(update);
          });
          return result;
        };
      }
    },50);

    document.addEventListener('click',function(e){
      if(e.target.closest && e.target.closest('#route-results-close')){
        setTimeout(update,20);
      }
    },true);

    /* Initial state */
    setTimeout(update,0);
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',installRoutePanelMapResize);
  }else{
    installRoutePanelMapResize();
  }
})();
