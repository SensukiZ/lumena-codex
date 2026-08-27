(function(){
  function clean(){
    var ui=document.getElementById("rebuilt-map-ui");
    if(!ui) return;
    ui.querySelectorAll(".rebuilt-route-cover,.rebuilt-type-cover,.rebuilt-map-footer").forEach(function(n){
      n.remove();
    });
  }
  if(document.readyState==="loading"){
    document.addEventListener("DOMContentLoaded",function(){
      clean(); setTimeout(clean,100); setTimeout(clean,500);
    },{once:true});
  }else{
    clean(); setTimeout(clean,100); setTimeout(clean,500);
  }
})();
