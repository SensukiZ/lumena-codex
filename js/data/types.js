export const types = ["Normal","Fire","Water","Electric","Grass","Ice","Fighting","Poison","Ground","Flying","Psychic","Bug","Rock","Ghost","Dragon","Dark","Steel","Fairy"];
export const typeColors = Object.fromEntries(types.map(type => [type, `var(--type-${type.toLowerCase()})`]));
