(function(){
  if(window.__lumenaAllMapProbabilitySortInstalled) return;
  window.__lumenaAllMapProbabilitySortInstalled=true;

  function actualProbabilityForId(id){
    if(!id) return -Infinity;
    var detail=document.querySelector('.detail-view[data-id="'+CSS.escape(String(id))+'"]');
    if(!detail) return -Infinity;
    var dts=Array.from(detail.querySelectorAll('dt'));
    var label=dts.find(function(dt){
      return String(dt.textContent||'').trim().toLowerCase()==='probability';
    });
    if(!label || !label.nextElementSibling) return -Infinity;
    var n=parseFloat(String(label.nextElementSibling.textContent||'').replace('%','').trim());
    return Number.isFinite(n) ? n : -Infinity;
  }

  function sortOpenMapResults(){
    var grid=document.getElementById('route-lumen-grid');
    if(!grid) return;
    var cards=Array.from(grid.querySelectorAll('.route-codex-item[data-id], .side-item[data-id]'));
    if(cards.length<2) return;
    cards.sort(function(a,b){
      var pa=actualProbabilityForId(a.dataset.id);
      var pb=actualProbabilityForId(b.dataset.id);
      if(pb!==pa) return pb-pa;
      return Number(a.dataset.num||9999)-Number(b.dataset.num||9999);
    });
    cards.forEach(function(card){grid.appendChild(card);});
    var count=document.getElementById('route-results-count');
    if(count){
      count.textContent=cards.length+' Lumen • sorted from highest to lowest encounter probability';
    }
  }

  function wrapOpenRoute(){
    var original=window.__lumenaOpenRoute;
    if(typeof original!=='function' || original.__allMapProbabilityWrapped) return false;
    function wrapped(name){
      var result=original.apply(this,arguments);
      sortOpenMapResults();
      requestAnimationFrame(sortOpenMapResults);
      setTimeout(sortOpenMapResults,0);
      return result;
    }
    wrapped.__allMapProbabilityWrapped=true;
    wrapped.__originalOpenRoute=original;
    window.__lumenaOpenRoute=wrapped;
    return true;
  }

  function install(){
    if(!wrapOpenRoute()){
      var tries=0;
      var timer=setInterval(function(){
        tries++;
        if(wrapOpenRoute() || tries>40) clearInterval(timer);
      },100);
    }

    var grid=document.getElementById('route-lumen-grid');
    if(grid && window.MutationObserver){
      var queued=false;
      new MutationObserver(function(){
        if(queued) return;
        queued=true;
        requestAnimationFrame(function(){queued=false;sortOpenMapResults();});
      }).observe(grid,{childList:true});
    }
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',install,{once:true});
  else install();
})();
