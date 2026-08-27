export const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, character => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
})[character]);

export function renderLumenRows(lumens) {
  return lumens.map(lumen => `
    <button class="side-item" type="button" data-id="${escapeHtml(lumen.id)}"
      data-num="${lumen.number}" data-types="${escapeHtml(lumen.types.join(' '))}"
      data-rarity="${escapeHtml(lumen.rarity)}" data-locations="${escapeHtml(lumen.locations.join('|'))}">
      <span class="side-num">#${String(lumen.number).padStart(3, '0')}</span>
      <img src="${escapeHtml(lumen.image)}" alt="" loading="lazy">
      <span class="side-name">${escapeHtml(lumen.name)}</span>
    </button>`).join('');
}

export function renderMoveCards(moves) {
  return moves.map(move => `
    <article class="mv-move-card" data-move-id="${escapeHtml(move.id)}">
      <header class="mv-move-head"><strong class="mv-move-name">${escapeHtml(move.name)}</strong>
        <span class="mv-type-chip">${escapeHtml(move.type)}</span>
        <span class="mv-cat-chip">${escapeHtml(move.category)}</span></header>
      <div class="mv-move-stats"><span>Power ${move.power ?? '—'}</span><span>Accuracy ${move.accuracy ?? '—'}</span><span>PP ${move.pp ?? '—'}</span></div>
      <p class="mv-move-desc">${escapeHtml(move.description)}</p>
    </article>`).join('');
}
