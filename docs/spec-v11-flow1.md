# v11 Flow 1 spec: Log a match (L1, L2, L3, L4, E1, E2)

Figma file `mtJwAlzXjAgclXudyFSCwh`, page "fnal design", section `562:135057` ("ANGEL · v11 — Log a match → Enjoy → Day story (flow)").
All frames are 428 x 926. Font everywhere: Reem Kufi (Regular / Medium / SemiBold / Bold). Coordinates below are frame-local (0,0 = top-left of the 428x926 frame) unless marked "spiral-local".
Reference PNGs (428x926, 1x; maxDimension 1400 was requested but the node is only 428 wide so the render stayed 1x):
`/tmp/claude-0/-home-user-ALIGNMENT-DATALYTICS-SCREENS/c3c08dc5-9d30-50cc-91e6-a20fc2c734b4/scratchpad/ref-v11/{L1,L2,L3,L4,E1,E2}.png`

Important structural facts
- Every frame except E2 = `bg · glow (DS)` + header (time bar 11:11 + back button) + `Content` (title, subtitle, match card(s)) + `buttons and spiral fit to screen` (the 22-emotion spiral, 428x887, taller than the frame so the lower part is scrolled/clipped) + the second heading "HOW DID IT THE MATCH FEEL?" / "OPTIONAL · AFTER YOUR MATCH" sitting just above the spiral.
- The spiral is the SAME component in L1, L2, L3, L4, E1; only its y offset changes. L1, L2 look washed out (inactive, see L1 section); L3 is the active one.
- All label text is REAL text in Figma, but the SVG exports have text outlined (no `<text>`), so the strings below are the source of truth.
- No frame has a dark scrim. The L4/E1 popups sit on the unmodified L-screen behind them (no overlay colour, no blur). Only the popup's own teal frame + soft shadows separate it.
- The section contains no Figma prototype wiring other than drawn arrows + labels; navigation below is read from those arrows.
- NEGATIVE FRAMES WERE NOT DRAWN. See "Negative inference" at the end.

Shared tokens
| token | value |
|---|---|
| title cyan (page titles) | #34d2e3 (E2 titles use #2de6fa / #02dff6) |
| subtitle navy | #3e4e78 (Medium 14/20) |
| optional label teal | #0b8fa3 (Bold 12/16, tracking 1px, uppercase) |
| positive green text | #1b8f74 |
| negative magenta text | #b3426e |
| neg plate gradient (top to bottom) | #ffe0f5 to #fcc3e9 |
| pos plate gradient | #d9ffe8 to #b9f5d0 |
| plate shadows (all cards, all layers) | `-1px -1px 1px #fff, 1px 2px 3px rgba(0,0,0,.25)` (drop shadows only, no inner shadows) |
| mint button 3 layers (see Edit button) | rim #acf8e4; body and face gradient #5cebca to #b5f8e7; same shadow as plates |
| button label navy | #1f3b5c |
| spiral label colour | #3e4e78 (var --stantdarr-font-color) |
| time bar | "11:11" Roboto Medium 17, #797777, tracking -0.5, at x about 52 (centre 55), 428x17 at y 12; signal/wifi/battery at right |

---------------------------------------------------------------
## L1 · Pick positive or negative (node 562:135058, ref `L1.png`)

