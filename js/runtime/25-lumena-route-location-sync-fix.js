(function(){
  function syncSidebarLocations(){
    document.querySelectorAll('.sidebar .side-item[data-id]').forEach(function(item){
      var id=item.dataset.id;
      if(!id) return;
      var detail=document.querySelector('.detail-view[data-id="'+CSS.escape(id)+'"]');
      if(detail) item.dataset.locations=detail.dataset.locations || '';
    });
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',syncSidebarLocations,{once:true});
  else syncSidebarLocations();
})();
