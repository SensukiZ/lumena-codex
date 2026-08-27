(function(){
  'use strict';
  if(window.__topTeamCompositionsInstalled)return;window.__topTeamCompositionsInstalled=true;
  var TEAMS=[
    {score:100,bst:2775,ids:["tempoad","glorial","steelark","vowraith","blazekhan","voidrake"]},
    {score:100,bst:2765,ids:["pyrolynx","tempoad","glorial","steelark","vowraith","voidrake"]},
    {score:100,bst:2700,ids:["tempoad","blazewick","glorial","steelark","vowraith","voidrake"]},
    {score:100,bst:2665,ids:["tempoad","glorial","scorivault","steelark","vowraith","voidrake"]},
    {score:99,bst:2810,ids:["dynarook","voidrake","mantyrite","steelark","vowraith","tempoad"]},
    {score:99,bst:2775,ids:["tempoad","glorial","steelark","vowraith","dynarook","voidrake"]},
    {score:99,bst:2740,ids:["tempoad","blazekhan","steelark","mimicorp","sonarfox","sigilisk"]},
    {score:99,bst:2735,ids:["voidrake","nimbushear","vowraith","steelark","mantyrite","tempoad"]},
    {score:99,bst:2730,ids:["sigilisk","tempoad","mimicorp","steelark","pyrolynx","sonarfox"]},
    {score:99,bst:2705,ids:["tempoad","glorial","mimicorp","blazekhan","steelark","vowraith"]},
    {score:99,bst:2700,ids:["tempoad","nimbushear","glorial","steelark","vowraith","voidrake"]},
    {score:99,bst:2695,ids:["pyrolynx","tempoad","glorial","steelark","vowdojo","mimicorp"]},
    {score:99,bst:2695,ids:["pyrolynx","tempoad","glorial","steelark","vowraith","mimicorp"]},
    {score:99,bst:2665,ids:["tempoad","blazewick","sonarfox","steelark","sigilisk","mimicorp"]},
    {score:99,bst:2630,ids:["blazewick","tempoad","steelark","vowraith","glorial","mimicorp"]},
    {score:99,bst:2630,ids:["mimicorp","tempoad","vowraith","scorivault","steelark","sonarfox"]},
    {score:99,bst:2630,ids:["tempoad","blazewick","vowdojo","mimicorp","glorial","steelark"]},
    {score:99,bst:2625,ids:["steelark","tempoad","vowraith","quibshade","blazekhan","glorial"]},
    {score:99,bst:2565,ids:["raccoil","tempoad","blazekhan","sigilisk","sonarfox","steelark"]},
    {score:99,bst:2560,ids:["tempoad","steelark","vowraith","blazekhan","glorial","aurinu"]},
    {score:99,bst:2550,ids:["pyrolynx","steelark","glorial","aurinu","tempoad","vowdojo"]},
    {score:99,bst:2550,ids:["steelark","tempoad","vowraith","quibshade","blazewick","glorial"]},
    {score:99,bst:2520,ids:["tempoad","aurinu","sonarfox","steelark","blazewick","sigilisk"]},
    {score:99,bst:2485,ids:["glorial","blazewick","vowdojo","steelark","aurinu","tempoad"]},
    {score:99,bst:2485,ids:["scorivault","vowraith","tempoad","aurinu","sonarfox","steelark"]},
    {score:99,bst:2455,ids:["glorial","raccoil","blazewick","steelark","tempoad","vowdojo"]},
    {score:98,bst:2740,ids:["sonarfox","dynarook","steelark","mimicorp","tempoad","sigilisk"]},
    {score:98,bst:2740,ids:["steelark","dynarook","mimicorp","sonarfox","tempoad","vowraith"]},
    {score:98,bst:2705,ids:["mimicorp","steelark","tempoad","vowdojo","dynarook","glorial"]},
    {score:98,bst:2705,ids:["steelark","dynarook","mimicorp","glorial","tempoad","vowraith"]},
    {score:98,bst:2665,ids:["mimicorp","tempoad","nimbushear","sonarfox","steelark","sigilisk"]},
    {score:98,bst:2665,ids:["nimbushear","steelark","sonarfox","tempoad","vowraith","mimicorp"]},
    {score:98,bst:2630,ids:["glorial","vowraith","nimbushear","mimicorp","tempoad","steelark"]},
    {score:98,bst:2630,ids:["tempoad","blazewick","mimicorp","steelark","glorial","sigilisk"]},
    {score:98,bst:2630,ids:["tempoad","nimbushear","glorial","steelark","vowdojo","mimicorp"]},
    {score:98,bst:2595,ids:["steelark","glorial","scorivault","mimicorp","tempoad","sigilisk"]},
    {score:98,bst:2565,ids:["dynarook","steelark","raccoil","sonarfox","vowraith","tempoad"]},
    {score:98,bst:2560,ids:["aurinu","dynarook","glorial","vowdojo","steelark","tempoad"]},
    {score:98,bst:2560,ids:["glorial","steelark","vowraith","aurinu","tempoad","dynarook"]},
    {score:98,bst:2560,ids:["sigilisk","blazekhan","tempoad","steelark","glorial","aurinu"]},
    {score:98,bst:2550,ids:["nimbushear","steelark","vowraith","glorial","tempoad","quibshade"]},
    {score:98,bst:2530,ids:["glorial","dynarook","vowdojo","raccoil","tempoad","steelark"]},
    {score:98,bst:2530,ids:["miremaw","tempoad","steelark","vowraith","glorial","mimicorp"]},
    {score:98,bst:2520,ids:["sonarfox","sigilisk","steelark","aurinu","nimbushear","tempoad"]},
    {score:98,bst:2520,ids:["tempoad","sonarfox","vowraith","nimbushear","steelark","aurinu"]},
    {score:98,bst:2490,ids:["raccoil","tempoad","nimbushear","sonarfox","steelark","sigilisk"]},
    {score:98,bst:2490,ids:["vowraith","nimbushear","sonarfox","raccoil","tempoad","steelark"]},
    {score:98,bst:2485,ids:["vowdojo","tempoad","steelark","nimbushear","aurinu","glorial"]},
    {score:98,bst:2455,ids:["glorial","raccoil","tempoad","steelark","nimbushear","vowdojo"]},
    {score:98,bst:2455,ids:["nimbushear","raccoil","steelark","vowraith","glorial","tempoad"]},
    {score:98,bst:2420,ids:["aurinu","miremaw","steelark","sonarfox","tempoad","sigilisk"]},
    {score:98,bst:2385,ids:["aurinu","tempoad","scorivault","kelploom","vowraith","steelark"]},
    {score:98,bst:2385,ids:["tempoad","vowraith","aurinu","glorial","dojohrm","steelark"]},
    {score:98,bst:2355,ids:["vowraith","steelark","raccoil","glorial","tempoad","dojohrm"]},
    {score:97,bst:2705,ids:["steelark","glorial","dynarook","mimicorp","tempoad","sigilisk"]},
    {score:97,bst:2665,ids:["blazewick","vowraith","tempoad","sonarfox","steelark","mimicorp"]},
    {score:97,bst:2660,ids:["dynarook","tempoad","vowraith","steelark","mantyrite","quibshade"]},
    {score:97,bst:2640,ids:["dynarook","kelploom","vowraith","mimicorp","tempoad","steelark"]},
    {score:97,bst:2630,ids:["nimbushear","sigilisk","tempoad","mimicorp","glorial","steelark"]},
    {score:97,bst:2595,ids:["tempoad","steelark","sonarfox","aurinu","vowraith","blazekhan"]},
    {score:97,bst:2570,ids:["steelark","mantyrite","aurinu","solshade","tempoad","kelploom"]},
    {score:97,bst:2565,ids:["mantyrite","kelploom","vowraith","mimicorp","tempoad","steelark"]},
    {score:97,bst:2565,ids:["tempoad","vowraith","steelark","kelploom","mimicorp","blazewick"]},
    {score:97,bst:2560,ids:["glorial","aurinu","dynarook","steelark","sigilisk","tempoad"]},
    {score:97,bst:2455,ids:["glorial","steelark","tempoad","nimbushear","raccoil","sigilisk"]},
    {score:97,bst:2420,ids:["steelark","mournebloom","kelploom","aurinu","mantyrite","tempoad"]},
    {score:97,bst:2390,ids:["mournebloom","kelploom","mantyrite","raccoil","tempoad","steelark"]},
    {score:97,bst:2390,ids:["vowraith","nimbushear","kelploom","raccoil","tempoad","steelark"]},
    {score:97,bst:2385,ids:["tempoad","sigilisk","steelark","glorial","aurinu","miremaw"]},
    {score:97,bst:2225,ids:["steelark","vowraith","kelploom","dojohrm","raccoil","dunedillo"]},
    {score:96,bst:2420,ids:["vowraith","tempoad","aurinu","miremaw","sonarfox","steelark"]},
    {score:96,bst:2390,ids:["raccoil","steelark","tempoad","miremaw","vowraith","sonarfox"]},
    {score:95,bst:2880,ids:["tempoad","cindergill","sigilisk","sonarfox","venomandrake","mimicorp"]},
    {score:95,bst:2845,ids:["venomandrake","cindergill","tempoad","mimicorp","vowraith","glorial"]},
    {score:95,bst:2795,ids:["mimicorp","tempoad","vowraith","venomandrake","pyrolynx","glorial"]},
    {score:95,bst:2780,ids:["sigilisk","cindergill","mycogrin","mimicorp","tempoad","sonarfox"]},
    {score:95,bst:2780,ids:["sonarfox","mimicorp","mycogrin","cindergill","vowraith","tempoad"]},
    {score:95,bst:2765,ids:["mimicorp","sonarfox","blazewick","tempoad","sigilisk","venomandrake"]},
    {score:95,bst:2745,ids:["cindergill","mimicorp","glorial","vowraith","tempoad","mycogrin"]},
    {score:95,bst:2740,ids:["auracarap","miremaw","vowraith","mimicorp","sonarfox","luminray"]},
    {score:95,bst:2740,ids:["sonarfox","luminray","auracarap","sigilisk","mimicorp","miremaw"]},
    {score:95,bst:2740,ids:["steelark","dynarook","vowraith","mimicorp","mantyrite","tempoad"]},
    {score:95,bst:2735,ids:["vowraith","sonarfox","aurinu","tempoad","venomandrake","cindergill"]},
    {score:95,bst:2730,ids:["venomandrake","glorial","vowraith","mimicorp","tempoad","blazewick"]},
    {score:95,bst:2715,ids:["venomandrake","tempoad","pyrolynx","quibshade","glorial","vowraith"]},
    {score:95,bst:2705,ids:["tempoad","cindergill","sigilisk","venomandrake","sonarfox","raccoil"]},
    {score:95,bst:2695,ids:["tempoad","ashquack","venomandrake","mimicorp","glorial","vowraith"]},
    {score:95,bst:2685,ids:["aurinu","sigilisk","venomandrake","pyrolynx","tempoad","sonarfox"]},
    {score:95,bst:2675,ids:["sonarfox","steelark","vowraith","mimicorp","dunedillo","dynarook"]},
    {score:95,bst:2665,ids:["glorial","quibshade","cindergill","vowraith","tempoad","mycogrin"]},
    {score:95,bst:2665,ids:["steelark","tempoad","nimbushear","mantyrite","mimicorp","vowdojo"]},
    {score:95,bst:2655,ids:["raccoil","venomandrake","sigilisk","sonarfox","tempoad","pyrolynx"]},
    {score:95,bst:2650,ids:["tempoad","aurinu","venomandrake","vowraith","glorial","pyrolynx"]},
    {score:95,bst:2635,ids:["sonarfox","vowraith","tempoad","mycogrin","aurinu","cindergill"]},
    {score:95,bst:2630,ids:["mycogrin","tempoad","glorial","blazewick","mimicorp","vowraith"]},
    {score:95,bst:2625,ids:["luminray","quibshade","glorial","auracarap","vowraith","miremaw"]},
    {score:95,bst:2600,ids:["nimbushear","mimicorp","sonarfox","dunedillo","vowraith","steelark"]},
    {score:95,bst:2595,ids:["luminray","vowraith","auracarap","sonarfox","miremaw","aurinu"]},
    {score:95,bst:2595,ids:["miremaw","luminray","auracarap","sonarfox","sigilisk","aurinu"]},
    {score:95,bst:2595,ids:["vowraith","ashquack","mimicorp","glorial","mycogrin","tempoad"]}
  ];
  function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
  function getLumen(id){var side=document.querySelector('.sidebar .side-item[data-id="'+id+'"]'),detail=document.querySelector('.detail-view[data-id="'+id+'"]');if(!side||!detail)return null;var name=((side.querySelector('.side-name')||detail.querySelector('.entry-name')||{}).textContent||id).trim();var types=(side.dataset.types||detail.dataset.types||'').split(/\s+/).filter(Boolean);var img=(side.querySelector('.side-thumb')||detail.querySelector('.entry-thumb')||{}).src||'';return {id:id,name:name,types:types,img:img}}
  function isFinalOrStandalone(id){var detail=document.querySelector('.detail-view[data-id="'+id+'"]');if(!detail)return false;var panel=[].slice.call(detail.querySelectorAll('.panel')).find(function(p){var h=p.querySelector('h4');return h&&h.textContent.trim()==='Evolution Line'});if(!panel)return true;var names=[].slice.call(panel.querySelectorAll('.evo-name')).map(function(n){return n.textContent.trim()});var current=((detail.querySelector('.entry-name')||{}).textContent||'').trim();return names.length<=1||names[names.length-1]===current}
  function loadTeam(ids,button){var search=document.getElementById('team-builder-search'),clear=document.getElementById('team-builder-clear');if(search){search.value='';search.dispatchEvent(new Event('input',{bubbles:true}))}if(clear)clear.click();ids.forEach(function(id){var add=document.querySelector('#team-builder-list [data-tb-add="'+id+'"]');if(add&&!add.disabled)add.click()});document.querySelectorAll('.top-team-use.loaded').forEach(function(b){b.classList.remove('loaded');b.textContent='Use This Team'});button.classList.add('loaded');button.textContent='✓ Team Loaded';var slots=document.getElementById('team-builder-slots');if(slots)slots.scrollIntoView({behavior:'smooth',block:'nearest'})}
  function install(){
    var section=document.querySelector('.team-builder-analysis');if(!section||document.getElementById('top-team-compositions'))return;
    var ranked=TEAMS.filter(function(t){return t.ids.length===6&&t.ids.every(isFinalOrStandalone)}).map(function(team,index){return {team:team,rank:index+1,members:team.ids.map(getLumen).filter(Boolean)}}),pageSize=100,page=1;
    var scores=[].slice.call(new Set(ranked.map(function(x){return x.team.score}))).sort(function(a,b){return b-a});
    var box=document.createElement('details');box.id='top-team-compositions';box.className='panel top-team-compositions';box.open=true;
    box.innerHTML='<summary><span class="top-team-title">Top 100 Best Team Compositions<small>Final evolutions and standalone Lumens only</small></span></summary><div class="top-team-controls"><input class="top-team-search" type="search" placeholder="Search by Lumen name..." aria-label="Search team compositions"><select class="top-team-score-filter" aria-label="Filter by score"><option value="">All balance scores</option>'+scores.map(function(s){return '<option value="'+s+'">'+s+'/100 score</option>'}).join('')+'</select></div><div class="top-team-results"></div><div class="top-team-list"></div><div class="top-team-pagination"><button type="button" class="top-team-page-btn top-team-prev">Previous</button><span class="top-team-page-info"></span><button type="button" class="top-team-page-btn top-team-next">Next</button></div><p class="top-team-method"><b>Ranking:</b> Team Balance Score first, then combined base-stat total. All teams use only the last listed member of each evolution line or no-evolution Lumens. Standalone Lumens such as Indexowl are eligible when their calculated ranking reaches the Top 100.</p>';
    var list=box.querySelector('.top-team-list'),query=box.querySelector('.top-team-search'),filter=box.querySelector('.top-team-score-filter'),results=box.querySelector('.top-team-results'),info=box.querySelector('.top-team-page-info'),prev=box.querySelector('.top-team-prev'),next=box.querySelector('.top-team-next');
    function card(x,first){return '<article class="top-team-card '+(first?'best-visible':'')+'"><div class="top-team-card-head"><span class="top-team-rank">#'+x.rank+'</span><span class="top-team-metrics"><span class="top-team-metric '+(x.team.score===100?'perfect':'')+'">'+x.team.score+'/100</span><span class="top-team-metric">BST '+x.team.bst+'</span></span></div><div class="top-team-members">'+x.members.map(function(m){return '<div class="top-team-member"><img src="'+esc(m.img)+'" alt=""><span class="top-team-member-copy"><span class="top-team-member-name">'+esc(m.name)+'</span><span class="top-team-member-types">'+esc(m.types.join(' / '))+'</span></span></div>'}).join('')+'</div><button class="top-team-use" type="button" data-top-team-rank="'+(x.rank-1)+'">Use This Team</button></article>'}
    function render(){var q=query.value.trim().toLowerCase(),score=filter.value;var found=ranked.filter(function(x){return (!score||String(x.team.score)===score)&&(!q||x.members.some(function(m){return m.name.toLowerCase().includes(q)}))});var pages=Math.max(1,Math.ceil(found.length/pageSize));page=Math.min(page,pages);var slice=found.slice((page-1)*pageSize,page*pageSize);list.innerHTML=slice.length?slice.map(function(x,i){return card(x,i===0)}).join(''):'<div class="top-team-empty">No team compositions match these filters.</div>';results.textContent=found.length+' of '+ranked.length+' teams';info.textContent='Page '+page+' of '+pages;prev.disabled=page<=1;next.disabled=page>=pages}
    query.addEventListener('input',function(){page=1;render()});filter.addEventListener('change',function(){page=1;render()});prev.addEventListener('click',function(){if(page>1){page--;render();box.scrollIntoView({behavior:'smooth',block:'start'})}});next.addEventListener('click',function(){page++;render();box.scrollIntoView({behavior:'smooth',block:'start'})});box.addEventListener('click',function(e){var b=e.target.closest('[data-top-team-rank]');if(!b)return;var x=ranked[+b.dataset.topTeamRank];if(x)loadTeam(x.team.ids,b)});
    var upgrade=document.getElementById('team-builder-upgrade');if(upgrade)upgrade.insertAdjacentElement('beforebegin',box);else section.appendChild(box);render();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();
