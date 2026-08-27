const normalize = value => String(value ?? '').trim().toLowerCase();

export function filterLumens(lumens, { query = '', rarity = '', type = '', location = '' } = {}) {
  const wantedQuery = normalize(query);
  const wantedRarity = normalize(rarity);
  const wantedType = normalize(type);
  const wantedLocation = normalize(location);
  return lumens.filter(lumen => {
    const searchable = [lumen.number, lumen.name, ...lumen.types, lumen.rarity, ...lumen.locations]
      .join(' ').toLowerCase();
    return (!wantedQuery || searchable.includes(wantedQuery))
      && (!wantedRarity || normalize(lumen.rarity).split(/\s+/).includes(wantedRarity))
      && (!wantedType || lumen.types.some(entry => normalize(entry) === wantedType))
      && (!wantedLocation || lumen.locations.some(entry => normalize(entry) === wantedLocation));
  });
}

export function filterMoves(moves, { query = '', type = '', category = '' } = {}) {
  const wantedQuery = normalize(query);
  const wantedType = normalize(type);
  const wantedCategory = normalize(category);
  return moves.filter(move => {
    const searchable = [move.id, move.name, move.description, JSON.stringify(move.effect ?? {})]
      .join(' ').toLowerCase();
    return (!wantedQuery || searchable.includes(wantedQuery))
      && (!wantedType || normalize(move.type) === wantedType)
      && (!wantedCategory || normalize(move.category) === wantedCategory);
  });
}
