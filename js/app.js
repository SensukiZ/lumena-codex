import { lumens, lumenById } from './data/lumens.js';
import { moves, moveById } from './data/moves.js';
import { types, typeColors } from './data/types.js';
import { filterLumens, filterMoves } from './modules/filters.js';
import { renderLumenRows, renderMoveCards } from './modules/renderers.js';

export const codexData = Object.freeze({ lumens, lumenById, moves, moveById, types, typeColors });
export const codexFilters = Object.freeze({ filterLumens, filterMoves });
export const codexRenderers = Object.freeze({ renderLumenRows, renderMoveCards });

// A stable public module API for future migrations. The preserved legacy runtime
// continues to own the existing interface, so this does not alter its behavior.
window.LumenaCodexModules = Object.freeze({ codexData, codexFilters, codexRenderers });
