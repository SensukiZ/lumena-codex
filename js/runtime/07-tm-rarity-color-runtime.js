(function(){
  function colorRarities(root){
    (root||document).querySelectorAll('.tm-rarity').forEach(function(badge){
      ['common','uncommon','rare','epic','legendary'].forEach(function(rarity){badge.classList.remove('rarity-'+rarity)});
      var rarity=(badge.textContent||'').trim().toLowerCase();
      if(/^(common|uncommon|rare|epic|legendary)$/.test(rarity))badge.classList.add('rarity-'+rarity);
    });
    (root||document).querySelectorAll('.type-chip.small').forEach(function(badge){
      if(!/all types/i.test(badge.textContent||''))return;
      badge.classList.remove('type-chip','small');
      badge.classList.add('tm-all-types-badge');
      badge.removeAttribute('style');
      badge.textContent='All Types';
    });
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){colorRarities(document)},{once:true});else colorRarities(document);
  new MutationObserver(function(changes){changes.forEach(function(change){change.addedNodes.forEach(function(node){if(node.nodeType===1)colorRarities(node.matches&&node.matches('.tm-rarity')?node.parentNode:node)})})}).observe(document.documentElement,{childList:true,subtree:true});
})();
