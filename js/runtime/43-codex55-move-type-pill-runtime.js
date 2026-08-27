(function(){
  'use strict';

  function markMovePanels(){
    document.querySelectorAll('.detail-view > .panel, .detail-view .mobile-section-content > .panel').forEach(function(panel){
      const heading=(panel.querySelector(':scope > h4')?.textContent || '').replace(/\s+/g,' ').trim().toLowerCase();

      /* Exactly the three requested learn-method sections. */
      if(
        heading === 'level-up moves' ||
        heading === 'tm / item moves' ||
        heading === 'tutor moves'
      ){
        panel.classList.add('type-colored-moves-panel');
      }
    });
  }

  function run(){
    markMovePanels();

    /* Lumen switching does not rebuild these panels, but this handles any
       mobile accordion relocation or later feature-generated detail content. */
    document.addEventListener('click',function(e){
      if(e.target.closest && e.target.closest('.sidebar .side-item[data-id], .evo-node, .evo-family-link')){
        requestAnimationFrame(markMovePanels);
      }
    },true);
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',run,{once:true});
  }else{
    run();
  }
})();
