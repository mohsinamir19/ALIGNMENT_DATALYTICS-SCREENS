# ANGEL v11 build notes

## Repo audit (what was reused, replaced, added)
- Stack: Vite + React 18 + TypeScript + Tailwind 3 + framer-motion, Reem Kufi (fontsource). Vercel SPA rewrite in `vercel.json`.
- KEPT (v8): `src/components/{Shell,PoaGraph,ProgressGraph,Tooltip,Ball}.tsx`, `src/data/*` (graphs, zoom, filter dropdown, legend, tap tooltips, drill-down, stat cards, period tabs). Graph art is untouched; the page below the strip moves down 120 px as one piece (`dy` prop).
- REPLACED: old `App.tsx` (one phone page) is now a route switch; the old "frame 428x1832" page lives inside a scrolling 428x926 phone (`#v11-scroll`).
- ADDED: `src/v11/` (router, demo store, phone frame, launcher), `match/` (L1-L4, E1, E2), `analytics/` (strip, P1 popup, W/M/Y strips), `sheet/` (3 pages, 7 states, `renderSheetPage2`). Assets in `public/v11/`. Specs in `docs/spec-v11-*.md`.

## Routes
`/` launcher · `/match` (L1-L4) · `/match/enjoy?id=&back=` (E1) · `/match/check-in?back=` (E2) · `/analytics` (+ `?sheet=1|2|3`, `?popup=process`, `?strip=quiet|down` for review).

## Shared store (`src/v11/store.ts`, localStorage `angel-v11-demo`)
movement, events (oldest first), counts (9 positive / 5 negative), relief list, coins. Seed = frame D3 (one positive match, 20 min after). Reset demo restores the seed.

## Assumptions (not drawn in Figma, decided here)
- Negative match popup: same L4 popup with negative wording and colours, only SEE DATALYTICS (see `V11-MATCH-ASSUMPTIONS.md`).
- Strips for other days/periods: only today's movement exists in the store, so offsets other than 0 show the quiet strip.
- Week/Month/Year strip copy follows W1/M1/Y1 ("Sun 25 Oct · From 6 to 19"); negative-biggest-movement strip for W/M/Y is not drawn, reused from the Day "down" state.
- Sheet: "See all" link, 3rd+ row layout, "1 minute" wording, state after Enjoy with a check-in present: see `V11-SHEET-ASSUMPTIONS.md`.
- The sheet draws no dim itself; the analytics page dims the plot behind it (Deactivation bar cut out).
- Level 17 reads "Optimism" where the L4 reference shows it (reference wins over the spiral table).
- Match logging never creates a level on a match; only movements have before/after; no lines between check-ins.
- Popup button text colour darkened for contrast (#178f7c instead of #6cd9c7).
- Exports from Figma carry a grey canvas rectangle; stripped at load or replaced by clean files.

## Known differences
See `V11-QA-REPORT.md` (seed match not drawn as a strip triangle on the v8 graph, a few pale cards above the plot in D2-D4, small tap targets on v8 graph markers).
