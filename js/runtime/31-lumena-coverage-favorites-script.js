(function(){
  'use strict';

  const TYPES=['Normal','Fire','Water','Electric','Grass','Ice','Fighting','Poison','Ground','Flying','Psychic','Bug','Rock','Ghost','Dragon','Dark','Steel','Fairy'];
  const COLORS={
    Normal:'#B9B6A9',Fire:'#E8703A',Water:'#4E9BD9',Electric:'#E0BE3C',
    Grass:'#6FBE6E',Ice:'#7FD6D6',Fighting:'#C1554A',Poison:'#A45FC1',
    Ground:'#C7A15C',Flying:'#9FB6E8',Psychic:'#E86FA3',Bug:'#9AC13A',
    Rock:'#B0A06A',Ghost:'#8577D6',Dragon:'#6F7FE8',Dark:'#8A8896',
    Steel:'#9FB0BF',Fairy:'#E896C7'
  };
  const FX={
    Normal:{Rock:.5,Ghost:0,Steel:.5},
    Fire:{Fire:.5,Water:.5,Grass:2,Ice:2,Bug:2,Rock:.5,Dragon:.5,Steel:2},
    Water:{Fire:2,Water:.5,Grass:.5,Ground:2,Rock:2,Dragon:.5},
    Electric:{Water:2,Electric:.5,Grass:.5,Ground:0,Flying:2,Dragon:.5},
    Grass:{Fire:.5,Water:2,Grass:.5,Poison:.5,Ground:2,Flying:.5,Bug:.5,Rock:2,Dragon:.5,Steel:.5},
    Ice:{Fire:.5,Water:.5,Grass:2,Ice:.5,Ground:2,Flying:2,Dragon:2,Steel:.5},
    Fighting:{Normal:2,Ice:2,Poison:.5,Flying:.5,Psychic:.5,Bug:.5,Rock:2,Ghost:0,Dark:2,Steel:2,Fairy:.5},
    Poison:{Grass:2,Poison:.5,Ground:.5,Rock:.5,Ghost:.5,Steel:0,Fairy:2},
    Ground:{Fire:2,Electric:2,Grass:.5,Poison:2,Flying:0,Bug:.5,Rock:2,Steel:2},
    Flying:{Electric:.5,Grass:2,Fighting:2,Bug:2,Rock:.5,Steel:.5},
    Psychic:{Fighting:2,Poison:2,Psychic:.5,Steel:.5},
    Bug:{Fire:.5,Grass:2,Fighting:.5,Poison:.5,Flying:.5,Psychic:2,Ghost:.5,Dark:2,Steel:.5,Fairy:.5},
    Rock:{Fire:2,Ice:2,Fighting:.5,Ground:.5,Flying:2,Bug:2,Steel:.5},
    Ghost:{Normal:0,Psychic:2,Ghost:2,Dark:.5},
    Dragon:{Dragon:2,Steel:.5,Fairy:0},
    Dark:{Fighting:.5,Psychic:2,Ghost:2,Dark:.5,Fairy:.5},
    Steel:{Fire:.5,Water:.5,Electric:.5,Ice:2,Rock:2,Steel:.5,Fairy:2},
    Fairy:{Fire:.5,Poison:.5,Steel:.5,Fighting:2,Dragon:2,Dark:2}
  };
  const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const mult=(a,d)=>Object.prototype.hasOwnProperty.call(FX[a]||{},d)?FX[a][d]:1;

  function install(){
    const sideItems=Array.from(document.querySelectorAll('.side-item[data-id]'));
    const detailViews=Array.from(document.querySelectorAll('.detail-view[data-id]'));
    if(!sideItems.length || !detailViews.length) return;

    /* ===== Feature 5: Favorites / My Lumens ===== */
    const STORAGE_KEY='lumenaFavorites';
    let favorites=new Set();
    try{
      const saved=JSON.parse(localStorage.getItem(STORAGE_KEY)||'[]');
      if(Array.isArray(saved)) favorites=new Set(saved.map(String));
    }catch(e){}

    const toolbar=document.querySelector('.search-row');
    let filterBtn=document.getElementById('favorites-toggle-btn');
    if(toolbar && !filterBtn){
      filterBtn=document.createElement('button');
      filterBtn.type='button';
      filterBtn.id='favorites-toggle-btn';
      filterBtn.className='favorites-toggle-btn';
      filterBtn.innerHTML='★ My Lumens <span class="favorites-toggle-count" id="favorites-toggle-count">0</span>';
      const reset=document.getElementById('clear-btn');
      if(reset && reset.parentNode===toolbar) toolbar.insertBefore(filterBtn,reset.nextSibling);
      else toolbar.appendChild(filterBtn);
    }

    function saveFavorites(){
      try{localStorage.setItem(STORAGE_KEY,JSON.stringify(Array.from(favorites)))}catch(e){}
    }
    function isFav(id){return favorites.has(String(id));}
    function starHTML(id,place){
      return '<button type="button" class="favorite-star '+(isFav(id)?'is-favorite':'')+'" data-favorite-id="'+esc(id)+'" data-favorite-place="'+place+'" aria-label="'+(isFav(id)?'Remove from My Lumens':'Add to My Lumens')+'" title="'+(isFav(id)?'Remove from My Lumens':'Add to My Lumens')+'">'+(isFav(id)?'★':'☆')+'</button>';
    }

    sideItems.forEach(item=>{
      const id=item.dataset.id;
      if(!id || item.querySelector('.favorite-star')) return;
      item.insertAdjacentHTML('beforeend',starHTML(id,'side'));
    });
    detailViews.forEach(view=>{
      const id=view.dataset.id;
      const head=view.querySelector('.detail-head');
      if(!id || !head || head.querySelector('.favorite-star')) return;
      head.insertAdjacentHTML('beforeend',starHTML(id,'detail'));
    });

    function updateFavoritesUI(){
      sideItems.forEach(item=>{
        const on=isFav(item.dataset.id);
        item.classList.toggle('lumena-favorite',on);
        const b=item.querySelector('.favorite-star');
        if(b){
          b.classList.toggle('is-favorite',on);
          b.textContent=on?'★':'☆';
          b.title=on?'Remove from My Lumens':'Add to My Lumens';
          b.setAttribute('aria-label',b.title);
        }
      });
      detailViews.forEach(view=>{
        const on=isFav(view.dataset.id);
        const b=view.querySelector('.favorite-star');
        if(b){
          b.classList.toggle('is-favorite',on);
          b.textContent=on?'★':'☆';
          b.title=on?'Remove from My Lumens':'Add to My Lumens';
          b.setAttribute('aria-label',b.title);
        }
      });
      const count=document.getElementById('favorites-toggle-count');
      if(count) count.textContent=String(favorites.size);
      if(filterBtn) filterBtn.classList.toggle('active',document.body.classList.contains('lumena-favorites-only'));
      updateFavoriteResultCount();
    }

    function updateFavoriteResultCount(){
      if(!document.body.classList.contains('lumena-favorites-only')) return;
      const visibleFavorites=sideItems.filter(item=>{
        if(!isFav(item.dataset.id)) return false;
        const inline=item.style.display;
        return inline !== 'none';
      }).length;
      const rc=document.getElementById('result-count');
      if(rc) rc.innerHTML='Showing <b>'+visibleFavorites+'</b> of <b>'+favorites.size+'</b> My Lumens';
      const nr=document.querySelector('.no-results');
      if(nr){
        nr.classList.toggle('lumena-favorites-empty',visibleFavorites===0);
        if(visibleFavorites===0) nr.textContent=favorites.size?'No favorite Lumens match the current filters.':'You have not added any Lumens to My Lumens yet.';
      }
    }

    document.addEventListener('click',function(e){
      const b=e.target.closest && e.target.closest('.favorite-star[data-favorite-id]');
      if(!b) return;
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
      const id=String(b.dataset.favoriteId||'');
      if(!id) return;
      if(isFav(id)) favorites.delete(id); else favorites.add(id);
      saveFavorites();
      updateFavoritesUI();
    },true);

    if(filterBtn){
      filterBtn.addEventListener('click',function(){
        document.body.classList.toggle('lumena-favorites-only');
        updateFavoritesUI();
      });
    }

    /* Existing search/type/location filters change inline display.
       Observe those changes only while My Lumens is active so the count stays correct. */
    const sidebar=document.querySelector('.sidebar');
    if(sidebar && window.MutationObserver){
      const mo=new MutationObserver(function(){
        if(document.body.classList.contains('lumena-favorites-only')) updateFavoriteResultCount();
      });
      mo.observe(sidebar,{subtree:true,attributes:true,attributeFilter:['style']});
    }

    updateFavoritesUI();

    /* ===== Feature 4: Move Coverage Analyzer ===== */
    function parseMoveChip(chip){
      const title=(chip.getAttribute('title')||'').trim();
      if(!title) return null;
      const first=(title.split(/\r?\n/)[0]||'').trim();
      const parts=first.split('·').map(x=>x.trim());
      if(parts.length<3) return null;
      const name=parts[0];
      const type=parts[1];
      const category=parts[2];
      if(!TYPES.includes(type)) return null;
      return {name,type,category,title};
    }

    function typeChip(type,extra,count){
      return '<span class="exact-type-wrap coverage-exact-wrap '+(extra||'')+'"><span class="type-chip small" style="--tc:'+(COLORS[type]||'#777')+'">'+esc(type)+'</span>'+(count?'<span class="exact-type-extra">×'+count+'</span>':'')+(extra&&extra.indexOf('stab')!==-1?'<span class="exact-stab-tag">STAB</span>':'')+'</span>';
    }

    function renderCoverage(view){
      if(view.querySelector('.move-coverage-panel')) return;
      const lumenTypes=(view.dataset.types||'').split(/\s+/).filter(t=>TYPES.includes(t));
      const allMoves=[];
      const seen=new Set();

      view.querySelectorAll('.move-chip').forEach(chip=>{
        const m=parseMoveChip(chip);
        if(!m) return;
        const key=m.name+'|'+m.type+'|'+m.category;
        if(seen.has(key)) return;
        seen.add(key);
        allMoves.push(m);
      });

      const damaging=allMoves.filter(m=>!/^status$/i.test(m.category));
      const counts={};
      damaging.forEach(m=>counts[m.type]=(counts[m.type]||0)+1);
      const moveTypes=TYPES.filter(t=>counts[t]);

      const covered=TYPES.filter(def=>moveTypes.some(atk=>mult(atk,def)>1));
      const gaps=TYPES.filter(def=>!covered.includes(def));
      const stabDamaging=moveTypes.filter(t=>lumenTypes.includes(t));

      const panel=document.createElement('details');
      panel.className='move-coverage-panel';
      panel.innerHTML=
        '<summary>Move Coverage Analyzer</summary>'+
        '<div class="move-coverage-body">'+
          '<p class="move-coverage-intro">Uses this Lumen’s recorded <b>Physical</b> and <b>Special</b> moves. Status moves are excluded from damage coverage.</p>'+
          '<div class="move-coverage-grid">'+
            '<div class="move-coverage-card">'+
              '<div class="move-coverage-title">Damage Move Types</div>'+
              '<div class="move-coverage-chips">'+(moveTypes.length?moveTypes.map(t=>typeChip(t,lumenTypes.includes(t)?'stab':'',counts[t])).join(''):'<span class="coverage-none">No damaging moves recorded.</span>')+'</div>'+
            '</div>'+
            '<div class="move-coverage-card">'+
              '<div class="move-coverage-title">Coverage Score</div>'+
              '<div class="coverage-score"><span class="coverage-score-number">'+covered.length+' / '+TYPES.length+'</span><span class="coverage-score-copy">single defending types can be hit super-effectively by at least one recorded damaging move.</span></div>'+
            '</div>'+
            '<div class="move-coverage-card wide">'+
              '<div class="move-coverage-title">Super-Effective Coverage</div>'+
              '<div class="move-coverage-chips">'+(covered.length?covered.map(t=>typeChip(t,'covered','')).join(''):'<span class="coverage-none">No super-effective coverage found.</span>')+'</div>'+
            '</div>'+
            '<div class="move-coverage-card wide">'+
              '<div class="move-coverage-title">Coverage Gaps</div>'+
              '<div class="move-coverage-chips">'+(gaps.length?gaps.map(t=>typeChip(t,'gap','')).join(''):'<span class="coverage-none">No single-type coverage gaps.</span>')+'</div>'+
            '</div>'+
            '<div class="move-coverage-card wide">'+
              '<div class="move-coverage-title">Notes</div>'+
              '<div class="coverage-note">'+
                (stabDamaging.length
                  ? 'STAB move types currently recorded: <b>'+stabDamaging.map(esc).join(', ')+'</b>. '
                  : 'No damaging STAB move type was detected in the recorded moves. ')+
                'Coverage is based on type effectiveness only; move power, accuracy, level learned, abilities, and dual-type opponents can change the best move in an actual battle.'+
              '</div>'+
            '</div>'+
          '</div>'+
        '</div>';

      /* Place the analyzer after the last move-related panel when possible,
         otherwise before the archivist/design note. */
      const eventHeading=Array.from(view.querySelectorAll('.panel h4')).find(h=>/Event Moves/i.test(h.textContent||''));
      const eventPanel=eventHeading && eventHeading.closest('.panel');
      const designNote=view.querySelector('.design-note');
      if(eventPanel && eventPanel.parentNode===view) eventPanel.insertAdjacentElement('afterend',panel);
      else if(designNote) designNote.insertAdjacentElement('beforebegin',panel);
      else view.appendChild(panel);
    }

    detailViews.forEach(renderCoverage);
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',install,{once:true});
  else install();
})();
