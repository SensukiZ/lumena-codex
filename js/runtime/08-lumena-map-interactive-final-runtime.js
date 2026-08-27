(function(){
  const routes = [
    ["Cinderfall Tarn",21.5,18.3,7.0],
    ["Ember Pass",21.1,38.7,6.5],
    ["Quarry Road",40.6,39.1,6.5],
    ["Frostpeak Climb",50.4,23.7,5.5],
    ["Snowline Rise",50.4,29.6,5.5],
    ["Glimmer Flats",59.9,39.5,6.0],
    ["Spark Woods",62.6,48.1,6.0],
    ["Shade Trail",81.9,48.9,6.0],
    ["Coast Route",37.7,64.9,6.5],
    ["Marsh Route",52.9,61.6,6.0],
    ["Softglade Path",26.5,76.9,6.5],
    ["Firstlight Village",19.9,85.7,7.0],

    /* Town/city click targets. These use the exact town markers printed on
       the World Map and open the same Lumen-results panel as routes. */
    ["Bloomvale",19.3,59.0,5.0],
    ["Tidemarsh",46.0,66.2,5.0],
    ["Frostpeak",50.0,14.8,5.0],
    ["Spark Metropolis",50.0,43.8,5.0],
    ["Prismgate",76.5,38.2,5.0],
    ["Shadeholt",91.0,36.7,5.0]
  ];

  function getMapImage(){
    return document.querySelector('#lumena-world-map .world-map-image');
  }

  function routeAt(clientX, clientY){
    const img=getMapImage();
    if(!img) return null;
    const r=img.getBoundingClientRect();
    if(!r.width || !r.height) return null;

    const x=((clientX-r.left)/r.width)*100;
    const y=((clientY-r.top)/r.height)*100;
    if(x<0 || x>100 || y<0 || y>100) return null;

    let hit=null, best=Infinity;
    for(const [name,rx,ry,rad] of routes){
      const dx=x-rx, dy=y-ry;
      const d=Math.hypot(dx,dy);
      if(d<=rad && d<best){ best=d; hit=name; }
    }
    return hit;
  }

  function openRoute(name){
    if(typeof window.__lumenaOpenRoute === 'function'){
      window.__lumenaOpenRoute(name);
      return;
    }
    const btn=[...document.querySelectorAll('#lumena-world-map .map-route')]
      .find(b=>b.dataset.route===name);
    if(btn) btn.click();
  }

  function install(){
    const map=document.getElementById('lumena-world-map');
    if(!map || map.dataset.finalInteractive==='1') return;
    map.dataset.finalInteractive='1';

    /* Use capture phase so no overlay can prevent the route selection. */
    document.addEventListener('click', function(e){
      /* Disabled: this old nearest-location detector used broad circular areas
         and could open a neighboring route/town, especially with letterboxing.
         Exact route/town hitboxes below are now the only map click targets. */
      return;
    }, true);

    /* Keyboard accessibility: Enter/Space on a route button still opens it. */
    document.querySelectorAll('#lumena-world-map .map-route').forEach(btn=>{
      btn.addEventListener('keydown', function(e){
        if(e.key==='Enter' || e.key===' '){
          e.preventDefault();
          openRoute(btn.dataset.route);
        }
      });
    });
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',install);
  }else{
    install();
  }
})();
