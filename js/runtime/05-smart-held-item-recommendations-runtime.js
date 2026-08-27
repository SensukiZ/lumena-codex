(function(){
  if(window.__smartHeldItemsInstalled)return;
  window.__smartHeldItemsInstalled=true;
  var ITEMS={
    kinetic:{name:'Kinetic Band',kind:'Durable',reason:'Boosts direct physical damage by 10% with no drawback.'},
    signal:{name:'Signal Lens',kind:'Durable',reason:'Boosts direct special damage by 10% with no drawback.'},
    exploit:{name:'Exploit Prism',kind:'Durable',reason:'Boosts super-effective direct damage by 15%, making wide type coverage more threatening.'},
    volatile:{name:'Volatile Core',kind:'Durable · Risky',reason:'Boosts direct damage by 20%, but causes recoil after each damaging action.'},
    directiveBand:{name:'Directive Band',kind:'Durable · Move lock',reason:'Boosts physical direct damage by 20%, but locks the first selected move until switching.'},
    directiveLens:{name:'Directive Lens',kind:'Durable · Move lock',reason:'Boosts special direct damage by 20%, but locks the first selected move until switching.'},
    dice:{name:'Pattern Dice',kind:'Durable',reason:'Makes moves that normally hit 2–5 times land 4 or 5 hits.'},
    overclock:{name:'Overclock Chip',kind:'Durable',reason:'Raises Speed by 10%, helping this Lumen act earlier.'},
    reversal:{name:'Reversal Scarf',kind:'Durable · Conditional',reason:'Raises Speed by 15% while the holder is at half HP or less.'},
    aegis:{name:'Aegis Mesh',kind:'Durable',reason:'Reduces all incoming direct damage by 10%.'},
    shell:{name:'Adaptive Shell',kind:'Durable',reason:'Reduces incoming super-effective direct damage by 20%.'},
    vital:{name:'Vital Loop',kind:'Durable',reason:'Restores HP at the end of each turn, suiting Lumens built to remain in battle.'},
    reactive:{name:'Reactive Plating',kind:'Durable',reason:'Punishes physical attackers each time their attack damages the holder.'},
    assault:{name:'Assault Matrix',kind:'Durable · Status lock',reason:'Raises Special Defense by 25%, but prevents use of status moves.'},
    boots:{name:'Phase Boots',kind:'Durable',reason:'Ignores every entry-hazard effect, useful for frequent switching.'},
    weather:{name:'Weather Dial',kind:'Durable',reason:'Extends weather created by the holder by one turn.'},
    scope:{name:'Calibration Scope',kind:'Durable',reason:'Adds 5 accuracy points to moves below 100 accuracy, up to 100.'},
    cell:{name:'Emergency Cell',kind:'Single-use',reason:'Restores 20% max HP after a direct attack leaves the holder at 25% HP or less.'},
    charm:{name:'Lastlight Charm',kind:'Single-use',reason:'At full HP, lets the holder survive one otherwise fatal direct hit with 1 HP.'},
    purity:{name:'Purity Filter',kind:'Single-use',reason:'Blocks the first major status condition, then is consumed.'}
  };
  function n(s){var m=String(s||'').match(/\d+/);return m?+m[0]:0}
  function unique(arr){var seen={};return arr.filter(function(x){if(!x||seen[x.name])return false;seen[x.name]=1;return true})}
  function analyze(view){
    var stats={};view.querySelectorAll('.stat-row').forEach(function(row){var k=(row.querySelector('.stat-label')||{}).textContent||'';var v=n((row.querySelector('.stat-val')||{}).textContent);stats[k.trim()]=v});
    var atk=stats.Attack||0,spa=stats['Sp. Attack']||0,def=stats.Defense||0,spd=stats['Sp. Defense']||0,hp=stats.HP||0,spe=stats.Speed||0;
    var moves=[].slice.call(view.querySelectorAll('.move-chip')).map(function(x){return ((x.getAttribute('title')||'')+' '+(x.textContent||'')).toLowerCase()});
    var physical=moves.filter(function(x){return x.indexOf('physical')>=0}).length;
    var special=moves.filter(function(x){return x.indexOf('special')>=0}).length;
    var status=moves.filter(function(x){return x.indexOf('status')>=0}).length;
    var inaccurate=moves.filter(function(x){var m=x.match(/acc\s+(\d+)/);return m&&+m[1]<100}).length;
    var multi=moves.some(function(x){return /2[–-]5|2 to 5|multi[- ]hit|hits (?:two|2)/.test(x)});
    /* Weather Dial is deliberately strict: Tutor Moves are not enough. The
       Lumen must learn the setter by level and have a type that normally gains
       useful synergy from that weather. */
    var levelPanel=[].slice.call(view.querySelectorAll('.panel')).find(function(p){var h=p.querySelector('h4');return h&&h.textContent.trim()==='Level-Up Moves'});
    var levelMoves=levelPanel?[].slice.call(levelPanel.querySelectorAll('.move-chip')).map(function(x){return ((x.getAttribute('title')||'')+' '+(x.textContent||'')).toLowerCase()}):[];
    var typeText=((view.getAttribute('data-types')||'')+'').toLowerCase();
    var createsSun=levelMoves.some(function(x){return /(?:summons?|creates?|starts?|calls? forth|sets? up|brings?)[^.!\n]{0,45}(?:sunlight|sunny weather)/.test(x)});
    var createsRain=levelMoves.some(function(x){return /(?:summons?|creates?|starts?|calls? forth|sets? up|brings?)[^.!\n]{0,45}(?:rain|rainy weather)/.test(x)});
    var createsSand=levelMoves.some(function(x){return /(?:summons?|creates?|starts?|calls? forth|sets? up|brings?)[^.!\n]{0,45}(?:sandstorm|sand weather)/.test(x)});
    var createsSnow=levelMoves.some(function(x){return /(?:summons?|creates?|starts?|calls? forth|sets? up|brings?)[^.!\n]{0,45}(?:snow|hail|frost weather)/.test(x)});
    var weather=(createsSun&&/(?:fire|grass)/.test(typeText))||(createsRain&&/(?:water|electric)/.test(typeText))||(createsSand&&/(?:ground|rock|steel)/.test(typeText))||(createsSnow&&/ice/.test(typeText));
    var offense=Math.max(atk,spa),bulk=hp+(def+spd)/2;
    var physicalBuild=(atk>spa+7)||(physical>special+1);var specialBuild=(spa>atk+7)||(special>physical+1);
    var role=bulk>=150&&offense<95?'Defensive / support':spe>=95&&offense>=90?'Fast attacker':offense>=105?'Power attacker':bulk>=170?'Bulky attacker':physicalBuild?'Physical attacker':specialBuild?'Special attacker':'Balanced';
    var picks=[];
    if(multi)picks.push(Object.assign({why:'Best match: this Lumen has a multi-hit move that can directly benefit from the improved hit count.'},ITEMS.dice));
    if(bulk>=155)picks.push(Object.assign({why:'Its HP and defensive stats favor longer battles, allowing repeated recovery.'},ITEMS.vital));
    if(physicalBuild)picks.push(Object.assign({why:'Its Attack and physical move access make a reliable physical boost valuable.'},ITEMS.kinetic));
    else if(specialBuild)picks.push(Object.assign({why:'Its Sp. Attack and special move access make a reliable special boost valuable.'},ITEMS.signal));
    else picks.push(Object.assign({why:'Its balanced offense can exploit favorable type matchups without choosing one damage category.'},ITEMS.exploit));
    if(weather)picks.push(Object.assign({why:'Conditional choice for a dedicated weather build: it extends weather created by the holder by one turn.'},ITEMS.weather));
    if(spe>=90)picks.push(Object.assign({why:'Its already strong Speed becomes more dependable in close matchups.'},ITEMS.overclock));
    else if(offense>=95)picks.push(Object.assign({why:'Extra Speed helps its strong attacks land before more opponents.'},ITEMS.overclock));
    if(inaccurate>=2)picks.push(Object.assign({why:'Several available attacks have imperfect accuracy, so the accuracy increase has frequent value.'},ITEMS.scope));
    if(status===0&&spd>=75)picks.push(Object.assign({why:'It has usable Special Defense and no detected status moves to lose.'},ITEMS.assault));
    if(def>=spd+15)picks.push(Object.assign({why:'Its stronger physical bulk helps it repeatedly face and punish physical attackers.'},ITEMS.reactive));
    if(bulk>=145)picks.push(Object.assign({why:'A universal direct-damage reduction is dependable on a Lumen with solid bulk.'},ITEMS.aegis));
    else picks.push(Object.assign({why:'A one-time survival effect can give a frailer Lumen one important extra action.'},ITEMS.charm));
    if(physicalBuild&&status<=1)picks.push(Object.assign({why:'High-risk power option for a physical set that plans to switch after committing to one move.'},ITEMS.directiveBand));
    if(specialBuild&&status<=1)picks.push(Object.assign({why:'High-risk power option for a special set that plans to switch after committing to one move.'},ITEMS.directiveLens));
    picks=unique(picks).slice(0,3);
    return {role:role,picks:picks};
  }
  function install(){
    document.querySelectorAll('.detail-view').forEach(function(view){
      if(view.querySelector('.held-item-panel'))return;
      var a=analyze(view),panel=document.createElement('div');panel.className='panel held-item-panel';
      panel.innerHTML='<div class="held-item-head"><h4>Recommended Held Items</h4><span class="held-item-source">Effects: <a href="https://lumena.gg/wiki/mechanics/held-items/" target="_blank" rel="noopener">Official Lumena Wiki</a></span></div><p class="held-item-role">Suggested role: '+a.role+'</p><div class="held-item-grid">'+a.picks.map(function(x,i){return '<article class="held-item-card '+(i===0?'best':'')+'"><span class="held-item-rank">'+(i===0?'Best match':'Alternative '+(i+1))+'</span><strong class="held-item-name">'+x.name+'</strong><span class="held-item-kind">'+x.kind+'</span><p class="held-item-reason">'+x.why+'</p></article>'}).join('')+'</div><p class="held-item-note">Recommendations are calculated from base stats and the moves currently listed in this Codex. The best choice can change with ability, moveset, team role, and opponent.</p>';
      var abilities=[].slice.call(view.querySelectorAll('.panel')).find(function(p){var h=p.querySelector('h4');return h&&h.textContent.trim()==='Abilities'});
      if(abilities&&abilities.parentNode)abilities.insertAdjacentElement('afterend',panel);else view.appendChild(panel);
    });
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();
})();
