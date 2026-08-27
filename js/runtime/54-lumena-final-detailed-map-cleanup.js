(function(){
  function cleanup(){
    var simple=document.getElementById('lumena-simplified-map');
    if(simple) simple.remove();
    /* If the older simplified-map observer recreates it, keep removing it. */
    var canvas=document.getElementById('world-map-canvas');
    if(canvas && window.MutationObserver && !canvas.dataset.detailedCleanupObserver){
      canvas.dataset.detailedCleanupObserver='1';
      new MutationObserver(function(){
        var s=document.getElementById('lumena-simplified-map');
        if(s) s.remove();
      }).observe(canvas,{childList:true});
    }
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',cleanup,{once:true});
  else cleanup();
})();
