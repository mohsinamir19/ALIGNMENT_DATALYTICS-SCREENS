# v11 Match flow: assumptions (src/v11/match)

Negative frames were not drawn. Choices made:
- L2 negative: mirror of the positive layout (negative card expanded at x 7, positive collapsed at x 241), placeholder "Write your negative match", name colour #b3426e, pink plates.
- L3 chip negative: pink plate, minus marker, label "Negative match". On a negative match the spiral auto-scrolls to the lower rows (levels 14 to 1).
- L4 negative: same jar popup, title "MOMENT KEPT", status "Negative match · 7 Discouragement" with a magenta dot, "+1 coin" kept (the store adds a coin for every match), a pink ball drops in. Only SEE DATALYTICS (centred); no ENJOY button.
- E1 is only reached for positive matches; if an id points to a negative event it renders with the positive wording and a magenta dot.

Other decisions:
- Spiral first: tapping a feeling in L1 (not 15) infers the kind, stores the level and opens L2; in L2 it only changes the stored level (and the inferred kind unless a card was tapped). An explicit card tap always wins. 15 alone sets no kind. In L3 the stored level is highlighted, and any tap (also 15) finishes.
- L2: the check button is DONE (aria-label "Done"); SKIP continues with an empty note. Enter in the field = DONE. Note max 140 chars.
- Emotion names come from the spec table (level 17 = Hopefulness, 18 = Optimism); the "17 Optimism" in the L4 reference is a Figma inconsistency.
- Popup button labels use #178f7c instead of the drawn #6cd9c7 (contrast). Chip text 7px instead of 6px. Textarea is CSS (the asset has a baked placeholder).
- Exported SVG assets carry an opaque #F0F5FF frame rectangle (and the spiral a dark section path); they are fetched once and stripped at load (Svg component in ui.tsx).
- Rows 22 to 9 are the exported L3 art; rows 8 to 1 are CSS plates (the art is clipped at 618px). The lower ribbon is the E2 blue one, faded in.
- E2 uses the exported E2 art (m-spiral-e2-full.svg, includes title, badge, gauge, icon bar) with transparent hit buttons. FEAR (level 1) is only a 20px sliver at the bottom of that art, so it is tappable but small. The house icon goes to /analytics.
- Back arrow: L1 goes to "/", L2 to L1, L3 to L2; E2 back skips without storing. Tap outside or Esc closes L4 (fresh draft) and E1/E2-less popups (E1 Esc/outside goes to `back` without markEnjoyed).
- L4 behind screen is the L2 layout with the spiral at y 352 (drawn behind the popup, inert).
