(function(){
  if(window.__lumenaSimplifiedMapInstalled) return;
  window.__lumenaSimplifiedMapInstalled=true;

  var NS='http://www.w3.org/2000/svg';
  var locations=[
    /* towns/cities — positioned to mirror the original illustrated World Map */
    {name:'Firstlight Village',kind:'town',x:305,y:982,lw:190},
    {name:'Bloomvale',kind:'town',x:310,y:790,lw:150},
    {name:'Tidemarsh',kind:'town',x:625,y:875,lw:160},
    {name:'Spark Metropolis',kind:'town',x:665,y:585,lw:235},
    {name:'Frostpeak',kind:'town',x:665,y:190,lw:150},
    {name:'Prismgate',kind:'town',x:930,y:535,lw:155},
    {name:'Shadeholt',kind:'town',x:1145,y:505,lw:155},
    {name:'Emberfell',kind:'town',x:205,y:490,lw:150},
    {name:'Stonereach',kind:'town',x:455,y:490,lw:165},

    /* routes / areas — arranged along the same corridors as the original map */
    {name:'Cinderfall Tarn',kind:'route',x:345,y:205,lw:165},
    {name:'Ember Pass',kind:'route',x:330,y:435,lw:115},
    {name:'Quarry Road',kind:'route',x:535,y:445,lw:120},
    {name:'Frostpeak Climb',kind:'route',x:665,y:275,lw:160},
    {name:'Snowline Rise',kind:'route',x:665,y:345,lw:145},
    {name:'Glimmer Flats',kind:'route',x:795,y:445,lw:145},
    {name:'Spark Woods',kind:'route',x:820,y:540,lw:135},
    {name:'Shade Trail',kind:'route',x:1040,y:550,lw:115},
    {name:'Marsh Route',kind:'route',x:700,y:700,lw:125},
    {name:'Coast Route',kind:'route',x:520,y:735,lw:125},
    {name:'Softglade Path',kind:'route',x:370,y:860,lw:145}
  ];

  function el(tag,attrs){
    var n=document.createElementNS(NS,tag);
    Object.keys(attrs||{}).forEach(function(k){n.setAttribute(k,attrs[k]);});
    return n;
  }
  function add(parent,tag,attrs){var n=el(tag,attrs);parent.appendChild(n);return n;}

  function openLocation(name,node){
    document.querySelectorAll('#lumena-simplified-map .poi').forEach(function(p){p.classList.toggle('active',p===node);});
    if(typeof window.__lumenaOpenRoute==='function') window.__lumenaOpenRoute(name);
  }

  function addTown(svg,p){
    var g=add(svg,'g',{'class':'poi town-node','tabindex':'0','role':'button','aria-label':p.name,'data-location':p.name});
    g.style.transformOrigin=p.x+'px '+p.y+'px';
    add(g,'rect',{'class':'town-label-bg',x:p.x-p.lw/2,y:p.y+34,width:p.lw,height:42,rx:10,ry:10});
    add(g,'rect',{'class':'town-marker',x:p.x-22,y:p.y-22,width:44,height:44,rx:10,ry:10});
    add(g,'circle',{'class':'town-inner',cx:p.x,cy:p.y,r:9});
    var t=add(g,'text',{x:p.x,y:p.y+56}); t.textContent=p.name;
    g.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();openLocation(p.name,g);});
    g.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();openLocation(p.name,g);}});
  }

  function addRoute(svg,p){
    var g=add(svg,'g',{'class':'poi route-node','tabindex':'0','role':'button','aria-label':p.name,'data-location':p.name});
    add(g,'rect',{'class':'route-box',x:p.x-20,y:p.y-12,width:40,height:24,rx:8,ry:8});
    add(g,'rect',{'class':'route-label-bg',x:p.x-p.lw/2,y:p.y+18,width:p.lw,height:34,rx:9,ry:9});
    var t=add(g,'text',{x:p.x,y:p.y+35}); t.textContent=p.name;
    g.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();openLocation(p.name,g);});
    g.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();openLocation(p.name,g);}});
  }

  function addLandmark(svg,p){
    var g=add(svg,'g',{'class':'landmark-node','aria-label':p.name});
    add(g,'rect',{'class':'landmark-label-bg',x:p.x-p.lw/2,y:p.y+34,width:p.lw,height:42,rx:10,ry:10});
    add(g,'polygon',{'class':'landmark-marker',points:(p.x)+','+(p.y-30)+' '+(p.x+24)+','+(p.y+18)+' '+(p.x-24)+','+(p.y+18)});
    add(g,'circle',{'class':'landmark-inner',cx:p.x,cy:p.y+2,r:8});
    var t=add(g,'text',{x:p.x,y:p.y+56}); t.textContent=p.name;
  }

  function makeMap(){
    var canvas=document.getElementById('world-map-canvas');
    if(!canvas || canvas.querySelector('#lumena-simplified-map')) return;
    var svg=el('svg',{id:'lumena-simplified-map',viewBox:'0 0 1402 1122',preserveAspectRatio:'xMidYMid meet','aria-label':'Lumena simplified interactive world map'});

    /* Ocean — same deep Lumena palette, with the original map's large surrounding sea. */
    add(svg,'rect',{'class':'sea',x:0,y:0,width:1402,height:1122});
    add(svg,'path',{'class':'sea-patch','d':'M0 0 H1402 V170 C1260 125 1170 175 1080 140 C940 85 805 110 705 80 C550 35 420 85 300 65 C190 48 95 70 0 45 Z'});
    add(svg,'path',{'class':'sea-patch','d':'M0 760 C120 720 210 760 290 735 C420 695 515 735 605 770 C760 830 900 770 1020 715 C1130 665 1260 690 1402 630 V1122 H0 Z'});

    /* Main island silhouette copied from the original map structure:
       volcanic west, icy north, forest/east, broad south coast, separate Spire island. */
    add(svg,'path',{'class':'land','d':'M92 118 C190 92 285 105 360 125 C450 90 520 112 585 94 C655 72 748 74 825 100 C930 92 1038 125 1115 188 C1185 245 1218 340 1200 438 C1194 507 1223 563 1190 626 C1140 724 1015 748 935 795 C850 846 770 920 676 947 C575 978 500 965 432 1016 C358 1070 258 1060 184 1010 C105 956 77 867 92 782 C105 706 68 655 81 588 C95 516 63 454 76 373 C90 280 67 195 92 118 Z'});
    add(svg,'path',{'class':'coast-line','d':'M92 118 C190 92 285 105 360 125 C450 90 520 112 585 94 C655 72 748 74 825 100 C930 92 1038 125 1115 188 C1185 245 1218 340 1200 438 C1194 507 1223 563 1190 626 C1140 724 1015 748 935 795 C850 846 770 920 676 947 C575 978 500 965 432 1016 C358 1070 258 1060 184 1010 C105 956 77 867 92 782 C105 706 68 655 81 588 C95 516 63 454 76 373 C90 280 67 195 92 118 Z'});

    /* The Spire island sits detached in the south-east, as in the original artwork. */
    add(svg,'path',{'class':'land','d':'M1105 805 C1145 765 1218 750 1280 772 C1345 795 1370 855 1352 930 C1336 996 1280 1045 1215 1040 C1150 1035 1092 995 1076 930 C1064 880 1075 835 1105 805 Z'});
    add(svg,'path',{'class':'grass-b','d':'M1130 820 C1175 790 1233 786 1278 804 C1325 824 1342 870 1327 922 C1312 972 1267 1006 1218 1000 C1167 995 1122 964 1108 920 C1096 881 1104 845 1130 820 Z'});

    /* Biomes follow the original artwork's placement. */
    add(svg,'path',{'class':'fire-zone','d':'M95 165 C180 120 300 125 392 182 C450 218 475 300 447 365 C420 430 350 485 258 510 C180 530 110 495 82 425 C54 350 67 230 95 165 Z'});
    add(svg,'path',{'class':'ice-zone','d':'M405 85 C505 50 660 45 770 78 C845 100 895 155 887 220 C876 305 800 355 705 380 C590 412 472 360 420 292 C375 234 370 130 405 85 Z'});
    add(svg,'path',{'class':'forest','d':'M765 105 C865 95 995 125 1075 190 C1150 250 1172 345 1135 417 C1102 485 1025 520 930 500 C835 480 775 420 747 342 C720 265 719 155 765 105 Z'});
    add(svg,'path',{'class':'shade-zone','d':'M985 345 C1075 322 1160 350 1205 415 C1240 466 1232 555 1188 618 C1146 675 1080 690 1018 650 C958 610 935 548 945 475 C952 420 955 370 985 345 Z'});
    add(svg,'path',{'class':'grass-a','d':'M145 520 C240 485 360 500 435 560 C500 610 510 705 468 775 C420 855 315 885 220 850 C130 818 95 735 112 650 C125 585 112 540 145 520 Z'});
    add(svg,'path',{'class':'grass-b','d':'M355 585 C430 550 545 565 615 625 C675 675 680 770 638 835 C590 907 500 940 415 900 C335 862 305 785 320 705 C332 645 325 605 355 585 Z'});
    add(svg,'path',{'class':'grass-a','d':'M690 390 C790 360 905 385 970 455 C1022 510 1018 590 965 650 C912 710 815 735 735 695 C662 658 630 585 645 520 C658 465 655 410 690 390 Z'});

    /* Route network follows the exact visual sequence of the original map. */
    var roads=[
      /* Firstlight -> Softglade -> Bloomvale */
      'M305 982 L370 860 L310 790',
      /* Bloomvale -> Coast Route -> Tidemarsh */
      'M310 790 L520 735 L625 875',
      /* Tidemarsh -> Marsh Route -> Spark Metropolis */
      'M625 875 L700 700 L665 585',
      /* Spark Metropolis -> Quarry Road -> Stonereach -> Ember Pass -> Emberfell */
      'M665 585 L535 445 L455 490 L330 435 L205 490',
      /* Cinderfall Tarn connects only through Ember Pass */
      'M330 435 L345 205',
      /* Spark Metropolis -> Snowline Rise -> Frostpeak Climb -> Frostpeak */
      'M665 585 L665 345 L665 275 L665 190',
      /* Spark Metropolis -> Glimmer Flats -> Spark Woods -> Prismgate -> Shade Trail -> Shadeholt */
      'M665 585 L795 445 L820 540 L930 535 L1040 550 L1145 505'
    ];
    roads.forEach(function(d){add(svg,'path',{'class':'road-under',d:d});add(svg,'path',{'class':'road',d:d});});

    /* A small secondary curve near the eastern forest, matching the illustrated road network. */
    add(svg,'path',{'class':'hidden-road','d':'M820 540 C875 625 945 675 1018 690'});

    /* Title + compact legend */
    var title=add(svg,'text',{'class':'map-title',x:92,y:74}); title.textContent='LUMENA';
    var sub=add(svg,'text',{'class':'map-subtitle',x:96,y:105}); sub.textContent='INTERACTIVE REGION MAP';
    add(svg,'rect',{'class':'legend-bg',x:1010,y:1010,width:330,height:70,rx:12});
    var lt=add(svg,'text',{'class':'legend-text',x:1035,y:1040});lt.textContent='■ Town / City     ▬ Route / Area';
    var lt2=add(svg,'text',{'class':'legend-text',x:1035,y:1064});lt2.textContent='Tap a visible marker to view Lumen';

    /* Visible clickable markers are added last so they always sit above terrain. */
    locations.filter(function(p){return p.kind==='route';}).forEach(function(p){addRoute(svg,p);});
    locations.filter(function(p){return p.kind==='town';}).forEach(function(p){addTown(svg,p);});
    addLandmark(svg,{name:'The Spire',x:1220,y:865,lw:155});

    canvas.appendChild(svg);
  }

  function install(){
    makeMap();
    var toggle=document.getElementById('world-map-toggle');
    if(toggle) toggle.addEventListener('click',function(){requestAnimationFrame(makeMap);});
    var close=document.getElementById('route-results-close');
    if(close) close.addEventListener('click',function(){document.querySelectorAll('#lumena-simplified-map .poi').forEach(function(p){p.classList.remove('active');});});
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',install,{once:true});
  else install();
})();
