(function(){
  'use strict';

  function install(){
    const overlay=document.getElementById('mv-tracker-overlay');
    if(!overlay) return;

    /*
     * Keep only one custom Moves dropdown open at a time.
     * This keeps the inline mobile filter area compact.
     */
    overlay.addEventListener('click',function(e){
      const trigger=e.target.closest && e.target.closest('.filter-select-trigger');
      if(!trigger) return;

      const current=trigger.closest('.filter-select-custom');
      if(!current) return;

      overlay.querySelectorAll('.mv-controls .filter-select-custom.open').forEach(function(other){
        if(other!==current){
          other.classList.remove('open');
          const b=other.querySelector('.filter-select-trigger');
          if(b) b.setAttribute('aria-expanded','false');
        }
      });
    },true);
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',install,{once:true});
  }else{
    install();
  }
})();
