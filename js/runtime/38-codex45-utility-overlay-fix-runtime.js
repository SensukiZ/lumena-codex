(function(){
  'use strict';

  function syncUtilityVisibility(){
    const fullUtilityOpen =
      !!document.querySelector('.compare-overlay.open:not(#theme-settings-overlay)') ||
      !!document.querySelector('#team-builder-overlay.open') ||
      !!document.querySelector('#mv-tracker-overlay.open') ||
      !!document.querySelector('#move-compare-overlay.open') ||
      !!document.querySelector('#lumen-vs-overlay.open');

    document.body.classList.toggle('codex-utility-open', fullUtilityOpen ||
      document.body.classList.contains('codex-map-open'));
  }

  /*
   * Reuse the centralized manager when possible; this listener is only a
   * direct state sync after existing open/close handlers run.
   */
  document.addEventListener('click',function(e){
    if(!e.target.closest) return;

    if(e.target.closest(
      '#mv-tracker-toggle-btn,'+
      '#leaderboard-toggle-btn,'+
      '#lumen-counter-toggle-btn,'+
      '#counter-tracker-toggle-btn,'+
      '#compare-toggle-btn,'+
      '#move-compare-launch,'+
      '#lumen-vs-launch,'+
      '[data-vs-from],'+
      '.compare-close'
    )){
      setTimeout(syncUtilityVisibility,0);
      setTimeout(syncUtilityVisibility,80);
    }
  },true);

  document.addEventListener('keydown',function(e){
    if(e.key==='Escape'){
      setTimeout(syncUtilityVisibility,0);
      setTimeout(syncUtilityVisibility,80);
    }
  });

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',syncUtilityVisibility,{once:true});
  }else{
    syncUtilityVisibility();
  }
})();
