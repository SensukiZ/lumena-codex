(function(){
  'use strict';

  /*
   * Small centralized scheduling helper for UI refreshes. Features added after
   * this refactor can call window.__codexScheduleUI(fn) instead of creating
   * additional MutationObservers just to debounce DOM rebuilds.
   */
  let raf=0;
  const queue=new Set();

  window.__codexScheduleUI=function(fn){
    if(typeof fn!=='function') return;
    queue.add(fn);
    if(raf) return;
    raf=requestAnimationFrame(function(){
      raf=0;
      const jobs=Array.from(queue);
      queue.clear();
      jobs.forEach(job=>{
        try{ job(); }catch(e){ console.error(e); }
      });
    });
  };

  /* Passive global scroll/resize scheduling point for future modules. */
  window.addEventListener('resize',function(){
    if(window.__codexViewManager){
      window.__codexScheduleUI(window.__codexViewManager.sync);
    }
  },{passive:true});
})();
