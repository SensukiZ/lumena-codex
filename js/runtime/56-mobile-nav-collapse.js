(function(){
  'use strict';
  if(window.__mobileNavCollapseInstalled) return;
  window.__mobileNavCollapseInstalled=true;

  function install(){
    if(document.getElementById('mobile-nav-collapse-toggle')) return;

    var button=document.createElement('button');
    button.id='mobile-nav-collapse-toggle';
    button.type='button';
    button.setAttribute('aria-controls','codex-app-nav');
    document.body.appendChild(button);

    function connectNavigation(){
      var nav=document.getElementById('codex-app-nav');
      if(!nav) return false;
      function measure(){
        var height=Math.ceil(nav.getBoundingClientRect().height || 72);
        document.documentElement.style.setProperty('--mobile-nav-height',height+'px');
      }
      measure();
      if('ResizeObserver' in window) new ResizeObserver(measure).observe(nav);
      window.addEventListener('resize',measure,{passive:true});
      return true;
    }

    if(!connectNavigation()){
      var attempts=0;
      var timer=setInterval(function(){
        attempts++;
        if(connectNavigation() || attempts>=100) clearInterval(timer);
      },50);
    }

    function update(collapsed){
      document.body.classList.toggle('mobile-nav-collapsed',collapsed);
      button.textContent=collapsed?'⌃':'⌄';
      button.setAttribute('aria-expanded',String(!collapsed));
      button.setAttribute('aria-label',collapsed?'Show navigation':'Hide navigation');
      button.title=collapsed?'Show navigation':'Hide navigation';
      try{sessionStorage.setItem('lumena-mobile-nav-collapsed',collapsed?'1':'0')}catch(error){}
    }

    var initial=false;
    try{initial=sessionStorage.getItem('lumena-mobile-nav-collapsed')==='1'}catch(error){}
    update(initial);
    button.addEventListener('click',function(){
      update(!document.body.classList.contains('mobile-nav-collapsed'));
    });
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',install,{once:true});
  else install();
})();
