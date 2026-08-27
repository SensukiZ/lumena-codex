(function(){
  var NS='http://www.w3.org/2000/svg';
  var VIEW_W=1402, VIEW_H=1122;

  /* Coordinates are the actual plaque rectangles on the original 1402x1122 artwork.
     The display names can differ from the internal location key (FIRSTLIGHT -> Firstlight Village). */
  var spots=[
    {name:'Cinderfall Tarn', kind:'route', x:234, y:181, w:172, h:49},
    {name:'Ember Pass',      kind:'route', x:250, y:407, w:102, h:41},
    {name:'Quarry Road',     kind:'route', x:508, y:413, w:114, h:39},
    {name:'Frostpeak Climb', kind:'route', x:634, y:238, w:137, h:47},
    {name:'Snowline Rise',   kind:'route', x:636, y:307, w:134, h:46},
    {name:'Glimmer Flats',   kind:'route', x:782, y:421, w:127, h:43},
    {name:'Spark Woods',     kind:'route', x:816, y:507, w:116, h:41},
    {name:'Shade Trail',     kind:'route', x:1088,y:519, w:100, h:41},
    {name:'Coast Route',     kind:'route', x:458, y:702, w:113, h:43},
    {name:'Marsh Route',     kind:'route', x:684, y:667, w:108, h:43},
    {name:'Softglade Path',  kind:'route', x:306, y:838, w:121, h:44},

    {name:'Firstlight Village', label:'FIRSTLIGHT', kind:'town', x:198, y:946, w:167, h:57},
    {name:'Bloomvale',          kind:'town', x:204, y:752, w:170, h:55},
    {name:'Tidemarsh',          kind:'town', x:572, y:838, w:164, h:57},
    {name:'Frostpeak',          kind:'town', x:624, y:160, w:158, h:57},
    {name:'Spark Metropolis',   kind:'town', x:572, y:562, w:229, h:62},
    {name:'Prismgate',          kind:'town', x:932, y:507, w:149, h:53},
    {name:'Shadeholt',          kind:'town', x:1182,y:481, w:156, h:51},
    {name:'Emberfell',          kind:'town', x:132, y:449, w:168, h:55},
    {name:'Stonereach',         kind:'town', x:515, y:449, w:163, h:55},
    {name:'The Spire',          kind:'landmark', x:1078,y:990, w:163, h:55}
  ];

  function svgEl(tag,attrs){
    var n=document.createElementNS(NS,tag);
    Object.keys(attrs||{}).forEach(function(k){n.setAttribute(k,attrs[k]);});
    return n;
  }
  function openSpot(s,g){
    document.querySelectorAll('#lumena-merged-hotspots .map-hotspot').forEach(function(n){n.classList.toggle('active',n===g);});
    if(typeof window.__lumenaOpenRoute==='function'){
      window.__lumenaOpenRoute(s.name);
    }
  }
  function build(){
    var canvas=document.getElementById('world-map-canvas');
    if(!canvas) return;
    var old=canvas.querySelector('#lumena-merged-hotspots');
    if(old) old.remove();
    var svg=svgEl('svg',{
      id:'lumena-merged-hotspots',
      viewBox:'0 0 '+VIEW_W+' '+VIEW_H,
      preserveAspectRatio:'none',
      'aria-label':'Interactive Lumena world map locations'
    });
    spots.forEach(function(s){
      var g=svgEl('g',{
        'class':'map-hotspot '+(s.kind==='town'?'town-hotspot':'route-hotspot'),
        'tabindex':'0','role':'button','aria-label':s.name,'data-location':s.name
      });
      var r=svgEl('rect',{'class':'hit-area',x:s.x,y:s.y,width:s.w,height:s.h,rx:8,ry:8});
      var dot=svgEl('circle',{'class':'hover-dot',cx:s.x+s.w/2,cy:s.y+s.h/2,r:6});
      var title=svgEl('title',{}); title.textContent=s.name;
      g.appendChild(r);g.appendChild(dot);g.appendChild(title);
      g.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();openSpot(s,g);});
      g.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();openSpot(s,g);}});
      svg.appendChild(g);
    });
    canvas.appendChild(svg);
  }
  function install(){
    build();
    var toggle=document.getElementById('world-map-toggle');
    if(toggle) toggle.addEventListener('click',function(){requestAnimationFrame(build);});
    window.addEventListener('resize',function(){/* SVG viewBox handles scaling; no recalculation needed. */});
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',install,{once:true});
  else install();
})();
