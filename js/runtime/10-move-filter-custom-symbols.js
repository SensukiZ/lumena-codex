(function(){
  const mt = document.getElementById('mv-type-filter');
  const mc = document.getElementById('mv-category-filter');
  if(!mt || !mc) return;

  /* The actual type artwork is supplied by the existing .type-chip::before CSS.
     We reuse a tiny .type-chip element in the custom dropdown rather than
     replacing the icon with an emoji. */
  const MOVE_TYPE_COLORS = {
    Normal:'#B9B6A9', Fire:'#E8703A', Water:'#4E9BD9', Electric:'#E0BE3C',
    Grass:'#6FBE6E', Ice:'#7FD6D6', Fighting:'#C1554A', Poison:'#A45FC1',
    Ground:'#C7A15C', Flying:'#9FB6E8', Psychic:'#E86FA3', Bug:'#9AC13A',
    Rock:'#B0A06A', Ghost:'#8577D6', Dragon:'#6F7FE8', Dark:'#8A8896',
    Steel:'#9FB0BF', Fairy:'#E896C7'
  };
  const categorySymbols = {physical:'⚔', special:'✦', status:'◇'};
  const categoryColors = {physical:'#C89D6D', special:'#E982AD', status:'#B9C5D2'};

  function iconForType(name){
    const span=document.createElement('span');
    span.className='type-chip small filter-option-symbol type-symbol';
    span.style.minWidth='11px';
    span.style.width='11px';
    span.style.height='11px';
    span.style.padding='0';
    span.style.border='0';
    span.style.background='transparent';
    span.style.boxShadow='none';
    span.style.setProperty('--tc', MOVE_TYPE_COLORS[name] || '#777');
    span.setAttribute('aria-hidden','true');
    return span;
  }

  function makeMoveFilter(native, kind){
    if(native.dataset.customMoveFilter==='1') return;
    native.dataset.customMoveFilter='1';
    native.classList.add('filter-select-native');
    const wrap=document.createElement('div');
    wrap.className='filter-select-custom mv-filter-custom';
    wrap.dataset.kind=kind;
    const trigger=document.createElement('button');
    trigger.type='button'; trigger.className='filter-select-trigger';
    trigger.innerHTML='<span class="filter-select-label-wrap"><span class="filter-trigger-symbol"></span><span class="filter-select-label"></span></span><span class="filter-arrow">⌄</span>';
    const menu=document.createElement('div'); menu.className='filter-select-menu';
    wrap.appendChild(trigger); wrap.appendChild(menu);
    native.parentNode.insertBefore(wrap,native);

    function render(){
      menu.innerHTML='';
      Array.from(native.options).forEach(function(opt){
        const key=opt.value;
        const b=document.createElement('button');
        b.type='button'; b.className='filter-select-option'; b.dataset.value=key;
        let sym=null;
        if(kind==='type' && key){
          sym=iconForType(key);
          sym.classList.add('filter-option-symbol');
        }else if(kind==='category' && key){
          sym=document.createElement('span');
          sym.className='filter-option-symbol cat-symbol cat-'+key;
          sym.textContent=categorySymbols[key] || '';
          sym.setAttribute('aria-hidden','true');
        }
        if(sym) b.appendChild(sym);
        b.appendChild(document.createTextNode(opt.textContent));
        const c = kind==='type' ? (MOVE_TYPE_COLORS[key]||'#fff') : (categoryColors[key]||'#fff');
        b.style.background = key ? (kind==='type' ? c : categoryColors[key]) : '#0F1830';
        b.style.color='#fff';
        if(opt.selected) b.classList.add('selected');
        b.addEventListener('click',function(e){
          e.stopPropagation();
          native.value=key;
          native.dispatchEvent(new Event('change',{bubbles:true}));
          wrap.classList.remove('open');
          render();
        });
        menu.appendChild(b);
      });
      const opt=native.options[native.selectedIndex];
      const key=native.value;
      const old=trigger.querySelector('.filter-trigger-symbol');
      old.className='filter-trigger-symbol';
      old.textContent='';
      if(key && kind==='type'){
        const icon=iconForType(key);
        icon.classList.add('filter-trigger-symbol','type-symbol');
        old.replaceWith(icon);
      }else if(key && kind==='category'){
        old.classList.add('cat-symbol','cat-'+key);
        old.textContent=categorySymbols[key] || '';
      }
      trigger.querySelector('.filter-select-label').textContent=opt ? opt.textContent : '';
      trigger.classList.toggle('has-value',!!key);
      trigger.style.background=key ? (kind==='type' ? (MOVE_TYPE_COLORS[key]||'#0F1830') : (categoryColors[key]||'#0F1830')) : 'var(--panel)';
      trigger.style.borderColor=key ? 'rgba(255,255,255,.9)' : 'var(--line)';
    }
    trigger.addEventListener('click',function(e){
      e.stopPropagation();
      document.querySelectorAll('.filter-select-custom.open').forEach(function(x){if(x!==wrap)x.classList.remove('open');});
      wrap.classList.toggle('open');
    });
    native.addEventListener('change',render);

    /* Keep the custom menu synchronized when the underlying native select
       is populated after this custom control is created. */
    if(window.MutationObserver){
      const observer = new MutationObserver(function(){
        render();
      });
      observer.observe(native, { childList:true, subtree:true });
    }

    render();
  }

  makeMoveFilter(mt,'type');
  makeMoveFilter(mc,'category');
  document.addEventListener('click',function(){
    document.querySelectorAll('.mv-filter-custom.open').forEach(function(x){x.classList.remove('open');});
  });
})();
