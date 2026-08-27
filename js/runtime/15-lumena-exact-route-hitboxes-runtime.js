(function(){
  /*
    These are the actual bounding boxes of the route labels in the supplied
    1402 x 1122 map artwork. Coordinates are image pixels.
    The boxes are deliberately tight around the printed labels.
  */
  const routeBoxes = {
    "Cinderfall Tarn": [250, 184, 140, 32],
    "Ember Pass":      [249, 409, 78, 34],
    "Quarry Road":     [510, 410, 88, 34],
    "Frostpeak Climb": [626, 239, 134, 39],
    "Snowline Rise":   [633, 306, 121, 39],
    "Glimmer Flats":   [772, 409, 111, 40],
    "Spark Woods":     [812, 506, 101, 43],
    "Shade Trail":     [1069, 515, 99, 40],
    "Coast Route":     [451, 690, 106, 40],
    "Marsh Route":     [672, 655, 101, 40],
    "Softglade Path":  [311, 824, 116, 41],
    "Firstlight Village": [208, 938, 151, 48]
  };

  function getMapGeometry(){
    const canvas = document.getElementById('world-map-canvas');
    const img = canvas && canvas.querySelector('.world-map-image');
    if(!canvas || !img || !img.naturalWidth || !img.naturalHeight) return null;

    const cr = canvas.getBoundingClientRect();
    const ir = img.getBoundingClientRect();

    /*
      The image element fills the canvas, but object-fit:contain may letterbox
      it on phones. Calculate the REAL rendered image rectangle inside that box.
    */
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;
    const boxW = ir.width;
    const boxH = ir.height;
    const scale = Math.min(boxW / iw, boxH / ih);
    const renderedW = iw * scale;
    const renderedH = ih * scale;
    const imageLeft = (ir.left - cr.left) + (boxW - renderedW) / 2;
    const imageTop  = (ir.top  - cr.top)  + (boxH - renderedH) / 2;

    return {canvas, cr, scale, imageLeft, imageTop};
  }

  function positionExactRouteHitboxes(){
    const geo = getMapGeometry();
    if(!geo) return;

    document.querySelectorAll('#lumena-world-map .map-route').forEach(function(btn){
      const box = routeBoxes[btn.dataset.route];
      if(!box) return;

      const [x,y,w,h] = box;

      /*
        Small 3px padding around the visible label. This is still tight enough
        that clicking nearby roads/locations does not accidentally select it.
      */
      const pad = Math.max(3, Math.min(7, geo.scale * 5));
      const left = geo.imageLeft + (x - pad) * geo.scale;
      const top  = geo.imageTop  + (y - pad) * geo.scale;
      const width = (w + pad * 2) * geo.scale;
      const height = (h + pad * 2) * geo.scale;

      btn.style.left = left + 'px';
      btn.style.top = top + 'px';
      btn.style.width = width + 'px';
      btn.style.height = height + 'px';
    });
  }

  function installExactRouteHitboxes(){
    const map = document.getElementById('lumena-world-map');
    const img = map && map.querySelector('.world-map-image');
    if(!map || !img) return;

    const refresh = function(){
      if(document.body.classList.contains('world-map-full-page')){
        positionExactRouteHitboxes();
      }
    };

    if(img.complete) refresh();
    else img.addEventListener('load', refresh, {once:false});

    window.addEventListener('resize', refresh, {passive:true});
    window.addEventListener('orientationchange', function(){
      setTimeout(refresh, 50);
      setTimeout(refresh, 250);
    }, {passive:true});

    /*
      ResizeObserver catches mobile browser viewport changes, including
      address-bar expansion/collapse, which resize alone can miss.
    */
    if(window.ResizeObserver){
      const ro = new ResizeObserver(refresh);
      ro.observe(map);
      ro.observe(img);
    }

    const toggle = document.getElementById('world-map-toggle');
    if(toggle){
      toggle.addEventListener('click', function(){
        setTimeout(refresh, 0);
        setTimeout(refresh, 100);
        setTimeout(refresh, 350);
      }, {passive:true});
    }

    /* Reposition once more after fonts/layout have settled. */
    setTimeout(refresh, 100);
    setTimeout(refresh, 500);
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', installExactRouteHitboxes);
  }else{
    installExactRouteHitboxes();
  }
})();
