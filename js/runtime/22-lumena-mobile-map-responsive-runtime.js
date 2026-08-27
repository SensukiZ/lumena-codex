(function(){
  function lockMapGeometry(){
    const wrap=document.getElementById("rebuilt-map-image-wrap");
    const img=document.getElementById("rebuilt-map-image");
    const svg=document.getElementById("rebuilt-map-hotspots");
    if(!wrap || !img || !svg) return;

    /* Keep image + SVG bound to exactly the same rendered rectangle. */
    wrap.style.setProperty("aspect-ratio","3 / 2","important");
    img.style.setProperty("inset","0","important");
    img.style.setProperty("width","100%","important");
    img.style.setProperty("height","100%","important");
    svg.style.setProperty("inset","0","important");
    svg.style.setProperty("width","100%","important");
    svg.style.setProperty("height","100%","important");

    /* Ensure the coordinate system never changes. */
    svg.setAttribute("viewBox","0 0 1536 1024");
    svg.setAttribute("preserveAspectRatio","none");
  }

  function installResponsiveLock(){
    lockMapGeometry();

    window.addEventListener("resize",lockMapGeometry,{passive:true});
    window.addEventListener("orientationchange",function(){
      setTimeout(lockMapGeometry,50);
      setTimeout(lockMapGeometry,250);
    },{passive:true});

    const wrap=document.getElementById("rebuilt-map-image-wrap");
    if(wrap && window.ResizeObserver){
      const ro=new ResizeObserver(lockMapGeometry);
      ro.observe(wrap);
    }

    /* Re-lock after a location panel opens/closes, so the map never shifts. */
    document.addEventListener("click",function(e){
      if(e.target.closest && (
        e.target.closest("#rebuilt-map-hotspots .map-dot") ||
        e.target.closest(".rebuilt-location-x")
      )){
        requestAnimationFrame(lockMapGeometry);
        setTimeout(lockMapGeometry,100);
      }
    },true);
  }

  if(document.readyState==="loading"){
    document.addEventListener("DOMContentLoaded",installResponsiveLock,{once:true});
  }else{
    installResponsiveLock();
  }
})();
