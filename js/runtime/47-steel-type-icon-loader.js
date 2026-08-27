(function(){
  var steelUrl='https://lumena.gg/images/battle/type-icons/white/steel.webp';
  /* If the remote Steel artwork is unavailable, use a compact inline metal/gear mark
     rather than leaving the Steel pill empty. */
  var fallback='data:image/svg+xml;charset=UTF-8,'+encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="white" d="M12 2.7l2.1 1.7 2.7-.3.9 2.5 2.4 1.3-.7 2.6 1.4 2.3-1.9 1.9.1 2.7-2.6.7-1.5 2.3-2.5-.9-2.4.9-1.5-2.3-2.6-.7.1-2.7-1.9-1.9 1.4-2.3-.7-2.6 2.4-1.3.9-2.5 2.7.3zM12 7.1a4.9 4.9 0 1 0 0 9.8 4.9 4.9 0 0 0 0-9.8zm0 2.2a2.7 2.7 0 1 1 0 5.4 2.7 2.7 0 0 1 0-5.4z"/></svg>'
  );
  var img=new Image();
  img.onload=function(){ /* real Lumena Steel icon exists; leave it untouched */ };
  img.onerror=function(){
    var selectors=[
      '.type-chip[style*="#9FB0BF"]::before',
      '.lumen-counter-defending-type[style*="#9FB0BF"]::before',
      '.mv-type-chip[style*="#9FB0BF"]::before',
      '.counter-selected-type[style*="#9FB0BF"]::before',
      '.counter-result-type-badge[style*="#9FB0BF"]::before',
      '.counter-chip[style*="#9FB0BF"]::before',
      '.lumen-counter-item-type[style*="#9FB0BF"]::before'
    ];
    var st=document.createElement('style');
    st.id='steel-type-icon-fallback-runtime';
    st.textContent=selectors.join(',\n')+'{background-image:url("'+fallback+'") !important;}';
    document.head.appendChild(st);
  };
  img.src=steelUrl;
})();
