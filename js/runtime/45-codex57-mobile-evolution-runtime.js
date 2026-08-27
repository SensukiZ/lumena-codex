(function(){
  'use strict';

  function normalizeEvolutionTree(){
    document.querySelectorAll('.detail-view').forEach(function(detail){
      const tree =
        detail.querySelector('.evo-tree') ||
        detail.querySelector('.evolution-tree');

      if(!tree) return;

      /*
       * Some older versions inserted arrow text as anonymous nodes.
       * Convert those into explicit flex items so they stay aligned.
       */
      Array.from(tree.childNodes).forEach(function(node){
        if(node.nodeType!==Node.TEXT_NODE) return;
        const text=(node.textContent||'').trim();
        if(text==='→' || text==='›' || text==='➜'){
          const arrow=document.createElement('span');
          arrow.className='evo-arrow';
          arrow.textContent='→';
          node.replaceWith(arrow);
        }else if(!text){
          node.remove();
        }
      });
    });
  }

  function run(){
    normalizeEvolutionTree();

    document.addEventListener('click',function(e){
      if(e.target.closest && e.target.closest('.sidebar .side-item[data-id],.evo-node,.evo-card,.evo-family-link')){
        requestAnimationFrame(normalizeEvolutionTree);
      }
    },true);
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',run,{once:true});
  }else{
    run();
  }
})();
