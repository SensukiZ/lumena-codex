(function(){
  'use strict';

  function sync(){
    const utilityOpen =
      !!document.querySelector('.compare-overlay.open:not(#theme-settings-overlay)') ||
      !!document.querySelector('#team-builder-overlay.open') ||
      !!document.querySelector('#mv-tracker-overlay.open') ||
      !!document.querySelector('#move-compare-overlay.open') ||
      !!document.querySelector('#lumen-vs-overlay.open');

    document.body.classList.toggle(
      'codex-utility-open',
      utilityOpen || document.body.classList.contains('codex-map-open')
    );
  }

  document.addEventListener('click',function(e){
    if(!e.target.closest) return;

    if(e.target.closest(
      '#team-builder-toggle-btn,'+
      '#mv-tracker-toggle-btn,'+
      '#battle-tools-trigger,'+
      '#compare-toggle-btn,'+
      '#leaderboard-toggle-btn,'+
      '#counter-tracker-toggle-btn,'+
      '#lumen-counter-toggle-btn,'+
      '#move-compare-launch,'+
      '#lumen-vs-launch,'+
      '[data-vs-from],'+
      '.compare-close'
    )){
      setTimeout(sync,0);
      setTimeout(sync,80);
    }
  },true);

  document.addEventListener('keydown',function(e){
    if(e.key==='Escape'){
      setTimeout(sync,0);
      setTimeout(sync,80);
    }
  });

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',sync,{once:true});
  }else{
    sync();
  }
})();
