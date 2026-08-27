(function(){
  if(window.__lumenaMobileEmptyPanelFix) return;
  window.__lumenaMobileEmptyPanelFix=true;

  function syncPanel(){
    var panel=document.querySelector('#rebuilt-map-ui .rebuilt-map-panel');
    var card=document.getElementById('rebuilt-panel-card');
    if(!panel || !card) return;
    var empty=card.classList.contains('panel-empty-state');
    panel.classList.toggle('mobile-panel-empty', empty);
    panel.classList.toggle('mobile-panel-open', !empty);
  }

  function install(){
    syncPanel();
    var card=document.getElementById('rebuilt-panel-card');
    if(card && window.MutationObserver && !card.dataset.mobileEmptyObserved){
      card.dataset.mobileEmptyObserved='1';
      new MutationObserver(syncPanel).observe(card,{attributes:true,attributeFilter:['class']});
    }
    document.addEventListener('click',function(){
      requestAnimationFrame(syncPanel);
    },true);
    document.addEventListener('pointerup',function(){
      requestAnimationFrame(syncPanel);
    },true);
    window.addEventListener('resize',syncPanel,{passive:true});
    window.addEventListener('orientationchange',function(){setTimeout(syncPanel,80);},{passive:true});
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',install,{once:true});
  else install();
})();
