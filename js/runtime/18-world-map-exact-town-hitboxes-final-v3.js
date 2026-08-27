(function(){
  /* Exact clickable boxes in the original 1402 x 1122 map artwork.
     Only the towns/cities the user currently uses as fishing locations are
     included. Firstlight already has its own exact .map-route hitbox. */
  const townBoxes={
    "Bloomvale":        [228,625,118,72],
    "Tidemarsh":        [594,704,132,72],
    "Frostpeak":        [650,132,104,70],
    "Spark Metropolis": [637,454,150,78],
    "Prismgate":        [1015,392,120,76],
    "Shadeholt":        [1214,376,124,76]
  };

  function geometry(){
    const canvas=document.getElementById('world-map-canvas');
    const img=canvas && canvas.querySelector('.world-map-image');
    if(!canvas || !img || !img.naturalWidth || !img.naturalHeight) return null;
    const cr=canvas.getBoundingClientRect();
    const ir=img.getBoundingClientRect();
    const scale=Math.min(ir.width/img.naturalWidth,ir.height/img.naturalHeight);
    const rw=img.naturalWidth*scale, rh=img.naturalHeight*scale;
    return {
      canvas, scale,
      left:(ir.left-cr.left)+(ir.width-rw)/2,
      top:(ir.top-cr.top)+(ir.height-rh)/2
    };
  }

  function ensureButtons(){
    const canvas=document.getElementById('world-map-canvas');
    if(!canvas) return;
    Object.keys(townBoxes).forEach(function(name){
      let b=canvas.querySelector('.map-town-hitbox[data-location="'+name+'"]');
      if(!b){
        b=document.createElement('button');
        b.type='button';
        b.className='map-town-hitbox';
        b.dataset.location=name;
        b.setAttribute('aria-label',name);
        b.title=name;
        canvas.appendChild(b);
      }
    });
  }

  function position(){
    ensureButtons();
    const g=geometry();
    if(!g) return;
    document.querySelectorAll('#lumena-world-map .map-town-hitbox').forEach(function(b){
      const box=townBoxes[b.dataset.location];
      if(!box) return;
      const x=box[0],y=box[1],w=box[2],h=box[3];
      b.style.left=(g.left+x*g.scale)+'px';
      b.style.top=(g.top+y*g.scale)+'px';
      b.style.width=(w*g.scale)+'px';
      b.style.height=(h*g.scale)+'px';
    });
  }

  function openLocation(name){
    if(typeof window.__lumenaOpenRoute==='function'){
      document.querySelectorAll('#lumena-world-map .map-town-hitbox').forEach(function(b){
        b.classList.toggle('active',b.dataset.location===name);
      });
      window.__lumenaOpenRoute(name);
    }
  }

  function install(){
    ensureButtons();
    position();
    const map=document.getElementById('lumena-world-map');
    const img=map && map.querySelector('.world-map-image');
    if(!map || !img) return;

    /* Capture town clicks before any older map listener can reinterpret them. */
    window.addEventListener('click',function(e){
      if(!document.body.classList.contains('world-map-full-page')) return;
      const b=e.target && e.target.closest ? e.target.closest('#lumena-world-map .map-town-hitbox') : null;
      if(!b) return;
      e.preventDefault();
      e.stopImmediatePropagation();
      openLocation(b.dataset.location);
    },true);

    window.addEventListener('pointerup',function(e){
      if(e.pointerType!=='touch' || !document.body.classList.contains('world-map-full-page')) return;
      const b=e.target && e.target.closest ? e.target.closest('#lumena-world-map .map-town-hitbox') : null;
      if(!b) return;
      e.preventDefault();
      e.stopImmediatePropagation();
      openLocation(b.dataset.location);
    },true);

    if(img.complete) position(); else img.addEventListener('load',position);
    window.addEventListener('resize',position,{passive:true});
    window.addEventListener('orientationchange',function(){setTimeout(position,80);setTimeout(position,300);},{passive:true});
    if(window.ResizeObserver){
      const ro=new ResizeObserver(position); ro.observe(map); ro.observe(img);
    }
    const toggle=document.getElementById('world-map-toggle');
    if(toggle) toggle.addEventListener('click',function(){setTimeout(position,0);setTimeout(position,120);setTimeout(position,350);},{passive:true});
    setTimeout(position,100); setTimeout(position,500);
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',install,{once:true});
  else install();
})();
