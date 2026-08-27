(function(){
  function moveDetailLocations(){
    document.querySelectorAll('.detail-view').forEach(function(view){
      if(view.querySelector(':scope > .detail-location-panel')) return;

      var source=view.querySelector(':scope > .detail-head > .entry-locations');
      var grid=view.querySelector(':scope > .entry-grid');
      if(!grid) return;

      var panel=document.createElement('div');
      panel.className='panel detail-location-panel';

      var heading=document.createElement('h4');
      heading.textContent='Locations';
      panel.appendChild(heading);

      var list=document.createElement('div');
      list.className='detail-location-list';

      if(source){
        var chips=source.querySelectorAll('.entry-location-chip');
        chips.forEach(function(chip){
          var copy=chip.cloneNode(true);
          copy.className='detail-location-chip';
          list.appendChild(copy);
        });
      }

      if(!list.children.length){
        var empty=document.createElement('span');
        empty.className='detail-location-empty';
        empty.textContent='No location recorded';
        list.appendChild(empty);
      }

      panel.appendChild(list);
      grid.insertAdjacentElement('afterend',panel);
    });
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',moveDetailLocations);
  else moveDetailLocations();
})();
