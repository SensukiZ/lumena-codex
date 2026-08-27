(function(){
  'use strict';
  if(window.__automaticTeamCoachInstalled)return;window.__automaticTeamCoachInstalled=true;
  function esc(v){return String(v==null?'':v).replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
  function memberData(id){
    var side=document.querySelector('.side-item[data-id="'+id+'"]'),detail=document.querySelector('.detail-view[data-id="'+id+'"]');if(!side||!detail)return null;
    var stats={};detail.querySelectorAll('.stat-row').forEach(function(row){var k=row.querySelector('.stat-label'),v=row.querySelector('.stat-val');if(k&&v)stats[k.textContent.trim()]=parseInt(v.textContent,10)||0});
    return{id:id,name:((side.querySelector('.side-name')||{}).textContent||id).trim(),types:(side.dataset.types||'').split(/\s+/).filter(Boolean),stats:stats};
  }
  function cardValues(upgrade,title){var card=Array.from(upgrade.querySelectorAll('.tb-upgrade-card')).find(function(x){var h=x.querySelector('.tb-upgrade-title');return h&&h.textContent.trim()===title});return card?Array.from(card.querySelectorAll('.type-chip')).map(function(x){return x.textContent.trim()}).filter(Boolean):[]}
  function role(m){var s=m.stats,atk=s.Attack||0,spa=s['Sp. Attack']||0,bulk=(s.HP||0)+(s.Defense||0)+(s['Sp. Defense']||0),speed=s.Speed||0;if(bulk>=270)return'Tank';if(speed>=105&&Math.max(atk,spa)>=90)return'Fast attacker';if(Math.max(atk,spa)>=110)return'Power attacker';if(bulk>=230)return'Bulky support';return atk>spa+8?'Physical attacker':spa>atk+8?'Special attacker':'Balanced'}
  function install(){
    var section=document.querySelector('.team-builder-analysis'),upgrade=document.getElementById('team-builder-upgrade'),slots=document.getElementById('team-builder-slots');if(!section||!upgrade||!slots)return false;
    var heading=section.querySelector(':scope > .team-builder-section-title');if(heading)heading.textContent='Team Coach';
    var oldAnalysis=document.getElementById('team-builder-analysis'),bottom=document.getElementById('team-analysis-bottom');
    if(!bottom){bottom=document.createElement('div');bottom.id='team-analysis-bottom';bottom.className='team-analysis-bottom';bottom.innerHTML='<h4 class="team-builder-section-title">Team Analysis</h4>';section.appendChild(bottom)}
    if(oldAnalysis&&oldAnalysis.parentNode!==bottom)bottom.appendChild(oldAnalysis);
    var coach=document.getElementById('automatic-team-coach');if(!coach){coach=document.createElement('section');coach.id='automatic-team-coach';coach.className='automatic-team-coach'}
    if(heading)heading.insertAdjacentElement('afterend',coach);else section.insertBefore(coach,section.firstChild);
    var averageSlot=document.getElementById('average-team-stats-slot');if(!averageSlot){averageSlot=document.createElement('div');averageSlot.id='average-team-stats-slot';averageSlot.className='average-team-stats-slot';coach.insertAdjacentElement('afterend',averageSlot)}
    section.appendChild(bottom);
    function render(){
      var ids=Array.from(slots.querySelectorAll('[data-tb-remove]')).map(function(b){return b.dataset.tbRemove}).filter(Boolean),members=ids.map(memberData).filter(Boolean);
      var averageCard=oldAnalysis?Array.from(oldAnalysis.querySelectorAll('.tb-analysis-card')).find(function(card){var title=card.querySelector('.tb-analysis-title');return title&&title.textContent.trim()==='Average Base Stats'}):null;
      if(averageCard){averageSlot.innerHTML='';averageSlot.appendChild(averageCard)}else if(!members.length)averageSlot.innerHTML='';
      if(!members.length){coach.innerHTML='<div class="automatic-team-coach-head"><h4 class="automatic-team-coach-title">Automatic Team Coach</h4><span class="automatic-team-coach-live">Live</span></div><p class="automatic-team-coach-verdict">Add Lumens to receive automatic comments about the team’s roles, speed, offense, STAB variety, and most important improvement.</p>';return}
      var scoreEl=upgrade.querySelector('.tb-upgrade-score'),score=scoreEl?parseInt(scoreEl.textContent,10):null,defGaps=cardValues(upgrade,'Defensive Coverage Gaps'),moveGaps=cardValues(upgrade,'Actual Move Coverage Gaps'),critical=cardValues(upgrade,'Critical Shared Weaknesses');
      var roles={};members.forEach(function(m){var r=role(m);roles[r]=(roles[r]||0)+1});var roleText=Object.keys(roles).map(function(r){return roles[r]+' '+r.toLowerCase()+(roles[r]>1?'s':'')}).join(', ');
      var physical=members.filter(function(m){return(m.stats.Attack||0)>(m.stats['Sp. Attack']||0)+8}).length,special=members.filter(function(m){return(m.stats['Sp. Attack']||0)>(m.stats.Attack||0)+8}).length,balanced=members.length-physical-special;
      var avgSpeed=Math.round(members.reduce(function(n,m){return n+(m.stats.Speed||0)},0)/members.length),stab=Array.from(new Set([].concat.apply([],members.map(function(m){return m.types}))));
      var verdict=members.length<6?'The team has '+members.length+' of 6 members. Add '+(6-members.length)+' more before treating the score as final.':score>=85?'This is a well-balanced full team with only small matchup concerns.':score>=70?'This full team is solid, but a few matchups still need support.':score>=50?'This team can work, although its shared weaknesses and coverage gaps require careful play.':'This team needs better defensive overlap and wider move coverage.';
      var offense=physical>special?'The roster leans physical ('+physical+' physical, '+special+' special, '+balanced+' balanced).':special>physical?'The roster leans special ('+special+' special, '+physical+' physical, '+balanced+' balanced).':'Physical and special roles are evenly represented.';
      var speed=avgSpeed>=95?'Average Speed is '+avgSpeed+', so the team should pressure many opponents early.':avgSpeed>=70?'Average Speed is '+avgSpeed+'. It has moderate pace, but faster opponents may still move first.':'Average Speed is '+avgSpeed+'. Bulky play, priority, or Speed control will be valuable.';
      var suggestion=critical.length?'Prioritize a member that resists '+critical[0]+' because it is currently a shared weakness.':defGaps.length?'Add a safe switch-in for '+defGaps[0]+' attacks.':moveGaps.length?'Add a damaging move that covers '+moveGaps[0]+' opponents.':'The matchup structure is healthy; refine moves and held items for the opponents you expect.';
      coach.innerHTML='<div class="automatic-team-coach-head"><h4 class="automatic-team-coach-title">Automatic Team Coach</h4><span class="automatic-team-coach-live">Live'+(Number.isFinite(score)?' · '+score+'/100':'')+'</span></div><p class="automatic-team-coach-verdict">'+esc(verdict)+'</p><div class="automatic-team-coach-grid"><div class="automatic-team-coach-comment"><b>Team roles</b><span>'+esc(roleText||'Roles will appear as members are added.')+'</span></div><div class="automatic-team-coach-comment"><b>Attack balance</b><span>'+esc(offense)+'</span></div><div class="automatic-team-coach-comment"><b>Speed check</b><span>'+esc(speed)+'</span></div><div class="automatic-team-coach-comment"><b>STAB variety</b><span>'+esc(stab.length+' unique STAB types: '+stab.join(', ')+'.')+'</span></div></div><div class="automatic-team-coach-suggestion"><strong>Coach suggestion:</strong> '+esc(suggestion)+'</div>';
    }
    var queued=false;function schedule(){if(queued)return;queued=true;requestAnimationFrame(function(){queued=false;render()})}
    new MutationObserver(schedule).observe(slots,{childList:true,subtree:true});new MutationObserver(schedule).observe(upgrade,{childList:true,subtree:true});render();return true;
  }
  function start(){if(install())return;var tries=0,t=setInterval(function(){tries++;if(install()||tries>80)clearInterval(t)},50)}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
