# v11 Flow 2 "Day story" spec (P1, D1, D2, D3, D4, D5)

Figma file `mtJwAlzXjAgclXudyFSCwh`, page "fnal design", section 562:135057. All frames 428 wide (P1/D2-D5: 428x926, D1: 428x1952).
Font everywhere: Reem Kufi (Regular 400 / SemiBold 600 / Bold 700) unless noted. Reem Kufi has no arrow glyph: the "→" in the D2 button needs a fallback font (system sans) at the same 15px, colour #0b4f5a.
Reference PNGs (1400 max, frames are 428 so 1:1; D1 is scaled to 307x1400): `/tmp/claude-0/-home-user-ALIGNMENT-DATALYTICS-SCREENS/c3c08dc5-9d30-50cc-91e6-a20fc2c734b4/scratchpad/ref-v11/{P1,D1,D2,D3,D4,D5}.png`.
Assets are in `public/v11/a-*.svg` (list at the end). Graph art, 22-ball axis, zones, rails and markers on the day graph already exist in the repo and are NOT re-exported.

Shared tokens: ink #3e4e78, muted ink #5a6a95, teal label #0b8fa3, green value #1b8f74, button text #0b4f5a, button mint gradient #5cebca to #b5f8e7, button border #acf8e4, process blue #3f5cc4, check-in/magenta #e0058f, dashed purple #8d63a8, dot off #c3d0ea.

Mint round button/CTA ("three-layer mint" in the brief): in these frames the large CTA (D2/D3/D4) is a single gradient pill, not three layers (see D2). The P1 buttons are the three stacked pale plates. The round marker/button "three concentric circles" is the strip's open button (D1).

---------------------------------------------------------------------------------------------------

## P1  Process ends popup  (node 563:145333, 428x926)

Navigation: arrives when a process (Deactivation) ends. Background is the existing emotion chooser ("spiral base screen" 563:145339, header "PLEASE CHOOSE / THE EMOTION YOU ARE FEELING NOW / SEE HOW MUCH THE process MADE YOU FEEL BETTER." at y 44/75/91, happy-manifestor badge, spiral list). Nothing on it is dimmed (no scrim), the popup simply sits on top. The header third line is the only text on the background that is new/changed: "See how much the process made you feel better." (small, 12px, ink; outlined in the file, read from screenshot).
- DONE: dismiss the popup (return to the chooser/spiral underneath). Arrow target not readable in file (section metadata not fetched), assumed.
- SEE DATALYTICS: go to D1 (Day home, Datalytics, Day tab, today).

Popup `activation` 563:146099: frame x=21, y=229, 386x468, square corners (r=0).
Three stacked plates (assets `a-p1-popup-plates.svg`, 386x468 at popup 0,0):
| layer | node | x,y (in popup) | size | fill | shadows |
|---|---|---|---|---|---|
| 1 | 563:146102 | 0,0 | 386x468 | linear top-bottom #93fcee, 48% #95fff0, #8bf7e5 | -5 -6 5 0 white; 5 5 6 0 rgba(0,0,0,.25) |
| 2 | 563:146103 | 9,11 | 368x446 | same teal gradient | same two shadows |
| 3 | 563:146104 | 20,21 | 346x424 | top-bottom #eef4ff to #f6f9ff | -5 -5 5 0 white; 4 4 7 0 rgba(0,0,0,.25) |

Mini graph "what you shifted" 563:146132: box popup (52,84), 282.72x114.
- bg rounded rect 282.72x110.96, r13.68, gradient top-bottom #fbe4f2, 50% #dff5ec, #e0dcf7 (CSS).
- y labels "22" (top 0), "15" (top 41.04), "1" (top 91.2): 6.84px SemiBold #5a6a95, right-aligned, right edge x=19.76 (box 16.72 wide).
- dashed 15-line `a-p1-mini-dashed-15.svg` 253.08x0.76 at mini (23.94,49.78): #8d63a8, stroke .76, dash 3.04/2.28.
- blue line `a-p1-mini-line.svg` 177.08x58.52 at mini (53.58,24.70): #3f5cc4 width 2.28 round, runs bottom-left (before, 6) to top-right (after, 19).
- markers P (star-ish round) `a-p1-marker-before.svg`/`-after.svg` 17.70x17.87 at mini (45.5,72.97) and (220.3,16.73) (layout boxes 15.38x15.56 at (47.12,74.48) and (221.92,18.24)).
- "Before · 6" left x=22.8, top 94.24, 8.36px SemiBold #5a6a95. "After · 19" right-aligned to x=267.52, top 94.24, same style.

