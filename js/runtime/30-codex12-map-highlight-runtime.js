(function(){
  var selectedId='';
  var selectedLocations=[];
  var primaryLocation='';

  var aliases={
    'Ember Pass':'Emberpass','Emberpass':'Emberpass',
    'Tidemarsh City':'Tidemarsh','Tidemarsh':'Tidemarsh',
    'Emberfell':'Emberfall','Emberfall':'Emberfall',
    'Shadetrail':'Shade Trail','Shade Trail':'Shade Trail'
  };
  function canon(v){v=String(v||'').trim();return aliases[v]||v;}
  function sideItem(id){
    return Array.from(document.querySelectorAll('.sidebar .side-item[data-id]:not(.route-codex-item)')).find(function(x){return x.dataset.id===id;});
  }
  function locationsFor(id){
    var item=sideItem(id);
    if(!item) return [];
    return String(item.dataset.locations||'').split('|').map(canon).filter(Boolean);
  }
  function banner(){
    var b=document.getElementById('map-lumen-highlight-banner');
    if(!b){b=document.createElement('div');b.id='map-lumen-highlight-banner';b.className='map-lumen-highlight-banner';document.body.appendChild(b);}
    return b;
  }
  function apply(){
    var wanted=new Set(selectedLocations.map(canon));
    var dots=Array.from(document.querySelectorAll('#rebuilt-map-hotspots .map-dot[data-location]'));
    dots.forEach(function(dot){
      var name=canon(dot.dataset.location);
      var on=wanted.has(name);
      dot.classList.toggle('lumen-location-highlight',on);
      dot.classList.toggle('lumen-location-primary',on && !!primaryLocation && name===canon(primaryLocation));
    });
    var b=banner();
    if(selectedId && selectedLocations.length){
      var item=sideItem(selectedId);
      var nm=item && item.querySelector('.side-name') ? item.querySelector('.side-name').textContent.trim() : selectedId;
      b.innerHTML='<b>'+nm+'</b> <span>• '+selectedLocations.length+' recorded location'+(selectedLocations.length===1?'':'s')+' highlighted</span>';
      b.classList.add('visible');
    }
  }
  function clearLumenHighlightState(){
    selectedId='';
    selectedLocations=[];
    primaryLocation='';
    document.querySelectorAll('#rebuilt-map-hotspots .map-dot.lumen-location-highlight, #rebuilt-map-hotspots .map-dot.lumen-location-primary').forEach(function(dot){
      dot.classList.remove('lumen-location-highlight','lumen-location-primary');
    });
    var b=banner();
    b.classList.remove('visible');
    b.innerHTML='';
  }

  /* A real user click/tap on any map waypoint ends Lumen-highlight mode.
     Synthetic clicks used internally to open a location card are ignored. */
  document.addEventListener('pointerdown',function(e){
    if(!e.isTrusted || !selectedLocations.length) return;
    var t=e.target;
    var dot=t && t.closest ? t.closest('#rebuilt-map-hotspots .map-dot[data-location]') : null;
    if(dot) clearLumenHighlightState();
  },true);

  document.addEventListener('click',function(e){
    if(!e.isTrusted || !selectedLocations.length) return;
    var t=e.target;
    var dot=t && t.closest ? t.closest('#rebuilt-map-hotspots .map-dot[data-location]') : null;
    if(dot) clearLumenHighlightState();
  },true);

  function openAndHighlight(id,primary){
    selectedId=id;
    selectedLocations=locationsFor(id);
    primaryLocation=canon(primary||'');
    if(!selectedLocations.length) return;

    var map=document.getElementById('lumena-world-map');
    if(!map || !map.classList.contains('rebuilt-open')){
      if(typeof window.__rebuiltLumenaMapOpen==='function') window.__rebuiltLumenaMapOpen();
      else {
        var toggle=document.getElementById('world-map-toggle');
        if(toggle) toggle.click();
      }
    }

    /* Reapply after every stage of the rebuilt map opening/rendering. */
    [0,30,100,250,500].forEach(function(ms){setTimeout(apply,ms);});

    /* For one clicked location, also open that location's info card while
       preserving our cyan/gold classes afterward. */
    if(primaryLocation){
      setTimeout(function(){
        var dot=Array.from(document.querySelectorAll('#rebuilt-map-hotspots .map-dot[data-location]')).find(function(d){
          return canon(d.dataset.location)===primaryLocation;
        });
        if(dot){ dot.dispatchEvent(new MouseEvent('click',{bubbles:true,cancelable:true})); }
        setTimeout(apply,0);
        setTimeout(apply,80);
      },60);
    }
  }

  /* Replace the integration function so both the original location chips and
     View All button use this reliable rebuilt-map implementation. */
  window.__lumenaShowLumenLocationsOnMap=openAndHighlight;

  /* This runtime has its own private selectedId/selectedLocations variables.
     Clear them at the source instead of only hiding their banner. */
  window.addEventListener("lumena-map-closed",function(){
    clearLumenHighlightState();
  });

  var map=document.getElementById('lumena-world-map');
  if(map && window.MutationObserver){
    new MutationObserver(function(){
      if(selectedLocations.length) setTimeout(apply,0);
    }).observe(map,{childList:true,subtree:true});
  }
})();
