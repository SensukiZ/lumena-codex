(function(){
  const TYPES=['Normal','Fire','Water','Electric','Grass','Ice','Fighting','Poison','Ground','Flying','Psychic','Bug','Rock','Ghost','Dragon','Dark','Steel','Fairy'];
  const COLORS={Normal:'#B9B6A9',Fire:'#E8703A',Water:'#4E9BD9',Electric:'#E0BE3C',Grass:'#6FBE6E',Ice:'#7FD6D6',Fighting:'#C1554A',Poison:'#A45FC1',Ground:'#C7A15C',Flying:'#9FB6E8',Psychic:'#E86FA3',Bug:'#9AC13A',Rock:'#B0A06A',Ghost:'#8577D6',Dragon:'#6F7FE8',Dark:'#8A8896',Steel:'#9FB0BF',Fairy:'#E896C7'};
  const FX={
    Normal:{Rock:.5,Ghost:0,Steel:.5},Fire:{Fire:.5,Water:.5,Grass:2,Ice:2,Bug:2,Rock:.5,Dragon:.5,Steel:2},Water:{Fire:2,Water:.5,Grass:.5,Ground:2,Rock:2,Dragon:.5},Electric:{Water:2,Electric:.5,Grass:.5,Ground:0,Flying:2,Dragon:.5},Grass:{Fire:.5,Water:2,Grass:.5,Poison:.5,Ground:2,Flying:.5,Bug:.5,Rock:2,Dragon:.5,Steel:.5},Ice:{Fire:.5,Water:.5,Grass:2,Ice:.5,Ground:2,Flying:2,Dragon:2,Steel:.5},Fighting:{Normal:2,Ice:2,Poison:.5,Flying:.5,Psychic:.5,Bug:.5,Rock:2,Ghost:0,Dark:2,Steel:2,Fairy:.5},Poison:{Grass:2,Poison:.5,Ground:.5,Rock:.5,Ghost:.5,Steel:0,Fairy:2},Ground:{Fire:2,Electric:2,Grass:.5,Poison:2,Flying:0,Bug:.5,Rock:2,Steel:2},Flying:{Electric:.5,Grass:2,Fighting:2,Bug:2,Rock:.5,Steel:.5},Psychic:{Fighting:2,Poison:2,Psychic:.5,Steel:.5},Bug:{Fire:.5,Grass:2,Fighting:.5,Poison:.5,Flying:.5,Psychic:2,Ghost:.5,Dark:2,Steel:.5,Fairy:.5},Rock:{Fire:2,Ice:2,Fighting:.5,Ground:.5,Flying:2,Bug:2,Steel:.5},Ghost:{Normal:0,Psychic:2,Ghost:2,Dark:.5},Dragon:{Dragon:2,Steel:.5,Fairy:0},Dark:{Fighting:.5,Psychic:2,Ghost:2,Dark:.5,Fairy:.5},Steel:{Fire:.5,Water:.5,Electric:.5,Ice:2,Rock:2,Steel:.5,Fairy:2},Fairy:{Fire:.5,Poison:.5,Steel:.5,Fighting:2,Dragon:2,Dark:2}
  };
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const mult=(attack,defend)=>Object.prototype.hasOwnProperty.call(FX[attack]||{},defend)?FX[attack][defend]:1;
  const against=(types,attack)=>types.reduce((n,t)=>n*mult(attack,t),1);
  const items=Array.from(document.querySelectorAll('.side-item[data-id]'));
  const lumens=items.map(item=>{
    const id=item.dataset.id, detail=document.querySelector('.detail-view[data-id="'+CSS.escape(id)+'"]');
    const img=item.querySelector('img.side-thumb')?.src || detail?.querySelector('.entry-thumb')?.src || '';
    const name=item.querySelector('.side-name')?.textContent.trim() || detail?.querySelector('.entry-name')?.textContent.trim() || id;
    const types=(item.dataset.types||'').split(/\s+/).filter(t=>TYPES.includes(t));
    const vals=detail?Array.from(detail.querySelectorAll('.stat-row')).map(r=>({label:r.querySelector('.stat-label')?.textContent.trim(),value:Number(r.querySelector('.stat-val')?.textContent.trim())||0})):[];
    const stats={}; vals.forEach(x=>stats[x.label]=x.value);
    return {id,num:item.dataset.num||'',name,types,img,stats};
  });
  const byId=Object.fromEntries(lumens.map(x=>[x.id,x]));
  let team=[];
  try{
    const incoming=new URLSearchParams(location.search).get('team');
    if(incoming){
      team=incoming.split(',').map(s=>s.trim()).filter(id=>byId[id]).slice(0,6);
      localStorage.setItem('lumenaTeamBuilder',JSON.stringify(team));
    }else{
      const saved=JSON.parse(localStorage.getItem('lumenaTeamBuilder')||'[]');
      if(Array.isArray(saved)) team=saved.filter(id=>byId[id]).slice(0,6);
    }
  }catch(e){}
  let query='';
  const overlay=document.getElementById('team-builder-overlay'), toggle=document.getElementById('team-builder-toggle-btn'), close=document.getElementById('team-builder-close'), search=document.getElementById('team-builder-search'), list=document.getElementById('team-builder-list'), slots=document.getElementById('team-builder-slots'), analysis=document.getElementById('team-builder-analysis'), count=document.getElementById('team-builder-count'), clear=document.getElementById('team-builder-clear');
  if(!overlay||!toggle) return;
  function chips(types){return types.map(t=>'<span class="type-chip small team-builder-unified-type" style="--tc:'+COLORS[t]+'">'+esc(t)+'</span>').join('')}
  function save(){try{localStorage.setItem('lumenaTeamBuilder',JSON.stringify(team))}catch(e){}}
  function renderList(){
    const q=query.trim().toLowerCase();
    const filtered=lumens.filter(x=>!q||x.name.toLowerCase().includes(q)||String(x.num).includes(q)||x.types.some(t=>t.toLowerCase().includes(q)));
    list.innerHTML=filtered.map(x=>'<button type="button" class="team-builder-option'+(team.includes(x.id)?' selected':'')+'" data-tb-add="'+esc(x.id)+'" '+(team.includes(x.id)||team.length>=6?'disabled':'')+'><img src="'+esc(x.img)+'" alt=""><span class="team-builder-option-identity"><span class="team-builder-option-num">#'+String(x.num||'').replace(/\D/g,'').padStart(3,'0')+'</span><span class="team-builder-option-name">'+esc(x.name)+'</span></span><span class="team-builder-option-types">'+chips(x.types)+'</span></button>').join('');
  }
  function renderSlots(){
    let html='';
    for(let i=0;i<6;i++){
      const x=byId[team[i]];
      if(x) html+='<div class="team-builder-slot filled" style="--tc:'+(COLORS[x.types[0]]||'#667085')+'"><button type="button" class="team-builder-remove" data-tb-remove="'+esc(x.id)+'" title="Remove">✕</button><img src="'+esc(x.img)+'" alt="'+esc(x.name)+'"><div class="team-builder-slot-name">'+esc(x.name)+'</div><div class="team-builder-slot-types">'+chips(x.types)+'</div></div>';
      else html+='<div class="team-builder-slot"><span class="team-builder-empty">Empty Slot '+(i+1)+'</span></div>';
    }
    slots.innerHTML=html; count.innerHTML='<b>'+team.length+'</b> / 6 Lumens';
  }
  function renderAnalysis(){
    if(!team.length){analysis.innerHTML='<div class="tb-analysis-card wide"><div class="tb-neutral-note">Add Lumens to analyze the team.</div></div>';return}
    const selected=team.map(id=>byId[id]).filter(Boolean);
    const defense=TYPES.map(type=>{const vals=selected.map(x=>against(x.types,type));return {type,weak:vals.filter(v=>v>1).length,resist:vals.filter(v=>v<1).length,immune:vals.filter(v=>v===0).length,max:Math.max(...vals)}});
    const weak=defense.filter(x=>x.weak>0).sort((a,b)=>b.weak-a.weak||b.max-a.max||TYPES.indexOf(a.type)-TYPES.indexOf(b.type));
    const repeated=weak.filter(x=>x.weak>=2);
    const safe=defense.filter(x=>x.resist>0||x.immune>0).sort((a,b)=>(b.immune*10+b.resist)-(a.immune*10+a.resist));
    const teamTypes=[...new Set(selected.flatMap(x=>x.types))];
    const coverage=TYPES.filter(def=>teamTypes.some(atk=>mult(atk,def)>1));
    const statNames=['HP','Attack','Defense','Sp. Attack','Sp. Defense','Speed'];
    const averages=statNames.map(s=>{const vals=selected.map(x=>x.stats[s]).filter(Number.isFinite);return [s,vals.length?Math.round(vals.reduce((a,b)=>a+b,0)/vals.length):0]});
    const matchup=(x,kind)=>'<span class="tb-matchup '+kind+'"><span class="type-chip small team-builder-unified-type" style="--tc:'+COLORS[x.type]+'">'+esc(x.type)+'</span><strong>'+x.weak+' weak</strong>'+(x.immune?' · '+x.immune+' immune':x.resist?' · '+x.resist+' resist':'')+'</span>';
    let html='<div class="tb-analysis-card"><div class="tb-analysis-title">Shared Weaknesses</div><div class="tb-chip-wrap">'+(weak.length?weak.map(x=>matchup(x,x.weak>=2?'tb-danger':'')).join(''):'<span class="tb-neutral-note">No weaknesses detected.</span>')+'</div></div>';
    html+='<div class="tb-analysis-card"><div class="tb-analysis-title">Duplicate Weakness Alert</div><div class="tb-chip-wrap">'+(repeated.length?repeated.map(x=>matchup(x,'tb-danger')).join(''):'<span class="tb-neutral-note">Good balance — no type is super-effective against 2 or more team members.</span>')+'</div></div>';
    html+='<div class="tb-analysis-card"><div class="tb-analysis-title">Resistances / Immunities</div><div class="tb-chip-wrap">'+(safe.length?safe.map(x=>'<span class="tb-matchup tb-safe"><span class="type-chip small team-builder-unified-type" style="--tc:'+COLORS[x.type]+'">'+esc(x.type)+'</span>'+(x.immune?'<strong>'+x.immune+' immune</strong>':'')+(x.resist?' '+x.resist+' resist':'')+'</span>').join(''):'<span class="tb-neutral-note">No resistances detected.</span>')+'</div></div>';
    html+='<div class="tb-analysis-card"><div class="tb-analysis-title">Offensive Type Coverage</div><div class="tb-chip-wrap">'+coverage.map(t=>'<span class="type-chip small team-builder-unified-type" style="--tc:'+COLORS[t]+'">'+esc(t)+'</span>').join('')+'</div><div class="tb-neutral-note" style="margin-top:7px">Team STAB types can hit '+coverage.length+' / '+TYPES.length+' defending types super effectively.</div></div>';
    html+='<div class="tb-analysis-card wide"><div class="tb-analysis-title">Average Base Stats</div><div class="tb-stats">'+averages.map(([s,v])=>'<div class="tb-stat"><span>'+esc(s)+'</span><b>'+v+'</b></div>').join('')+'</div></div>';
    analysis.innerHTML=html;
  }
  function render(){renderList();renderSlots();renderAnalysis();save()}
  function open(){render();overlay.classList.add('open');overlay.setAttribute('aria-hidden','false');setTimeout(()=>search&&search.focus(),0)}
  function shut(){overlay.classList.remove('open');overlay.setAttribute('aria-hidden','true')}
  toggle.addEventListener('click',open); close.addEventListener('click',shut); overlay.addEventListener('click',e=>{if(e.target===overlay)shut()});
  search.addEventListener('input',()=>{query=search.value;renderList()});
  list.addEventListener('click',e=>{const b=e.target.closest('[data-tb-add]');if(!b||b.disabled||team.length>=6)return;if(!team.includes(b.dataset.tbAdd)){team.push(b.dataset.tbAdd);render()}});
  slots.addEventListener('click',e=>{const b=e.target.closest('[data-tb-remove]');if(!b)return;team=team.filter(id=>id!==b.dataset.tbRemove);render()});
  clear.addEventListener('click',()=>{team=[];render()});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&overlay.classList.contains('open'))shut()});
})();
