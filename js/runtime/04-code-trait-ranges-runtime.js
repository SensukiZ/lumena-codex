(function(){
  var STAT_NAMES=['HP','Attack','Defense','Sp. Attack','Sp. Defense','Speed'];
  /* The official examples select the two strongest and two weakest base
     stats.  This tie order matches the game-source examples (including
     Scratbit's equal-valued low stats) without copying another species. */
  var TIE_ORDER={'Attack':0,'Defense':1,'Sp. Attack':2,'Sp. Defense':3,'Speed':4,'HP':5};
  function escapeHtml(value){
    return String(value).replace(/[&<>"']/g,function(ch){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]});
  }
  function readStats(view){
    var result=[];
    Array.from(view.querySelectorAll('.entry-grid .stat-row')).forEach(function(row){
      var label=(row.querySelector('.stat-label')||{}).textContent;
      var value=parseInt((row.querySelector('.stat-val')||{}).textContent,10);
      label=label&&label.trim();
      if(STAT_NAMES.indexOf(label)>=0&&Number.isFinite(value)) result.push({name:label,value:value});
    });
    return result;
  }
  function addTraitPanel(view){
    if(view.querySelector('.code-trait-panel')) return;
    var stats=readStats(view);
    if(stats.length!==6) return;
    var ascending=stats.slice().sort(function(a,b){return a.value-b.value||TIE_ORDER[a.name]-TIE_ORDER[b.name]});
    var descending=stats.slice().sort(function(a,b){return b.value-a.value||TIE_ORDER[a.name]-TIE_ORDER[b.name]});
    var limited=new Set(ascending.slice(0,2).map(function(x){return x.name}));
    var strong=new Set(descending.slice(0,2).map(function(x){return x.name}));
    var name=(view.querySelector('.entry-name')||{}).textContent||'this Lumen';
    function gradeBands(min,max){
      if(min===0&&max===25) return [['E','0–4'],['D','5–9'],['C','10–14'],['B','15–19'],['A','20–24'],['S','25']];
      if(min===4&&max===31) return [['E','4–8'],['D','9–13'],['C','14–19'],['B','20–24'],['A','25–30'],['S','31']];
      return [['E','0–5'],['D','6–12'],['C','13–18'],['B','19–24'],['A','25–30'],['S','31']];
    }
    var rows=STAT_NAMES.map(function(stat){
      var min=strong.has(stat)?4:0,max=limited.has(stat)?25:31;
      var cls=strong.has(stat)?'trait-strong':limited.has(stat)?'trait-limited':'';
      var grades=gradeBands(min,max).map(function(band){return '<span class="trait-grade trait-grade-'+band[0].toLowerCase()+'"><b>'+band[0]+'</b> '+band[1]+'</span>'}).join('');
      return '<tr class="'+cls+'"><td>'+escapeHtml(stat)+'</td><td class="trait-range">'+min+'–'+max+'</td><td><div class="trait-grade-bands">'+grades+'</div></td></tr>';
    }).join('');
    var panel=document.createElement('div');
    panel.className='panel code-trait-panel';
    panel.innerHTML='<div class="code-trait-head"><h4>Code Trait Ranges &amp; Grades</h4><span class="code-trait-source">Rules: <a href="https://lumena.gg/wiki/mechanics/lumens-and-code-traits/" target="_blank" rel="noopener">Official Lumena Wiki</a></span></div><p class="code-trait-note">Natural Trait roll ranges for a newly created '+escapeHtml(name.trim())+'. Each letter is graded relative to that stat’s allowed range.</p><table class="code-trait-table"><thead><tr><th>Trait</th><th class="trait-range">Range</th><th>E–S Grade Bands</th></tr></thead><tbody>'+rows+'</tbody></table><div class="code-trait-key"><span>Strong profile: minimum 4</span><span>Limited profile: maximum 25</span><span>Standard: 0–31</span><span>S requires the exact maximum</span></div>';
    var grid=view.querySelector('.entry-grid');
    if(grid) grid.insertAdjacentElement('afterend',panel);
  }
  function initialize(){
    document.querySelectorAll('.detail-view').forEach(addTraitPanel);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',initialize);
  else initialize();
})();
