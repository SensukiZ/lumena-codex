(function(){
  'use strict';
  const TYPES=['Normal','Fire','Water','Electric','Grass','Ice','Fighting','Poison','Ground','Flying','Psychic','Bug','Rock','Ghost','Dragon','Dark','Steel','Fairy'];
  const COLORS={Normal:'#9aa0a6',Fire:'#f06a3b',Water:'#4b9be8',Electric:'#e8c33a',Grass:'#58ad5b',Ice:'#66cbd1',Fighting:'#c15346',Poison:'#9b5bb5',Ground:'#c99855',Flying:'#7d9bd5',Psychic:'#e76699',Bug:'#8fae39',Rock:'#a68b55',Ghost:'#655c9b',Dragon:'#6657c7',Dark:'#57505f',Steel:'#7793a3',Fairy:'#d982c5'};
  const EFFECT={
    Normal:{Rock:.5,Ghost:0,Steel:.5},Fire:{Fire:.5,Water:.5,Grass:2,Ice:2,Bug:2,Rock:.5,Dragon:.5,Steel:2},
    Water:{Fire:2,Water:.5,Grass:.5,Ground:2,Rock:2,Dragon:.5},Electric:{Water:2,Electric:.5,Grass:.5,Ground:0,Flying:2,Dragon:.5},
    Grass:{Fire:.5,Water:2,Grass:.5,Poison:.5,Ground:2,Flying:.5,Bug:.5,Rock:2,Dragon:.5,Steel:.5},Ice:{Fire:.5,Water:.5,Grass:2,Ice:.5,Ground:2,Flying:2,Dragon:2,Steel:.5},
    Fighting:{Normal:2,Ice:2,Poison:.5,Flying:.5,Psychic:.5,Bug:.5,Rock:2,Ghost:0,Dark:2,Steel:2,Fairy:.5},Poison:{Grass:2,Poison:.5,Ground:.5,Rock:.5,Ghost:.5,Steel:0,Fairy:2},
    Ground:{Fire:2,Electric:2,Grass:.5,Poison:2,Flying:0,Bug:.5,Rock:2,Steel:2},Flying:{Electric:.5,Grass:2,Fighting:2,Bug:2,Rock:.5,Steel:.5},
    Psychic:{Fighting:2,Poison:2,Psychic:.5,Dark:0,Steel:.5},Bug:{Fire:.5,Grass:2,Fighting:.5,Poison:.5,Flying:.5,Psychic:2,Ghost:.5,Dark:2,Steel:.5,Fairy:.5},
    Rock:{Fire:2,Ice:2,Fighting:.5,Ground:.5,Flying:2,Bug:2,Steel:.5},Ghost:{Normal:0,Psychic:2,Ghost:2,Dark:.5},
    Dragon:{Dragon:2,Steel:.5,Fairy:0},Dark:{Fighting:.5,Psychic:2,Ghost:2,Dark:.5,Fairy:.5},
    Steel:{Fire:.5,Water:.5,Electric:.5,Ice:2,Rock:2,Steel:.5,Fairy:2},Fairy:{Fire:.5,Fighting:2,Poison:.5,Dragon:2,Dark:2,Steel:.5}
  };
  function typeName(text){const s=String(text||'').toLowerCase();return TYPES.find(t=>new RegExp('(^|[^a-z])'+t.toLowerCase()+'([^a-z]|$)').test(s))||''}
  function mult(attack,defenders){return defenders.reduce((n,d)=>n*((EFFECT[attack]&&Object.prototype.hasOwnProperty.call(EFFECT[attack],d))?EFFECT[attack][d]:1),1)}
  function cardData(card,index,table){
    const name=(card.querySelector('.compare-card-name')?.textContent||('Lumen '+(index+1))).trim();
    const types=Array.from(card.querySelectorAll('.type-chip')).map(x=>typeName(x.textContent)).filter(Boolean);
    const stats={};
    table.querySelectorAll('tbody tr').forEach(row=>{const cells=row.querySelectorAll('td');if(cells[index+1])stats[cells[0].textContent.trim()]=parseInt(cells[index+1].textContent,10)||0});
    const id=card.dataset.id||'';
    const detail=Array.from(document.querySelectorAll('.detail-view[data-id]')).find(x=>x.dataset.id===id);
    const moveTypes=[];
    if(detail)detail.querySelectorAll('.move-chip').forEach(chip=>{
      const first=((chip.getAttribute('title')||'').split(/\r?\n/)[0]||'').split('·').map(x=>x.trim());
      if(first.length<4||/status/i.test(first[2]))return;
      const power=(first[3].match(/Pow\s+(\d+)/i)||[])[1];
      const t=typeName(first[1]);
      if(power&&t&&!moveTypes.includes(t))moveTypes.push(t);
    });
    return {id,name,types,moveTypes,stats,total:stats.Total||0};
  }
  function addPanel(){
    const wrap=document.getElementById('compare-table-wrap');
    if(!wrap||wrap.querySelector('.compare-matchup-panel'))return;
    const table=wrap.querySelector('.compare-table');
    const cards=Array.from(document.querySelectorAll('#compare-cols .compare-card'));
    if(!table||cards.length!==2)return;
    const a=cardData(cards[0],0,table),b=cardData(cards[1],1,table);
    const attacksA=Array.from(new Set(a.moveTypes.concat(a.types))),attacksB=Array.from(new Set(b.moveTypes.concat(b.types)));
    const pa=Math.max(1,...attacksA.map(t=>mult(t,b.types))),pb=Math.max(1,...attacksB.map(t=>mult(t,a.types)));
    const speedA=a.stats.Speed||0,speedB=b.stats.Speed||0;
    let rawA=50+(pa-pb)*22+(speedA-speedB)*.16+(a.total-b.total)*.035;
    let scoreA=Math.max(5,Math.min(95,Math.round(rawA))),scoreB=100-scoreA;
    if(Math.abs(scoreA-scoreB)<3){scoreA=50;scoreB=50}
    const winner=scoreA===scoreB?'The matchup is even':(scoreA>scoreB?a.name:b.name)+' is favored';
    const favored=scoreA>=scoreB?a:b,other=scoreA>=scoreB?b:a,fp=scoreA>=scoreB?pa:pb;
    const reasons=[];
    if(fp>1){const favoredAttacks=Array.from(new Set(favored.moveTypes.concat(favored.types)));reasons.push(favoredAttacks.find(t=>mult(t,other.types)===fp)+' coverage hits '+fp+'×')}
    if((favored.stats.Speed||0)>(other.stats.Speed||0)) reasons.push('Higher Speed');
    if(favored.total>other.total) reasons.push('Higher Base Stat Total');
    if(!reasons.length) reasons.push('Typing and base stats are closely matched');
    function badge(type,label){return '<span class="compare-matchup-badge" style="--tc:'+(COLORS[type]||'#718096')+'">'+type+(label?' <em>'+label+'</em>':'')+'</span>'}
    function matchupCard(lumen,card){
      const profile=TYPES.map(t=>({type:t,m:lumen.types.reduce((n,d)=>n*mult(t,[d]),1)}));
      const weak=profile.filter(x=>x.m>1).sort((x,y)=>y.m-x.m);
      const resist=profile.filter(x=>x.m>0&&x.m<1).sort((x,y)=>x.m-y.m);
      const immune=profile.filter(x=>x.m===0);
      const attackTypes=Array.from(new Set(lumen.moveTypes.concat(lumen.types)));
      const strong=TYPES.map(t=>({type:t,m:Math.max(...attackTypes.map(aType=>mult(aType,[t])))})).filter(x=>x.m>1);
      const list=arr=>arr.length?arr.map(x=>badge(x.type,x.m+'×')).join(''):'<span class="compare-matchup-none">None</span>';
      const img=card.querySelector('img')?.getAttribute('src')||'';
      return '<article class="compare-matchup-card"><div class="compare-matchup-card-head">'+(img?'<img src="'+img+'" alt="">':'')+'<b>'+lumen.name+'</b></div>'+
        '<div class="compare-matchup-row"><span class="compare-matchup-row-label">STAB Types</span><span class="compare-matchup-badges">'+lumen.types.map(t=>badge(t,'STAB 1.5×')).join('')+'</span></div>'+
        '<div class="compare-matchup-row"><span class="compare-matchup-row-label">Weak To</span><span class="compare-matchup-badges">'+list(weak)+'</span></div>'+
        '<div class="compare-matchup-row"><span class="compare-matchup-row-label">Resists</span><span class="compare-matchup-badges">'+list(resist)+'</span></div>'+
        '<div class="compare-matchup-row"><span class="compare-matchup-row-label">Immune To</span><span class="compare-matchup-badges">'+list(immune)+'</span></div>'+
        '<div class="compare-matchup-row"><span class="compare-matchup-row-label">Strong vs.</span><span class="compare-matchup-badges">'+list(strong)+'</span></div></article>';
    }
    const detailCards=matchupCard(a,cards[0])+matchupCard(b,cards[1]);
    const panel=document.createElement('section');panel.className='compare-matchup-panel';
    panel.innerHTML='<h4 class="compare-matchup-title">Type Matchup Comparison</h4><p class="compare-matchup-note">Uses dual-type effectiveness and recorded base stats. The result is an advantage estimate, not a guaranteed battle winner.</p><div class="compare-matchup-box"><div class="compare-matchup-head"><span class="compare-matchup-label">Matchup advantage</span><strong class="compare-matchup-verdict">'+winner+'</strong></div>'+[ [a,scoreA],[b,scoreB] ].map(x=>'<div class="compare-adv-row"><span class="compare-adv-name">'+x[0].name+'</span><span class="compare-adv-track"><span class="compare-adv-fill" style="display:block;width:'+x[1]+'%"></span></span><span class="compare-adv-score">'+x[1]+'</span></div>').join('')+'<div class="compare-adv-reasons">'+reasons.map(r=>'<span class="compare-adv-reason">'+r+'</span>').join('')+'</div></div><div class="compare-matchup-grid">'+detailCards+'</div>';
    wrap.appendChild(panel);
  }
  function install(){const wrap=document.getElementById('compare-table-wrap');if(!wrap)return;new MutationObserver(addPanel).observe(wrap,{childList:true,subtree:true});addPanel()}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();
