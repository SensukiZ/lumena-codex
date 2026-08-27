(function(){
  if(window.__lumenaSvgWorldMapInstalled) return;
  window.__lumenaSvgWorldMapInstalled=true;

  /* Final artwork is 1537 x 1023. Hotspots are centered on the VISIBLE map
     circles / city emblems, not on the old 1402 x 1122 artwork coordinates. */
  const hotspots=[
    /* Towns / cities */
    {name:'Firstlight Village', kind:'route', shape:'circle', cx:301, cy:921, r:18},
    {name:'Frostpeak',          kind:'town', shape:'circle', cx:790,  cy:87,  r:43},
    {name:'Emberfall',          kind:'town', shape:'circle', cx:171,  cy:484, r:43},
    {name:'Stonereach',         kind:'town', shape:'circle', cx:544,  cy:484, r:43},
    {name:'Spark Metropolis',   kind:'town', shape:'circle', cx:790,  cy:484, r:45},
    {name:'Prismgate',          kind:'town', shape:'circle', cx:1160, cy:484, r:43},
    {name:'Shadeholt',          kind:'town', shape:'circle', cx:1411, cy:484, r:43},
    {name:'Bloomvale',          kind:'town', shape:'circle', cx:301,  cy:689, r:43},
    {name:'Tidemarsh',          kind:'town', shape:'circle', cx:790,  cy:741, r:45},
    {name:'The Spire',          kind:'town', shape:'circle', cx:1249, cy:877, r:46},

    /* Routes / areas: each hitbox is centered on the white waypoint circle. */
    {name:'Cinderfall Tarn', kind:'route', shape:'circle', cx:378,  cy:320, r:18},
    {name:'Ember Pass',      kind:'route', shape:'circle', cx:378,  cy:484, r:18},
    {name:'Quarry Road',     kind:'route', shape:'circle', cx:663,  cy:484, r:18},
    {name:'Frostpeak Climb', kind:'route', shape:'circle', cx:787,  cy:255, r:18},
    {name:'Snowline Rise',   kind:'route', shape:'circle', cx:787,  cy:353, r:18},
    {name:'Glimmer Flats',   kind:'route', shape:'circle', cx:951,  cy:484, r:18},
    {name:'Spark Woods',     kind:'route', shape:'circle', cx:1039, cy:483, r:18},
    {name:'Shade Trail',     kind:'route', shape:'circle', cx:1287, cy:483, r:18},
    {name:'Coast Route',     kind:'route', shape:'circle', cx:519,  cy:750, r:18},
    {name:'Marsh Route',     kind:'route', shape:'circle', cx:787,  cy:642, r:18},
    {name:'Softglade Path',  kind:'route', shape:'circle', cx:302,  cy:817, r:18}
  ];

  function openLocation(name, node){
    document.querySelectorAll('#lumena-svg-hotspots .lumena-svg-hotspot').forEach(function(el){
      el.classList.toggle('is-active', el===node);
    });
    if(typeof window.__lumenaOpenRoute==='function') window.__lumenaOpenRoute(name);
  }

  function makeSvg(){
    const canvas=document.getElementById('world-map-canvas');
    if(!canvas) return;
    const old=canvas.querySelector('#lumena-svg-hotspots');
    if(old) old.remove();

    const ns='http://www.w3.org/2000/svg';
    const svg=document.createElementNS(ns,'svg');
    svg.id='lumena-svg-hotspots';
    svg.setAttribute('viewBox','0 0 1537 1023');
    svg.setAttribute('preserveAspectRatio','none');
    svg.setAttribute('width','100%');
    svg.setAttribute('height','100%');
    svg.setAttribute('aria-label','Interactive Lumena world map locations');

    hotspots.forEach(function(h){
      const node=document.createElementNS(ns, h.shape==='circle' ? 'circle' : 'rect');
      if(h.shape==='circle'){
        node.setAttribute('cx',h.cx); node.setAttribute('cy',h.cy); node.setAttribute('r',h.r);
      }else{
        node.setAttribute('x',h.x); node.setAttribute('y',h.y); node.setAttribute('width',h.w); node.setAttribute('height',h.h);
      }
      node.setAttribute('tabindex','0');
      node.setAttribute('role','button');
      node.setAttribute('aria-label',h.name);
      node.dataset.location=h.name;
      node.dataset.kind=h.kind;
      node.classList.add('lumena-svg-hotspot');
      node.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();openLocation(h.name,node);});
      node.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();openLocation(h.name,node);}});
      svg.appendChild(node);
    });
    canvas.appendChild(svg);
  }

  function install(){
    makeSvg();
    const toggle=document.getElementById('world-map-toggle');
    if(toggle) toggle.addEventListener('click',function(){setTimeout(makeSvg,0);setTimeout(makeSvg,120);});
    const close=document.getElementById('route-results-close');
    if(close) close.addEventListener('click',function(){document.querySelectorAll('#lumena-svg-hotspots .lumena-svg-hotspot').forEach(function(el){el.classList.remove('is-active');});});
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',install,{once:true});
  else install();
})();