Texts (block 563:146120 at popup (48.37,270.03), 289.25 wide, centered, column gap 11.8):
| text | size/weight | colour | line-h |
|---|---|---|---|
| "+13 LEVELS" (uppercase) | 22.874 Bold | #34d2e3 | 28.04 |
| dot (5.9px circle, fill not exported, #1b8f74 assumed) + "in 5 minutes of Deactivation" (gap 4.43) | 11.806 SemiBold | #1b8f74 | 13.28 |
| "From 6 to 19" | 11.068 SemiBold | #3e4e78 | 14.76 |

Buttons (frame 563:146106 at popup (90,385), 207x48.27, gap 30). Each 88.5x48.27, three stacked pale plates `a-p1-btn-plates.svg` (use twice). Plates: 88.5x48.27 / inset 1.61 85.28x45.06 / inset 3.22 82.06x41.84, all r3.22, gradient ~181deg #eaf7fa (3.8%) to #f7fafb (99%); shadows -1.6 -1.6 .8 white + .8 .8 1.6 rgba(71,71,71,.25) (outer), -.8 -.8 .8 white + .8 .8 1.6 same (inner two).
- DONE: label "DONE" 12.873px Bold #6cd9c7, centred (left offset 24, top 6.44, one line, lh 16.09). Hit area 88.5x48.27 at frame (21+90, 229+385) = x 111..199.5, y 614..662; recommended padding to 96x52.
- SEE DATALYTICS: two lines "SEE" / "DATALYTICS", same text style, left offset 5 (width 78, centred), top 6.44. Hit area x 229.5..318, y 614..662.
Frame abs: DONE x 111, SEE DATALYTICS x 229.5 (popup-x 208.5).
Interaction: press = plates shift 1px / opacity .85 (not designed). No scrim, no swipe.

---------------------------------------------------------------------------------------------------

## D1  Day home with "Your beautiful movement today" strip  (node 563:136960, 428x1952)

Page is the v8 Day page (428x1832) with one new row inserted, so the height becomes 1952 (+120).
Unchanged (same y as v8): status bar y12, back button/home, title "YOUR DATALYTICS", Period tabs (18,105) 392x60, date arrows (96,177)/(304,177) 28x28 and date "Sun 25 Oct" (x178, y187).
**New strip** `Card / Movement strip` 563:138224 at x=18, y=214, 392x100 (9px gap under the date row, which ends at y=205).
**Everything that was at y>=214 in v8 moves down exactly +120** (strip 100 + 20 gap): "YOUR POINT OF ATTRACTION" title 214.23 -> 334.23; POA graph plate (25,226)->(25,346); 22-ball axis, quadrant names, time axis 813 -> 933; "YOUR PROGRESS" 873.6 -> 993.6; two stat cards (45,906)/(227,906) -> (45,1026)/(227,1026), 170x108 each; progress graph plate (7,1032)->(7,1152); legend plate 1755.93 -> 1875.93; frame height 1832 -> 1952. The background blob group stays at y=105 and a second identical blob group is added at y=896.55 to cover the extra length (563:136975). The ScaleFrame FRAME_H must become 1952 for this page. All graph overlay coordinates (POA 428x1832 svg) shift +120 in y.
Gap strip bottom (314) to title top (334.23) = 20.

Strip layout (coords relative to strip):
| part | node | x,y | size | style |
|---|---|---|---|---|
| plate 1 outer | 563:138225 | 0,0 | 392x100 r24 | gradient top-bottom #d3e4ff to #f3f8ff; shadow -2 -2 2 white + 2 4 6 rgba(0,0,0,.25) |
| plate 2 inner | 563:138226 | 6,6 | 380x88 r18 | gradient #e9f2ff to #ffffff; same two shadows |
| content | 563:138227 | 24,14 | 238x72 col gap 4 | |
| eyebrow "YOUR BEAUTIFUL MOVEMENT TODAY" | 563:138228 | 0,0 | 238x17 | 11px SemiBold, tracking 1.2, #0b8fa3, nowrap |
| "+13" | 563:138230 | row y=21 x=0 | 49x51 | 34px Bold #3e4e78 |
| "Deactivation" | 563:138232 | row x=61 (strip x 85), y 3.5 | 96x24 | 16px SemiBold #3e4e78 |
| "From 6 to 19  ·  in 5 minutes" (two spaces each side of the dot) | 563:138233 | under it, y+24 | 141x20 | 13px Regular #5a6a95 |
| open button | 563:138234 | 328,30 | 40x40 | three concentric circles: r20, r17, r14 (outer to inner), each its own gradient + drop shadows, chevron ">" stroke #3e4e78 2.4 round, 10x16 at (16,12) of button |
Open button asset `a-d1-strip-button-open.svg` is 50.8x51.4 (includes shadows) placed at strip (323.2, 25.2).
Plates asset `a-d1-strip-plates.svg` 392x100 contains both plates (hand-built from the node values above because Figma's node export was contaminated with the canvas background; shadows are feGaussianBlur with stdDev = blur/2; visually verify against ref-v11/D1.png).
Hit areas: the whole strip 392x100 (abs x18..410, y214..314) opens D2; the round button is a visual affordance (min 44x44 around its centre abs (366,264)) and does the same.
Interaction: tap strip -> D2 (sheet page 1 over the Progress graph). Page scrolls to the Progress graph first (graph top 1152) so the sheet shows over it (D2 background = progress graph at y=60, see D2).
Navigation in: from P1 "SEE DATALYTICS".

---------------------------------------------------------------------------------------------------

## D2  Bottom sheet page 1 "Look what you shifted"  (node 563:138240, 428x926)

Background: frame gradient top-bottom #e9f8f3 to #eef4ff; bg ellipses opacity .16; status bar 11:11 at y12. Behind the sheet is the Day Progress graph, scrolled so its outer plate is at (7,60) 414x713 (plate 1 563:138258 inset 60/7/153/7; plate 2 inset 66/13/159/13): the "view/filter" round button at (right 21 -> x367, y72) 40x40, zone labels (SUPER HIGH x353.66,y127.6; HIGH y267.6; BORDEM y308.4; MEDIUM y324.4; LOW y524.6; VERY LOW y674.6), 22-ball axis x19..32 from y124 to 685 (26.08 pitch), plot 312x560 at (x=215-19-156=... centre-19) = x39..351 y127..687, top "postive no emotion" and bottom "negative no emotion" rails, zoom -/+ buttons (14,728) and (361,727) 26x26. All existing graph art: reuse the repo's Progress graph.
Focus treatment (only on selected movement): a white dim `Dim · unselected` rgba(255,255,255,.6) over the plot rect (35,126) 320x559 so everything but the selected process is faded; the selected process line `Vector (Stroke)` 5.25x348.67 at (314,204) (blue, from 19 down to 6) plus its two P markers 16.19x16.37 at (310,197) and (307,543), plus two focus rings `a-d2-focus-ring.svg` 30x30 at (303,190) and (300,536) (fill #34d2e3 .22, stroke #0b8fa3 2). No dark scrim; no dimming of the page outside the plot.
Sheet 563:138772: x0, y556, 428x370 (bottom flush at 926), radii 28 top-left/top-right, vertical gradient #ffffff to #eaf2ff, shadow drop 0 -4 8 rgba(0,0,0,.18). `a-sheet-plate-grabber.svg` = plate + grabber. Grabber 563:138773: 44x5 r3 #c3d0ea at sheet (192,12).

Sheet content (coords inside sheet):
| item | node | x,y | size | style |
|---|---|---|---|---|
| "LOOK WHAT YOU SHIFTED" | 563:138774 | 28,28 | nowrap | 12px Bold #0b8fa3 (looks tracked ~0.5) |
| mini graph bg | 563:138775 | 28,52 | 372x146 r18 | gradient top-bottom #fbe4f2, 50% #dff5ec, #e0dcf7 |
| y labels 22/15/1 | 563:138776-8 | right edge x=54, tops 52/106/172, width 22, right-aligned | | 9px SemiBold #5a6a95 |
| dashed 15 line | 563:138779 | asset 333x1 at (59.5,117.5) | | `a-d2-mini-dashed-15.svg` #8d63a8 dashed 4 3 |
| blue line | 563:138780 | asset 233x77 at (98.5,84.5) | | `a-d2-mini-line.svg` #3f5cc4 |
| marker before | 563:138781 | asset 23.29x23.52 at (87.87,148.02) (box 90,150 20.24x20.47) | | `a-d2-mini-marker-before.svg` |
| marker after | 563:138787 | asset at (317.87,74.02) (box 320,76) | | `a-d2-mini-marker-after.svg` |
| "Before · 6" | 563:138793 | left 58, top 176 | | 11px SemiBold #5a6a95 |
| "After · 19" | 563:138794 | right edge x=380, top 176 | | same |
| "+13 levels" | 563:138795 | centred on x=214, top 206 | | 34px Bold #1b8f74 |
| "in 5 minutes of Deactivation" | 563:138796 | centred x=214, top 250 | | 14px SemiBold #3e4e78 |
| CTA "See what happened next   →" (3 spaces before arrow) | 563:138797 | 28,278 | 372x46 r23 | gradient top-bottom #5cebca to #b5f8e7, 1.5 border #acf8e4, shadow 1 3 5 0 rgba(0,0,0,.25) (drop shadow only), label 15px Bold #0b4f5a centred, top 14.25 |
| dots | 563:138800-2 | y 340.5, x 194.5 / 210.5 / 226.5 | 7x7 | active (page 1 = first) #0b8fa3 `a-sheet-dot-on.svg`, inactive #c3d0ea `a-sheet-dot-off.svg`; pitch 16 |
Hit areas: CTA 372x46 at abs (28, 556+278=834) to y880; grabber/handle zone 428x32 at top of sheet (drag to dismiss/expand); dots each 7px visual, hit 24x24 (optional); sheet body swipe left/right for pages.
Interaction: CTA or swipe-left -> page 2: D3 if the follow-up event is a positive match (the "20 minutes after" case) or D4 if it is a check-in ("34 minutes after"). Down-swipe on grabber / tap outside sheet closes it back to D1 (assumed, not drawn).
Navigation in: tap on D1 strip.

---------------------------------------------------------------------------------------------------

## D3  Sheet page 2, positive-match state  (node 563:138803, 428x926)

Same background as D2 (graph, dim, process line and the two P markers at (310,197),(307,543)); the two D2 focus rings are removed. Added on the graph for the highlighted event:
- a positive-match triangle marker (`Group 1000011944` art, existing graph asset) at (323,111) 16.19x13.88, top rail "postive no emotion" right position (this is the right-hand of the two top rail markers, drawn again on top of the dim);
- focus ring `a-d3-focus-ring.svg` 26x26 at (318,105);
- time thread `a-d3-time-thread.svg` 14.5x82.5 at (317.25,123.25): dashed line from the marker down to the end of the process (19), stroke #0b8fa3 1.5 round, dash 3 3.
Sheet 563:139340: y596, 428x330 (bottom flush), same fill/radius/shadow/grabber.
| item | node | x,y | style |
|---|---|---|---|
| "WHAT HAPPENED NEXT" | 563:139342 | 28,28 | 12 Bold #0b8fa3 |
| positive match icon | 563:139343 | art box 30,56 34x29.15; asset `a-d3-icon-positive-match.svg` 44.88x37.69 at (23.63,51.48) | teal triangle with "+" |
| title "A positive match" | 563:139348 | 96,56 | 24 Bold #3e4e78 |
| sub "20 minutes after your Deactivation" | 563:139349 | 96,92 | 14 SemiBold #5a6a95 |
| note box | 563:139350 | 28,132 372x64 r16 | fill rgba(27,143,116,.08) (green tint) |
| note text "You noticed something good. No feeling was recorded with it." | 563:139351 | 44,148 width 340 | 13 Regular #3e4e78 (wraps to 2 lines? fits one in design) |
| CTA "Enjoy this moment" | 563:139352 | 28,212 372x46 r23 | same mint pill as D2 |
| dots | 563:139355-7 | y 286.5 | middle (page 2) active |
Hit: CTA abs (28,808)-(400,854). Interaction: "Enjoy this moment" closes the sheet (back to D1) or advances to page 3 (not drawn; design intent is a soft close). Swipe left -> D5, right -> D2.

---------------------------------------------------------------------------------------------------

## D4  Sheet page 2, check-in state  (node 563:139358, 428x926)

Identical sheet geometry to D3 (id 563:139895: y596, 428x330). Differences vs D3:
| aspect | D3 positive match | D4 check-in |
|---|---|---|
| graph highlight | triangle at (323,111), ring 26 at (318,105), dashed thread down to 19 | ring 26 (`a-d3-focus-ring.svg`, node 563:139893) on the "C" check-in marker right of the process end at about abs (329,192)-(355,218) (read from screenshot, ids 563:139892 "Label" is the small dash glyph `a-d4-label-dash.svg` 4.78x6.02 between process end and ring, a short dashed link) ; no triangle |
| icon | positive-match triangle 34x29 at (30,56) | check-in round "C" marker `a-d4-icon-checkin-marker-c.svg` (node 563:139898): box 28,52 33.6x33.6; asset 52.64x51.8 at (18.48,43.32) |
| title | "A positive match" | "You checked in at 19" (24 Bold #3e4e78, 96,56) |
| sub | "20 minutes after your Deactivation" | "34 minutes after your Deactivation" |
| note tint | rgba(27,143,116,.08) green | rgba(11,143,163,.08) teal |
| note text | "You noticed something good. No feeling was recorded with it." | "Still high on your scale — the relief stayed with you." (em dash) |
| CTA | "Enjoy this moment" | "Close" (node 568:136417) |
Close button: same pill 372x46 at (28,212), label "Close". Hit area abs (28,808)-(400,854). Close -> dismisses the sheet to D1 (graph dim removed). Dots same as D3 (page 2 active, y 286.5).

---------------------------------------------------------------------------------------------------

## D5  Sheet page 3 "Relief moments today"  (node 563:139911, 428x926)

Background: as D2 but only the process line + two P markers (310,197),(307,543) are un-dimmed (no rings, no triangle, no check-in). Sheet 563:140441: y526, 428x400 (bottom flush), same fill/radius/shadow/grabber (44x5 at 192,12).
| item | node | x,y | style |
|---|---|---|---|
| "YOUR RELIEF MOMENTS TODAY" | 563:140443 | 28,28 | 12 Bold #0b8fa3 |
| "Four recorded upward movements" | 563:140444 | 28,48 | 13 Regular #5a6a95 |
| divider | 563:140457 | asset 373x1 at (27.5,271.5) | `a-d5-divider.svg` #d8e3f6 |
| "4 moments of relief" | 563:140458 | 28,288 | 20 Bold #3e4e78 |
| "Tap a bar to see that movement" | 563:140459 | 28,318 | 13 Regular #5a6a95 |
| dots | 568:136420-2 | y 357 | third (right) active |
Bars (all 76 wide, r14, 1.5 white border, opacity .85, gradient top colour to white at bottom; bottoms aligned at y=220; scale 10px per level; columns pitch 94: x=36,130,224,318):
| movement | value text (16 Bold #1b8f74, centred, 76 wide, top = bar top - 24) | bar node | bar x,y | w x h | top colour | label (11 SemiBold #3e4e78, centred, top 230) |
|---|---|---|---|---|---|---|
| Breathing | "+3" at y166 | 563:140446 | 36,190 | 76x30 | #3f5cc4 | "Breathing" |
| Meditation | "+5" at y146 | 563:140449 | 130,170 | 76x50 | #3f5cc4 | "Meditation" |
| Focus Wheel | "+4" at y156 | 563:140452 | 224,180 | 76x40 | #e0058f | "Focus Wheel" |
| Deactivation | "+13" at y66 | 563:140455 | 318,90 | 76x130 | #0b8fa3 | "Deactivation" |
Order is chronological (Breathing, Meditation, Focus Wheel, Deactivation). Colours follow the graph's process types (process blue, games magenta, Deactivation teal; drawn with the bar's top colour fading to white).
Hit areas: each bar column (value text top to label bottom): Breathing abs (36,692)-(112,773), Meditation (130,672)-(206,773), Focus Wheel (224,682)-(300,773), Deactivation (318,592)-(394,773) (sheet y 526 offset). Interaction: tap a bar selects that movement and highlights it on the graph behind (undim that process, same treatment as D2; D5 shows the Deactivation line as the default highlighted one); tapping again deselects. Swipe right -> D3/D4, no CTA button on this page.

---------------------------------------------------------------------------------------------------

## Navigation (as far as it could be read)
P1 --SEE DATALYTICS--> D1; P1 --DONE--> chooser. D1 strip tap -> D2. D2 CTA/swipe -> D3 or D4 (data driven). D3 CTA "Enjoy this moment" / D4 "Close" -> close sheet (D1). Pages 2 -> 3 by swipe or dot tap: D3/D4 -> D5. Dots: D2 first active, D3/D4 middle, D5 last. The connector arrows/labels in section 562:135057 were NOT fetched (the section metadata is too large to page through with the available tools), so the above is inferred from frame names, button labels and dot states.

## Asset list (public/v11/, prefix a-)
| file | node | native size | notes |
|---|---|---|---|
| a-d1-strip-plates.svg | 563:138225 + 563:138226 | 392x100 | hand-built from node values (Figma export was contaminated with canvas bg) |
| a-d1-strip-button-open.svg | 563:138234 | 50.8x51.4 | three concentric circles + chevron, shadows included; place at strip (323.2,25.2) |
| a-p1-popup-plates.svg | 563:146101 (146102-4) | 386x468 | hand-built |
| a-p1-btn-plates.svg | 563:146108 / 146114 | 88.5x48.27 | hand-built, used for both buttons |
| a-p1-mini-dashed-15.svg | 563:146137 | 253.08x0.76 | |
| a-p1-mini-line.svg | 563:146138 | 177.08x58.52 | |
| a-p1-marker-before.svg / a-p1-marker-after.svg | 563:146139 / 563:146145 | 17.70x17.87 | |
| a-sheet-plate-grabber.svg | 563:138772 + 563:138773 | 428x370 | hand-built; D3/D4 crop to 330, D5 to 400 (use CSS height) |
| a-d2-mini-dashed-15.svg | 563:138779 | 333x1 | |
| a-d2-mini-line.svg | 563:138780 | 233x77 | |
| a-d2-mini-marker-before.svg / -after.svg | 563:138781 / 563:138787 | 23.29x23.52 | |
| a-sheet-dot-on.svg / a-sheet-dot-off.svg | 563:138800 / 563:138801 | 7x7 | #0b8fa3 / #c3d0ea |
| a-d2-focus-ring.svg | 563:138770 | 30x30 | |
| a-d3-focus-ring.svg | 563:139338 (also 563:139893 in D4) | 26x26 | |
| a-d3-time-thread.svg | 563:139339 | 14.5x82.5 | |
| a-d3-icon-positive-match.svg | 563:139343 | 44.88x37.69 | |
| a-d4-icon-checkin-marker-c.svg | 563:139898 | 52.64x51.8 | |
| a-d4-label-dash.svg | 563:139892 | 4.78x6.02 | |
| a-d5-divider.svg | 563:140457 | 373x1 | |

Not exported (pure CSS in spec): mini-graph gradient backgrounds, sheet fills, CTA pills, note boxes, D5 bars, P1 popup status dot. Hand-built SVG plates (a-d1-strip-plates, a-p1-popup-plates, a-p1-btn-plates, a-sheet-plate-grabber) could not be rendered here (no SVG rasteriser installed), compare them with ref-v11 PNGs. Files `s-*.svg` in the same folder come from another agent and are not part of this list.
