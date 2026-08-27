(function(){
  'use strict';
  if(window.__lumenaCompanionUpgrade) return;
  window.__lumenaCompanionUpgrade=true;

  const TYPES=['Normal','Fire','Water','Electric','Grass','Ice','Fighting','Poison','Ground','Flying','Psychic','Bug','Rock','Ghost','Dragon','Dark','Steel','Fairy'];
  const COLORS={Normal:'#B9B6A9',Fire:'#E8703A',Water:'#4E9BD9',Electric:'#E0BE3C',Grass:'#6FBE6E',Ice:'#7FD6D6',Fighting:'#C1554A',Poison:'#A45FC1',Ground:'#C7A15C',Flying:'#9FB6E8',Psychic:'#E86FA3',Bug:'#9AC13A',Rock:'#B0A06A',Ghost:'#8577D6',Dragon:'#6F7FE8',Dark:'#8A8896',Steel:'#9FB0BF',Fairy:'#E896C7'};
  const FX={
    Normal:{Rock:.5,Ghost:0,Steel:.5},Fire:{Fire:.5,Water:.5,Grass:2,Ice:2,Bug:2,Rock:.5,Dragon:.5,Steel:2},Water:{Fire:2,Water:.5,Grass:.5,Ground:2,Rock:2,Dragon:.5},Electric:{Water:2,Electric:.5,Grass:.5,Ground:0,Flying:2,Dragon:.5},Grass:{Fire:.5,Water:2,Grass:.5,Poison:.5,Ground:2,Flying:.5,Bug:.5,Rock:2,Dragon:.5,Steel:.5},Ice:{Fire:.5,Water:.5,Grass:2,Ice:.5,Ground:2,Flying:2,Dragon:2,Steel:.5},Fighting:{Normal:2,Ice:2,Poison:.5,Flying:.5,Psychic:.5,Bug:.5,Rock:2,Ghost:0,Dark:2,Steel:2,Fairy:.5},Poison:{Grass:2,Poison:.5,Ground:.5,Rock:.5,Ghost:.5,Steel:0,Fairy:2},Ground:{Fire:2,Electric:2,Grass:.5,Poison:2,Flying:0,Bug:.5,Rock:2,Steel:2},Flying:{Electric:.5,Grass:2,Fighting:2,Bug:2,Rock:.5,Steel:.5},Psychic:{Fighting:2,Poison:2,Psychic:.5,Steel:.5},Bug:{Fire:.5,Grass:2,Fighting:.5,Poison:.5,Flying:.5,Psychic:2,Ghost:.5,Dark:2,Steel:.5,Fairy:.5},Rock:{Fire:2,Ice:2,Fighting:.5,Ground:.5,Flying:2,Bug:2,Steel:.5},Ghost:{Normal:0,Psychic:2,Ghost:2,Dark:.5},Dragon:{Dragon:2,Steel:.5,Fairy:0},Dark:{Fighting:.5,Psychic:2,Ghost:2,Dark:.5,Fairy:.5},Steel:{Fire:.5,Water:.5,Electric:.5,Ice:2,Rock:2,Steel:.5,Fairy:2},Fairy:{Fire:.5,Poison:.5,Steel:.5,Fighting:2,Dragon:2,Dark:2}
  };
  const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const mult=(a,d)=>Object.prototype.hasOwnProperty.call(FX[a]||{},d)?FX[a][d]:1;
  const against=(types,attack)=>types.reduce((n,t)=>n*mult(attack,t),1);
  const sideItems=Array.from(document.querySelectorAll('.sidebar .side-item[data-id]:not(.route-codex-item)'));
  const details=Array.from(document.querySelectorAll('.detail-view[data-id]'));
  const detailById=Object.fromEntries(details.map(d=>[d.dataset.id,d]));
  const sideById=Object.fromEntries(sideItems.map(s=>[s.dataset.id,s]));

  function lumenData(id){
    const item=sideById[id], detail=detailById[id];
    if(!item||!detail) return null;
    const types=(item.dataset.types||detail.dataset.types||'').split(/\s+/).filter(t=>TYPES.includes(t));
    const stats={};
    detail.querySelectorAll('.stat-row').forEach(r=>{
      const k=r.querySelector('.stat-label')?.textContent.trim();
      const v=Number(r.querySelector('.stat-val')?.textContent.trim());
      if(k && Number.isFinite(v)) stats[k]=v;
    });
    return {
      id,
      name:item.querySelector('.side-name')?.textContent.trim()||detail.querySelector('.entry-name')?.textContent.trim()||id,
      num:item.dataset.num||detail.dataset.num||'',
      img:item.querySelector('.side-thumb')?.src||detail.querySelector('.entry-thumb')?.src||'',
      types,stats
    };
  }
  const ALL_LUMENS=sideItems.map(x=>lumenData(x.dataset.id)).filter(Boolean);

  function typeChip(type,extra,text){
    return '<span class="exact-type-wrap '+(extra||'')+'"><span class="type-chip small" style="--tc:'+(COLORS[type]||'#777')+'">'+esc(type)+'</span>'+(text?'<strong class="exact-type-extra">'+esc(text)+'</strong>':'')+'</span>';
  }

  /* ==================== LUMEN MATCHUP PAGE ==================== */
  function installMatchups(){
    details.forEach(detail=>{
      if(detail.querySelector('.lumen-matchup-panel')) return;
      const types=(detail.dataset.types||'').split(/\s+/).filter(t=>TYPES.includes(t));
      if(!types.length) return;

      const defensive=TYPES.map(atk=>({type:atk,m:against(types,atk)}));
      const weak=defensive.filter(x=>x.m>1).sort((a,b)=>b.m-a.m);
      const resist=defensive.filter(x=>x.m>0&&x.m<1).sort((a,b)=>a.m-b.m);
      const immune=defensive.filter(x=>x.m===0);
      const strong=TYPES.filter(def=>types.some(atk=>mult(atk,def)>1));
      const resisted=TYPES.filter(def=>types.every(atk=>mult(atk,def)<1 || mult(atk,def)===0));

      const panel=document.createElement('div');
      panel.className='panel lumen-matchup-panel';
      panel.innerHTML=
        '<h4>Matchup Overview</h4>'+
        '<div class="lumen-matchup-grid">'+
          '<div class="lumen-matchup-box"><div class="lumen-matchup-label">Weak To</div><div class="lumen-matchup-chips">'+
            (weak.length?weak.map(x=>typeChip(x.type,'danger',x.m+'×')).join(''):'<span class="lumen-matchup-empty">No weaknesses.</span>')+
          '</div></div>'+
          '<div class="lumen-matchup-box"><div class="lumen-matchup-label">Resists</div><div class="lumen-matchup-chips">'+
            (resist.length?resist.map(x=>typeChip(x.type,'safe',x.m+'×')).join(''):'<span class="lumen-matchup-empty">No resistances.</span>')+
          '</div></div>'+
          '<div class="lumen-matchup-box"><div class="lumen-matchup-label">Immune To</div><div class="lumen-matchup-chips">'+
            (immune.length?immune.map(x=>typeChip(x.type,'safe','0×')).join(''):'<span class="lumen-matchup-empty">No immunities.</span>')+
          '</div></div>'+
          '<div class="lumen-matchup-box"><div class="lumen-matchup-label">STAB Strong Against</div><div class="lumen-matchup-chips">'+
            (strong.length?strong.map(x=>typeChip(x,'','2×')).join(''):'<span class="lumen-matchup-empty">No super-effective STAB matchups.</span>')+
          '</div></div>'+
          '<div class="lumen-matchup-box wide"><div class="lumen-matchup-label">STAB Coverage Problems</div><div class="lumen-matchup-chips">'+
            (resisted.length?resisted.map(x=>typeChip(x,'danger','')).join(''):'<span class="lumen-matchup-empty">No single-type defender resists every STAB type.</span>')+
          '</div></div>'+
        '</div>';

      const coverage=detail.querySelector('.move-coverage-panel');
      const location=detail.querySelector('.lumen-location-panel');
      if(coverage) coverage.insertAdjacentElement('beforebegin',panel);
      else if(location) location.insertAdjacentElement('beforebegin',panel);
      else {
        const design=detail.querySelector('.design-note');
        if(design) design.insertAdjacentElement('beforebegin',panel); else detail.appendChild(panel);
      }
    });
  }

  /* ==================== MOVE DATABASE + COMPARISON ==================== */
  function buildMoveDB(){
    const db=new Map();
    details.forEach(detail=>{
      const owner=detail.querySelector('.entry-name')?.textContent.trim()||detail.dataset.id;
      detail.querySelectorAll('.move-chip').forEach(chip=>{
        const title=(chip.getAttribute('title')||'').trim();
        if(!title) return;
        const lines=title.split(/\r?\n/);
        const first=(lines.shift()||'').trim();
        const parts=first.split('·').map(x=>x.trim());
        if(parts.length<3) return;
        const name=parts[0], type=parts[1], category=parts[2];
        if(!name||!TYPES.includes(type)) return;
        let power='—',acc='—',pp='—';
        parts.slice(3).forEach(p=>{
          let m;
          if((m=p.match(/^Pow\s+(.+)$/i))) power=m[1];
          else if((m=p.match(/^Acc\s+(.+)$/i))) acc=m[1];
          else if((m=p.match(/^PP\s+(.+)$/i))) pp=m[1];
        });
        const effect=lines.join(' ').trim();
        const key=name.toLowerCase();
        if(!db.has(key)) db.set(key,{name,type,category,power,acc,pp,effect,learners:new Set()});
        db.get(key).learners.add(owner);
      });
    });
    return Array.from(db.values()).map(m=>({...m,learners:Array.from(m.learners)})).sort((a,b)=>a.name.localeCompare(b.name));
  }
  const MOVES=buildMoveDB();
  let comparedMoves=[];

  function installMoveCompare(){
    const moveModal=document.querySelector('#mv-tracker-overlay .mv-tracker-modal');
    const controls=moveModal?.querySelector('.mv-controls');
    if(controls && !document.getElementById('move-compare-launch')){
      const b=document.createElement('button');
      b.type='button';b.id='move-compare-launch';b.className='move-compare-launch';b.textContent='Compare Moves';
      controls.appendChild(b);
    }

    const overlay=document.getElementById('move-compare-overlay');
    const close=document.getElementById('move-compare-close');
    const search=document.getElementById('move-compare-search');
    const list=document.getElementById('move-compare-list');
    const selected=document.getElementById('move-compare-selected');
    const results=document.getElementById('move-compare-results');
    if(!overlay||!list||!results) return;

    function open(){
      document.getElementById('mv-tracker-overlay')?.classList.remove('open');
      overlay.classList.add('open');overlay.setAttribute('aria-hidden','false');
      render();setTimeout(()=>search?.focus(),0);
    }
    function shut(){overlay.classList.remove('open');overlay.setAttribute('aria-hidden','true');}
    document.getElementById('move-compare-launch')?.addEventListener('click',open);
    close?.addEventListener('click',shut);
    overlay.addEventListener('click',e=>{if(e.target===overlay)shut();});

    function renderList(){
      const q=(search?.value||'').trim().toLowerCase();
      const filtered=MOVES.filter(m=>!q||m.name.toLowerCase().includes(q)||m.type.toLowerCase().includes(q)||m.category.toLowerCase().includes(q)||m.effect.toLowerCase().includes(q));
      list.innerHTML=filtered.map(m=>{
        const on=comparedMoves.includes(m.name);
        const blocked=!on&&comparedMoves.length>=4;
        return '<button type="button" class="move-compare-option '+(on?'selected':'')+'" style="--tc:'+(COLORS[m.type]||'#777')+'" data-move-compare="'+esc(m.name)+'" '+(blocked?'disabled':'')+'>'+
          '<span class="move-compare-main"><b class="move-compare-option-name">'+esc(m.name)+'</b><span class="move-compare-option-badges"><span class="mv-type-chip move-selector-type-chip" style="--tc:'+(COLORS[m.type]||'#777')+'">'+esc(m.type)+'</span><span class="mv-cat-chip category-'+esc(String(m.category||'').toLowerCase())+'">'+esc(m.category)+'</span></span></span>'+
          '<span class="move-compare-meta">'+(on?'✓':'＋')+'</span></button>';
      }).join('');
    }
    function renderResults(){
      const ms=comparedMoves.map(n=>MOVES.find(m=>m.name===n)).filter(Boolean);
      selected.innerHTML=ms.map(m=>'<span class="move-selected-chip">'+esc(m.name)+' <button type="button" data-remove-move="'+esc(m.name)+'">✕</button></span>').join('');
      if(!ms.length){
        results.innerHTML='<div class="move-compare-empty">Select 2–4 moves to compare.</div>';return;
      }
      const row=(label,fn,cls)=>'<tr><td>'+label+'</td>'+ms.map(m=>'<td class="'+(cls||'')+'">'+fn(m)+'</td>').join('')+'</tr>';
      results.innerHTML='<div class="move-compare-table-wrap"><table class="move-compare-table"><thead><tr><th>Field</th>'+
        ms.map(m=>'<th><span class="move-compare-name">'+esc(m.name)+'</span></th>').join('')+
        '</tr></thead><tbody>'+
        row('Type',m=>'<span class="mv-type-chip move-compare-type-chip" style="--tc:'+(COLORS[m.type]||'#777')+'">'+esc(m.type)+'</span>')+
        row('Category',m=>'<span class="mv-cat-chip category-'+esc(String(m.category||'').toLowerCase())+'">'+esc(m.category)+'</span>')+
        row('Power',m=>esc(m.power))+
        row('Accuracy',m=>esc(m.acc))+
        row('PP',m=>esc(m.pp))+
        row('Learners',m=>String(m.learners.length))+
        row('Effect',m=>esc(m.effect||'No effect description recorded.'),'move-compare-effect')+
        '</tbody></table></div>';
    }
    function render(){renderList();renderResults();}
    search?.addEventListener('input',renderList);
    list.addEventListener('click',e=>{
      const b=e.target.closest('[data-move-compare]');if(!b||b.disabled)return;
      const n=b.dataset.moveCompare;
      if(comparedMoves.includes(n)) comparedMoves=comparedMoves.filter(x=>x!==n);
      else if(comparedMoves.length<4) comparedMoves.push(n);
      render();
    });
    selected.addEventListener('click',e=>{
      const b=e.target.closest('[data-remove-move]');if(!b)return;
      comparedMoves=comparedMoves.filter(x=>x!==b.dataset.removeMove);render();
    });
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&overlay.classList.contains('open'))shut();});
    render();
  }

  /* ==================== TEAM BUILDER UPGRADE + SHARE ==================== */
  function teamIdsFromDOM(){
    return Array.from(document.querySelectorAll('#team-builder-slots [data-tb-remove]')).map(b=>b.dataset.tbRemove).filter(Boolean);
  }
  function damageMoveTypes(id){
    const detail=detailById[id]; if(!detail) return [];
    const set=new Set();
    detail.querySelectorAll('.move-chip').forEach(chip=>{
      const first=((chip.getAttribute('title')||'').split(/\r?\n/)[0]||'');
      const p=first.split('·').map(x=>x.trim());
      if(p.length>=3 && TYPES.includes(p[1]) && !/^status$/i.test(p[2])) set.add(p[1]);
    });
    return Array.from(set);
  }

  function installTeamUpgrade(){
    const teamSection=document.querySelector('.team-builder-team');
    const analysisSection=document.querySelector('.team-builder-analysis');
    const oldAnalysis=document.getElementById('team-builder-analysis');
    const slots=document.getElementById('team-builder-slots');
    const list=document.getElementById('team-builder-list');
    if(!teamSection||!analysisSection||!oldAnalysis||!slots) return;

    let actions=document.getElementById('tb-upgrade-actions');
    if(!actions){
      actions=document.createElement('div');
      actions.id='tb-upgrade-actions';actions.className='tb-upgrade-actions';
      actions.innerHTML=
        '<button type="button" class="tb-upgrade-btn primary" id="tb-copy-team-link">Copy Team Link</button>'+
        '<button type="button" class="tb-upgrade-btn" id="tb-export-team-card">Export Team Card</button>'+
        '<button type="button" class="tb-upgrade-btn" id="tb-copy-team-text">Copy Team Text</button>';
      teamSection.appendChild(actions);
    }
    let upgrade=document.getElementById('team-builder-upgrade');
    if(!upgrade){
      upgrade=document.createElement('div');upgrade.id='team-builder-upgrade';upgrade.className='team-builder-upgrade';
      analysisSection.appendChild(upgrade);
    }

    function teamLink(ids){
      const u=new URL(location.href);
      if(ids.length) u.searchParams.set('team',ids.join(',')); else u.searchParams.delete('team');
      /* Team link owns the main view; do not force an unrelated Lumen hash. */
      u.hash='';
      return u.toString();
    }
    async function copyText(text,button,label){
      try{
        if(navigator.clipboard&&window.isSecureContext) await navigator.clipboard.writeText(text);
        else{
          const ta=document.createElement('textarea');ta.value=text;ta.style.position='fixed';ta.style.left='-9999px';document.body.appendChild(ta);ta.select();document.execCommand('copy');ta.remove();
        }
        const old=button.textContent;button.textContent=label;setTimeout(()=>button.textContent=old,1200);
      }catch(e){}
    }

    document.getElementById('tb-copy-team-link')?.addEventListener('click',function(){
      copyText(teamLink(teamIdsFromDOM()),this,'✓ Link Copied');
    });
    document.getElementById('tb-copy-team-text')?.addEventListener('click',function(){
      const ids=teamIdsFromDOM(), selected=ids.map(lumenData).filter(Boolean);
      const text='Lumena Team\\n'+selected.map((x,i)=>(i+1)+'. '+x.name+' (#'+x.num+') — '+x.types.join('/')).join('\\n');
      copyText(text,this,'✓ Team Copied');
    });
    document.getElementById('tb-export-team-card')?.addEventListener('click',async function(){
      const button=this,ids=teamIdsFromDOM(),selected=ids.map(lumenData).filter(Boolean);if(!selected.length)return;
      const original=button.textContent;button.disabled=true;button.textContent='Loading Artwork…';
      function loadArtwork(src){return new Promise(resolve=>{if(!src){resolve(null);return}const img=new Image();img.crossOrigin='anonymous';let done=false;const finish=v=>{if(done)return;done=true;clearTimeout(timer);resolve(v)};const timer=setTimeout(()=>finish(null),7000);img.onload=()=>finish(img);img.onerror=()=>finish(null);img.src=src})}
      function rounded(ctx,x,y,w,h,r){r=Math.min(r,w/2,h/2);ctx.beginPath();ctx.moveTo(x+r,y);ctx.arcTo(x+w,y,x+w,y+h,r);ctx.arcTo(x+w,y+h,x,y+h,r);ctx.arcTo(x,y+h,x,y,r);ctx.arcTo(x,y,x+w,y,r);ctx.closePath()}
      function fitImage(ctx,img,x,y,w,h){if(!img)return;const scale=Math.min(w/img.naturalWidth,h/img.naturalHeight),dw=img.naturalWidth*scale,dh=img.naturalHeight*scale;ctx.drawImage(img,x+(w-dw)/2,y+(h-dh)/2,dw,dh)}
      function badge(ctx,text,x,y,color,icon){ctx.font='800 15px sans-serif';const w=Math.max(100,ctx.measureText(text).width+56);rounded(ctx,x,y,w,32,16);ctx.shadowColor=color;ctx.shadowBlur=7;ctx.fillStyle=color;ctx.fill();ctx.shadowBlur=0;ctx.strokeStyle='rgba(255,255,255,.78)';ctx.lineWidth=1.4;ctx.stroke();if(icon)fitImage(ctx,icon,x+11,y+7,18,18);ctx.fillStyle='#fff';ctx.textAlign='left';ctx.textBaseline='middle';ctx.fillText(text.toUpperCase(),x+37,y+16.5);return w}
      function wrap(ctx,text,x,y,maxWidth,lineHeight,maxLines){const words=String(text||'').split(/\s+/);let line='',lines=[];words.forEach(word=>{const test=line?line+' '+word:word;if(ctx.measureText(test).width>maxWidth&&line){lines.push(line);line=word}else line=test});if(line)lines.push(line);lines=lines.slice(0,maxLines);if(lines.length===maxLines&&words.length&&ctx.measureText(lines.join(' ')).width<ctx.measureText(text).width)lines[maxLines-1]=lines[maxLines-1].replace(/[.…]*$/,'')+'…';lines.forEach((l,i)=>ctx.fillText(l,x,y+i*lineHeight))}
      try{
        const usedTypes=Array.from(new Set(selected.flatMap(x=>x.types))),loaded=await Promise.all([Promise.all(selected.map(x=>loadArtwork(x.img))),loadArtwork('https://lumena.gg/images/lantern_logo.webp'),Promise.all(usedTypes.map(async type=>[type,await loadArtwork('https://lumena.gg/images/battle/type-icons/white/'+type.toLowerCase()+'.webp')]))]),images=loaded[0],logo=loaded[1],typeIcons=Object.fromEntries(loaded[2]);
        const scale=2,w=1200,h=850,c=document.createElement('canvas');c.width=w*scale;c.height=h*scale;const ctx=c.getContext('2d');ctx.scale(scale,scale);
        const bg=ctx.createLinearGradient(0,0,w,h);bg.addColorStop(0,'#071426');bg.addColorStop(.48,'#12254a');bg.addColorStop(1,'#251541');ctx.fillStyle=bg;ctx.fillRect(0,0,w,h);
        const glow=ctx.createRadialGradient(600,250,30,600,250,680);glow.addColorStop(0,'rgba(72,174,255,.20)');glow.addColorStop(.55,'rgba(135,88,232,.10)');glow.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=glow;ctx.fillRect(0,0,w,h);for(let i=0;i<34;i++){const sx=45+((i*137)%1110),sy=36+((i*83)%760),sr=i%4===0?2.2:1.2;ctx.beginPath();ctx.arc(sx,sy,sr,0,Math.PI*2);ctx.fillStyle=i%3===0?'rgba(255,210,82,.35)':'rgba(116,217,255,.22)';ctx.fill()}
        rounded(ctx,18,18,w-36,h-36,24);ctx.strokeStyle='#7e62db';ctx.lineWidth=3;ctx.stroke();rounded(ctx,27,27,w-54,h-54,19);ctx.strokeStyle='rgba(78,229,211,.22)';ctx.lineWidth=1;ctx.stroke();
        rounded(ctx,43,39,88,88,22);ctx.fillStyle='rgba(7,22,45,.72)';ctx.fill();ctx.strokeStyle='rgba(77,229,210,.42)';ctx.lineWidth=1.5;ctx.stroke();if(logo)fitImage(ctx,logo,52,45,70,76);ctx.textAlign='left';ctx.textBaseline='alphabetic';ctx.fillStyle='#8fead8';ctx.font='800 11px monospace';ctx.fillText('OFFICIAL TEAM CARD',151,49);ctx.fillStyle='#ffd052';ctx.font='800 36px sans-serif';ctx.fillText('LUMENA',151,84);ctx.fillStyle='#f6f8ff';ctx.font='800 23px sans-serif';ctx.fillText('TEAM SHOWCASE',151,113);ctx.fillStyle='#9fb6d5';ctx.font='13px monospace';ctx.fillText(selected.length+' / 6 LUMENS  •  BUILT FOR BATTLE',151,136);
        const scoreText=(document.querySelector('#team-builder-upgrade .tb-upgrade-score')||{}).textContent||'—';rounded(ctx,990,48,150,70,18);ctx.fillStyle='rgba(8,22,45,.72)';ctx.fill();ctx.strokeStyle='rgba(255,208,82,.48)';ctx.stroke();ctx.textAlign='center';ctx.fillStyle='#91a9ca';ctx.font='700 11px monospace';ctx.fillText('BALANCE SCORE',1065,70);ctx.fillStyle='#55eed0';ctx.font='800 27px monospace';ctx.fillText(scoreText.trim()||'—',1065,103);
        const cardW=354,cardH=280,gapX=18,gapY=18,startX=51,startY=158;
        selected.forEach((x,i)=>{const col=i%3,row=Math.floor(i/3),cx=startX+col*(cardW+gapX),cy=startY+row*(cardH+gapY),color=COLORS[x.types[0]]||'#6F7FE8';ctx.save();ctx.shadowColor=color;ctx.shadowBlur=16;rounded(ctx,cx,cy,cardW,cardH,18);const cardBg=ctx.createLinearGradient(cx,cy,cx+cardW,cy+cardH);cardBg.addColorStop(0,'#0b203d');cardBg.addColorStop(.62,'#111c39');cardBg.addColorStop(1,color+'2b');ctx.fillStyle=cardBg;ctx.fill();ctx.shadowBlur=0;ctx.strokeStyle=color;ctx.lineWidth=2;ctx.stroke();ctx.fillStyle=color;rounded(ctx,cx,cy,7,cardH,4);ctx.fill();ctx.beginPath();ctx.arc(cx+cardW/2,cy+86,73,0,Math.PI*2);ctx.fillStyle='rgba(5,18,37,.48)';ctx.fill();ctx.strokeStyle=color+'88';ctx.lineWidth=1.5;ctx.stroke();const artGlow=ctx.createRadialGradient(cx+cardW/2,cy+86,8,cx+cardW/2,cy+86,103);artGlow.addColorStop(0,color+'60');artGlow.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=artGlow;ctx.fillRect(cx+34,cy+7,cardW-68,156);fitImage(ctx,images[i],cx+78,cy+13,cardW-156,145);rounded(ctx,cx+17,cy+165,cardW-34,104,13);ctx.fillStyle='rgba(5,16,34,.70)';ctx.fill();ctx.textAlign='left';ctx.fillStyle='#ffd052';ctx.font='800 12px monospace';ctx.fillText('#'+String(x.num).replace(/\D/g,'').padStart(3,'0')+'  •  SLOT '+(i+1),cx+29,cy+187);ctx.fillStyle='#f7f9ff';ctx.font='800 23px sans-serif';ctx.fillText(x.name,cx+29,cy+216);let bx=cx+29;x.types.forEach(type=>{bx+=badge(ctx,type,bx,cy+226,COLORS[type]||'#68748c',typeIcons[type])+8});ctx.restore()});
        const coachText=((document.querySelector('.automatic-team-coach-verdict')||{}).textContent||'').trim();rounded(ctx,48,759,1104,67,15);ctx.fillStyle='rgba(5,19,39,.72)';ctx.fill();ctx.strokeStyle='rgba(255,208,82,.28)';ctx.stroke();ctx.textAlign='left';ctx.fillStyle='#ffd052';ctx.font='800 11px monospace';ctx.fillText('✦ TEAM COACH VERDICT',68,781);ctx.fillStyle='#d8e6f7';ctx.font='600 13px sans-serif';wrap(ctx,coachText||'Team analysis updates automatically in Lumena.',68,805,900,18,2);ctx.textAlign='right';ctx.fillStyle='#7189aa';ctx.font='10px monospace';ctx.fillText('Generated by Lumena',1128,808);
        const a=document.createElement('a');a.download='lumena-team-showcase.png';a.href=c.toDataURL('image/png');a.click();button.textContent='✓ Team Card Exported';
      }catch(err){button.textContent='Export Failed';}
      setTimeout(()=>{button.disabled=false;button.textContent=original},1500);
    });


    function formatTeamReasonBadges(reasons){
      return reasons.map(function(reason){
        let html=esc(reason);
        TYPES.forEach(function(type){
          const re=new RegExp('\\b'+type+'\\b','g');
          html=html.replace(
            re,
            '<span class="type-chip small team-analysis-unified-type" style="--tc:'+(COLORS[type]||'#777')+'">'+esc(type)+'</span>'
          );
        });
        return '<span class="tb-rec-reason">'+html+'</span>';
      }).join('<span class="tb-rec-sep"> · </span>');
    }

    function renderUpgrade(){
      const ids=teamIdsFromDOM(), selected=ids.map(lumenData).filter(Boolean);
      if(!selected.length){
        upgrade.innerHTML='<div class="tb-upgrade-card wide"><div class="tb-upgrade-note">Add Lumens to unlock the upgraded team analysis and recommendations.</div></div>';return;
      }
      const defense=TYPES.map(type=>{
        const vals=selected.map(x=>against(x.types,type));
        return {type,weak:vals.filter(v=>v>1).length,resist:vals.filter(v=>v>0&&v<1).length,immune:vals.filter(v=>v===0).length,max:Math.max(...vals)};
      });
      const critical=defense.filter(x=>x.weak>=2).sort((a,b)=>b.weak-a.weak);
      const uncoveredDefense=defense.filter(x=>x.resist===0&&x.immune===0).map(x=>x.type);

      const moveTypes=new Set(ids.flatMap(damageMoveTypes));
      const offensiveCovered=TYPES.filter(def=>Array.from(moveTypes).some(atk=>mult(atk,def)>1));
      const offensiveGaps=TYPES.filter(def=>!offensiveCovered.includes(def));

      /* Balance score: start 100, penalize repeated weaknesses and uncovered coverage. */
      let score=100-critical.reduce((n,x)=>n+(x.weak-1)*7,0)-Math.round(uncoveredDefense.length*1.2)-Math.round(offensiveGaps.length*1.1);
      if(selected.length<4) score-=8;
      score=Math.max(0,Math.min(100,score));

      const unselected=ALL_LUMENS.filter(x=>!ids.includes(x.id));
      const problems=critical.slice(0,4).map(x=>x.type);
      const recs=unselected.map(x=>{
        let s=0,reasons=[];
        problems.forEach(atk=>{
          const v=against(x.types,atk);
          if(v===0){s+=5;reasons.push('immune '+atk);}
          else if(v<1){s+=3;reasons.push('resists '+atk);}
        });
        const mt=damageMoveTypes(x.id);
        const adds=offensiveGaps.filter(def=>mt.some(atk=>mult(atk,def)>1));
        s+=Math.min(5,adds.length);
        if(adds.length) reasons.push('covers '+adds.slice(0,2).join('/'));
        return {x,s,reasons};
      }).filter(r=>r.s>0).sort((a,b)=>b.s-a.s||a.x.name.localeCompare(b.x.name)).slice(0,3);

      const badges=(arr,kind)=>arr.length?arr.map(t=>'<span class="type-chip small team-analysis-unified-type '+(kind||'')+'" style="--tc:'+(COLORS[t]||'#777')+'">'+esc(t)+'</span>').join(''):'<span class="tb-upgrade-note">None</span>';
      upgrade.innerHTML=
        '<div class="tb-upgrade-card"><div class="tb-upgrade-title">Team Balance Score</div><div class="tb-upgrade-score-wrap"><div class="tb-upgrade-score">'+score+'<small>/100</small></div><div class="tb-upgrade-copy">'+
          (score>=85?'Very balanced team profile.':score>=70?'Good balance with a few matchup gaps.':score>=50?'Several shared weaknesses or coverage gaps need attention.':'Major matchup gaps are stacked across the team.')+
        '</div></div></div>'+
        '<div class="tb-upgrade-card"><div class="tb-upgrade-title">Defensive Coverage Gaps</div><div class="tb-upgrade-badges">'+badges(uncoveredDefense,'danger')+'</div><div class="tb-upgrade-note" style="margin-top:6px">No current member resists or is immune to these attacking types.</div></div>'+
        '<div class="tb-upgrade-card"><div class="tb-upgrade-title">Actual Move Coverage Gaps</div><div class="tb-upgrade-badges">'+badges(offensiveGaps,'danger')+'</div><div class="tb-upgrade-note" style="margin-top:6px">Uses recorded damaging moves, not only the team’s STAB types.</div></div>'+
        '<div class="tb-upgrade-card"><div class="tb-upgrade-title">Critical Shared Weaknesses</div><div class="tb-upgrade-badges">'+badges(critical.map(x=>x.type),'danger')+'</div><div class="tb-upgrade-note" style="margin-top:6px">'+(critical.length?'At least 2 team members are weak to each listed type.':'No weakness is shared by 2 or more members.')+'</div></div>'+
        '<div class="tb-upgrade-card wide"><div class="tb-upgrade-title">Suggested Additions / Replacements</div>'+
          (recs.length?'<div class="tb-rec-grid">'+recs.map(r=>
            '<div class="tb-rec"><img src="'+esc(r.x.img)+'" alt=""><div class="tb-rec-copy"><b>'+esc(r.x.name)+'</b><span class="tb-rec-reasons">'+formatTeamReasonBadges(r.reasons.slice(0,2))+'</span></div>'+
            (ids.length<6?'<button type="button" class="tb-rec-add" data-tb-recommended="'+esc(r.x.id)+'" title="Add to team">＋</button>':'')+'</div>'
          ).join('')+'</div>':'<div class="tb-upgrade-note">No clear recommendation based on the current recorded matchups.</div>')+
        '</div>';
    }

    upgrade.addEventListener('click',e=>{
      const b=e.target.closest('[data-tb-recommended]');if(!b)return;
      const option=Array.from(list?.querySelectorAll('[data-tb-add]')||[]).find(x=>x.dataset.tbAdd===b.dataset.tbRecommended);
      if(option && !option.disabled) option.click();
    });

    const observer=new MutationObserver(renderUpgrade);
    observer.observe(slots,{childList:true,subtree:true});
    observer.observe(oldAnalysis,{childList:true,subtree:true});
    renderUpgrade();
  }

  /* ==================== THEME / BACKGROUND SETTINGS ==================== */
  function installThemes(){
    const topRow=document.querySelector('.topbar-row');
    if(topRow && !document.getElementById('theme-settings-btn')){
      const b=document.createElement('button');b.type='button';b.id='theme-settings-btn';b.className='theme-settings-btn';b.title='Theme & Background';b.setAttribute('aria-label','Theme and background settings');b.textContent='⚙';
      topRow.appendChild(b);
    }
    const overlay=document.getElementById('theme-settings-overlay'), close=document.getElementById('theme-settings-close');
    const habitat=document.getElementById('theme-habitat-toggle'), effects=document.getElementById('theme-effects-toggle');
    if(!overlay) return;
    const KEY='lumenaCodexThemeSettings';
    let settings={theme:'default',habitats:true,effects:true};
    try{settings={...settings,...JSON.parse(localStorage.getItem(KEY)||'{}')}}catch(e){}

    function apply(){
      if(settings.theme==='default') document.body.removeAttribute('data-codex-theme');
      else document.body.dataset.codexTheme=settings.theme;
      document.body.classList.toggle('codex-disable-habitats',!settings.habitats);
      document.body.classList.toggle('codex-reduced-effects',!settings.effects);
      if(habitat) habitat.checked=!!settings.habitats;
      if(effects) effects.checked=!!settings.effects;
      document.querySelectorAll('.theme-choice').forEach(b=>b.classList.toggle('active',b.dataset.theme===settings.theme));
      try{localStorage.setItem(KEY,JSON.stringify(settings))}catch(e){}
      const meta=document.querySelector('meta[name="theme-color"]');
      if(meta){
        const color={default:'#080E1A',midnight:'#030711',ember:'#130806',frost:'#06121A',forest:'#071209',minimal:'#0B0E14'}[settings.theme]||'#080E1A';
        meta.setAttribute('content',color);
      }
    }
    function open(){overlay.classList.add('open');overlay.setAttribute('aria-hidden','false');}
    function shut(){overlay.classList.remove('open');overlay.setAttribute('aria-hidden','true');}
    document.getElementById('theme-settings-btn')?.addEventListener('click',open);
    close?.addEventListener('click',shut);
    overlay.addEventListener('click',e=>{if(e.target===overlay)shut();});
    document.getElementById('theme-choice-grid')?.addEventListener('click',e=>{
      const b=e.target.closest('[data-theme]');if(!b)return;settings.theme=b.dataset.theme;apply();
    });
    habitat?.addEventListener('change',()=>{settings.habitats=habitat.checked;apply();});
    effects?.addEventListener('change',()=>{settings.effects=effects.checked;apply();});
    apply();
  }

  /* ==================== OFFLINE / PWA ==================== */
  function installOffline(){
    if('serviceWorker' in navigator && /^https?:$/.test(location.protocol)){
      window.addEventListener('load',()=>{
        navigator.serviceWorker.register('./service-worker.js').catch(()=>{});
      },{once:true});
    }
  }

  function install(){
    installMatchups();
    installMoveCompare();
    installTeamUpgrade();
    installThemes();
    installOffline();
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',install,{once:true});
  else install();
})();
