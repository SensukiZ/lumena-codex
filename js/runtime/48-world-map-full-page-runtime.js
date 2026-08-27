(function(){
  function setupFullPageMap(){
    /* The rebuilt interactive map owns the World Map button. Do not attach the
       legacy full-page handler, which otherwise keeps the Codex hidden after
       Close Map or after selecting a Lumen. */
    if(typeof window.__rebuiltLumenaMapOpen==='function') return;
    const toggle=document.getElementById('world-map-toggle');
    const map=document.getElementById('lumena-world-map');
    if(!toggle || !map) return;
    let back=document.getElementById('world-map-back-btn');
    if(!back){
      back=document.createElement('button');
      back.id='world-map-back-btn';
      back.className='world-map-back-btn';
      back.type='button';
      back.textContent='← Back to Codex';
      document.body.appendChild(back);
    }
    function enter(){
      document.body.classList.add('world-map-full-page');
      map.classList.remove('collapsed');
      toggle.classList.add('active');
    }
    function exit(){
      document.body.classList.remove('world-map-full-page');
      toggle.classList.remove('active');
    }
    toggle.addEventListener('click',function(e){
      e.preventDefault();
      if(document.body.classList.contains('world-map-full-page')) exit();
      else enter();
    });
    back.addEventListener('click',exit);
    document.addEventListener('keydown',function(e){
      if(e.key==='Escape' && document.body.classList.contains('world-map-full-page')) exit();
    });
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',setupFullPageMap);
  else setupFullPageMap();
})();
