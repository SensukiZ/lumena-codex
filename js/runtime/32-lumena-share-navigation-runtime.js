(function(){
  'use strict';

  let applyingHash=false;
  let lastWrittenId='';

  function activeLumenId(){
    const d=document.querySelector('.detail-view.active[data-id]');
    return d ? String(d.dataset.id||'') : '';
  }

  function parseHash(){
    const raw=String(location.hash||'').replace(/^#/,'');
    if(!raw) return '';
    let value='';
    if(raw.indexOf('lumen=')===0) value=raw.slice(6);
    else if(raw.indexOf('lumen/')===0) value=raw.slice(6);
    else return '';
    try{ value=decodeURIComponent(value); }catch(e){}
    return value.trim();
  }

  function lumenUrl(id){
    const base=location.href.split('#')[0];
    return base+'#lumen='+encodeURIComponent(id);
  }

  function writeHash(id,replace){
    if(!id || applyingHash || lastWrittenId===id && parseHash()===id) return;
    const target='#lumen='+encodeURIComponent(id);
    lastWrittenId=id;
    if(replace) history.replaceState(null,'',target);
    else history.pushState(null,'',target);
  }

  function openLumenFromHash(){
    const id=parseHash();
    if(!id) return false;

    const item=Array.from(document.querySelectorAll('.sidebar .side-item[data-id]')).find(function(el){
      return String(el.dataset.id||'')===id;
    });
    const detail=Array.from(document.querySelectorAll('.detail-view[data-id]')).find(function(el){
      return String(el.dataset.id||'')===id;
    });
    if(!item || !detail) return false;

    applyingHash=true;
    lastWrittenId=id;

    /* Hash navigation must open the Lumen, not add it to Compare mode. */
    if(document.body.classList.contains('compare-mode')){
      const compare=document.getElementById('compare-toggle-btn');
      if(compare) compare.click();
    }

    /* Leave map mode first if a shared link is followed while the map is open. */
    if(typeof window.__rebuiltLumenaMapClose==='function'){
      window.__rebuiltLumenaMapClose();
    }

    requestAnimationFrame(function(){
      item.click();
      requestAnimationFrame(function(){
        const panel=document.getElementById('detail-panel') || document.querySelector('.detail-panel');
        if(panel) panel.scrollTop=0;
        applyingHash=false;
      });
    });
    return true;
  }

  function installShareButtons(){
    document.querySelectorAll('.detail-view[data-id]').forEach(function(view){
      const head=view.querySelector('.detail-head');
      const id=String(view.dataset.id||'');
      if(!head || !id || head.querySelector('.lumen-share-btn')) return;

      const btn=document.createElement('button');
      btn.type='button';
      btn.className='lumen-share-btn';
      btn.dataset.shareLumen=id;
      btn.title='Copy a direct link to this Lumen';
      btn.setAttribute('aria-label','Copy direct link to '+(view.querySelector('.entry-name')?.textContent?.trim()||id));
      btn.innerHTML='🔗 Copy Link';

      /* Put Share beside the favorite control when it exists. */
      const fav=head.querySelector('.favorite-star');
      if(fav) fav.insertAdjacentElement('beforebegin',btn);
      else head.appendChild(btn);
    });

    document.addEventListener('click',function(e){
      const btn=e.target.closest && e.target.closest('.lumen-share-btn[data-share-lumen]');
      if(!btn) return;
      e.preventDefault();
      e.stopPropagation();

      const id=String(btn.dataset.shareLumen||'');
      if(!id) return;
      const url=lumenUrl(id);

      function success(){
        const old=btn.innerHTML;
        btn.classList.add('copied');
        btn.textContent='✓ Link Copied';
        setTimeout(function(){
          btn.classList.remove('copied');
          btn.innerHTML=old;
        },1200);
      }

      if(navigator.clipboard && window.isSecureContext){
        navigator.clipboard.writeText(url).then(success,function(){ fallbackCopy(url,success); });
      }else{
        fallbackCopy(url,success);
      }

      /* Make the visible page URL shareable immediately too. */
      if(parseHash()!==id) writeHash(id,false);
    });

    function fallbackCopy(text,done){
      const ta=document.createElement('textarea');
      ta.value=text;
      ta.setAttribute('readonly','');
      ta.style.position='fixed';
      ta.style.left='-9999px';
      document.body.appendChild(ta);
      ta.select();
      try{ document.execCommand('copy'); done(); }catch(e){}
      ta.remove();
    }
  }

  function installHashTracking(){
    const details=Array.from(document.querySelectorAll('.detail-view[data-id]'));
    if(!details.length) return;

    const observer=new MutationObserver(function(mutations){
      if(applyingHash) return;
      let changed=false;
      mutations.forEach(function(m){
        if(m.type==='attributes' && m.attributeName==='class') changed=true;
      });
      if(!changed) return;
      const id=activeLumenId();
      if(id && document.body.classList.contains('detail-open')){
        writeHash(id,false);
      }
    });

    details.forEach(function(d){
      observer.observe(d,{attributes:true,attributeFilter:['class']});
    });

    window.addEventListener('hashchange',function(){
      if(!applyingHash) openLumenFromHash();
    });

    /* Open a shared Lumen after all older Codex runtimes finish installing. */
    setTimeout(function(){
      if(parseHash()) openLumenFromHash();
    },80);
  }

  function installNavigation(){
    const topbar=document.querySelector('.topbar');
    const searchRow=topbar && topbar.querySelector('.search-row');
    if(!topbar || !searchRow || document.getElementById('codex-app-nav')) return;

    const nav=document.createElement('nav');
    nav.id='codex-app-nav';
    nav.className='codex-app-nav';
    nav.setAttribute('aria-label','Codex tools');

    /* Codex is the default page itself, so no redundant Codex/Home tab is needed. */
    const codexBtn=null;

    /* Existing nodes are MOVED rather than cloned so every existing event
       listener and feature continues to work unchanged. */
    const mapBtn=document.getElementById('world-map-toggle');
    const teamBtn=document.getElementById('team-builder-toggle-btn');
    const movesBtn=document.getElementById('mv-tracker-toggle-btn');

    if(mapBtn){
      mapBtn.textContent='Map';
      nav.appendChild(mapBtn);
    }
    if(teamBtn) nav.appendChild(teamBtn);
    if(movesBtn) nav.appendChild(movesBtn);

    const battleGroup=document.createElement('div');
    battleGroup.className='codex-nav-group';
    battleGroup.innerHTML='<button type="button" class="codex-nav-btn battle-tools-trigger" id="battle-tools-trigger" aria-expanded="false">Battle Tools</button><div class="battle-tools-menu" id="battle-tools-menu"></div>';
    nav.appendChild(battleGroup);

    const battleMenu=battleGroup.querySelector('.battle-tools-menu');
    [
      'compare-toggle-btn',
      'leaderboard-toggle-btn',
      'counter-tracker-toggle-btn',
      'lumen-counter-toggle-btn',
      'weather-guide-toggle-btn'
    ].forEach(function(id){
      const b=document.getElementById(id);
      if(b) battleMenu.appendChild(b);
    });

    /* Favorites is created by the previous feature at DOMContentLoaded.
       Move it now; if its script runs a little later, retry briefly. */
    function attachCollection(){
      const fav=document.getElementById('favorites-toggle-btn');
      if(!fav) return false;
      fav.childNodes.forEach(function(n){
        if(n.nodeType===Node.TEXT_NODE && /My Lumens/.test(n.textContent||'')){
          n.textContent='★ Collection ';
        }
      });
      if(!nav.contains(fav)) nav.appendChild(fav);
      return true;
    }
    if(!attachCollection()){
      let tries=0;
      const timer=setInterval(function(){
        tries++;
        if(attachCollection() || tries>20) clearInterval(timer);
      },50);
    }

    searchRow.insertAdjacentElement('afterend',nav);

    const trigger=battleGroup.querySelector('#battle-tools-trigger');
    function closeBattle(){
      battleGroup.classList.remove('open');
      trigger.setAttribute('aria-expanded','false');
    }
    trigger.addEventListener('click',function(e){
      e.stopPropagation();
      const open=battleGroup.classList.toggle('open');
      trigger.setAttribute('aria-expanded',open?'true':'false');
    });
    battleMenu.addEventListener('click',function(e){
      if(e.target.closest('button')) setTimeout(closeBattle,0);
    });
    document.addEventListener('click',function(e){
      if(!battleGroup.contains(e.target)) closeBattle();
    });
    document.addEventListener('keydown',function(e){
      if(e.key==='Escape') closeBattle();
    });

    if(mapBtn) mapBtn.addEventListener('click',function(){
      if(codexBtn) codexBtn.classList.remove('active');
      closeBattle();
    });
    if(teamBtn) teamBtn.addEventListener('click',function(){
      if(codexBtn) codexBtn.classList.remove('active');
      closeBattle();
    });
    if(movesBtn) movesBtn.addEventListener('click',function(){
      if(codexBtn) codexBtn.classList.remove('active');
      closeBattle();
    });
    battleMenu.addEventListener('click',function(){
      if(codexBtn) codexBtn.classList.remove('active');
    });

    nav.addEventListener('click',function(e){
      if(e.target.closest('#favorites-toggle-btn') && codexBtn) codexBtn.classList.remove('active');
    });
  }

  function install(){
    /* Delay one task so Feature 5 can create its Collection button first. */
    setTimeout(function(){
      installShareButtons();
      installHashTracking();
      installNavigation();
    },0);
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',install,{once:true});
  else install();
})();
