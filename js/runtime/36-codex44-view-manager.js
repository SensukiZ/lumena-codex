(function(){
  'use strict';
  if(window.__codex44ViewManager) return;
  window.__codex44ViewManager=true;

  const OVERLAY_IDS=[
    'team-builder-overlay',
    'mv-tracker-overlay',
    'move-compare-overlay',
    'compare-overlay',
    'leaderboard-overlay',
    'counter-tracker-overlay',
    'lumen-counter-overlay',
    'lumen-vs-overlay',
    'theme-settings-overlay',
    'held-items-overlay',
    'weather-guide-overlay'
  ];

  function mapEl(){ return document.getElementById('lumena-world-map'); }
  function overlay(id){ return document.getElementById(id); }
  function isOpen(el){ return !!el && el.classList.contains('open'); }
  function mapOpen(){
    const m=mapEl();
    return !!m && (m.classList.contains('rebuilt-open') || m.classList.contains('open'));
  }

  function closeMap(){
    if(!mapOpen()) return;
    if(typeof window.__rebuiltLumenaMapClose==='function'){
      try{ window.__rebuiltLumenaMapClose(); return; }catch(e){}
    }
    const m=mapEl();
    if(m){
      m.classList.remove('rebuilt-open','open');
      m.setAttribute('aria-hidden','true');
    }
  }

  function closeOverlays(exceptId){
    OVERLAY_IDS.forEach(id=>{
      if(id===exceptId) return;
      const el=overlay(id);
      if(el && el.classList.contains('open')){
        el.classList.remove('open');
        el.setAttribute('aria-hidden','true');
      }
    });
  }

  function clearMapBanner(){
    const b=document.getElementById('map-lumen-highlight-banner');
    if(b && !mapOpen()){
      b.classList.remove('visible');
      b.innerHTML='';
    }
    const encounter=document.getElementById('location-encounter-panel');
    if(encounter && !mapOpen()){
      encounter.style.display='none';
    }
  }

  function syncState(){
    const team=isOpen(overlay('team-builder-overlay'));
    const theme=isOpen(overlay('theme-settings-overlay'));
    const anyNonTheme =
      mapOpen() ||
      OVERLAY_IDS.some(id=>id!=='theme-settings-overlay' && isOpen(overlay(id)));

    document.body.classList.toggle('codex-map-open',mapOpen());
    document.body.classList.toggle('codex-team-builder-open',team);
    document.body.classList.toggle('codex-utility-open',anyNonTheme);
    document.body.classList.toggle('team-builder-open',team);

    /* Theme modal itself should not hide the gear due to its own open state. */
    if(theme && !anyNonTheme){
      document.body.classList.remove('codex-utility-open');
    }

    clearMapBanner();
  }

  function targetForTrigger(el){
    if(!el) return null;
    if(el.closest('#world-map-toggle')) return 'map';
    if(el.closest('#team-builder-toggle-btn')) return 'team-builder-overlay';
    if(el.closest('#mv-tracker-toggle-btn')) return 'mv-tracker-overlay';
    if(el.closest('#move-compare-launch')) return 'move-compare-overlay';
    if(el.closest('#compare-toggle-btn')) return 'compare-overlay';
    if(el.closest('#leaderboard-toggle-btn')) return 'leaderboard-overlay';
    if(el.closest('#counter-tracker-toggle-btn')) return 'counter-tracker-overlay';
    if(el.closest('#lumen-counter-toggle-btn')) return 'lumen-counter-overlay';
    if(el.closest('#lumen-vs-launch,[data-vs-from]')) return 'lumen-vs-overlay';
    if(el.closest('#held-items-toggle-btn')) return 'held-items-overlay';
    if(el.closest('#weather-guide-toggle-btn,[data-open-weather]')) return 'weather-guide-overlay';
    if(el.closest('#theme-settings-btn')) return 'theme-settings-overlay';
    return null;
  }

  /*
   * One capture listener replaces multiple historical "hide this when that
   * opens" fixes. Existing feature handlers still do the actual opening.
   */
  document.addEventListener('click',function(e){
    const target=targetForTrigger(e.target);

    if(target){
      if(target==='map'){
        closeOverlays(null);
      }else{
        closeOverlays(target);
        if(target!=='theme-settings-overlay') closeMap();
      }
      setTimeout(syncState,0);
      setTimeout(syncState,80);
      return;
    }

    if(e.target.closest && e.target.closest(
      '.compare-close,.held-items-close,#rebuilt-map-close,#world-map-close,.map-close,[data-map-close]'
    )){
      setTimeout(syncState,0);
      setTimeout(syncState,80);
    }
  },true);

  document.addEventListener('keydown',function(e){
    if(e.key==='Escape'){
      setTimeout(syncState,0);
      setTimeout(syncState,80);
    }
  });

  window.addEventListener('lumena-map-closed',function(){
    document.body.classList.remove('codex-map-open');
    clearMapBanner();
    syncState();
  });

  /*
   * One observer watches open/close class changes for all utility views.
   * This replaces several feature-specific MutationObservers removed above.
   */
  if(window.MutationObserver){
    const roots=[mapEl(),...OVERLAY_IDS.map(overlay)].filter(Boolean);
    const observer=new MutationObserver(syncState);
    roots.forEach(el=>observer.observe(el,{
      attributes:true,
      attributeFilter:['class','aria-hidden']
    }));
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',syncState,{once:true});
  }else{
    syncState();
  }

  window.__codexViewManager={
    sync:syncState,
    closeMap:closeMap,
    closeOverlays:closeOverlays
  };
})();
