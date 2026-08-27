(function(){
  const sideItems = Array.from(document.querySelectorAll('.side-item'));
  const detailViews = Array.from(document.querySelectorAll('.detail-view'));
  const detailById = {};
  detailViews.forEach(function(d){ detailById[d.dataset.id] = d; });

  const searchInput = document.getElementById('search');
  const rarityFilter = document.getElementById('rarity-filter');
  const typeFilter = document.getElementById('type-filter');
  const clearBtn = document.getElementById('clear-btn');
  const resultCount = document.getElementById('result-count');
  const noResults = document.getElementById('no-results');
  const detailEmpty = document.getElementById('detail-empty');
  const backBtn = document.getElementById('back-btn');
  const total = sideItems.length;

  // Canonical per-type color map, shared by the type filter dropdown, the
  // move browser's type filter, and every type chip already inline in the
  // markup (via --tc).
  const TYPE_COLORS = {
    Normal:'#B9B6A9', Fire:'#E8703A', Water:'#4E9BD9', Electric:'#E0BE3C',
    Grass:'#6FBE6E', Ice:'#7FD6D6', Fighting:'#C1554A', Poison:'#A45FC1',
    Ground:'#C7A15C', Flying:'#9FB6E8', Psychic:'#E86FA3', Bug:'#9AC13A',
    Rock:'#B0A06A', Ghost:'#8577D6', Dragon:'#6F7FE8', Dark:'#8A8896',
    Steel:'#9FB0BF', Fairy:'#E896C7'
  };

  // Same "All ___" dropdown pattern as the rarity filter, but each option
  // is tinted with its type's color so hovering/selecting it in the list
  // previews that color (Chromium/Edge honor an <option>'s own background
  // and text color as its hover/highlight state).
  function populateTypeFilter(){
    typeFilter.innerHTML = '<option value="">All Types</option>' + Object.keys(TYPE_COLORS).map(function(t){
      const c = TYPE_COLORS[t];
      const bg = {Normal:'#464D5D',Fire:'#533A3B',Water:'#274D70',Electric:'#56533A',Grass:'#294D45',Ice:'#2E5058',Fighting:'#56383F',Poison:'#4B3654',Ground:'#51452F',Flying:'#3E485F',Psychic:'#54394D',Bug:'#3D4C31',Rock:'#4A4640',Ghost:'#403B63',Dragon:'#3A4260',Dark:'#363A4D',Steel:'#3E4A5A',Fairy:'#503D55'}[t] || '#0F1830';
      return '<option value="' + t + '" style="background:' + bg + ';color:' + c + ';">' + t + '</option>';
    }).join('');
  }
  populateTypeFilter();

  typeFilter.addEventListener('change', function(){
    const t = typeFilter.value;
    typeFilter.style.setProperty('--tc', t ? TYPE_COLORS[t] : 'var(--ink-muted)');
    typeFilter.style.color = '#fff';
    typeFilter.classList.toggle('has-value', !!t);
    applyFilters();
  });

  // Same treatment for the rarity filter: colored options plus a glowing
  // border on the select once a rarity is chosen.
  const RARITY_COLORS = {
    common:'#F3F1E9', uncommon:'#6FBE6E', rare:'#4E9BD9',
    epic:'#B07FE0', legendary:'#FFD84D', mythic:'#E8853A', unique:'#E0524D'
  };
  const RARITY_LABELS = {
    common:'Common', uncommon:'Uncommon', rare:'Rare',
    epic:'Epic', legendary:'Legendary', mythic:'Mythic', unique:'Unique'
  };

  function populateRarityFilter(){
    rarityFilter.innerHTML = '<option value="">All Rarities</option>' + Object.keys(RARITY_COLORS).map(function(r){
      const c = RARITY_COLORS[r];
      const bg = {common:'#B9B6A9',uncommon:'#294D45',rare:'#274D70',epic:'#443B62',legendary:'#56533A',mythic:'#533A3B',unique:'#4D3038'}[r] || '#0F1830';
      return '<option value="' + r + '" style="background:' + bg + ';color:' + c + ';">' + RARITY_LABELS[r] + '</option>';
    }).join('');
  }
  populateRarityFilter();

  rarityFilter.addEventListener('change', function(){
    const r = rarityFilter.value;
    rarityFilter.style.setProperty('--tc', r ? RARITY_COLORS[r] : 'var(--ink-muted)');
    rarityFilter.style.color = '#fff';
    rarityFilter.classList.toggle('has-value', !!r);
    applyFilters();
  });



  /* Replace the two native main filters with deterministic custom dropdowns.
     This makes the option colors visible before/after selection on Chromium. */
  const FILTER_BG = {
    Normal:'#464D5D', Fire:'#533A3B', Water:'#274D70', Electric:'#56533A', Grass:'#294D45',
    Ice:'#2E5058', Fighting:'#56383F', Poison:'#4B3654', Ground:'#51452F', Flying:'#3E485F',
    Psychic:'#54394D', Bug:'#3D4C31', Rock:'#4A4640', Ghost:'#403B63', Dragon:'#3A4260',
    Dark:'#363A4D', Steel:'#3E4A5A', Fairy:'#503D55',
    common:'#B9B6A9', uncommon:'#294D45', rare:'#274D70', epic:'#443B62',
    legendary:'#56533A', mythic:'#533A3B', unique:'#4D3038'
  };

  function makeColoredFilter(native, colors, labels, kind){
    native.classList.add('filter-select-native');
    const wrap=document.createElement('div');
    wrap.className='filter-select-custom';
    wrap.dataset.kind=kind;
    const trigger=document.createElement('button');
    trigger.type='button'; trigger.className='filter-select-trigger';
    trigger.innerHTML='<span class="filter-select-label-wrap"><span class="filter-trigger-type-symbol" aria-hidden="true"></span><span class="filter-select-label"></span></span><span class="filter-arrow">⌄</span>';
    const menu=document.createElement('div'); menu.className='filter-select-menu';
    wrap.appendChild(trigger); wrap.appendChild(menu);
    native.parentNode.insertBefore(wrap,native);

    function render(){
      menu.innerHTML='';
      Array.from(native.options).forEach(function(opt){
        const b=document.createElement('button'); b.type='button'; b.className='filter-select-option';
        const key=opt.value;
        const c=key ? colors[key] : '#fff';
        // Match the Lumen type/rarity pills: use the actual type/rarity
        // color as the option background and white text.
        const bg=key ? c : '#0F1830';
        if(kind==='type' && key){
          const icon=document.createElement('span');
          icon.className='type-chip small type-option-symbol';
          icon.style.setProperty('--tc', c);
          icon.setAttribute('aria-hidden','true');
          b.appendChild(icon);
        }
        b.appendChild(document.createTextNode(labels[key]||opt.textContent));
        b.style.background=bg; b.style.color='#fff';
        b.style.textShadow='0 1px 1px rgba(0,0,0,.45)';
        b.dataset.value=key;
        if(opt.selected) b.classList.add('selected');
        b.addEventListener('click',function(){
          native.value=key;
          native.dispatchEvent(new Event('change',{bubbles:true}));
          wrap.classList.remove('open');
          render();
        });
        menu.appendChild(b);
      });
      const opt=native.options[native.selectedIndex];
      const key=native.value;
      const label=wrap.querySelector('.filter-select-label');
      const triggerIcon=wrap.querySelector('.filter-trigger-type-symbol');
      label.textContent=opt ? opt.textContent : '';
      trigger.classList.toggle('has-value',!!key);
      if(kind==='type' && key){
        triggerIcon.className='filter-trigger-type-symbol type-chip small';
        triggerIcon.style.setProperty('--tc', colors[key] || '#777');
      }else{
        triggerIcon.className='filter-trigger-type-symbol';
        triggerIcon.style.removeProperty('--tc');
      }
      if(key){
        trigger.style.background=colors[key]||'#0F1830';
        trigger.style.borderColor='rgba(255,255,255,.9)';
      }else{
        trigger.style.background='var(--panel)';
        trigger.style.borderColor='var(--line)';
      }
    }
    trigger.addEventListener('click',function(e){e.stopPropagation();
      document.querySelectorAll('.filter-select-custom.open').forEach(function(x){if(x!==wrap)x.classList.remove('open');});
      wrap.classList.toggle('open');
    });
    native.addEventListener('change',render);
    render();
    return wrap;
  }

  const typeLabels={}; Object.keys(TYPE_COLORS).forEach(function(x){typeLabels[x]=x;});
  const rarityLabels={common:'Common',uncommon:'Uncommon',rare:'Rare',epic:'Epic',legendary:'Legendary',mythic:'Mythic',unique:'Unique'};
  makeColoredFilter(typeFilter,TYPE_COLORS,typeLabels,'type');
  makeColoredFilter(rarityFilter,RARITY_COLORS,rarityLabels,'rarity');

  // Location filter uses the exact locations supplied for each Lumen.
  const locationFilter = document.getElementById('location-filter');
  const LOCATION_LIST = ["Firstlight Village", "Softglade Path", "Coast Route", "Quarry Road", "Ember Pass", "Marsh Route", "Snowline Rise", "Frostpeak Climb", "Glimmer Flats", "Spark Woods", "Shade Trail", "Cinderfall Tarn"];

  locationFilter.innerHTML = '<option value="">All Locations</option>' + LOCATION_LIST.map(function(loc){
    return '<option value="' + loc.replace(/"/g, '&quot;') + '">' + loc + '</option>';
  }).join('');

  (function makeLocationFilter(){
    locationFilter.classList.add('filter-select-native');
    const wrap = document.createElement('div');
    wrap.className = 'filter-select-custom location-filter-wrap';
    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'filter-select-trigger';
    trigger.innerHTML = '<span class="filter-select-label-wrap"><span class="filter-select-label"></span></span><span class="filter-arrow">⌄</span>';
    const menu = document.createElement('div');
    menu.className = 'filter-select-menu';
    wrap.appendChild(trigger);
    wrap.appendChild(menu);
    locationFilter.parentNode.insertBefore(wrap, locationFilter);

    function render(){
      menu.innerHTML = '';
      Array.from(locationFilter.options).forEach(function(opt){
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'filter-select-option';
        b.dataset.value = opt.value;
        b.textContent = opt.textContent;
        if(opt.selected) b.classList.add('selected');
        b.addEventListener('click', function(e){
          e.stopPropagation();
          locationFilter.value = opt.value;
          locationFilter.dispatchEvent(new Event('change', {bubbles:true}));
          wrap.classList.remove('open');
        });
        menu.appendChild(b);
      });
      const opt = locationFilter.options[locationFilter.selectedIndex];
      trigger.querySelector('.filter-select-label').textContent = opt ? opt.textContent : 'All Locations';
      trigger.classList.toggle('has-value', !!locationFilter.value);
      trigger.style.background = locationFilter.value ? 'rgba(94,230,199,.12)' : 'var(--panel)';
      trigger.style.borderColor = locationFilter.value ? 'rgba(94,230,199,.65)' : 'var(--line)';
    }

    trigger.addEventListener('click', function(e){
      e.stopPropagation();
      document.querySelectorAll('.filter-select-custom.open').forEach(function(x){
        if(x !== wrap) x.classList.remove('open');
      });
      wrap.classList.toggle('open');
    });
    locationFilter.addEventListener('change', function(){
      render();
      applyFilters();
    });
    render();
  })();

  document.addEventListener('click',function(){document.querySelectorAll('.filter-select-custom.open').forEach(function(x){x.classList.remove('open');});});

  function applyFilters(){
    const q = searchInput.value.trim().toLowerCase();
    const rarity = rarityFilter.value;
    const type = typeFilter.value;
    const location = locationFilter.value;
    let visible = 0;

    sideItems.forEach(function(item){
      const types = item.dataset.types.split(' ');
      const matchesSearch = !q || item.dataset.search.includes(q);
      const matchesRarity = !rarity || item.dataset.rarity.split(' ').indexOf(rarity) !== -1;
      const matchesType = !type || types.indexOf(type) !== -1;
      const itemLocations = (item.dataset.locations || '').split('|').filter(Boolean);
      const matchesLocation = !location || itemLocations.indexOf(location) !== -1;
      const show = matchesSearch && matchesRarity && matchesType && matchesLocation;
      item.style.display = show ? '' : 'none';
      if (show) visible++;
    });

    resultCount.innerHTML = 'Showing <b>' + visible + '</b> of <b>' + total + '</b> Lumen';
    noResults.style.display = visible === 0 ? 'block' : 'none';
  }

  let selectedLumenId = null;

  function updateTopbarHeight(){
    const topbar = document.querySelector('.topbar');
    if (topbar){
      document.documentElement.style.setProperty('--topbar-height', topbar.offsetHeight + 'px');
    }
  }

  updateTopbarHeight();
  window.addEventListener('resize', updateTopbarHeight);

  function updateHabitatBackground(){
    const panel = document.getElementById('detail-panel');
    const active = panel ? panel.querySelector('.detail-view.active') : null;
    const art = active ? active.querySelector('.lumena-art') : null;
    if (!panel || !art) return;
    const artStyle = window.getComputedStyle(art);
    const bg = artStyle.backgroundImage;
    if (bg && bg !== 'none'){
      panel.style.setProperty('--lumena-habitat-bg', bg);
    }
  }

  function selectLumen(id, openDetail){
    if (!detailById[id]) return;
    selectedLumenId = id;
    sideItems.forEach(function(i){ i.classList.toggle('active', i.dataset.id === id); });
    detailViews.forEach(function(d){ d.classList.toggle('active', d.dataset.id === id); });
    detailEmpty.style.display = 'none';

    // Normal Lumen clicks open the detail panel.  Callers such as the
    // Stat Leaderboard can pass false so the user is taken to the actual
    // Lumen row in the Codex list instead of being left on the detail view.
    if (openDetail !== false){
      document.body.classList.add('detail-open');
      updateHabitatBackground();
      document.getElementById('detail-panel').scrollTop = 0;
    } else {
      document.body.classList.remove('detail-open');
      const target = sideItems.find(function(i){ return i.dataset.id === id; });
      if (target){
        target.scrollIntoView({behavior:'smooth', block:'center', inline:'nearest'});
      }
    }
  }

  updateHabitatBackground();

  sideItems.forEach(function(item){
    item.addEventListener('click', function(){
      if (compareMode){ toggleCompareId(item.dataset.id); return; }
      selectLumen(item.dataset.id);
    });
  });

  /*
   * STAT COMPARISON
   *
   * Lets the user pick a handful of Lumen (from the sidebar, while
   * "Compare Stats" mode is on) and view their base stats side by side.
   * Everything is read straight from the existing detail markup, so it
   * always matches what's shown in the codex entry itself.
   */
  const STAT_ORDER = ['HP', 'Attack', 'Defense', 'Sp. Attack', 'Sp. Defense', 'Speed'];
  const MAX_COMPARE = 4;

  let compareMode = false;
  let compareIds = [];

  const compareToggleBtn = document.getElementById('compare-toggle-btn');
  const compareCountEl = document.getElementById('compare-count');
  const compareBar = document.getElementById('compare-bar');
  const compareBarCount = document.getElementById('compare-bar-count');
  const compareBarGo = document.getElementById('compare-bar-go');
  const compareBarClear = document.getElementById('compare-bar-clear');
  const compareOverlay = document.getElementById('compare-overlay');
  const compareOverlayClose = document.getElementById('compare-overlay-close');
  const compareCols = document.getElementById('compare-cols');
  const compareTableWrap = document.getElementById('compare-table-wrap');

  function readLumenStats(id){
    const view = detailById[id];
    if (!view) return null;
    const name = view.querySelector('.entry-name')?.textContent?.trim() || id;
    const img = view.querySelector('.lumena-art img')?.getAttribute('src') || '';
    const typeChips = Array.from(view.querySelectorAll('.entry-types .type-chip')).map(function(c){
      return { name: c.textContent.trim(), color: c.style.getPropertyValue('--tc') };
    });
    const statRows = Array.from(view.querySelectorAll('.entry-grid .stat-row'));
    const stats = {};
    let total = 0;
    statRows.forEach(function(row){
      const label = row.querySelector('.stat-label')?.textContent?.trim();
      const val = parseInt(row.querySelector('.stat-val')?.textContent?.trim(), 10);
      if (label && Number.isFinite(val)){
        stats[label] = val;
        total += val;
      }
    });
    return { id: id, name: name, img: img, types: typeChips, stats: stats, total: total };
  }

  function updateCompareCounters(){
    const n = compareIds.length;
    compareCountEl.textContent = String(n);
    compareCountEl.dataset.empty = n === 0 ? '1' : '0';
    compareBarCount.textContent = String(n);
    /* Show the controls as soon as comparison mode starts, even before the
       first Lumen is selected. */
    compareBar.classList.toggle('visible', compareMode || n > 0);
    compareBarGo.disabled = n < 2;
  }

  function toggleCompareId(id){
    const idx = compareIds.indexOf(id);
    const item = sideItems.find(function(i){ return i.dataset.id === id; });
    if (idx >= 0){
      compareIds.splice(idx, 1);
      if (item) item.classList.remove('compare-picked');
    } else {
      if (compareIds.length >= MAX_COMPARE){
        return;
      }
      compareIds.push(id);
      if (item) item.classList.add('compare-picked');
    }
    updateCompareCounters();
  }

  function setCompareMode(on){
    compareMode = on;
    document.body.classList.toggle('compare-mode', compareMode);
    compareToggleBtn.classList.toggle('active', compareMode);
    updateCompareCounters();
  }

  function clearCompareSelection(){
    compareIds = [];
    sideItems.forEach(function(i){ i.classList.remove('compare-picked'); });
    updateCompareCounters();
  }

  function renderCompareOverlay(){
    const lumens = compareIds.map(readLumenStats).filter(Boolean);
    if (!lumens.length){
      compareCols.innerHTML = '';
      compareTableWrap.innerHTML = '<p class="compare-empty">Pick 2–' + MAX_COMPARE + ' Lumen from the list to compare their base stats.</p>';
      return;
    }

    compareCols.style.gridTemplateColumns = 'repeat(' + lumens.length + ', 1fr)';
    compareCols.innerHTML = lumens.map(function(l){
      const typesHtml = l.types.map(function(t){
        return '<span class="chip type-chip small" style="--tc:' + t.color + '">' + t.name + '</span>';
      }).join('');
      return '' +
        '<div class="compare-card" data-id="' + l.id + '">' +
          '<button class="compare-card-remove" data-remove="' + l.id + '" type="button" title="Remove">✕</button>' +
          (l.img ? '<img src="' + l.img + '" alt="' + l.name + '" loading="lazy">' : '') +
          '<div class="compare-card-name">' + l.name + '</div>' +
          '<div class="compare-card-types">' + typesHtml + '</div>' +
          '<div class="compare-card-total">Total <b>' + l.total + '</b></div>' +
        '</div>';
    }).join('');

    let rows = STAT_ORDER.map(function(stat){
      const values = lumens.map(function(l){ return l.stats[stat] ?? 0; });
      const best = Math.max.apply(null, values);
      const cells = lumens.map(function(l){
        const v = l.stats[stat] ?? 0;
        const cls = (v === best && best > 0) ? ' class="stat-best"' : '';
        return '<td' + cls + '>' + v + '</td>';
      }).join('');
      return '<tr><td>' + stat + '</td>' + cells + '</tr>';
    }).join('');

    const totals = lumens.map(function(l){ return l.total; });
    const bestTotal = Math.max.apply(null, totals);
    const totalCells = lumens.map(function(l){
      const cls = l.total === bestTotal ? ' class="stat-best"' : '';
      return '<td' + cls + '>' + l.total + '</td>';
    }).join('');
    rows += '<tr><td><b>Total</b></td>' + totalCells + '</tr>';

    /* Put the Lumen name + thumbnail in each stat-table column.
       This makes it immediately clear which value belongs to which Lumen. */
    const headCells = lumens.map(function(l){
      const safeName = String(l.name).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
      return '<th class="compare-lumen-head">' +
        (l.img ? '<img src="' + l.img + '" alt="' + safeName + '" loading="lazy">' : '') +
        '<span>' + safeName + '</span>' +
      '</th>';
    }).join('');

    compareTableWrap.innerHTML =
      '<table class="compare-table"><thead><tr><th>Stat</th>' + headCells + '</tr></thead>' +
      '<tbody>' + rows + '</tbody></table>';
  }

  function openCompareOverlay(){
    renderCompareOverlay();
    compareOverlay.classList.add('open');
    compareOverlay.setAttribute('aria-hidden','false');
    document.body.classList.add('compare-stats-open','codex-utility-open');
  }

  function closeCompareOverlay(){
    compareOverlay.classList.remove('open');
    compareOverlay.setAttribute('aria-hidden','true');
    document.body.classList.remove('compare-stats-open');
    /* On phones, returning to the Codex should also end selection mode.
       Otherwise the fixed compare bar remains trapped behind the bottom nav. */
    if (window.matchMedia('(max-width:820px)').matches){
      clearCompareSelection();
      setCompareMode(false);
    }
    if(window.__codexViewManager && typeof window.__codexViewManager.sync==='function'){
      setTimeout(window.__codexViewManager.sync,0);
    }
  }

  compareToggleBtn.addEventListener('click', function(){
    setCompareMode(!compareMode);
  });

  compareBarGo.addEventListener('click', function(){
    if (compareIds.length >= 2) openCompareOverlay();
  });

  compareBarClear.addEventListener('click', clearCompareSelection);

  compareOverlayClose.addEventListener('click', closeCompareOverlay);
  compareOverlay.addEventListener('click', function(e){
    if (e.target === compareOverlay) closeCompareOverlay();
  });

  compareCols.addEventListener('click', function(e){
    const removeBtn = e.target.closest('[data-remove]');
    if (!removeBtn) return;
    const id = removeBtn.dataset.remove;
    toggleCompareId(id);
    if (compareIds.length < 2){
      closeCompareOverlay();
    } else {
      renderCompareOverlay();
    }
  });

  /*
   * STAT LEADERBOARD
   *
   * Pick 2-3 base stats and rank every Lumen in the codex by the
   * combined total of just those stats. Reuses readLumenStats() so
   * it always matches the numbers shown in each entry.
   */
  const MIN_LEADERBOARD_STATS = 1;
  const MAX_LEADERBOARD_STATS = 3;
  const LEADERBOARD_SIZE = Infinity;
  let leaderboardStats = [];

  const leaderboardToggleBtn = document.getElementById('leaderboard-toggle-btn');
  const leaderboardOverlay = document.getElementById('leaderboard-overlay');
  const leaderboardOverlayClose = document.getElementById('leaderboard-overlay-close');
  const statPicker = document.getElementById('stat-picker');
  const leaderboardListWrap = document.getElementById('leaderboard-list-wrap');

  statPicker.innerHTML = STAT_ORDER.map(function(stat){
    return '<button type="button" class="stat-picker-btn" data-stat="' + stat + '">' + stat + '</button>';
  }).join('');
  const statPickerButtons = Array.from(statPicker.querySelectorAll('.stat-picker-btn'));

  function toggleLeaderboardStat(stat){
    const idx = leaderboardStats.indexOf(stat);
    if (idx >= 0){
      leaderboardStats.splice(idx, 1);
    } else {
      if (leaderboardStats.length >= MAX_LEADERBOARD_STATS) return;
      leaderboardStats.push(stat);
    }
    renderLeaderboard();
  }

  function renderLeaderboard(){
    statPickerButtons.forEach(function(btn){
      const picked = leaderboardStats.indexOf(btn.dataset.stat) >= 0;
      btn.classList.toggle('active', picked);
      btn.disabled = !picked && leaderboardStats.length >= MAX_LEADERBOARD_STATS;
    });

    if (leaderboardStats.length < MIN_LEADERBOARD_STATS){
      leaderboardListWrap.innerHTML = '<p class="compare-empty">Select at least ' + MIN_LEADERBOARD_STATS + ' stats (up to ' + MAX_LEADERBOARD_STATS + ') to build the leaderboard.</p>';
      return;
    }

    const selected = STAT_ORDER.filter(function(s){ return leaderboardStats.indexOf(s) >= 0; });
    const ranked = sideItems.map(function(item){ return readLumenStats(item.dataset.id); })
      .filter(Boolean)
      .map(function(l){
        l.score = selected.reduce(function(sum, s){ return sum + (l.stats[s] || 0); }, 0);
        return l;
      })
      .sort(function(a, b){ return b.score - a.score; });

    const top = ranked.slice(0, LEADERBOARD_SIZE);
    const bestPerStat = {};
    selected.forEach(function(s){
      bestPerStat[s] = Math.max.apply(null, top.map(function(l){ return l.stats[s] || 0; }));
    });

    const headCells = selected.map(function(s){ return '<th>' + s + '</th>'; }).join('');
    const rows = top.map(function(l, idx){
      const typesHtml = l.types.map(function(t){
        return '<span class="chip type-chip small" style="--tc:' + t.color + '">' + t.name + '</span>';
      }).join('');
      const statCells = selected.map(function(s){
        const v = l.stats[s] || 0;
        const cls = (v === bestPerStat[s] && bestPerStat[s] > 0) ? ' class="stat-best"' : '';
        return '<td' + cls + '>' + v + '</td>';
      }).join('');
      return '' +
        '<tr class="leaderboard-row" data-jump="' + l.id + '">' +
          '<td class="lb-rank">#' + (idx + 1) + '</td>' +
          '<td class="lb-name-td" data-jump="' + l.id + '">' +
            '<div class="lb-name-cell">' +
              (l.img ? '<img src="' + l.img + '" alt="' + l.name + '" loading="lazy">' : '') +
              '<div class="lb-name-text"><b>' + l.name + '</b><span class="lb-types">' + typesHtml + '</span></div>' +
            '</div>' +
          '</td>' +
          statCells +
          '<td><b>' + l.score + '</b></td>' +
        '</tr>';
    }).join('');

    leaderboardListWrap.innerHTML =
      '<table class="compare-table"><thead><tr><th></th><th style="text-align:left">Lumen</th>' + headCells + '<th>Total</th></tr></thead>' +
      '<tbody>' + rows + '</tbody></table>';
  }

  function openLeaderboardOverlay(){
    renderLeaderboard();
    leaderboardOverlay.classList.add('open');
  }

  function closeLeaderboardOverlay(){
    leaderboardOverlay.classList.remove('open');
  }

  leaderboardToggleBtn.addEventListener('click', openLeaderboardOverlay);
  leaderboardOverlayClose.addEventListener('click', closeLeaderboardOverlay);
  leaderboardOverlay.addEventListener('click', function(e){
    if (e.target === leaderboardOverlay) closeLeaderboardOverlay();
  });

  statPicker.addEventListener('click', function(e){
    const btn = e.target.closest('.stat-picker-btn');
    if (!btn || btn.disabled) return;
    toggleLeaderboardStat(btn.dataset.stat);
  });

  leaderboardListWrap.addEventListener('click', function(e){
    const jumpEl = e.target.closest('[data-jump]');
    if (!jumpEl) return;

    const id = jumpEl.dataset.jump;
    const target = sideItems.find(function(item){ return item.dataset.id === id; });
    if (!target) return;

    // Stat Leaderboard is a navigation shortcut to the actual row in the
    // main Codex list. It must NEVER open the full-screen detail view.
    closeLeaderboardOverlay();
    document.body.classList.remove('detail-open');

    selectedLumenId = id;
    sideItems.forEach(function(item){
      item.classList.toggle('active', item.dataset.id === id);
    });
    detailViews.forEach(function(view){
      view.classList.toggle('active', view.dataset.id === id);
    });

    // Wait one frame so the leaderboard overlay has finished closing and
    // the sidebar is visible before scrolling to the selected row.
    requestAnimationFrame(function(){
      document.body.classList.remove('detail-open');
      target.scrollIntoView({behavior:'smooth', block:'center', inline:'nearest'});
    });
  });

  // Sensible default so the leaderboard isn't empty on first open.
  leaderboardStats = ['HP', 'Attack'];

  /*
   * MOVES BROWSER (merged)
   *
   * Single database-backed move browser that replaces the old separate
   * "TM tracker", "Level-Up tracker", and "All Moves" panels. Search or
   * filter the canonical move database (MOVE_DB), and expand any move
   * to see every Lumen that learns it -- by leveling up (with the
   * level) and/or via TM / Item -- built from one pass over the codex
   * instead of three separate, overlapping scans.
   */
  const mvTrackerToggleBtn = document.getElementById('mv-tracker-toggle-btn');
  const mvTrackerOverlay = document.getElementById('mv-tracker-overlay');
  const mvTrackerOverlayClose = document.getElementById('mv-tracker-overlay-close');
  const mvMoveSearch = document.getElementById('mv-move-search');
  const mvTypeFilter = document.getElementById('mv-type-filter');
  const mvCategoryFilter = document.getElementById('mv-category-filter');
  const mvMethodFilter = document.getElementById('mv-method-filter');
  const mvMoveList = document.getElementById('mv-move-list');
  const mvCount = document.getElementById('mv-count');

  let mvLearnIndex = null; // Map: move name -> { levelOwners:[{id,name,img,types,level}], tmOwners:[{id,name,img,types}] }

  function mvOwnerFromView(view){
    const name = view.querySelector('.entry-name')?.textContent?.trim() || view.dataset.id;
    const img = view.querySelector('.lumena-art img')?.getAttribute('src') || '';
    const types = Array.from(view.querySelectorAll('.entry-types .type-chip')).map(function(c){
      return { name: c.textContent.trim(), color: c.style.getPropertyValue('--tc') };
    });
    return { id: view.dataset.id, name: name, img: img, types: types };
  }

  function buildMoveLearnIndex(){
    const index = new Map();
    function entryFor(name){
      if (!index.has(name)) index.set(name, { levelOwners: [], tmOwners: [] });
      return index.get(name);
    }

    detailViews.forEach(function(view){
      const owner = mvOwnerFromView(view);

      const lvHeading = Array.from(view.querySelectorAll('.panel h4')).find(function(h){
        return h.textContent.trim().indexOf('Level-Up Moves') === 0;
      });
      const lvTable = lvHeading ? lvHeading.parentElement.querySelector('.learn-table') : null;
      if (lvTable){
        Array.from(lvTable.querySelectorAll('tbody tr')).forEach(function(row){
          const chip = row.querySelector('.move-chip');
          if (!chip) return;
          const lvCell = row.querySelector('.lv-col');
          const level = lvCell ? lvCell.textContent.trim() : '—';
          entryFor(chip.textContent.trim()).levelOwners.push(Object.assign({ level: level }, owner));
        });
      }

      const tmHeading = Array.from(view.querySelectorAll('.panel h4')).find(function(h){
        return h.textContent.trim().indexOf('TM / Item Moves') === 0;
      });
      const tmChipRow = tmHeading ? tmHeading.parentElement.querySelector('.chip-row') : null;
      if (tmChipRow){
        Array.from(tmChipRow.querySelectorAll('.move-chip')).forEach(function(chip){
          entryFor(chip.textContent.trim()).tmOwners.push(owner);
        });
      }
    });

    return index;
  }

  // Same "All ___" dropdown pattern as the rarity filter, populated from the
  // move database's own types so it stays in sync with one source of truth.
  function populateMvTypeFilter(){
    mvTypeFilter.innerHTML = '<option value="">All Types</option>' + Object.keys(TYPE_COLORS).map(function(t){
      return '<option value="' + t + '">' + t + '</option>';
    }).join('');
  }

  function formatMvEffect(effect){
    if (!effect) return '';
    return Object.keys(effect).map(function(k){
      const v = effect[k];
      const label = k.replace(/_/g, ' ');
      if (v === true) return label;
      if (v && typeof v === 'object') return label + ': ' + JSON.stringify(v);
      return label + ': ' + v;
    }).join(' · ');
  }

  function mvOwnerCard(o, level){
    const typesHtml = o.types.map(function(t){
      return '<span class="chip type-chip small" style="--tc:' + t.color + '">' + t.name + '</span>';
    }).join('');
    return '<div class="mv-owner-card" data-jump="' + o.id + '">' +
      (o.img ? '<img src="' + o.img + '" alt="' + o.name + '" loading="lazy">' : '') +
      '<div class="mv-owner-text"><b>' + o.name + '</b>' +
      (level ? '<span class="mv-owner-lv">Lv. ' + level + '</span>' : '<span class="mv-owner-lv mv-owner-tm">TM / Item</span>') +
      '<span class="mv-owner-types">' + typesHtml + '</span></div>' +
    '</div>';
  }

  function renderMvMoveList(){
    const q = mvMoveSearch.value.trim().toLowerCase();
    const typeVal = mvTypeFilter.value;
    const catVal = mvCategoryFilter.value;
    const methodVal = mvMethodFilter.value;

    const filtered = ALL_MOVES.filter(function(m){
      const learn = mvLearnIndex.get(m.name);
      const matchesQ = !q || m.name.toLowerCase().indexOf(q) >= 0 || (m.description || '').toLowerCase().indexOf(q) >= 0;
      const matchesType = !typeVal || m.type === typeVal;
      const matchesCat = !catVal || m.category === catVal;
      const matchesMethod = !methodVal ||
        (methodVal === 'levelup' && learn && learn.levelOwners.length) ||
        (methodVal === 'tm' && learn && learn.tmOwners.length);
      return matchesQ && matchesType && matchesCat && matchesMethod;
    });

    mvCount.innerHTML = 'Showing <b>' + filtered.length + '</b> of <b>' + ALL_MOVES.length + '</b> moves';

    if (filtered.length === 0){
      mvMoveList.innerHTML = '<p class="mv-move-empty">No moves match that search.</p>';
      return;
    }

    mvMoveList.innerHTML = filtered.map(function(m){
      const color = TYPE_COLORS[m.type] || '#999';
      const power = m.power === null || m.power === undefined ? '—' : m.power;
      const acc = m.accuracy === null || m.accuracy === undefined ? '—' : m.accuracy;
      const effectText = formatMvEffect(m.effect);
      const learn = mvLearnIndex.get(m.name) || { levelOwners: [], tmOwners: [] };
      const lvOwners = learn.levelOwners.slice().sort(function(a, b){
        const la = parseInt(a.level, 10), lb = parseInt(b.level, 10);
        if (Number.isFinite(la) && Number.isFinite(lb) && la !== lb) return la - lb;
        return a.name.localeCompare(b.name);
      });
      const tmOwners = learn.tmOwners.slice().sort(function(a, b){ return a.name.localeCompare(b.name); });
      const totalOwners = lvOwners.length + tmOwners.length;

      const learnersHtml = totalOwners === 0
        ? '<p class="mv-move-empty">Not learned by any codex entry yet.</p>'
        : '<details class="mv-learners">' +
            '<summary>Learned by <b>' + totalOwners + '</b> Lumen' +
              (lvOwners.length ? ' · <span class="mv-badge-lv">Level-Up ' + lvOwners.length + '</span>' : '') +
              (tmOwners.length ? ' · <span class="mv-badge-tm">TM / Item ' + tmOwners.length + '</span>' : '') +
            '</summary>' +
            '<div class="mv-owner-grid">' +
              lvOwners.map(function(o){ return mvOwnerCard(o, o.level); }).join('') +
              tmOwners.map(function(o){ return mvOwnerCard(o, null); }).join('') +
            '</div>' +
          '</details>';

      return '<div class="mv-move-card" style="--tc:' + color + '">' +
        '<div class="mv-move-head">' +
          '<span class="mv-move-name">' + m.name + '</span>' +
          '<span class="mv-move-tags">' +
            '<span class="mv-type-chip" style="--tc:' + color + '">' + m.type + '</span>' +
            '<span class="mv-tag-divider" aria-hidden="true"></span>' +
            '<span class="mv-cat-chip category-' + String(m.category || '').toLowerCase() + '"><span class="mv-cat-icon">' + (String(m.category || '').toLowerCase() === 'physical' ? '⚔' : String(m.category || '').toLowerCase() === 'special' ? '✦' : '◇') + '</span>' + m.category + '</span>' +
          '</span>' +
        '</div>' +
        '<div class="mv-move-stats">' +
          '<span>Pow ' + power + '</span>' +
          '<span>Acc ' + acc + '</span>' +
          '<span>PP ' + m.pp + '</span>' +
          (effectText ? '<span>' + effectText + '</span>' : '') +
        '</div>' +
        '<div class="mv-move-desc">' + (m.description || '') + '</div>' +
        learnersHtml +
      '</div>';
    }).join('');
  }

  function openMvTrackerOverlay(){
    if (!mvLearnIndex) mvLearnIndex = buildMoveLearnIndex();
    if (!mvTypeFilter.options.length || mvTypeFilter.options.length === 1){
      populateMvTypeFilter();
    }
    renderMvMoveList();
    mvTrackerOverlay.classList.add('open');
  }

  function closeMvTrackerOverlay(){
    mvTrackerOverlay.classList.remove('open');
  }

  mvTrackerToggleBtn.addEventListener('click', openMvTrackerOverlay);
  mvTrackerOverlayClose.addEventListener('click', closeMvTrackerOverlay);
  mvTrackerOverlay.addEventListener('click', function(e){
    if (e.target === mvTrackerOverlay) closeMvTrackerOverlay();
  });
  mvMoveSearch.addEventListener('input', renderMvMoveList);
  mvTypeFilter.addEventListener('change', renderMvMoveList);
  mvCategoryFilter.addEventListener('change', renderMvMoveList);
  mvMethodFilter.addEventListener('change', renderMvMoveList);
  mvMoveList.addEventListener('click', function(e){
    const card = e.target.closest('[data-jump]');
    if (!card) return;
    selectLumen(card.dataset.jump);
    closeMvTrackerOverlay();
  });

  const MOVE_DB = {
    moves: [{
        id: `struggle`,
        name: `Struggle`,
        type: `Normal`,
        category: `physical`,
        power: 50,
        accuracy: null,
        pp: 1,
        effect: {
            typeless_damage: !0,
            recoil_max_hp: .25
        },
        description: `A desperate neutral attack used only when no learned move can be selected. It costs one quarter of the Lumen's maximum HP.`,
        cooldown_ms: 3e3
    }, {
        id: `tiny_tackle`,
        name: `Tiny Tackle`,
        type: `Normal`,
        category: `physical`,
        power: 40,
        accuracy: 100,
        pp: 25,
        effect: null,
        description: `A simple body charge used by many young creatures.`,
        cooldown_ms: 2900
    }, {
        id: `quick_nudge`,
        name: `Quick Nudge`,
        type: `Normal`,
        category: `physical`,
        power: 35,
        accuracy: 100,
        pp: 25,
        effect: {
            priority: 1
        },
        description: `Your Lumen moves first with a fast little strike.`,
        cooldown_ms: 2300
    }, {
        id: `wild_scratch`,
        name: `Wild Scratch`,
        type: `Normal`,
        category: `physical`,
        power: 45,
        accuracy: 100,
        pp: 25,
        effect: null,
        description: `Your Lumen attacks with small claws or sharp paws.`,
        cooldown_ms: 3e3
    }, {
        id: `head_bonk`,
        name: `Head Bonk`,
        type: `Normal`,
        category: `physical`,
        power: 60,
        accuracy: 95,
        pp: 15,
        effect: {
            chance: 20,
            target_status: `flinch`
        },
        description: `A blunt headbutt that may make the opposing Lumen flinch.`,
        cooldown_ms: 3200
    }, {
        id: `heavy_slam`,
        name: `Heavy Slam`,
        type: `Normal`,
        category: `physical`,
        power: 85,
        accuracy: 90,
        pp: 10,
        effect: null,
        description: `Your Lumen throws its full weight into the opposing Lumen.`,
        cooldown_ms: 3800
    }, {
        id: `last_stand`,
        name: `Last Stand`,
        type: `Normal`,
        category: `physical`,
        power: null,
        accuracy: 100,
        pp: 10,
        effect: {
            variable_power: `Power increases as your Lumen's HP gets lower.`
        },
        description: `A desperate attack that grows stronger when your Lumen is weakened.`,
        cooldown_ms: 3600
    }, {
        id: `friendly_charge`,
        name: `Friendly Charge`,
        type: `Normal`,
        category: `physical`,
        power: null,
        accuracy: 100,
        pp: 20,
        effect: {
            variable_power: `Power increases as your Lumen's HP gets lower.`
        },
        description: `A loyal charge that becomes fiercer when your Lumen is cornered.`,
        cooldown_ms: 3600
    }, {
        id: `focus_pose`,
        name: `Focus Pose`,
        type: `Normal`,
        category: `status`,
        power: null,
        accuracy: null,
        pp: 30,
        effect: {
            user_stat_changes: {
                attack: 1
            }
        },
        description: `Your Lumen focuses and raises its Attack.`,
        cooldown_ms: 5e3
    }, {
        id: `guard_curl`,
        name: `Guard Curl`,
        type: `Normal`,
        category: `status`,
        power: null,
        accuracy: null,
        pp: 35,
        effect: {
            user_stat_changes: {
                defense: 1
            }
        },
        description: `Your Lumen curls up and raises its Defense.`,
        cooldown_ms: 5e3
    }, {
        id: `mocking_chirp`,
        name: `Mocking Chirp`,
        type: `Normal`,
        category: `status`,
        power: null,
        accuracy: 100,
        pp: 20,
        effect: {
            target_stat_changes: {
                attack: -1
            }
        },
        description: `A teasing call that lowers the opposing Lumen's Attack.`,
        cooldown_ms: 5e3
    }, {
        id: `ember_nip`,
        name: `Ember Nip`,
        type: `Fire`,
        category: `special`,
        power: 40,
        accuracy: 100,
        pp: 25,
        effect: {
            chance: 10,
            target_status: `burn`
        },
        description: `A small flame bite that may burn the opposing Lumen.`,
        cooldown_ms: 2900
    }, {
        id: `candle_flicker`,
        name: `Candle Flicker`,
        type: `Fire`,
        category: `special`,
        power: 50,
        accuracy: 100,
        pp: 20,
        effect: {
            chance: 20,
            target_stat_changes: {
                accuracy: -1
            }
        },
        description: `A flickering burst of flame that may disturb the opposing Lumen's aim.`,
        cooldown_ms: 3100
    }, {
        id: `flame_dash`,
        name: `Flame Dash`,
        type: `Fire`,
        category: `physical`,
        power: 60,
        accuracy: 100,
        pp: 15,
        effect: {
            chance: 10,
            target_status: `burn`
        },
        description: `Your Lumen rushes forward wrapped in flame.`,
        cooldown_ms: 3300
    }, {
        id: `blaze_fang`,
        name: `Blaze Fang`,
        type: `Fire`,
        category: `physical`,
        power: 75,
        accuracy: 95,
        pp: 15,
        effect: {
            chance: 20,
            target_status: `burn`
        },
        description: `A burning bite that may leave the opposing Lumen burned.`,
        cooldown_ms: 3600
    }, {
        id: `furnace_crash`,
        name: `Furnace Crash`,
        type: `Fire`,
        category: `physical`,
        power: 90,
        accuracy: 100,
        pp: 10,
        effect: {
            user_stat_changes: {
                defense: -1
            }
        },
        description: `Your Lumen slams forward with furnace-hot force, lowering its own Defense.`,
        cooldown_ms: 4100
    }, {
        id: `rising_flame`,
        name: `Rising Flame`,
        type: `Fire`,
        category: `special`,
        power: 70,
        accuracy: 100,
        pp: 15,
        effect: {
            chance: 20,
            user_stat_changes: {
                special_attack: 1
            }
        },
        description: `A rising flame column that may boost your Lumen's Special Attack.`,
        cooldown_ms: 3600
    }, {
        id: `heatwave_howl`,
        name: `Heatwave Howl`,
        type: `Fire`,
        category: `special`,
        power: 90,
        accuracy: 90,
        pp: 10,
        effect: {
            chance: 10,
            target_status: `burn`,
            target_scope: `all_opponents`
        },
        description: `A roaring wave of hot air that may burn all opposing Lumens.`,
        cooldown_ms: 3900
    }, {
        id: `solar_flare`,
        name: `Solar Flare`,
        type: `Fire`,
        category: `special`,
        power: 120,
        accuracy: 85,
        pp: 5,
        effect: {
            recharge: !0
        },
        description: `A massive burst of heat. Your Lumen must recover next turn.`,
        cooldown_ms: 4600
    }, {
        id: `sunny_signal`,
        name: `Sunny Signal`,
        type: `Fire`,
        category: `status`,
        power: null,
        accuracy: null,
        pp: 5,
        effect: {
            weather: `sun`,
            duration_turns: 5
        },
        description: `Summons strong sunlight for five turns.`,
        cooldown_ms: 6200
    }, {
        id: `kindle_up`,
        name: `Kindle Up`,
        type: `Fire`,
        category: `status`,
        power: null,
        accuracy: null,
        pp: 20,
        effect: {
            user_stat_changes: {
                attack: 1,
                speed: 1
            }
        },
        description: `Your Lumen heats up, raising its Attack and Speed.`,
        cooldown_ms: 5e3
    }, {
        id: `ash_veil`,
        name: `Ash Veil`,
        type: `Fire`,
        category: `status`,
        power: null,
        accuracy: 100,
        pp: 15,
        effect: {
            target_stat_changes: {
                accuracy: -1
            }
        },
        description: `Your Lumen scatters warm ash to lower the opposing Lumen's Accuracy.`,
        cooldown_ms: 5e3
    }, {
        id: `leaf_tap`,
        name: `Leaf Tap`,
        type: `Grass`,
        category: `physical`,
        power: 40,
        accuracy: 100,
        pp: 10,
        effect: null,
        description: `A simple strike using a leaf, vine, or sprout.`,
        cooldown_ms: 2900
    }, {
        id: `vine_snare`,
        name: `Vine Snare`,
        type: `Grass`,
        category: `physical`,
        power: 45,
        accuracy: 100,
        pp: 25,
        effect: {
            chance: 20,
            target_stat_changes: {
                speed: -1
            }
        },
        description: `Your Lumen lashes vines that may slow the opposing Lumen.`,
        cooldown_ms: 3e3
    }, {
        id: `seed_shot`,
        name: `Seed Shot`,
        type: `Grass`,
        category: `physical`,
        power: 20,
        accuracy: 95,
        pp: 25,
        effect: {
            multi_hit: {
                min: 2,
                max: 5
            }
        },
        description: `Shoots several hard seeds in quick succession.`,
        cooldown_ms: 2400
    }, {
        id: `bloom_burst`,
        name: `Bloom Burst`,
        type: `Grass`,
        category: `special`,
        power: 65,
        accuracy: 100,
        pp: 15,
        effect: null,
        description: `Your Lumen releases a burst of pollen and petals.`,
        cooldown_ms: 3500
    }, {
        id: `root_drain`,
        name: `Root Drain`,
        type: `Grass`,
        category: `special`,
        power: 75,
        accuracy: 100,
        pp: 10,
        effect: {
            drain: .5
        },
        description: `Drains energy from the opposing Lumen and restores half the damage dealt.`,
        cooldown_ms: 3700
    }, {
        id: `thorn_rush`,
        name: `Thorn Rush`,
        type: `Grass`,
        category: `physical`,
        power: 80,
        accuracy: 95,
        pp: 15,
        effect: {
            recoil: .25
        },
        description: `A thorn-covered charge that also hurts your Lumen a little.`,
        cooldown_ms: 3700
    }, {
        id: `ancient_grove`,
        name: `Ancient Grove`,
        type: `Grass`,
        category: `special`,
        power: 100,
        accuracy: 90,
        pp: 5,
        effect: {
            chance: 20,
            target_stat_changes: {
                special_defense: -1
            }
        },
        description: `Calls on old forest energy to strike the opposing Lumen.`,
        cooldown_ms: 4200
    }, {
        id: `sprout_guard`,
        name: `Sprout Guard`,
        type: `Grass`,
        category: `status`,
        power: null,
        accuracy: null,
        pp: 20,
        effect: {
            user_stat_changes: {
                defense: 1,
                special_defense: 1
            }
        },
        description: `Your Lumen grows protective leaves to raise both defenses.`,
        cooldown_ms: 5e3
    }, {
        id: `pollen_daze`,
        name: `Pollen Daze`,
        type: `Grass`,
        category: `status`,
        power: null,
        accuracy: 75,
        pp: 15,
        effect: {
            target_status: `sleep`
        },
        description: `A calming pollen cloud may put the opposing Lumen to sleep.`,
        cooldown_ms: 5e3
    }, {
        id: `synthesis_glow`,
        name: `Synthesis Glow`,
        type: `Grass`,
        category: `status`,
        power: null,
        accuracy: null,
        pp: 5,
        effect: {
            heal: .5,
            weather_scaling: !0
        },
        description: `Restores HP. Healing improves in sunlight and weakens in bad weather.`,
        cooldown_ms: 5e3
    }, {
        id: `bubble_bop`,
        name: `Bubble Bop`,
        type: `Water`,
        category: `special`,
        power: 40,
        accuracy: 100,
        pp: 25,
        effect: {
            chance: 10,
            target_stat_changes: {
                speed: -1
            }
        },
        description: `A playful bubble attack that may lower Speed.`,
        cooldown_ms: 2900
    }, {
        id: `water_slap`,
        name: `Water Slap`,
        type: `Water`,
        category: `physical`,
        power: 50,
        accuracy: 100,
        pp: 20,
        effect: null,
        description: `Your Lumen strikes with a water-coated tail or fin.`,
        cooldown_ms: 3100
    }, {
        id: `riptide_ram`,
        name: `Riptide Ram`,
        type: `Water`,
        category: `physical`,
        power: 85,
        accuracy: 100,
        pp: 10,
        effect: {
            chance: 20,
            target_stat_changes: {
                defense: -1
            }
        },
        description: `Your Lumen drives forward on a crushing current that may lower the opposing Lumen's Defense.`,
        cooldown_ms: 3900
    }, {
        id: `tide_pulse`,
        name: `Tide Pulse`,
        type: `Water`,
        category: `special`,
        power: 60,
        accuracy: 100,
        pp: 15,
        effect: {
            chance: 20,
            target_status: `confuse`
        },
        description: `A pulsing wave that may confuse the opposing Lumen.`,
        cooldown_ms: 3300
    }, {
        id: `jet_current`,
        name: `Jet Current`,
        type: `Water`,
        category: `special`,
        power: 70,
        accuracy: 100,
        pp: 15,
        effect: {
            priority: 1
        },
        description: `A sudden water jet that lets your Lumen strike first.`,
        cooldown_ms: 3100
    }, {
        id: `whirlpool_lock`,
        name: `Whirlpool Lock`,
        type: `Water`,
        category: `special`,
        power: 35,
        accuracy: 85,
        pp: 15,
        effect: {
            trap: {
                duration_min: 4,
                duration_max: 5,
                damage_per_turn: .125
            }
        },
        description: `Traps the opposing Lumen in a whirlpool for several turns.`,
        cooldown_ms: 2600
    }, {
        id: `tidal_wave`,
        name: `Tidal Wave`,
        type: `Water`,
        category: `special`,
        power: 90,
        accuracy: 100,
        pp: 10,
        effect: null,
        description: `A strong wave of water crashes into the opposing Lumen.`,
        cooldown_ms: 4100
    }, {
        id: `deep_surge`,
        name: `Deep Surge`,
        type: `Water`,
        category: `special`,
        power: 110,
        accuracy: 85,
        pp: 5,
        effect: {
            chance: 20,
            target_stat_changes: {
                speed: -1
            }
        },
        description: `A heavy surge from the depths that may slow the opposing Lumen.`,
        cooldown_ms: 4400
    }, {
        id: `ventburst_maelstrom`,
        name: `Ventburst Maelstrom`,
        type: `Water`,
        category: `special`,
        power: 100,
        accuracy: 90,
        pp: 5,
        effect: {
            chance: 30,
            target_status: `burn`
        },
        description: `Cindergill vents superheated trench water from its furnace gills, blasting the opposing Lumen with a scalding maelstrom that may burn.`,
        cooldown_ms: 7200
    }, {
        id: `rain_signal`,
        name: `Rain Signal`,
        type: `Water`,
        category: `status`,
        power: null,
        accuracy: null,
        pp: 5,
        effect: {
            weather: `rain`,
            duration_turns: 5
        },
        description: `Summons rain for five turns.`,
        cooldown_ms: 6200
    }, {
        id: `mist_screen`,
        name: `Mist Screen`,
        type: `Water`,
        category: `status`,
        power: null,
        accuracy: null,
        pp: 20,
        effect: {
            team_buff: {
                special_defense: 1
            },
            duration_turns: 5
        },
        description: `Creates a protective mist that helps your entire party resist special attacks.`,
        cooldown_ms: 5e3
    }, {
        id: `cleanse_splash`,
        name: `Cleanse Splash`,
        type: `Water`,
        category: `status`,
        power: null,
        accuracy: null,
        pp: 10,
        effect: {
            cleanse_status: `self`
        },
        description: `Your Lumen washes away its status condition.`,
        cooldown_ms: 5e3
    }, {
        id: `bug_bite`,
        name: `Bug Bite`,
        type: `Bug`,
        category: `physical`,
        power: 40,
        accuracy: 100,
        pp: 25,
        effect: null,
        description: `A small but reliable bite from a bug creature.`,
        cooldown_ms: 2900
    }, {
        id: `silk_trip`,
        name: `Silk Trip`,
        type: `Bug`,
        category: `status`,
        power: null,
        accuracy: 95,
        pp: 30,
        effect: {
            target_stat_changes: {
                speed: -1
            }
        },
        description: `Sticky silk slows the opposing Lumen.`,
        cooldown_ms: 5e3
    }, {
        id: `stinger_jab`,
        name: `Stinger Jab`,
        type: `Bug`,
        category: `physical`,
        power: 55,
        accuracy: 100,
        pp: 20,
        effect: {
            chance: 20,
            target_status: `poison`
        },
        description: `A sharp sting that may poison the opposing Lumen.`,
        cooldown_ms: 3200
    }, {
        id: `cocoon_brace`,
        name: `Cocoon Brace`,
        type: `Bug`,
        category: `status`,
        power: null,
        accuracy: null,
        pp: 30,
        effect: {
            user_stat_changes: {
                defense: 2
            }
        },
        description: `Your Lumen hardens its shell to sharply raise Defense.`,
        cooldown_ms: 5e3
    }, {
        id: `flutter_dust`,
        name: `Flutter Dust`,
        type: `Bug`,
        category: `special`,
        power: 60,
        accuracy: 100,
        pp: 15,
        effect: {
            chance: 30,
            target_stat_changes: {
                accuracy: -1
            }
        },
        description: `A dusting of wing powder that may lower Accuracy.`,
        cooldown_ms: 3300
    }, {
        id: `hive_rush`,
        name: `Hive Rush`,
        type: `Bug`,
        category: `physical`,
        power: 25,
        accuracy: 95,
        pp: 20,
        effect: {
            multi_hit: {
                min: 2,
                max: 5
            }
        },
        description: `A swarm of quick strikes hits multiple times.`,
        cooldown_ms: 2400
    }, {
        id: `needle_storm`,
        name: `Needle Storm`,
        type: `Bug`,
        category: `physical`,
        power: 90,
        accuracy: 85,
        pp: 10,
        effect: {
            chance: 20,
            target_status: `poison`
        },
        description: `A storm of sharp needles that may poison the opposing Lumen.`,
        cooldown_ms: 3900
    }, {
        id: `metamorph`,
        name: `Metamorph`,
        type: `Bug`,
        category: `status`,
        power: null,
        accuracy: null,
        pp: 10,
        effect: {
            user_stat_changes: {
                attack: 1,
                special_attack: 1,
                speed: 1
            }
        },
        description: `Your Lumen changes form slightly, raising its offensive stats and Speed.`,
        cooldown_ms: 5e3
    }, {
        id: `web_lock`,
        name: `Web Lock`,
        type: `Bug`,
        category: `status`,
        power: null,
        accuracy: 100,
        pp: 10,
        effect: {
            prevents_switching: !0
        },
        description: `The opposing Lumen is trapped and cannot switch out.`,
        cooldown_ms: 5e3
    }, {
        id: `wing_flick`,
        name: `Wing Flick`,
        type: `Flying`,
        category: `physical`,
        power: 40,
        accuracy: 100,
        pp: 25,
        effect: null,
        description: `A quick wing strike.`,
        cooldown_ms: 2900
    }, {
        id: `gust_spiral`,
        name: `Gust Spiral`,
        type: `Flying`,
        category: `special`,
        power: 50,
        accuracy: 100,
        pp: 20,
        effect: null,
        description: `Your Lumen whips up a small spiral of wind.`,
        cooldown_ms: 3100
    }, {
        id: `peck_dive`,
        name: `Peck Dive`,
        type: `Flying`,
        category: `physical`,
        power: 60,
        accuracy: 100,
        pp: 15,
        effect: {
            chance: 10,
            target_status: `flinch`
        },
        description: `A fast diving peck that may cause flinching.`,
        cooldown_ms: 3300
    }, {
        id: `tailwind_path`,
        name: `Tailwind Path`,
        type: `Flying`,
        category: `status`,
        power: null,
        accuracy: null,
        pp: 15,
        effect: {
            team_buff: {
                speed_multiplier: 2
            },
            duration_turns: 4
        },
        description: `A helpful wind doubles your party's Speed for a few turns.`,
        cooldown_ms: 5e3
    }, {
        id: `aero_cut`,
        name: `Aero Cut`,
        type: `Flying`,
        category: `special`,
        power: 75,
        accuracy: 95,
        pp: 15,
        effect: {
            high_crit: !0
        },
        description: `A sharp blade of air with a high critical-hit chance.`,
        cooldown_ms: 3600
    }, {
        id: `sky_drop`,
        name: `Sky Drop`,
        type: `Flying`,
        category: `physical`,
        power: 85,
        accuracy: 90,
        pp: 10,
        effect: null,
        description: `Your Lumen lifts and drops the opposing Lumen with strong aerial force.`,
        cooldown_ms: 3800
    }, {
        id: `stormcall`,
        name: `Stormcall`,
        type: `Flying`,
        category: `special`,
        power: 110,
        accuracy: 70,
        pp: 5,
        effect: {
            chance: 30,
            target_status: `confuse`
        },
        description: `A wild storm blast that may confuse the opposing Lumen.`,
        cooldown_ms: 4400
    }, {
        id: `feather_guard`,
        name: `Feather Guard`,
        type: `Flying`,
        category: `status`,
        power: null,
        accuracy: null,
        pp: 20,
        effect: {
            user_stat_changes: {
                evasion: 1
            }
        },
        description: `Your Lumen drifts lightly and raises its Evasion.`,
        cooldown_ms: 5e3
    }, {
        id: `static_nip`,
        name: `Static Nip`,
        type: `Electric`,
        category: `physical`,
        power: 40,
        accuracy: 100,
        pp: 25,
        effect: {
            chance: 10,
            target_status: `paralyze`
        },
        description: `A small electrified bite that may paralyze.`,
        cooldown_ms: 2900
    }, {
        id: `spark_pounce`,
        name: `Spark Pounce`,
        type: `Electric`,
        category: `physical`,
        power: 65,
        accuracy: 100,
        pp: 15,
        effect: {
            chance: 30,
            target_status: `paralyze`
        },
        description: `Your Lumen leaps with charged fur or scales.`,
        cooldown_ms: 3500
    }, {
        id: `arc_rush`,
        name: `Arc Rush`,
        type: `Electric`,
        category: `physical`,
        power: 85,
        accuracy: 100,
        pp: 10,
        effect: {
            chance: 10,
            target_status: `paralyze`
        },
        description: `Your Lumen surges forward wrapped in live current that may paralyze.`,
        cooldown_ms: 3900
    }, {
        id: `bolt_beam`,
        name: `Bolt Beam`,
        type: `Electric`,
        category: `special`,
        power: 90,
        accuracy: 100,
        pp: 10,
        effect: {
            chance: 10,
            target_status: `paralyze`
        },
        description: `A focused electric blast that may paralyze.`,
        cooldown_ms: 4100
    }, {
        id: `overcharge`,
        name: `Overcharge`,
        type: `Electric`,
        category: `special`,
        power: 120,
        accuracy: 85,
        pp: 5,
        effect: {
            recoil: .25
        },
        description: `A huge electric discharge that damages your Lumen too.`,
        cooldown_ms: 4600
    }, {
        id: `battery_boost`,
        name: `Battery Boost`,
        type: `Electric`,
        category: `status`,
        power: null,
        accuracy: null,
        pp: 20,
        effect: {
            user_stat_changes: {
                special_attack: 1,
                speed: 1
            }
        },
        description: `Your Lumen charges itself, raising Special Attack and Speed.`,
        cooldown_ms: 5e3
    }, {
        id: `short_circuit`,
        name: `Short Circuit`,
        type: `Electric`,
        category: `status`,
        power: null,
        accuracy: 90,
        pp: 15,
        effect: {
            target_status: `paralyze`
        },
        description: `A disruptive charge attempts to paralyze the opposing Lumen.`,
        cooldown_ms: 5e3
    }, {
        id: `mud_flick`,
        name: `Mud Flick`,
        type: `Ground`,
        category: `special`,
        power: 30,
        accuracy: 100,
        pp: 20,
        effect: {
            target_stat_changes: {
                accuracy: -1
            }
        },
        description: `Your Lumen flicks mud into the opposing Lumen's eyes.`,
        cooldown_ms: 2600
    }, {
        id: `sand_snare`,
        name: `Sand Snare`,
        type: `Ground`,
        category: `status`,
        power: null,
        accuracy: 100,
        pp: 20,
        effect: {
            target_stat_changes: {
                speed: -1
            }
        },
        description: `Your Lumen tangles the opposing Lumen in shifting sand, lowering its Speed.`,
        cooldown_ms: 4300
    }, {
        id: `earth_spike`,
        name: `Earth Spike`,
        type: `Ground`,
        category: `physical`,
        power: 75,
        accuracy: 95,
        pp: 15,
        effect: {
            chance: 30,
            target_stat_changes: {
                defense: -1
            }
        },
        description: `A jagged ground strike that can crack the opposing Lumen's Defense.`,
        cooldown_ms: 3600
    }, {
        id: `burrow_strike`,
        name: `Burrow Strike`,
        type: `Ground`,
        category: `physical`,
        power: 70,
        accuracy: 100,
        pp: 15,
        effect: {
            charge_turn: !0,
            semi_invulnerable: `underground`
        },
        description: `Your Lumen digs underground, then strikes on the next turn.`,
        cooldown_ms: 3600
    }, {
        id: `quake_step`,
        name: `Quake Step`,
        type: `Ground`,
        category: `physical`,
        power: 90,
        accuracy: 100,
        pp: 10,
        effect: {
            target_scope: `all_adjacent`,
            hits_semi_invulnerable: `underground`,
            semi_invulnerable_damage_multiplier: 2
        },
        description: `Your Lumen stomps the ground and hits all nearby Lumens.`,
        cooldown_ms: 4100
    }, {
        id: `stone_toss`,
        name: `Stone Toss`,
        type: `Rock`,
        category: `physical`,
        power: 50,
        accuracy: 90,
        pp: 20,
        effect: null,
        description: `Your Lumen hurls a small stone at the opposing Lumen.`,
        cooldown_ms: 3e3
    }, {
        id: `crystal_spike`,
        name: `Crystal Spike`,
        type: `Rock`,
        category: `physical`,
        power: 80,
        accuracy: 95,
        pp: 15,
        effect: {
            high_crit: !0
        },
        description: `A sharp crystal strike with a high critical-hit chance.`,
        cooldown_ms: 3700
    }, {
        id: `rockfall`,
        name: `Rockfall`,
        type: `Rock`,
        category: `physical`,
        power: 100,
        accuracy: 80,
        pp: 5,
        effect: {
            chance: 30,
            target_status: `flinch`
        },
        description: `Heavy stones crash down and may make the opposing Lumen flinch.`,
        cooldown_ms: 4200
    }, {
        id: `sand_signal`,
        name: `Sand Signal`,
        type: `Rock`,
        category: `status`,
        power: null,
        accuracy: null,
        pp: 10,
        effect: {
            weather: `sandstorm`,
            duration_turns: 5
        },
        description: `Summons a sandstorm for five turns.`,
        cooldown_ms: 6200
    }, {
        id: `metal_tap`,
        name: `Metal Tap`,
        type: `Steel`,
        category: `physical`,
        power: 40,
        accuracy: 100,
        pp: 25,
        effect: null,
        description: `A small metallic strike.`,
        cooldown_ms: 2900
    }, {
        id: `vault_bash`,
        name: `Vault Bash`,
        type: `Steel`,
        category: `physical`,
        power: 70,
        accuracy: 95,
        pp: 15,
        effect: {
            chance: 20,
            user_stat_changes: {
                defense: 1
            }
        },
        description: `A heavy armored hit that may raise your Lumen's Defense.`,
        cooldown_ms: 3400
    }, {
        id: `iron_snap`,
        name: `Iron Snap`,
        type: `Steel`,
        category: `physical`,
        power: 85,
        accuracy: 90,
        pp: 10,
        effect: {
            chance: 20,
            target_stat_changes: {
                defense: -1
            }
        },
        description: `A sharp metallic clamp that may lower Defense.`,
        cooldown_ms: 3800
    }, {
        id: `lock_plating`,
        name: `Lock Plating`,
        type: `Steel`,
        category: `status`,
        power: null,
        accuracy: null,
        pp: 15,
        effect: {
            user_stat_changes: {
                defense: 2
            }
        },
        description: `Your Lumen reinforces itself and sharply raises Defense.`,
        cooldown_ms: 5e3
    }, {
        id: `needle_armor`,
        name: `Needle Armor`,
        type: `Steel`,
        category: `status`,
        power: null,
        accuracy: null,
        pp: 10,
        effect: {
            contact_damage: .125,
            duration_turns: 5
        },
        description: `Covers your Lumen in sharp armor that hurts opposing Lumens on contact.`,
        cooldown_ms: 5e3
    }, {
        id: `ghost_tap`,
        name: `Ghost Tap`,
        type: `Ghost`,
        category: `special`,
        power: 40,
        accuracy: 100,
        pp: 25,
        effect: null,
        description: `A small spiritual strike.`,
        cooldown_ms: 2900
    }, {
        id: `haunt`,
        name: `Haunt`,
        type: `Ghost`,
        category: `status`,
        power: null,
        accuracy: 100,
        pp: 15,
        effect: {
            target_status: `curse`,
            damage_per_turn: .125
        },
        description: `A haunting presence slowly drains the opposing Lumen each turn.`,
        cooldown_ms: 5e3
    }, {
        id: `soul_spark`,
        name: `Soul Spark`,
        type: `Ghost`,
        category: `special`,
        power: 65,
        accuracy: 100,
        pp: 15,
        effect: {
            chance: 20,
            target_stat_changes: {
                special_defense: -1
            }
        },
        description: `A spiritual spark that may weaken special defenses.`,
        cooldown_ms: 3500
    }, {
        id: `mirror_wisp`,
        name: `Mirror Wisp`,
        type: `Ghost`,
        category: `status`,
        power: null,
        accuracy: null,
        pp: 10,
        effect: {
            copy_target_stat_changes: !0
        },
        description: `Your Lumen copies the opposing Lumen's current stat changes.`,
        cooldown_ms: 5e3
    }, {
        id: `final_echo`,
        name: `Final Echo`,
        type: `Ghost`,
        category: `status`,
        power: null,
        accuracy: null,
        pp: 5,
        effect: {
            if_user_faints_this_turn_target_faints: !0
        },
        description: `If your Lumen faints this turn, the opposing Lumen is taken down too.`,
        cooldown_ms: 5e3
    }, {
        id: `shadow_swipe`,
        name: `Shadow Swipe`,
        type: `Dark`,
        category: `physical`,
        power: 50,
        accuracy: 100,
        pp: 20,
        effect: null,
        description: `A quick swipe from your Lumen's shadow.`,
        cooldown_ms: 3100
    }, {
        id: `dark_bargain`,
        name: `Dark Bargain`,
        type: `Dark`,
        category: `status`,
        power: null,
        accuracy: null,
        pp: 10,
        effect: {
            hp_cost: .5,
            user_stat_changes: {
                attack: 2,
                special_attack: 2
            }
        },
        description: `Your Lumen sacrifices half its HP to sharply boost both offenses.`,
        cooldown_ms: 5e3
    }, {
        id: `night_bite`,
        name: `Night Bite`,
        type: `Dark`,
        category: `physical`,
        power: 80,
        accuracy: 100,
        pp: 15,
        effect: {
            chance: 20,
            target_stat_changes: {
                defense: -1
            }
        },
        description: `A dark bite that may lower Defense.`,
        cooldown_ms: 3800
    }, {
        id: `sneak_hit`,
        name: `Sneak Hit`,
        type: `Dark`,
        category: `physical`,
        power: 60,
        accuracy: null,
        pp: 15,
        effect: {
            never_misses: !0
        },
        description: `A sneaky attack that ignores Accuracy and Evasion.`,
        cooldown_ms: 3300
    }, {
        id: `mind_ping`,
        name: `Mind Ping`,
        type: `Psychic`,
        category: `special`,
        power: 50,
        accuracy: 100,
        pp: 20,
        effect: null,
        description: `A small psychic pulse.`,
        cooldown_ms: 3100
    }, {
        id: `future_ping`,
        name: `Future Ping`,
        type: `Psychic`,
        category: `special`,
        power: 120,
        accuracy: 100,
        pp: 10,
        effect: {
            delayed_damage_turns: 2
        },
        description: `Damage lands two turns after this move is used.`,
        cooldown_ms: 4800
    }, {
        id: `brain_fog`,
        name: `Brain Fog`,
        type: `Psychic`,
        category: `status`,
        power: null,
        accuracy: 100,
        pp: 20,
        effect: {
            target_status: `confuse`
        },
        description: `Clouds the opposing Lumen's thoughts and causes confusion.`,
        cooldown_ms: 5e3
    }, {
        id: `reflective_mind`,
        name: `Reflective Mind`,
        type: `Psychic`,
        category: `status`,
        power: null,
        accuracy: null,
        pp: 20,
        effect: {
            screen: `special_damage_reduction`,
            duration_turns: 5
        },
        description: `Creates a mental screen that reduces special damage.`,
        cooldown_ms: 6200
    }, {
        id: `mental_rebound`,
        name: `Mental Rebound`,
        type: `Psychic`,
        category: `special`,
        power: null,
        accuracy: 100,
        pp: 15,
        effect: {
            counter_special_damage_multiplier: 2,
            priority: -5
        },
        description: `Moves last; returns double damage after a special hit.`,
        cooldown_ms: 3600
    }, {
        id: `toxin_spit`,
        name: `Toxin Spit`,
        type: `Poison`,
        category: `special`,
        power: 40,
        accuracy: 100,
        pp: 25,
        effect: {
            chance: 30,
            target_status: `poison`
        },
        description: `A toxic spray that may poison the opposing Lumen.`,
        cooldown_ms: 2900
    }, {
        id: `venom_jab`,
        name: `Venom Jab`,
        type: `Poison`,
        category: `physical`,
        power: 70,
        accuracy: 100,
        pp: 15,
        effect: {
            chance: 30,
            target_status: `poison`
        },
        description: `A venomous strike that may poison the opposing Lumen.`,
        cooldown_ms: 3600
    }, {
        id: `corrode_bite`,
        name: `Corrode Bite`,
        type: `Poison`,
        category: `physical`,
        power: 60,
        accuracy: 100,
        pp: 15,
        effect: {
            chance: 30,
            target_stat_changes: {
                defense: -1
            }
        },
        description: `A caustic bite that can eat through the opposing Lumen's Defense.`,
        cooldown_ms: 3400
    }, {
        id: `sludge_pop`,
        name: `Sludge Pop`,
        type: `Poison`,
        category: `special`,
        power: 90,
        accuracy: 100,
        pp: 10,
        effect: {
            chance: 30,
            target_status: `poison`
        },
        description: `A bursting sludge attack that may poison the opposing Lumen.`,
        cooldown_ms: 4100
    }, {
        id: `venom_barbs`,
        name: `Venom Barbs`,
        type: `Poison`,
        category: `status`,
        power: null,
        accuracy: null,
        pp: 20,
        effect: {
            entry_hazard: `poison_barbs`
        },
        description: `Scatters toxic barbs that poison grounded Lumens entering the opposing field. Grounded Poison Lumens clear them.`,
        cooldown_ms: 5600
    }, {
        id: `toxic_cloud`,
        name: `Toxic Cloud`,
        type: `Poison`,
        category: `status`,
        power: null,
        accuracy: 90,
        pp: 10,
        effect: {
            target_status: `bad_poison`
        },
        description: `Badly poisons the opposing Lumen, increasing damage each turn.`,
        cooldown_ms: 5e3
    }, {
        id: `gleam_tap`,
        name: `Gleam Tap`,
        type: `Fairy`,
        category: `special`,
        power: 40,
        accuracy: 100,
        pp: 25,
        effect: null,
        description: `A small burst of clean light.`,
        cooldown_ms: 2900
    }, {
        id: `prism_beam`,
        name: `Prism Beam`,
        type: `Fairy`,
        category: `special`,
        power: 80,
        accuracy: 100,
        pp: 15,
        effect: {
            chance: 20,
            target_stat_changes: {
                special_defense: -1
            }
        },
        description: `A refracted beam that may lower Special Defense.`,
        cooldown_ms: 3800
    }, {
        id: `heal_glow`,
        name: `Heal Glow`,
        type: `Fairy`,
        category: `status`,
        power: null,
        accuracy: null,
        pp: 10,
        effect: {
            heal: .5
        },
        description: `Your Lumen restores half of its max HP.`,
        cooldown_ms: 5e3
    }, {
        id: `party_bell`,
        name: `Party Bell`,
        type: `Fairy`,
        category: `status`,
        power: null,
        accuracy: null,
        pp: 5,
        effect: {
            cleanse_status: `party`
        },
        description: `Clears status conditions from your entire party.`,
        cooldown_ms: 5e3
    }, {
        id: `safe_circle`,
        name: `Safe Circle`,
        type: `Fairy`,
        category: `status`,
        power: null,
        accuracy: null,
        pp: 25,
        effect: {
            team_status_immunity: !0,
            duration_turns: 5
        },
        description: `Protects your entire party from new status conditions for five turns.`,
        cooldown_ms: 5e3
    }, {
        id: `origin_pulse`,
        name: `Origin Pulse`,
        type: `Psychic`,
        category: `special`,
        power: 80,
        accuracy: 95,
        pp: 5,
        effect: {
            type_targets_weakness: !0
        },
        description: `Originu reads the opposing Lumen's pattern and shifts this pulse into the type that hurts most.`,
        cooldown_ms: 3300
    }, {
        id: `leviathan_crush`,
        name: `Leviathan Crush`,
        type: `Water`,
        category: `physical`,
        power: 150,
        accuracy: 90,
        pp: 5,
        effect: {
            recharge: !0
        },
        description: `A massive crushing wave. Your Lumen must recover next turn.`,
        cooldown_ms: 5400
    }, {
        id: `frost_tap`,
        name: `Frost Tap`,
        type: `Ice`,
        category: `special`,
        power: 40,
        accuracy: 100,
        pp: 25,
        effect: null,
        description: `A small burst of cold that chills the opposing Lumen.`,
        cooldown_ms: 2900
    }, {
        id: `snow_veil`,
        name: `Snow Veil`,
        type: `Ice`,
        category: `status`,
        power: null,
        accuracy: null,
        pp: 20,
        effect: {
            user_stat_changes: {
                evasion: 1
            }
        },
        description: `Your Lumen hides in swirling snow and raises its Evasion.`,
        cooldown_ms: 5e3
    }, {
        id: `ice_fang`,
        name: `Ice Fang`,
        type: `Ice`,
        category: `physical`,
        power: 65,
        accuracy: 95,
        pp: 15,
        effect: {
            chance: 10,
            target_status: `freeze`
        },
        description: `A cold bite that may freeze the opposing Lumen.`,
        cooldown_ms: 3300
    }, {
        id: `glacier_crash`,
        name: `Glacier Crash`,
        type: `Ice`,
        category: `physical`,
        power: 90,
        accuracy: 90,
        pp: 10,
        effect: {
            chance: 20,
            target_status: `flinch`
        },
        description: `Your Lumen slams the opposing Lumen with heavy glacial force.`,
        cooldown_ms: 3900
    }, {
        id: `crystal_freeze`,
        name: `Crystal Freeze`,
        type: `Ice`,
        category: `special`,
        power: 100,
        accuracy: 90,
        pp: 5,
        effect: {
            chance: 20,
            target_status: `freeze`
        },
        description: `Sharp cold crystals burst around the opposing Lumen and may freeze it.`,
        cooldown_ms: 4200
    }, {
        id: `blizzard_call`,
        name: `Blizzard Call`,
        type: `Ice`,
        category: `special`,
        power: 110,
        accuracy: 70,
        pp: 5,
        effect: {
            chance: 30,
            target_stat_changes: {
                speed: -1
            }
        },
        description: `Calls a fierce blizzard that may slow the opposing Lumen.`,
        cooldown_ms: 4400
    }, {
        id: `scale_swipe`,
        name: `Scale Swipe`,
        type: `Dragon`,
        category: `physical`,
        power: 45,
        accuracy: 100,
        pp: 25,
        effect: null,
        description: `A quick draconic swipe with hardened scales.`,
        cooldown_ms: 3e3
    }, {
        id: `dragon_breath`,
        name: `Dragon Breath`,
        type: `Dragon`,
        category: `special`,
        power: 60,
        accuracy: 100,
        pp: 15,
        effect: {
            chance: 20,
            target_status: `paralyze`
        },
        description: `A focused draconic breath that may paralyze the opposing Lumen.`,
        cooldown_ms: 3300
    }, {
        id: `ancient_roar`,
        name: `Ancient Roar`,
        type: `Dragon`,
        category: `status`,
        power: null,
        accuracy: 100,
        pp: 20,
        effect: {
            target_stat_changes: {
                attack: -1,
                special_attack: -1
            }
        },
        description: `An old roar that weakens the opposing Lumen's offenses.`,
        cooldown_ms: 5e3
    }, {
        id: `wyrm_coil`,
        name: `Wyrm Coil`,
        type: `Dragon`,
        category: `status`,
        power: null,
        accuracy: null,
        pp: 10,
        effect: {
            user_stat_changes: {
                attack: 1,
                defense: 1
            }
        },
        description: `Your Lumen coils with ancient strength, raising its Attack and Defense.`,
        cooldown_ms: 5e3
    }, {
        id: `mythic_claw`,
        name: `Mythic Claw`,
        type: `Dragon`,
        category: `physical`,
        power: 90,
        accuracy: 95,
        pp: 10,
        effect: {
            high_crit: !0
        },
        description: `A mythical claw strike with a high critical-hit chance.`,
        cooldown_ms: 3900
    }, {
        id: `origin_roar`,
        name: `Origin Roar`,
        type: `Dragon`,
        category: `special`,
        power: 120,
        accuracy: 85,
        pp: 5,
        effect: {
            recharge: !0
        },
        description: `A primal roar of origin energy. Your Lumen must recover next turn.`,
        cooldown_ms: 4600
    }, {
        id: `code_break`,
        name: `Code Break`,
        type: `Psychic`,
        category: `special`,
        power: 100,
        accuracy: 90,
        pp: 5,
        effect: {
            chance: 30,
            target_stat_changes: {
                special_defense: -1
            }
        },
        description: `A forbidden psychic strike that disrupts the opposing Lumen's inner pattern.`,
        cooldown_ms: 4200
    }, {
        id: `firewall`,
        name: `Firewall`,
        type: `Normal`,
        category: `status`,
        power: null,
        accuracy: null,
        pp: 10,
        effect: {
            priority: 4,
            protect: !0
        },
        description: `Raises an instant barrier that blocks the incoming move. Repeated use is likely to fail.`,
        cooldown_ms: 5e3
    }, {
        id: `defrag`,
        name: `Defrag`,
        type: `Psychic`,
        category: `status`,
        power: null,
        accuracy: null,
        pp: 10,
        effect: {
            heal: 1,
            self_status: `sleep`,
            sleep_turns: 2
        },
        description: `Fully restores your Lumen's HP, but it goes dormant for two turns to rebuild itself.`,
        cooldown_ms: 5e3
    }, {
        id: `cinder_hex`,
        name: `Cinder Hex`,
        type: `Fire`,
        category: `status`,
        power: null,
        accuracy: 85,
        pp: 15,
        effect: {
            target_status: `burn`
        },
        description: `A smoldering sigil that burns the opposing Lumen, sapping its physical power.`,
        cooldown_ms: 5e3
    }, {
        id: `deep_focus`,
        name: `Deep Focus`,
        type: `Psychic`,
        category: `status`,
        power: null,
        accuracy: null,
        pp: 20,
        effect: {
            user_stat_changes: {
                special_attack: 1,
                special_defense: 1
            }
        },
        description: `Your Lumen calms its mind, raising its Special Attack and Special Defense.`,
        cooldown_ms: 5e3
    }, {
        id: `reset_pulse`,
        name: `Reset Pulse`,
        type: `Normal`,
        category: `status`,
        power: null,
        accuracy: null,
        pp: 30,
        effect: {
            clears_all_stat_changes: !0
        },
        description: `A neutralizing pulse that erases every stat change on both battlers.`,
        cooldown_ms: 5e3
    }, {
        id: `frost_signal`,
        name: `Frost Signal`,
        type: `Ice`,
        category: `status`,
        power: null,
        accuracy: null,
        pp: 5,
        effect: {
            weather: `snow`,
            duration_turns: 5
        },
        description: `Summons a snowfall that blankets the battlefield for five turns.`,
        cooldown_ms: 6200
    }, {
        id: `bulwark_field`,
        name: `Bulwark Field`,
        type: `Steel`,
        category: `status`,
        power: null,
        accuracy: null,
        pp: 20,
        effect: {
            screen: `physical_damage_reduction`,
            duration_turns: 5
        },
        description: `Projects a hardened field that softens physical blows against your entire party.`,
        cooldown_ms: 6200
    }, {
        id: `compiled_power`,
        name: `Compiled Power`,
        type: `Psychic`,
        category: `special`,
        power: 20,
        accuracy: 100,
        pp: 10,
        effect: {
            power_per_boost: 20,
            max_power: 140
        },
        description: `Unleashes stored momentum, growing stronger with every stat boost your Lumen has compiled.`,
        cooldown_ms: 2400
    }, {
        id: `hijack`,
        name: `Hijack`,
        type: `Dark`,
        category: `physical`,
        power: 90,
        accuracy: 100,
        pp: 15,
        effect: {
            uses_target_attack: !0
        },
        description: `Turns the opposing Lumen's own strength against it — the stronger it is, the harder this move hits.`,
        cooldown_ms: 4100
    }, {
        id: `checksum`,
        name: `Checksum`,
        type: `Normal`,
        category: `special`,
        power: null,
        accuracy: 100,
        pp: 20,
        effect: {
            fixed_damage: `level`
        },
        description: `Deals exact damage equal to your Lumen's level. No more, no less.`,
        cooldown_ms: 3600
    }, {
        id: `bitshift`,
        name: `Bitshift`,
        type: `Dark`,
        category: `special`,
        power: null,
        accuracy: 90,
        pp: 10,
        effect: {
            halves_target_hp: !0
        },
        description: `A corrupting strike that cuts the opposing Lumen's remaining HP in half.`,
        cooldown_ms: 3400
    }, {
        id: `load_balance`,
        name: `Load Balance`,
        type: `Psychic`,
        category: `status`,
        power: null,
        accuracy: null,
        pp: 20,
        effect: {
            average_hp_with_target: !0
        },
        description: `Redistributes vitality, averaging your Lumen's and the opposing Lumen's remaining HP.`,
        cooldown_ms: 5e3
    }, {
        id: `cheap_shot`,
        name: `Cheap Shot`,
        type: `Dark`,
        category: `physical`,
        power: 70,
        accuracy: 100,
        pp: 5,
        effect: {
            priority: 1,
            fails_if_target_not_attacking: !0
        },
        description: `A vicious pre-emptive strike. Fails unless the opposing Lumen is readying an attack.`,
        cooldown_ms: 3100
    }, {
        id: `rampart_press`,
        name: `Rampart Press`,
        type: `Steel`,
        category: `physical`,
        power: 80,
        accuracy: 100,
        pp: 10,
        effect: {
            uses_stat: `defense`
        },
        description: `Crushes the opposing Lumen under sheer bulk, using your Lumen's Defense instead of Attack.`,
        cooldown_ms: 3800
    }, {
        id: `siphon_spores`,
        name: `Siphon Spores`,
        type: `Grass`,
        category: `status`,
        power: null,
        accuracy: 90,
        pp: 10,
        effect: {
            leech: .125
        },
        description: `Seeds the opposing Lumen with spores that siphon HP to your Lumen every turn.`,
        cooldown_ms: 5e3
    }, {
        id: `echo_lock`,
        name: `Echo Lock`,
        type: `Ghost`,
        category: `status`,
        power: null,
        accuracy: 100,
        pp: 20,
        effect: {
            disable_last_move_turns: 3
        },
        description: `Locks the opposing Lumen's last-used move behind a spectral echo for three turns.`,
        cooldown_ms: 6200
    }, {
        id: `jeering_static`,
        name: `Jeering Static`,
        type: `Dark`,
        category: `status`,
        power: null,
        accuracy: 100,
        pp: 20,
        effect: {
            taunt_turns: 3
        },
        description: `Goads the opposing Lumen with grating static. It can only use damaging moves for three turns.`,
        cooldown_ms: 5e3
    }, {
        id: `temporal_drift`,
        name: `Temporal Drift`,
        type: `Psychic`,
        category: `status`,
        power: null,
        accuracy: null,
        pp: 5,
        effect: {
            field_tempo: `inverted`,
            duration_turns: 5
        },
        description: `Twists the flow of time so slower battlers act first. Lasts five turns.`,
        cooldown_ms: 6200
    }, {
        id: `crystal_snare`,
        name: `Crystal Snare`,
        type: `Rock`,
        category: `status`,
        power: null,
        accuracy: null,
        pp: 20,
        effect: {
            entry_hazard: `shards`
        },
        description: `Scatters jagged crystal shards that wound Lumens entering the opposing field.`,
        cooldown_ms: 6200
    }, {
        id: `scout_dash`,
        name: `Scout Dash`,
        type: `Bug`,
        category: `physical`,
        power: 70,
        accuracy: 100,
        pp: 15,
        effect: {
            switch_after_attack: !0
        },
        description: `Strikes fast, then retreats so another Lumen from your party can take over.`,
        cooldown_ms: 3600
    }, {
        id: `banish_howl`,
        name: `Banish Howl`,
        type: `Dark`,
        category: `status`,
        power: null,
        accuracy: 90,
        pp: 10,
        effect: {
            forces_switch: !0
        },
        description: `A dreadful howl that drives the opposing Lumen out of battle.`,
        cooldown_ms: 6200
    }, {
        id: `overclock`,
        name: `Overclock`,
        type: `Electric`,
        category: `status`,
        power: null,
        accuracy: null,
        pp: 5,
        effect: {
            user_stat_changes: {
                special_attack: 2,
                speed: 1
            },
            hp_cost: .25
        },
        description: `Pushes the core far past its limits — huge power at the cost of a quarter of max HP.`,
        cooldown_ms: 5e3
    }, {
        id: `jab_pop`,
        name: `Jab Pop`,
        type: `Fighting`,
        category: `physical`,
        power: 40,
        accuracy: 100,
        pp: 25,
        effect: null,
        description: `A quick little punch that snaps forward before the opposing Lumen can settle.`,
        cooldown_ms: 2700
    }, {
        id: `step_kick`,
        name: `Step Kick`,
        type: `Fighting`,
        category: `physical`,
        power: 60,
        accuracy: 100,
        pp: 15,
        effect: null,
        description: `Your Lumen steps in with a clean kick powered by practiced footwork.`,
        cooldown_ms: 3100
    }, {
        id: `tempo_sweep`,
        name: `Tempo Sweep`,
        type: `Fighting`,
        category: `physical`,
        power: 55,
        accuracy: 100,
        pp: 20,
        effect: {
            target_stat_changes: {
                speed: -1
            }
        },
        description: `A low sweeping strike that knocks the opposing Lumen off rhythm and lowers its Speed.`,
        cooldown_ms: 3200
    }, {
        id: `brace_up`,
        name: `Brace Up`,
        type: `Fighting`,
        category: `status`,
        power: null,
        accuracy: null,
        pp: 20,
        effect: {
            user_stat_changes: {
                attack: 1,
                defense: 1
            }
        },
        description: `Your Lumen plants its stance, raising its Attack and Defense.`,
        cooldown_ms: 5e3
    }, {
        id: `guard_break`,
        name: `Guard Break`,
        type: `Fighting`,
        category: `physical`,
        power: 70,
        accuracy: 95,
        pp: 15,
        effect: {
            chance: 30,
            target_stat_changes: {
                defense: -1
            }
        },
        description: `A sharp strike that can crack the opposing Lumen's guard and lower its Defense.`,
        cooldown_ms: 3500
    }, {
        id: `meteor_clinch`,
        name: `Meteor Clinch`,
        type: `Fighting`,
        category: `physical`,
        power: 95,
        accuracy: 90,
        pp: 10,
        effect: {
            uses_stat: `attack`
        },
        description: `Your Lumen grabs its opening and crashes in with a decisive finishing blow.`,
        cooldown_ms: 4100
    }, {
        id: `consensus_prism`,
        name: `Consensus Prism`,
        type: `Psychic`,
        category: `special`,
        power: 110,
        accuracy: 90,
        pp: 5,
        effect: {
            chance: 30,
            target_stat_changes: {
                special_defense: -1
            }
        },
        description: `A synchronized prism burst that can fracture the opposing Lumen's focus.`,
        cooldown_ms: 4400
    }, {
        id: `neon_fork`,
        name: `Neon Fork`,
        type: `Electric`,
        category: `special`,
        power: 110,
        accuracy: 90,
        pp: 5,
        effect: {
            chance: 30,
            target_status: `paralyze`
        },
        description: `A spectral neon split that races through the opposing Lumen's nerves.`,
        cooldown_ms: 4400
    }, {
        id: `genesis_stampede`,
        name: `Genesis Stampede`,
        type: `Rock`,
        category: `physical`,
        power: 110,
        accuracy: 90,
        pp: 5,
        effect: {
            chance: 30,
            target_stat_changes: {
                defense: -1
            }
        },
        description: `Your Lumen charges like the first block of a mountain, cracking the opposing Lumen's guard.`,
        cooldown_ms: 4400
    }, {
        id: `capsule_bloom`,
        name: `Capsule Bloom`,
        type: `Fairy`,
        category: `special`,
        power: 110,
        accuracy: 90,
        pp: 5,
        effect: {
            chance: 30,
            user_stat_changes: {
                special_attack: 1
            }
        },
        description: `The sealed prism opens into a burst of light, sometimes raising your Lumen's Special Attack.`,
        cooldown_ms: 4400
    }, {
        id: `core_overdrive`,
        name: `Core Overdrive`,
        type: `Electric`,
        category: `special`,
        power: 110,
        accuracy: 90,
        pp: 5,
        effect: {
            chance: 30,
            target_status: `paralyze`
        },
        description: `Your Lumen's core spins past its limiter and fires a bright surge that may paralyze the opposing Lumen.`,
        cooldown_ms: 4400
    }]
};


  const ALL_MOVES = MOVE_DB.moves.slice().sort(function(a, b){ return a.name.localeCompare(b.name); });


  /* ---------- Type counter tracker ---------- */
  const COUNTER_TYPES = ['Normal','Fire','Water','Electric','Grass','Ice','Fighting','Poison','Ground','Flying','Psychic','Bug','Rock','Ghost','Dragon','Dark','Steel','Fairy'];
  const COUNTER_COLORS = {
    Normal:'#B9B6A9', Fire:'#E8703A', Water:'#4E9BD9', Electric:'#E0BE3C',
    Grass:'#6FBE6E', Ice:'#7FD6D6', Fighting:'#C1554A', Poison:'#A45FC1',
    Ground:'#C7A15C', Flying:'#9FB6E8', Psychic:'#E86FA3', Bug:'#9AC13A',
    Rock:'#B0A06A', Ghost:'#8577D6', Dragon:'#6F7FE8', Dark:'#8A8896',
    Steel:'#9FB0BF', Fairy:'#E896C7'
  };

  // Multipliers shown in the supplied type-chart image. Only non-normal
  // interactions are stored; all other pairs are normal (1×).
  const TYPE_EFFECTS = {
    Normal:{Rock:0.5,Ghost:0,Steel:0.5},
    Fire:{Fire:0.5,Water:0.5,Grass:2,Ice:2,Bug:2,Rock:0.5,Dragon:0.5,Steel:2},
    Water:{Fire:2,Water:0.5,Grass:0.5,Ground:2,Rock:2,Dragon:0.5},
    Electric:{Water:2,Electric:0.5,Grass:0.5,Ground:0,Flying:2,Dragon:0.5},
    Grass:{Fire:0.5,Water:2,Grass:0.5,Poison:0.5,Ground:2,Flying:0.5,Bug:0.5,Rock:2,Dragon:0.5,Steel:0.5},
    Ice:{Fire:0.5,Water:0.5,Grass:2,Ice:0.5,Ground:2,Flying:2,Dragon:2,Steel:0.5},
    Fighting:{Normal:2,Ice:2,Poison:0.5,Flying:0.5,Psychic:0.5,Bug:0.5,Rock:2,Ghost:0,Dark:2,Steel:2,Fairy:0.5},
    Poison:{Grass:2,Poison:0.5,Ground:0.5,Rock:0.5,Ghost:0.5,Steel:0,Fairy:2},
    Ground:{Fire:2,Electric:2,Grass:0.5,Poison:2,Flying:0,Bug:0.5,Rock:2,Steel:2},
    Flying:{Electric:0.5,Grass:2,Fighting:2,Bug:2,Rock:0.5,Steel:0.5},
    Psychic:{Fighting:2,Poison:2,Psychic:0.5,Steel:0.5},
    Bug:{Fire:0.5,Grass:2,Fighting:0.5,Poison:0.5,Flying:0.5,Psychic:2,Ghost:0.5,Dark:2,Steel:0.5,Fairy:0.5},
    Rock:{Fire:2,Ice:2,Fighting:0.5,Ground:0.5,Flying:2,Bug:2,Steel:0.5},
    Ghost:{Normal:0,Psychic:2,Ghost:2,Dark:0.5},
    Dragon:{Dragon:2,Steel:0.5,Fairy:0},
    Dark:{Fighting:0.5,Psychic:2,Ghost:2,Dark:0.5,Fairy:0.5},
    Steel:{Fire:0.5,Water:0.5,Electric:0.5,Ice:2,Rock:2,Steel:0.5,Fairy:2},
    Fairy:{Fire:0.5,Poison:0.5,Steel:0.5,Fighting:2,Dragon:2,Dark:2}
  };

  function typeMultiplier(attack, defend){
    return Object.prototype.hasOwnProperty.call(TYPE_EFFECTS[attack] || {}, defend)
      ? TYPE_EFFECTS[attack][defend] : 1;
  }

  function effectClass(mult){
    if (mult === 0) return 'effect-zero';
    if (mult === 0.5) return 'effect-half';
    if (mult === 2) return 'effect-super';
    return 'effect-normal';
  }

  function effectLabel(mult){
    if (mult === 0) return '0';
    if (mult === 0.5) return '½';
    if (mult === 2) return '2×';
    if (mult === 1) return '';
    if (mult > 1) return String(mult).replace('.','.') + '×';
    return String(mult) + '×';
  }

  function escapeCounterHTML(value){
    return String(value).replace(/[&<>"']/g, function(ch){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch];
    });
  }

  function getLumenTypeData(item){
    return {
      id: item.dataset.id,
      num: item.dataset.num,
      name: item.querySelector('.side-name')?.textContent?.trim() || item.dataset.id,
      types: (item.dataset.types || '').split(/\s+/).filter(function(t){ return COUNTER_TYPES.indexOf(t) !== -1; })
    };
  }

  const COUNTER_LUMENS = sideItems.map(getLumenTypeData);
  let lumenCounterSearchQuery = '';

  function renderLumenCounterList(activeId){
    const list = document.getElementById('lumen-counter-list');
    const count = document.getElementById('lumen-counter-search-count');
    if (!list) return;
    const q = lumenCounterSearchQuery.trim().toLowerCase();
    const filtered = COUNTER_LUMENS.filter(function(lumen){
      if (!q) return true;
      return lumen.name.toLowerCase().includes(q) ||
             String(lumen.num).toLowerCase().includes(q) ||
             ('#' + lumen.num).toLowerCase().includes(q) ||
             lumen.types.some(function(t){ return t.toLowerCase().includes(q); });
    });
    if (count) count.textContent = filtered.length + ' / ' + COUNTER_LUMENS.length;
    if (!filtered.length){
      list.innerHTML = '<div class="lumen-counter-list-empty">No Lumens found.</div>';
      return;
    }
    list.innerHTML = filtered.map(function(lumen){
      const active = lumen.id === activeId ? ' active' : '';
      const typeHtml = lumen.types.map(function(t){
        return '<span class="lumen-counter-item-type" style="--tc:'+COUNTER_COLORS[t]+'">'+escapeCounterHTML(t)+'</span>';
      }).join('');
      return '<button type="button" class="lumen-counter-item'+active+'" data-counter-lumen="'+escapeCounterHTML(lumen.id)+'">'
        +'<span class="lumen-counter-item-num">#'+escapeCounterHTML(lumen.num)+'</span>'
        +'<span class="lumen-counter-item-name">'+escapeCounterHTML(lumen.name)+'</span>'
        +'<span class="lumen-counter-item-types">'+typeHtml+'</span>'
        +'</button>';
    }).join('');
  }

  function renderLumenCounterDetail(id){
    const wrap = document.getElementById('lumen-counter-detail');
    if (!wrap) return;
    const lumen = COUNTER_LUMENS.find(function(x){ return x.id === id; });
    if (!lumen){
      wrap.innerHTML = '<div class="lumen-counter-list-empty">Select a Lumen from the list.</div>';
      return;
    }
    renderCounterSummaryInto(wrap, lumen.id);
    document.querySelectorAll('.lumen-counter-item').forEach(function(btn){
      btn.classList.toggle('active', btn.dataset.counterLumen === lumen.id);
    });
  }

  function renderCounterSummaryInto(wrap, lumenId){
    if (!wrap) return;
    const lumen = COUNTER_LUMENS.find(function(x){ return x.id === lumenId; });
    if (!lumen || !lumen.types.length){
      wrap.innerHTML = '<div class="lumen-counter-list-empty">No type data available for this Lumen.</div>';
      return;
    }

    const ranked = COUNTER_TYPES.map(function(attack){
      const mult = multiplierAgainst(lumen.types, attack);
      return {attack:attack, mult:mult};
    }).filter(function(x){ return x.mult > 1; })
      .sort(function(a,b){ return b.mult-a.mult || COUNTER_TYPES.indexOf(a.attack)-COUNTER_TYPES.indexOf(b.attack); });

    let html = '<div class="lumen-counter-detail-head"><span class="lumen-counter-detail-name">'+escapeCounterHTML(lumen.name)+'</span><span class="lumen-counter-detail-num">#'+escapeCounterHTML(lumen.num)+'</span></div>';
    html += '<p class="lumen-counter-detail-sub">Defending type'+(lumen.types.length > 1 ? 's' : '')+': <span class="lumen-counter-defending-types">'+lumen.types.map(function(type){ return '<span class="lumen-counter-defending-type" style="--tc:'+escapeCounterHTML(COUNTER_COLORS[type] || '#667085')+'">'+escapeCounterHTML(type)+'</span>'; }).join('')+'</span></p>';

    if (!ranked.length){
      html += '<div class="counter-result-empty">No super-effective attacking type is recorded for this Lumen.</div>';
      wrap.innerHTML = html;
      return;
    }

    // Types that this selected Lumen is strong against.
    const strongTypes = COUNTER_TYPES.map(function(defend){
      const mult = lumen.types.reduce(function(total, attack){
        return total * typeMultiplier(attack, defend);
      }, 1);
      return {defend:defend, mult:mult};
    }).filter(function(x){ return x.mult > 1; })
      .sort(function(a,b){ return b.mult-a.mult || COUNTER_TYPES.indexOf(a.defend)-COUNTER_TYPES.indexOf(b.defend); });

    html += '<div class="counter-lumen-results-grid">';

    html += '<div class="counter-lumen-results">';
    html += '<div class="counter-lumen-results-title">Strong against this Lumen</div>';
    html += '<div class="counter-selected-types" id="counter-selected-types">';
    strongTypes.forEach(function(x, index){
      html += '<button type="button" class="counter-selected-type'+(index === 0 ? ' active' : '')+'" data-counter-type="'+escapeCounterHTML(x.defend)+'" style="--tc:'+COUNTER_COLORS[x.defend]+'">'+escapeCounterHTML(x.defend)+'</button>';
    });
    html += '</div>';
    html += '<div class="counter-type-hint">Click a type to see the Lumens that are weaker to this Lumen.</div>';
    html += '<div class="counter-type-lumen-panel" id="counter-type-lumen-panel"></div>';
    html += '</div>';

    html += '<div class="counter-lumen-results">';
    html += '<div class="counter-lumen-results-title">Weaker against this Lumen</div>';
    html += '<div class="counter-selected-types" id="counter-weak-types">';
    ranked.forEach(function(x, index){
      html += '<button type="button" class="counter-selected-type'+(index === 0 ? ' active' : '')+'" data-weak-counter-type="'+escapeCounterHTML(x.attack)+'" style="--tc:'+COUNTER_COLORS[x.attack]+'">'+escapeCounterHTML(x.attack)+'</button>';
    });
    html += '</div>';
    html += '<div class="counter-type-hint">Click a type to see the Lumens that are strong against this Lumen.</div>';
    html += '<div class="counter-type-lumen-panel" id="counter-weak-lumen-panel"></div>';
    html += '</div>';
    html += '</div>';
    wrap.innerHTML = html;

    function renderTypeLumens(defendType){
      const panel = wrap.querySelector('#counter-type-lumen-panel');
      if (!panel) return;
      const selected = strongTypes.find(function(x){ return x.defend === defendType; });
      if (!selected) return;
      const candidates = COUNTER_LUMENS.filter(function(candidate){
        return candidate.types.indexOf(defendType) !== -1 && candidate.id !== lumen.id;
      });
      let out = '<div class="counter-type-lumen-title"><span style="color:'+COUNTER_COLORS[defendType]+'">'+escapeCounterHTML(defendType)+'</span> Lumens · '+effectLabel(selected.mult)+'</div><div class="counter-result-list">';
      if (!candidates.length){
        out += '<span class="counter-result-empty">No other Lumen currently has this type.</span>';
      } else {
        candidates.forEach(function(candidate){
          out += '<button type="button" class="counter-result-lumen" data-counter-jump="'+escapeCounterHTML(candidate.id)+'" style="--lumen-type:'+escapeCounterHTML(COUNTER_COLORS[candidate.types[0]] || '#667085')+';--lumen-type2:'+escapeCounterHTML(COUNTER_COLORS[candidate.types[1]] || COUNTER_COLORS[candidate.types[0]] || '#667085')+'"><span class="counter-result-num">#'+escapeCounterHTML(candidate.num)+'</span>'+escapeCounterHTML(candidate.name)+'</button>';
        });
      }
      out += '</div>';
      panel.innerHTML = out;
    }

    function renderWeakLumens(attackType){
      const panel = wrap.querySelector('#counter-weak-lumen-panel');
      if (!panel) return;
      const selected = ranked.find(function(x){ return x.attack === attackType; });
      if (!selected) return;
      const candidates = COUNTER_LUMENS.filter(function(candidate){
        return candidate.types.indexOf(attackType) !== -1 && candidate.id !== lumen.id;
      });
      let out = '<div class="counter-type-lumen-title"><span style="color:'+COUNTER_COLORS[attackType]+'">'+escapeCounterHTML(attackType)+'</span> Lumens · '+effectLabel(selected.mult)+'</div><div class="counter-result-list">';
      if (!candidates.length){
        out += '<span class="counter-result-empty">No other Lumen currently has this type.</span>';
      } else {
        candidates.forEach(function(candidate){
          out += '<button type="button" class="counter-result-lumen" data-counter-jump="'+escapeCounterHTML(candidate.id)+'" style="--lumen-type:'+escapeCounterHTML(COUNTER_COLORS[candidate.types[0]] || '#667085')+';--lumen-type2:'+escapeCounterHTML(COUNTER_COLORS[candidate.types[1]] || COUNTER_COLORS[candidate.types[0]] || '#667085')+'"><span class="counter-result-num">#'+escapeCounterHTML(candidate.num)+'</span>'+escapeCounterHTML(candidate.name)+'</button>';
        });
      }
      out += '</div>';
      panel.innerHTML = out;
    }

    const typeButtons = wrap.querySelectorAll('[data-counter-type]');
    typeButtons.forEach(function(btn){
      btn.addEventListener('click', function(){
        typeButtons.forEach(function(b){ b.classList.remove('active'); });
        btn.classList.add('active');
        renderTypeLumens(btn.dataset.counterType);
      });
    });

    const weakButtons = wrap.querySelectorAll('[data-weak-counter-type]');
    weakButtons.forEach(function(btn){
      btn.addEventListener('click', function(){
        weakButtons.forEach(function(b){ b.classList.remove('active'); });
        btn.classList.add('active');
        renderWeakLumens(btn.dataset.weakCounterType);
      });
    });

    if (strongTypes.length) renderTypeLumens(strongTypes[0].defend);
    if (ranked.length) renderWeakLumens(ranked[0].attack);
  }

  function multiplierAgainst(defendingTypes, attackingType){
    return defendingTypes.reduce(function(total, defend){
      return total * typeMultiplier(attackingType, defend);
    }, 1);
  }

  function renderCounterSummary(){
    const wrap = document.getElementById('counter-summary');
    if (!wrap) return;
    if (!selectedLumenId || !detailById[selectedLumenId]){
      wrap.innerHTML = '<span class="counter-summary-label">Selected Lumen</span><span class="counter-summary-empty">Open a Lumen entry to highlight its defending type in the chart.</span>';
      return;
    }
    const lumen = COUNTER_LUMENS.find(function(x){ return x.id === selectedLumenId; });
    wrap.innerHTML = '<div class="counter-summary"><span class="counter-summary-label">Selected Lumen</span><span class="counter-summary-name">'+escapeCounterHTML(lumen ? lumen.name : selectedLumenId)+'</span></div>';
  }

  let selectedCounterAttackType = 'Normal';

  function renderCounterTypeSelector(){
    const wrap = document.getElementById('counter-summary');
    if (!wrap) return;
    let html = '<div class="counter-type-selector-title">Lumen Type</div>';
    html += '<div class="counter-type-selector-grid">';
    COUNTER_TYPES.forEach(function(type){
      const active = type === selectedCounterAttackType ? ' active' : '';
      html += '<button type="button" class="counter-selected-type counter-type-selector-btn'+active+'" data-counter-attack-type="'+escapeCounterHTML(type)+'" style="--tc:'+COUNTER_COLORS[type]+'">'+escapeCounterHTML(type)+'</button>';
    });
    html += '</div><div class="counter-type-selector-note">Shows 2×, ½×, and 0× only · 1× normal damage is hidden</div>';
    wrap.innerHTML = html;
    wrap.querySelectorAll('[data-counter-attack-type]').forEach(function(btn){
      btn.addEventListener('click',function(){
        selectedCounterAttackType = btn.dataset.counterAttackType;
        renderCounterTypeSelector();
        renderFilteredTypeChart();
      });
    });
  }

  // Lumen Type Counter orientation:
  // The selected Lumen Type is ALWAYS the ATTACKER.
  // The rows are the DEFENDING types.
  // Example: selecting Fire means Water = 1/2, Grass = 2x, Ice = 2x, etc.
  function renderFilteredTypeChart(){
    const wrap = document.getElementById('counter-filtered-chart');
    if (!wrap) return;
    const attacker = selectedCounterAttackType || 'Normal';
    const relevant = COUNTER_TYPES.map(function(defendingType){
      const damageMultiplier = typeMultiplier(attacker, defendingType);
      return {defend:defendingType,mult:damageMultiplier};
    }).filter(function(x){ return x.mult !== 1; });

    let html = '<table><thead><tr><th class="attack-col">DEFENDING TYPE</th><th class="damage-col">DAMAGE</th></tr></thead><tbody>';
    relevant.forEach(function(item){
      const label = item.mult === 0 ? 'NO EFFECT' : effectLabel(item.mult);
      html += '<tr><th class="row-type"><span class="counter-chip" style="--tc:'+COUNTER_COLORS[item.defend]+'">'+escapeCounterHTML(item.defend)+'</span></th>';
      html += '<td class="'+effectClass(item.mult)+'">'+label+'</td></tr>';
    });
    if (!relevant.length){
      html += '<tr><td colspan="2" style="height:40px;text-align:center;color:var(--ink-faint);font:9px JetBrains Mono,monospace;">No non-normal matchups.</td></tr>';
    }
    html += '</tbody></table>';
    wrap.innerHTML = html;
  }

  function renderTypeChart(){
    renderCounterTypeSelector();
    renderFilteredTypeChart();
  }

  const counterTrackerOverlay = document.getElementById('counter-tracker-overlay');
  const counterTrackerToggle = document.getElementById('counter-tracker-toggle-btn');
  const counterTrackerClose = document.getElementById('counter-tracker-overlay-close');
  const lumenCounterOverlay = document.getElementById('lumen-counter-overlay');
  const lumenCounterToggle = document.getElementById('lumen-counter-toggle-btn');
  const lumenCounterClose = document.getElementById('lumen-counter-overlay-close');

  renderTypeChart();

  function openCounterTracker(){
    renderTypeChart();
    counterTrackerOverlay.classList.add('open');
  }
  function closeCounterTracker(){
    counterTrackerOverlay.classList.remove('open');
  }
  function openLumenCounter(){
    const initialId = selectedLumenId || (COUNTER_LUMENS[0] && COUNTER_LUMENS[0].id);
    const search = document.getElementById('lumen-counter-search');
    lumenCounterSearchQuery = '';
    if (search) search.value = '';
    renderLumenCounterList(initialId);
    renderLumenCounterDetail(initialId);
    lumenCounterOverlay.classList.add('open');
    if (search) setTimeout(function(){ search.focus(); }, 0);
  }
  function closeLumenCounter(){
    lumenCounterOverlay.classList.remove('open');
  }

  counterTrackerToggle.addEventListener('click', openCounterTracker);
  counterTrackerClose.addEventListener('click', closeCounterTracker);
  counterTrackerOverlay.addEventListener('click', function(e){
    if (e.target === counterTrackerOverlay) closeCounterTracker();
  });
  lumenCounterToggle.addEventListener('click', openLumenCounter);
  lumenCounterClose.addEventListener('click', closeLumenCounter);

  const lumenCounterSearch = document.getElementById('lumen-counter-search');
  if (lumenCounterSearch){
    lumenCounterSearch.addEventListener('input', function(){
      lumenCounterSearchQuery = this.value;
      const active = document.querySelector('.lumen-counter-item.active')?.dataset.counterLumen || selectedLumenId || (COUNTER_LUMENS[0] && COUNTER_LUMENS[0].id);
      renderLumenCounterList(active);
    });
  }
  lumenCounterOverlay.addEventListener('click', function(e){
    if (e.target === lumenCounterOverlay) closeLumenCounter();
    const lumenBtn = e.target.closest('[data-counter-lumen]');
    if (lumenBtn){
      const id = lumenBtn.dataset.counterLumen;
      // Keep the Lumen Counter open. Sync the selected ID without opening
      // the main mobile Codex detail screen behind the modal.
      if (detailById[id]) {
        selectedLumenId = id;
        sideItems.forEach(function(i){ i.classList.toggle('active', i.dataset.id === id); });
      }
      renderLumenCounterList(id);
      renderLumenCounterDetail(id);
      return;
    }
    const jumpBtn = e.target.closest('[data-counter-jump]');
    if (jumpBtn){
      const id = jumpBtn.dataset.counterJump;
      // Keep the Lumen Counter open without opening the main mobile detail screen.
      if (detailById[id]) {
        selectedLumenId = id;
        sideItems.forEach(function(i){ i.classList.toggle('active', i.dataset.id === id); });
      }
      renderLumenCounterList(id);
      renderLumenCounterDetail(id);
    }
  });

  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape'){
      closeCounterTracker();
      closeLumenCounter();
    }
  });

  document.getElementById('detail-panel').addEventListener('click', function(e){
    const jumpBtn = e.target.closest('[data-jump]');
    if (jumpBtn){ selectLumen(jumpBtn.dataset.jump); return; }
  });

  backBtn.addEventListener('click', function(){
    document.body.classList.remove('detail-open');
  });

  searchInput.addEventListener('input', applyFilters);

  clearBtn.addEventListener('click', function(){
    searchInput.value = '';
    rarityFilter.value = '';
    rarityFilter.style.setProperty('--tc', 'var(--ink-muted)');
    rarityFilter.classList.remove('has-value');
    typeFilter.value = '';
    typeFilter.style.setProperty('--tc', 'var(--ink-muted)');
    typeFilter.classList.remove('has-value');
    locationFilter.value = '';
    locationFilter.dispatchEvent(new Event('change', {bubbles:true}));
    applyFilters();
  });


  // Pre-select the first entry on wide screens for a populated first view.
  if (window.innerWidth > 820 && sideItems.length){
    selectLumen(sideItems[0].dataset.id);
    document.body.classList.remove('detail-open');
  }

  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape' && counterTrackerOverlay.classList.contains('open')){
      closeCounterTracker();
    }
  });

  window.addEventListener('beforeunload', function(){
    if (liveTimer) clearInterval(liveTimer);
    if (liveAbort) liveAbort.abort();
  });
})();