Layout table (frame-local)
| element | node | x | y | w | h | notes |
|---|---|---|---|---|---|---|
| bg glow | 562:135059 | 0 | 0 | 428 | 926 | asset `m-bg-glow.svg` (pastel lavender/cyan/yellow-green blobs on #eef0ff-ish) |
| time bar | 562:135061 | 0 | 12 | 428 | 17 | |
| back button | 562:135062 | 18 | 36 | 32.5 | 32.5 | asset `m-back-btn.svg`, round pastel bubble with red "<" chevron. Hit area: use 44x44 centred (x 12, y 30). |
| Title | 562:135065 | 58 | 84 | 312 | 36 | "CHECK- IN YOUR MATCH" Bold 24, #34d2e3, tracking 1.2px, uppercase, centred (literal source text "check- in your match") |
| Subtitle | 562:135066 | 18 | 132 | 392 | 20 | "Tap the one that fits. You’ll feel it next." Regular 14/20 #3e4e78 centred |
| Card / Negative | 562:135068 | 26 | 162 | 180 | 112 | plate radius 12, inner plate inset 3 radius 9, gradient #ffe0f5 to #fcc3e9 |
| Card / Positive | 562:135087 | 222 | 162 | 180 | 112 | plate gradient #d9ffe8 to #b9f5d0 |
| Choices container | 562:135067 | 26 | 162 | 376 | 112 | gap between cards 16 |
| second heading | 562:135185 | 18 | 312 | 391 | 36 | "HOW DID IT THE MATCH  FEEL?" (two spaces before FEEL in source), Bold 24, #34d2e3, tracking 1.2, centred |
| optional line | 562:135186 | 106 | 349 | 218 | 9 | "OPTIONAL · AFTER YOUR MATCH" Bold 12/16 #0b8fa3 tracking 1, uppercase, centred |
| spiral | 562:135109 | 0 | 372 | 428 | 887 | clipped at y 926; spiral-local coordinates below, add (0,372) |

Card internals (both cards, 180x112, padding 9, column, gap 6, centred)
- Name: "Negative Match" / "Positive Match", Bold 11/14, colour #b3426e / #1b8f74. At card-local y 8.25.
- Dropdown-style chip "icons coming out activation / text box": 107x15.5 at card-local (36.5, 22.25). Text 6px Regular #017687 capitalised: "name your  Negative experience (optional)" / "name your  positive experience (optional)" (two spaces after "your" in source). Chip has two vectors (146x15 pill outline and a 141x13 shadow strip) plus a small red chevron (8.4x6.1, rotated, at right edge x about +129). Asset `m-dropdown-chip.svg` (positive/negative identical shape, 146x16). In the screenshot the chip appears as a pale-cyan rounded bar with a red down caret at its right end.
- Choice circle 60x60 at card-local (60, 43.75): three concentric circles (layer 1 r30 at 0,0; layer 2 57px at 1.5; layer 3 54px at 3), pearl-white fills with white top-left and dark bottom-right drop shadows, plus a 22x22 icon centred. Negative icon: akar-icons circle-minus, colour #b3426e-ish magenta; positive icon: circle-plus, colour teal-green #1b8f74. Assets `m-choice-circle-neg.svg`, `m-choice-circle-pos.svg` (70x70 viewbox, includes shadow bleed, so place at card-local (55, 38.75)).
- The positive card is built as plate 1 + a nested copy of the whole card (a Figma artefact). Visually it is the same two-plate card.

Hit areas (frame coords)
- Negative card (tap anywhere): x 26, y 162, w 180, h 112. Circle itself: x 86, y 205.75, 60x60.
- Positive card: x 222, y 162, w 180, h 112. Circle: x 282, y 205.75, 60x60.
- Back: x 12, y 30, 44x44.
- Spiral rows in L1: drawn but INACTIVE (see below). The arrow label on the flow says "tap one".

State: spiral in L1/L2
The 22 emotion plates, ribbons, ball numbers are rendered pale (labels about #8a95b0, ribbons desaturated). Exact opacity is not recoverable from metadata; treat as opacity about 0.55 with pointer-events none until a match type is saved. In L3 the same spiral is full strength.

Navigation (arrow "tap one", node 564:136163): L1 to L2 when the user taps one of the two cards.

---------------------------------------------------------------
## L2 · Write something (optional) (node 562:135187, ref `L2.png`)

Same header, title, subtitle as L1. Content is 251 tall. The tapped card (positive in the drawn frame) is expanded.

| element | node | x | y | w | h | notes |
|---|---|---|---|---|---|---|
| Choices container | 562:135196 | -1.8 | 162 | 431.7 | 173 | |
| Card / Negative (collapsed) | 562:135197 | 7.2 | 162 | 180 | 112 | shows name + chip + circle exactly as L1, chip text "name your Negative experience (optional)" |
| Card / Positive (expanded) | 562:135216 | 195.2 | 162 | 225.65 | 173 | all dims scaled 1.2536 from the 180x112 card: radius 15.04, inner plate inset 3.76/5.02, padding 11.28 |
| Name | 562:135220 | 206.5 | 173.3 | 95 | 10 | "Positive Match" Bold 13.79/17.55 #1b8f74, left aligned (not centred in expanded card) |
| textarea | 562:135221 | 206.5 | 190.8 | 203 | 96.5 | asset `m-textarea.svg` (204x96 pale-blue gradient field with inner shadow). Placeholder "write your positive match" Regular 7.52px capitalised #9da7a8, at textarea-local (6.5, 9.2): displayed "Write Your Positive Match" |
| SKIP tab | 562:135232 | 210.2 | 298.6 | 52.65 | 21.5 | mint three-layer button: rim #acf8e4 radius 10.77; body gradient #5cebca to #b5f8e7 inset 1.79 radius 8.98; face inset 3.59 radius 7.18; label "SKIP" Bold 8.38/10.77 #1f3b5c, tracking 0.6, uppercase |
| confirm check | 562:135225 | 374.5 | 292.4 | 33.8 | 32.6 | round three-layer pearl marker (layer 1 32.4, 2 30.8, 3 29.1) with teal tick; assets `m-check-circle.svg` (38x38) |
| title 2 | 562:135314 | 18 | 342 | 391 | 36 | same text as L1 second heading, shifted +30 |
| optional | 562:135315 | 106 | 379 | 218 | 9 | |
| spiral | 562:135238 | 0 | 402 | 428 | 887 | shifted +30 vs L1; still inactive |

The input: textarea is a real editable field (max about 140 chars suggested; no limit drawn). Skip = continue with no note.

Hit areas: textarea (206.5, 190.8, 203x96.5); SKIP: pad to (200, 290, 72x38); check: (366, 284, 50x50); negative card (7.2,162,180,112) still tappable = switch to negative; back (12,30,44,44).

Navigation (arrow "DONE", 564:136167): L2 to L3 via the check button or SKIP.

State differences vs L1: positive card expanded and left-aligned; negative card shifted left 18.8px (x 26 to 7.2) and unchanged in size; subtitle unchanged.

---------------------------------------------------------------
## L3 · Pick the emotion (node 562:135316, ref `L3.png`)

| element | node | x | y | w | h |
|---|---|---|---|---|---|
| header, title, subtitle | | as L1 | | | |
| saved chip "Card / Positive · saved" | 562:135325 | 18 | 162 | 392 | 68 |
| second heading | 562:136015 | 17 | 262 | 391 | 36 |
| optional line | 562:136016 | 106 | 299 | 218 | 9 |
| spiral | 562:135346 | -1 | 312 | 428 | 887 |
| "Happy Manifestor" badge | 562:135423 | 8 | 326 | 94 | 109 | (spiral-local 9,14; frame (8,326)) asset `m-badge-manifestor.svg` |
| pig | 562:135422 | 310 | 334 | 108 | 108 | (spiral-local 311,22) asset `m-pig.svg` (pig inside a ring of 8 pink dots) |

Saved chip (positive, note present)
- Two plates: outer 392x68 radius 14, inner 386x62 at +3, radius 11; gradient #d9ffe8 to #b9f5d0, same shadow. Padding 14/10, gap 12.
- Left marker: 36x36 round pearl (3 concentric circles) at chip-local (14,16), with teal tick (asset `m-choice-circle-saved.svg`, 42x42 incl. shadow).
- Text block at chip-local x 62: line 1 "Positive match" Bold 14/20 #1b8f74 tracking 0.5; line 2 "“Finished my first chapter”" Regular 12/16 #3e4e78 (curly quotes included; shows the user's note, or when the note is empty the second line is omitted).
- EDIT button: 64x30 at chip-local (314,19) = frame (332,181), mint three layers (rim #acf8e4 r15; body gradient #5cebca to #b5f8e7 58x24 inset 3 r12; face 52x18 inset 6 r9), label "EDIT" Bold 12/16 #1f3b5c tracking 1, uppercase.
- Hit areas: EDIT (326, 175, 76x42) goes back to L2; the left marker/chip body may also re-open L2.

The title "CHECK- IN YOUR MATCH" stays; no change of header text between L1..L4.

### The spiral (22 emotions), active state
Spiral frame origin in L3 = (-1, 312); in L1 (0,372); in L2 (0,402); in L4 and E1 (0,352). All coordinates in the table are spiral-local (frame 428x887). Add the origin to get frame coords. Each emotion = a plate (the label) + a ball (26x26 number marker; level 22 is 48x48). Tap target = plate rect union ball rect.

Plate construction (left plates open to the right, i.e. rounded on the LEFT: radius 79 bottom-left/top-left; right plates are mirrored, rounded on the right). Three stacked layers:
1. outer: full size, gradient 120deg #e8efff (3.6%) to #f0f5ff to #f6f9ff (93%), shadow `-6px -4px 4px #fff, 9px 9px 11px rgba(0,0,0,.16)` (some use `4px 4px 6px rgba(0,0,0,.13)` or `-5px -5px 5px #fff, 5px 4px 11px rgba(0,0,0,.16)`)
2. middle: inset about 6.5% vertical, 3% horizontal, gradient top-to-bottom #dee9ff to #f6f9ff, shadow `-1px -1px 2px 1px #fff, 4px 2px 3px rgba(0,0,0,.25)`
3. inner: inset about 13% vertical, 6% horizontal, same gradient and shadow
Text: Medium 12, #3e4e78, line gap 3 to 5, left plates left-aligned (text starts at 16% of plate width), right plates right-aligned (right padding 15%).
Level 22 (FREEDOM) is a half-disc: radius 183 top-left and top-right, three layers inset 5.4%/4% and 10.7%/7.9%, shadows `-14px -8px 7px rgba(255,255,255,.8), 7px 5px 7px rgba(0,0,0,.12)` outer and `-4px -2px 6px #fff, 3px 2px 6px rgba(0,0,0,.12)` inner; text 12 Medium, rows gap 6.
Ball: Public Sans Regular, number with gradient text (purple-pink for upper levels, colour changes by level; level 22 uses linear-gradient 65deg #bf77bc 13% to #f2b7ef 57%), text-shadow `1px 2px 2px #fff, -1px 0 2px rgba(0,0,0,.26)`, size 24px for the 48 ball (about 13 to 14px for 26 balls), in a pearl circle made of 2 ellipses (42 and 36 in the big ball). Ball vectors are in the full-spiral SVG.
Ribbons: two curved translucent ribbons behind the plates: "postive spiral" 562:135348 at (159,98) 107x220 (upper, pastel pink / purple / teal / mint bands) and "Group 6418" 562:135347 at (169.5,406.3) 90x441 (lower, mint/green/yellow/orange bands). Assets `m-spiral-ribbon-pos.svg` (107x220), `m-spiral-ribbon-neg.svg` (export is clipped at 208 tall by the frame; use E2 versions for full height).

The 22 emotions (level number = ball number; spiral-local plate x,y,w,h; ball x,y,w; labels exactly as in Figma, one per line)
| lvl | label lines | plate x | y | w | h | ball x | ball y | side |
|---|---|---|---|---|---|---|---|---|
| 22 | FREEDOM / JOY      LOVE / APPRECIATION / EMPOWERMENT | 113.3 | 11 | 202 | 112 | 188 | 90 | 48 | centre half-disc; "JOY" and "LOVE" on one line with spacing |
| 21 | PASSION | 34 | 138 | 126 | 49 | 145 | 148.3 | 26 | left |
| 20 | ENTHUSIASM / EAGERNESS / HAPPINESS | 261.8 | 149.7 | 134 | 62 | 253 | 170.3 | 26 | right |
| 19 | POSITIVE / EXPECTATION / BELIEF | 31.8 | 188.8 | 134 | 55 | 149 | 202.4 | 26 | left |
| 18 | OPTIMISM | 261.8 | 214 | 134 | 54 | 252 | 227.9 | 26 | right (this group is built differently: contains 3 stray rectangles and a duplicate OPTIMISM text; ignore them, use the plate) |
| 17 | HOPEFULNESS | 31.8 | 245.8 | 134 | 49 | 153 | 257 | 26 | left |
| 16 | CONTENTMENT / SATISFACTION | 262 | 269.8 | 134 | 56 | 249 | 282 | 26 | right |
| 15 | BOREDOM | 163 | 345.3 | 122 | 49 | 153 | 357 | 26 | centre-right (neutral) |
| 14 | PESSIMISM | 262 | 405 | 134 | 49 | 246 | 416 | 26 | right |
| 13 | FRUSTRATION / IRRITATION / IMPATIENCE | 32 | 425.5 | 134 | 62 | 153 | 447.1 | 26 | left |
| 12 | OVERWHELM | 262.2 | 465.6 | 134 | 49 | 246 | 476.2 | 26 | right |
| 11 | DISAPPOINTMENT | 32 | 498.7 | 134 | 49 | 153 | 509.3 | 26 | left |
| 10 | DOUBT | 262.2 | 525.8 | 134 | 49 | 246 | 536 | 26 | right |
| 9 | WORRY | 32 | 558.9 | 134 | 49 | 153 | 568.4 | 26 | left |
| 8 | BLAME | 262.2 | 587 | 134 | 49 | 246 | 598 | 26 | right |
| 7 | DISCOURAGEMENT | 32 | 619.1 | 134 | 49 | 153 | 630 | 26 | left |
| 6 | ANGER | 262.2 | 647.2 | 134 | 49 | 246 | 658 | 26 | right |
| 5 | REVENGE | 32 | 679.3 | 134 | 49 | 153 | 690 | 26 | left |
| 4 | HATRED / RAGE | 262.2 | 707.3 | 134 | 49 | 246 | 718 | 26 | right |
| 3 | JEALOUSY | 32 | 739.4 | 134 | 49 | 153 | 750 | 26 | left |
| 2 | INSECURITY / GUILT / UNWORTHINESS | 262.2 | 770.5 | 134 | 62 | 246 | 779 | 26 | right |
| 1 | FEAR / GRIEF / DESPERATION / POWERLESSNESS | 32 | 800 | 134 | 75 | 151 | 812 | 26 | left (the Figma layer is named "fear animation": a button that is meant to animate) |
Notes on the table: ball numbers 22 to 2 are read from the screenshots (L3 shows 22..8, E2 shows 22..2); the number on ball 1 is inferred from the sequence (Figma layer "Component 20/42"). Level 22 and 21 to 16 are positive (upper spiral), 15 is neutral, 14 to 1 negative. Frame hit rectangle = plate rect united with ball rect (balls overlap the plate's inner edge by about 13px).

In L3 (origin -1,312) the rows visible without scrolling: 22 to 8 and part of 7 (the frame ends at y 926 = spiral-local 614). The spiral must scroll (or the page must) for levels 7 to 1. In E2 the whole spiral is inside a scroll frame 428x914.

Selecting an emotion: no selected state was drawn. Infer: the tapped plate and ball scale about 1.04 and the ball gets a coloured ring; then L4 opens.

Navigation (arrow "tap a feeling", 564:136171): L3 to L4 on tapping any of the 22 emotions. The L4 popup status line shows the chosen one as "17 Optimism" (level number + capitalised first label word; for multi-word rows the drawn example only covers OPTIMISM, so use the first label).

---------------------------------------------------------------
## L4 · Moment kept (node 562:136017, ref `L4.png`)

Background = the screen with the spiral at origin (0,352) and the header/title/subtitle unchanged, content behind shows L2-like cards (collapsed negative with the circle moved to top; positive with the note field) plus the spiral lower half. No scrim. The popup covers y 229 to 697.

Popup "activation" node 562:136724: x 21, y 229, w 386, h 468. Three stacked rectangles (square corners, no radius):
1. outer 386x468 at (0,0), gradient top to bottom #93fcee, #95fff0 (48%), #8bf7e5, shadow `-5px -6px 5px #fff, 5px 5px 6px rgba(0,0,0,.25)`
2. mid 368x446 at (9,11), same fill and shadow
3. inner paper 346x424 at (20,21), gradient #eef4ff to #f6f9ff, shadow `-5px -5px 5px #fff, 4px 4px 7px rgba(0,0,0,.25)`
Inner content frame at popup-local (20,20) 347x425.

Contents (positions from the screenshot, frame coords, +-3px)
| element | x | y | w | h | spec |
|---|---|---|---|---|---|
| jar | 126 | 262 | 177 | 212 | asset `m-jar.svg` (183x221 incl. shadow; place at about (123, 260)); glass jar with lid, balls: 9 green (positive) and 5 pink/red (negative) balls inside, 1 small light-green ball falling from the top (= the new moment, animate dropping in) |
| title "MOMENT KEPT" | 89 | 494 | 250 | 28 | Bold 22.87/28, #34d2e3, uppercase, centred |
| status | 89 | 527 | 250 | 13 | green dot 5.9px (#1b8f74) + "Positive match · 17 Optimism" SemiBold 11.8/13.3 #1b8f74; gap 4.4; row centred |
| coin row | 89 | 549 | 250 | 24 | coin 23.6px (asset `m-coin.svg`, gold) + gap 7.4 + "+1 coin" Bold 16.2/20.7 #9a7a14 |
| today line | 89 | 583 | 250 | 15 | "Today: 9 positive · 5 negative" SemiBold 11.07/14.8 #3e4e78 centred |
| button ENJOY THIS MOMENT | 111 | 614 | 88.5 | 48.3 | see below |
| button SEE DATALYTICS | 229.5 | 614 | 88.5 | 48.3 | |

Popup buttons (both): three nested rectangles (88.5x48.27 r3.2; 85.28x45.06 at +1.6; 82.06x41.84 at +3.2), each gradient 181deg #eaf7fa (3.8%) to #f7fafb (99%), shadows `-1.6px -1.6px .8px #fff, .8px .8px 1.6px rgba(71,71,71,.25)` outer and `-.8px -.8px .8px #fff, .8px .8px 1.6px rgba(71,71,71,.25)` inner. Label Bold 12.87/16.09, #6cd9c7 (pale mint text, low contrast, as drawn), centred, two lines: "ENJOY THIS / MOMENT" and "SEE / DATALYTICS". Gap between buttons 30 (frame x: 111 to 199.5, then 229.5 to 318). This is the "pale mint button" style, not the three-layer mint style of EDIT/SKIP.
Hit areas: ENJOY THIS MOMENT (105, 608, 100x60); SEE DATALYTICS (224, 608, 100x60); no close button, no outside-tap dismissal drawn (infer: back button at top still works).

Data: "Positive match · 17 Optimism" = type + level + emotion; "+1 coin" is always +1; "Today: 9 positive · 5 negative" = running counters including the new one (jar ball counts match: 9 green, 5 pink).

Navigation: ENJOY THIS MOMENT (arrow label "ENJOY THIS MOMENT", routed below, node 564:136187 to E1) and also the straight arrow "ENJOY" 564:136175 (L4 to E1); SEE DATALYTICS (arrow label "SEE DATALYTICS", 564:136183) goes to D1 Day home (563:136960).

---------------------------------------------------------------
## E1 · Enjoy this moment (node 562:138034, ref `E1.png`)

Same background and same popup plates/positions as L4 (popup (21,229) 386x468; spiral origin (0,352)). Content differs:
| element | x | y | w | h | spec |
|---|---|---|---|---|---|
| heart "your words" | 98 | 268 | 232 | 196 | asset `m-heart.svg` (261x223 incl. shadows; place at about (84, 262)). Three nested lavender-blue hearts (#dce8ff to #e8efff, soft white/dark drop shadows). |
| note text | 129+... centred at x 213 | 345 | 130 | 40 | "Finished my first chapter" (the user's note, live text) Regular 18/22, colour rgba(45,55,65,.6), tracking -0.36, centred, wraps to 2 lines ("Finished my first" / "chapter" in the drawing), vertically in the heart's upper bowl at about y 337 to 380. If no note: hide text (infer; maybe show nothing) |
| title | 89 | 494 | 250 | 28 | "ENJOY THIS MOMENT" Bold 22.87 #34d2e3 |
| status | 89 | 527 | 250 | 13 | "Positive match · 17 Optimism" with green dot |
| breath line | 89 | 549 | 250 | 15 | "Stay with it for one slow breath. Nothing to do." SemiBold 11.07/14.8 #3e4e78 |
| button DONE | 111 | 614 | 88.5 | 48.3 | label "DONE" single line (x offset 24 inside) |
| button HOW DO I FEEL NOW | 229.5 | 614 | 88.5 | 48.3 | label "HOW DO I / FEEL NOW", two lines |

Interaction: "one slow breath": suggest the heart gently scales 1.0 to 1.04 over about 4s (inhale) and back (exhale); not animated in Figma, nothing is required of the user. Buttons identical in style to L4 (pale mint).
Hit areas: DONE (105,608,100,60); HOW DO I FEEL NOW (224,608,100,60).
Navigation: DONE leads to D1 Day home (not drawn as a direct arrow from E1; the flow arrows show E1 to E2 only, and D4 "Check-in added" returns from E2). Infer DONE to D1. HOW DO I FEEL NOW (arrow "FEEL NOW", 564:136179) to E2.

---------------------------------------------------------------
## E2 · How do I feel now? optional check-in (node 562:133999, ref `E2.png`)

Full-screen spiral on a sky background; no popup.
| element | node | x | y | w | h | spec |
|---|---|---|---|---|---|---|
| background "spiral base screen" | 562:134005 | 0 | 1 | 428 | 992 | gradient -8.6deg: #73bfe9 (1%), #b5e5fe (10%), #c2ebff (51%), #fffcf1 (69%), #fffeef (81%), #ffebf9 (97%) (bottom blue to top pale pink/cream), plus 8 white cloud blobs, mix-blend screen, opacity 0.2 to 0.5. Asset `m-bg-e2-sky.png` (428x925 raster of this layer; includes clouds) |
| time bar | 562:134764 | 0 | 12 | 428 | 17 | |
| icon bar | 562:134723 | 0 | 36 | 428 | 39 | back bubble at (16, 42.9) 32.5px and a small pink house-with-"H" icon at right (364.5, 36) 39px; asset `m-icon-bar-e2.svg` (428x48). Hit: back (10,36,44,44); house icon (360,32,48,48) goes to Day home (inferred) |
| title line 1 | 562:134652 | 82.5 | 56 | 263 | 23 | "PLEASE CHOOSE" Bold 31, #2de6fa, centred, white text-shadow glow |
| title line 2 | 562:134653 | 40.5 | 87 | 347 | 13 | "THE EMOTION YOU ARE FEELING NOW" Bold 18, #02dff6 |
| title line 3 | 562:134654 | 85 | 103 | 259 | 12 | "OPTIONAL  ·  ADD IT TO YOUR DAY" SemiBold 16, #3e4e78, uppercase |
| badge | 562:134060 | 10 | 123 | 94 | 109 | same "HAPPY MANIFESTOR 50.000" badge as L3 (asset `m-badge-manifestor.svg`) |
| pig gauge | 562:134722 | 312 | 139 | 122 | 102 | pig inside a rainbow arc gauge (values 91, 95, 100); asset `m-pig-gauge.svg` (116x102). A hidden duplicate "last" (562:134655, pig head up and down) is `hidden=true`: ignore |
| spiral | 562:134014 | 0 | 96 | 428 | 897 | scroll frame (428x914 at y 12) with "all in one" at y 84 inside; spiral-local = frame y - 96 |

Spiral in E2 is the same 22 emotions, same labels, but laid out on a slightly different grid (ribbons are light translucent blue, `m-spiral-e2-ribbon-pos.svg` 107x220 at spiral-local (155.7,109.1), `m-spiral-e2-ribbon-neg.svg` 90x413 at (166.2,417.7)). Spiral-local (add (0,96) for frame y; x as is):
| lvl | plate x,y,w,h | ball x,y |
|---|---|---|
| 22 FREEDOM... | 110.2, 23, 202, 112 | 185, 102 (48) |
| 21 PASSION | 29.2, 149.4, 126, 49 | 142, 160.3 |
| 20 ENTHUSIASM... | 259, 161, 134, 62 | 250, 182.3 |
| 19 POSITIVE EXPECTATION BELIEF | 29, 200.6, 134, 55 | 146, 214.3 |
| 18 OPTIMISM | 249 (group 144x54), 226 | ball inside group |
| 17 HOPEFULNESS | 29, 257.6, 134, 49 | 150, 269.3 |
| 16 CONTENTMENT SATISFACTION | 259, 281, 134, 56 | 246, 294.3 |
| 15 BOREDOM | 160.1, 357, 122, 49 | 150, 369.3 |
| 14 PESSIMISM | 259.2, 417.2, 134, 49 | 243, 428.3 |
| 13 FRUSTRATION... | 29.2, 437.2, 134, 62 | 150, 459.3 |
| 12 OVERWHELM | 259.4, 477.4, 134, 49 | 243, 488.3 |
| 11 DISAPPOINTMENT | 29.2, 510.5, 134, 49 | 150, 521.3 |
| 10 DOUBT | 259.4, 537.5, 134, 49 | 243, 548.3 |
| 9 WORRY | 29.2, 570.6, 134, 49 | 150, 580.3 |
| 8 BLAME | 259.4, 598.7, 134, 49 | 243, 609.3 |
| 7 DISCOURAGEMENT | 29.2, 630.8, 134, 49 | 150, 641.3 |
| 6 ANGER | 259.4, 658.9, 134, 49 | 243, 670.3 |
| 5 REVENGE | 29.2, 691, 134, 49 | 150, 702.3 |
| 4 HATRED RAGE | 259.4, 719.1, 134, 49 | 243, 730.3 |
| 3 JEALOUSY | 29.2, 751.1, 134, 49 | 150, 762.3 |
| 2 INSECURITY GUILT UNWORTHINESS | 259.4, 782.2, 134, 62 | 243, 791.3 |
| 1 FEAR GRIEF DESPERATION POWERLESSNESS | 163.2, 886.1 (looks mispositioned; ball is at 148, 823.3) | 148, 823.3 |
Anomaly: in E2 the FEAR plate sits at the centre-bottom (163, 886) while its ball sits at y 823; in L3 it sits left at (32,800). Use the L3 arrangement (plate left x 29, y about 812) when building.
E2 text differences: plates have no visible dimmed state, all active. The E2 layout shows the lower rows (pessimism.. insecurity) with the blue ribbon behind them.

Interactions: tap an emotion, choose it as the "now" check-in; then the flow arrow "check-in added" leads to D4 (Day, "Check-in added", 563:139358). Back returns to E1. There is no Skip button drawn (the screen is "optional"; leaving via back or the house icon).

---------------------------------------------------------------
## Navigation summary (from the arrows in section 562:135057)
| arrow | from | to | label |
|---|---|---|---|
| 564:136163 | L1 | L2 | "tap one" |
| 564:136167 | L2 | L3 | "DONE" |
| 564:136171 | L3 | L4 | "tap a feeling" |
| 564:136175 | L4 | E1 | "ENJOY" |
| 564:136179 | E1 | E2 | "FEEL NOW" |
| 564:136183 | L4 | D1 (Day home, 563:136960) | "SEE DATALYTICS" |
| 564:136187 | L4 | E1 (routed below) | "ENJOY THIS MOMENT" |
| 564:136191 | E2 | D4 (563:139358) | "check-in added" |
Row A heading text in the section: "row · A · LOG A MATCH". Frame captions: "L1 Pick positive or negative", "L2 Write something (optional)", "L3 Pick the emotion", "L4 Moment kept", "E1 Enjoy this moment", "E2 How do you feel now? (optional)".

## Negative inference (not drawn)
- L1: tapping the negative card plays the same L1 to L2 transition; the negative card then expands (mirror of the positive: card at left x 7 to 233) and the positive card collapses (circle only). Textarea placeholder "write your negative match" / displayed "Write Your Negative Match". Chip wording already exists in L1: "name your Negative experience (optional)". L4 behind-screen already shows the negative card with the prompt "what was your negative experience?" (Figma layer name in 562:136044).
- Colours: negative plates #ffe0f5 to #fcc3e9, name colour #b3426e, icon circle-minus magenta; the saved chip in L3 becomes pink gradient, label "Negative match", marker with minus icon, EDIT button stays mint.
- L3 emotions: negative selection probably highlights the lower (14 to 1) rows or scrolls the spiral to them; nothing drawn.
- L4: title likely "MOMENT KEPT", status "Negative match · 7 Discouragement" with a magenta/red dot (#b3426e), coin line probably still "+1 coin" (unknown: may be no coin for negative, or a different reward), jar gets a pink ball. E1 for negative: unknown (probably replaced by a gentler "Be kind to yourself" popup); not drawn, so ENJOY THIS MOMENT wording is positive only. In the Figma "Sheet states" (D3 "What happened next · positive match") negative variants are likewise absent.

## Asset list (all in /home/user/ALIGNMENT_DATALYTICS-SCREENS/public/v11/, grey #958888 export background removed)
| file | Figma node | size | used in |
|---|---|---|---|
| m-bg-glow.svg | 562:135059 | 428x926 | L1 to L4, E1 background |
| m-back-btn.svg | 562:135062 | 51x48 (incl. shadow) | back button all frames |
| m-choice-circle-neg.svg | 562:135078 | 70x70 | L1, L2 negative card |
| m-choice-circle-pos.svg | 562:135100 | 70x70 | L1 positive card |
| m-choice-circle-saved.svg | 562:135329 | 42x42 | L3 chip marker |
| m-check-circle.svg | 562:135225 | 38x38 | L2 confirm check |
| m-dropdown-chip.svg | 562:135073 | 146x16 | cards chip |
| m-textarea.svg | 562:135221 | 204x100 | L2 textarea |
| m-spiral-ribbon-pos.svg | 562:135348 | 107x220 | spiral upper ribbons L1 to L4 |
| m-spiral-ribbon-neg.svg | 562:135347 | 90x208 (clipped) | spiral lower ribbons (clipped by frame, use e2 version for full height) |
| m-spiral-l3-full.svg | 562:135346 | 427x618 | L3 spiral as one asset incl. plates, balls, badge, pig (outlined text, 903 KB, contains 1 embedded raster) |
| m-spiral-e2-full.svg | 562:134013 | 428x914 | E2 whole scroll content, all 22 plates/balls/ribbons/badge/pig gauge (1.2 MB) |
| m-spiral-e2-ribbon-pos.svg | 562:134046 | 107x220 | E2 |
| m-spiral-e2-ribbon-neg.svg | 562:134017 | 90x413 | E2 |
| m-badge-manifestor.svg | 562:135423 | 99x114 | L3, E2 |
| m-pig.svg | 562:135422 | 108x108 | L3 |
| m-pig-gauge.svg | 562:134722 | 116x102 | E2 |
| m-icon-bar-e2.svg | 562:134723 | 428x48 | E2 |
| m-bg-e2-sky.png | 562:134005 | 428x925 | E2 background (PNG because of clouds and blend modes) |
| m-jar.svg | 562:136745 | 183x221 | L4 |
| m-coin.svg | 562:136878 | 24x24 | L4 |
| m-heart.svg | 562:138029 | 261x223 | E1 (text excluded? The export includes the outlined sentence "Finished my first chapter"; if you need live text, hide it with an overlay or re-export the 3 heart vector layers 562:138030, 562:138031, 562:138032) |
Not exported (build in CSS from this spec): cards and plates, buttons, popup plates, 22 emotion plates, EDIT/SKIP buttons, status chips, texts. Individual emotion balls are only inside the full-spiral SVGs (Figma nodes: ball for level n is "Component N" next to each label; ball 22 = 562:135401, 21 = 562:135412, 17 = 562:135418, 13 = 562:135421 etc.).

## Could not fetch / uncertain
- Exact opacity or tint of the spiral in L1/L2 (inactive state), exact ball number colours per level, ball 1 number, per-emotion selected state.
- Spiral export in L3 is clipped to the visible 618px; use the E2 export for the lower rows. SVG text is outlined, no live text in exports.
- Exports contain `data:image` embedded rasters in pig/badge/jar (jar has 20+ raster balls; truncated listing, whole-node SVG export was used so everything is embedded).
- Rendering of SVGs could not be verified locally (no rasterizer available).
- Popup contents positions (jar, heart, text rows) are measured from the screenshot because metadata child coordinates there are not parent-relative.
