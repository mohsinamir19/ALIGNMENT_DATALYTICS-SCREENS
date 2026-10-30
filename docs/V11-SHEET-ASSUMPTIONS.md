# v11 sheet: decisions not drawn in Figma

- Dim: the sheet draws NO scrim (transparent tap-outside layer only). The white rgba(255,255,255,.6) dim over the plot belongs to the graph, which must draw it, otherwise it would be doubled.
- Page 2 with 3 or more events: rows at pitch 74 (y 56/130/204), no note box; card and button grow by 74 per extra row (card 330 for 0 to 2 rows, 404 for 3). More than 3 events: a text "See all" link (teal, bold 14, underlined, 44 px hit) under row 3 adds 40 px; tapping it lists every row.
- Pluralisation: "1 minute after", otherwise "N minutes after".
- 2+ rows: any positive match gives the state 5 layout (rows show "Enjoyed" once enjoyed; button Close when none is left), otherwise state 6. No note box.
- A saved match note is shown as a small quoted second line in the note box for single-row states (2, 3, 7); the Figma copy stays line one.
- Check-in note compares level with movement.after.
- Negative-match icon is drawn inline (the s-icon files carry a grey canvas rectangle); positive and C use the clean a-d3/a-d4 SVGs, dots use a-sheet-dot-on/off.
- Page 1 mini graph is the fixed D2 illustration; only the texts are data driven.
- Page 3: 10 px per level (capped 150). Deactivation teal, Focus Wheel magenta, others blue. No bar selected initially; tap selects, tap again deselects. Tapping the bar named like store.movement.type calls onHighlightMovement and shows the chip "5 minutes, 15:05 to 15:10, level 6 to 19"; other bars show "name, up N levels".
- Swipe: horizontal drag over 50 px changes page, drag down over 80 px closes (sheet follows the finger); a drag suppresses the following click.
- Dot buttons are 16x24 hit areas (visual 7x7).
