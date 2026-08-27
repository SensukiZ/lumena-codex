document.addEventListener('DOMContentLoaded',()=>{
  function applyGlow(){
    document.querySelectorAll('.lumen-counter-item').forEach(item=>{
      const badge=item.querySelector('.lumen-counter-item-type');
      if(!badge) return;
      const c=getComputedStyle(badge).backgroundColor;
      item.style.setProperty('--rarity-glow', c);
      item.style.setProperty('--rarity-color', c);
    });
  }
  applyGlow();
  const obs=new MutationObserver(applyGlow);
  obs.observe(document.body,{childList:true,subtree:true});
});
