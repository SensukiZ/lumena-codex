(function(){
  function lock(){
    const wrap=document.getElementById("rebuilt-map-image-wrap");
    const img=document.getElementById("rebuilt-map-image");
    const svg=document.getElementById("rebuilt-map-hotspots");
    if(!wrap || !img || !svg) return;

    wrap.style.setProperty("aspect-ratio","3 / 2","important");
    img.style.setProperty("position","absolute","important");
    img.style.setProperty("inset","0","important");
    img.style.setProperty("width","100%","important");
    img.style.setProperty("height","100%","important");
    svg.style.setProperty("position","absolute","important");
    svg.style.setProperty("inset","0","important");
    svg.style.setProperty("width","100%","important");
    svg.style.setProperty("height","100%","important");
    svg.setAttribute("viewBox","0 0 1536 1024");
    svg.setAttribute("preserveAspectRatio","none");
  }

  function install(){
    lock();
    window.addEventListener("resize",lock,{passive:true});
    window.addEventListener("orientationchange",function(){
      setTimeout(lock,50);
      setTimeout(lock,250);
    },{passive:true});

    const wrap=document.getElementById("rebuilt-map-image-wrap");
    if(wrap && window.ResizeObserver){
      const ro=new ResizeObserver(lock);
      ro.observe(wrap);
    }

    /* Opening or closing the details panel never changes hotspot alignment. */
    document.addEventListener("click",function(e){
      if(e.target.closest && (
        e.target.closest("#rebuilt-map-hotspots .map-dot") ||
        e.target.closest(".rebuilt-location-x")
      )){
        requestAnimationFrame(lock);
        setTimeout(lock,100);
      }
    },true);
  }

  if(document.readyState==="loading"){
    document.addEventListener("DOMContentLoaded",install,{once:true});
  }else{
    install();
  }
})();
