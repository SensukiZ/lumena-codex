(function(){
 function install(){
  var map=document.getElementById('lumena-world-map'); if(!map||map.dataset.directTextClicks==='1')return;
  map.dataset.directTextClicks='1';
  map.addEventListener('click',function(e){
   if(!document.body.classList.contains('world-map-full-page'))return;
   var el=e.target.closest&&e.target.closest('.map-route,.map-town-hitbox'); if(!el||!map.contains(el))return;
   var name=el.dataset.route||el.dataset.location; if(!name||typeof window.__lumenaOpenRoute!=='function')return;
   e.preventDefault(); e.stopPropagation(); window.__lumenaOpenRoute(name);
  });
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();
})();
