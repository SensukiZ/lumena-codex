# Lumena Codex — Faithful Modular Refactor

This project preserves the supplied Codex interface and behavior while moving its embedded code into external files.

## Structure

- `index.html` — original structural markup
- `css/theme.css` — maintainable rarity, type, and move-category variables
- `css/layers/` — 131 ordered style layers from the original build
- `js/runtime/` — 55 feature runtimes in their original execution positions
- `js/data/lumens.js` — 150 extracted Lumen index records
- `js/data/moves.js` — authoritative move database
- `js/data/types.js` — shared type definitions
- `js/modules/filters.js` — pure Lumen and move filtering logic
- `js/modules/renderers.js` — reusable Lumen and move HTML renderers
- `js/app.js` — ES6 module entry point and stable public module API
- `assets/world-map.png` — original embedded world-map artwork
- `manifest.webmanifest` — installable-app metadata retained by the original HTML

The numbered CSS and runtime filenames intentionally preserve the old cascade and execution order. Upload the complete folder contents to the root of a GitHub repository.

## Corrections retained after extraction

- Snow weather is set by **Frost Signal**. Blizzard Call remains a damaging Ice move.
- Weather runtime URLs are versioned and the service worker clears older cached builds.
