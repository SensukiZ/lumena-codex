document.addEventListener('DOMContentLoaded',()=>{
  const applyColors=()=>{
    document.querySelectorAll('.lumen-counter-item').forEach(item=>{
      const badge=item.querySelector('.lumen-counter-item-type');
      if(!badge) return;
      const bg=getComputedStyle(badge).backgroundColor;
      item.style.setProperty('--rarity-color',bg);
    });
  };
  applyColors();
  setTimeout(applyColors,500);
});
