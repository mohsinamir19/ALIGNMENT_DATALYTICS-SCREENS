# v11 spec: movement strips (Day/Week/Month/Year) and Sheet page 2 states

Figma file `mtJwAlzXjAgclXudyFSCwh`, page "fnal design". All text below is REAL text in Figma (not outlined) and was read from the nodes. Font everywhere: Reem Kufi. Frames are 428 wide. Reference PNGs (not in repo): `/tmp/claude-0/-home-user-ALIGNMENT-DATALYTICS-SCREENS/c3c08dc5-9d30-50cc-91e6-a20fc2c734b4/scratchpad/ref-v11/{W1,M1,Y1,STRIPS,SHEETSTATES,SS1..SS7}.png`.

## 1. Strip states (board `564:136222`, 428x510)

Strip = `Card / Movement strip`, 392x100, placed at x=18, y=214 on Day/Week/Month/Year. Two plates, drop shadows only (no inner shadow, no stroke):

| layer | pos | size | radius | fill | shadow |
|---|---|---|---|---|---|
| plate 1 outer | 0,0 | 392x100 | 24 | linear top-to-bottom `#d3e4ff` to `#f3f8ff` | `-2 -2 2 0 #fff`, `2 4 6 0 rgba(0,0,0,.25)` |
| plate 2 inner | 6,6 | 380x88 | 18 | linear top-to-bottom `#e9f2ff` to `#ffffff` | same two shadows |

Content frame: x=24, y=14, vertical stack, gap 4, overflow clip, no wrap. Row: gap 12, vertical-centre, y=21 in Content (51 high).

Text styles: eyebrow = Reem Kufi SemiBold 11, letter-spacing 1.2, `#0b8fa3`, uppercase. Number = Bold 34, `#3e4e78`. Name = SemiBold 16, `#3e4e78`. Sub line = Regular 13, `#5a6a95`. Sub line uses a middle dot with TWO spaces each side on Day (`From 6 to 19  ·  in 5 minutes`, `white-space: pre`).

Round button `Button · open` (only in up/down): x=328, y=30, 40x40 (right edge 368, i.e. 24 from strip edge). Three concentric ellipses (mint/blue-grey "three-layer", drop shadows only): 40 at (0,0), 34 at (3,3), 28 at (6,6); chevron 10x16 at (16,12) inside it. Exported as one SVG with shadow bleed (see 4); place the 51x52 SVG at left 323.2 / top 25.2 relative to the strip (Figma inset -12% -15% -16.5% -12% of the 40px box). Do not recompose, use the SVG. The chevron is dark slate-blue (same ink as `#3e4e78`) on the pale plate in the screenshot, not mint. (The "mint" three-layer treatment is the sheet CLOSE/ENJOY button, section 3.)

| state | node | eyebrow (exact) | number | name | sub line | button |
|---|---|---|---|---|---|---|
| UP (a movement happened) | `564:136224` | `YOUR BEAUTIFUL MOVEMENT TODAY` | `+13` | `Deactivation` | `From 6 to 19  ·  in 5 minutes` | yes, opens sheet |
| QUIET (nothing yet) | `564:136241` | `YOUR MOVEMENTS TODAY` | `0` | `Nothing yet` | `They will appear here` | NO button, strip not tappable |
| DOWN (a dip is shown too) | `564:136258` | `YOUR MOVEMENT TODAY` | `−4` (U+2212 minus, not hyphen) | `Meditation` | `From 12 to 8  ·  in 10 minutes` | yes, opens sheet |

Facts: colours, sizes and plates are IDENTICAL across the three states. There is no red/green, no arrow icon, no per-state colour: the dip is shown with the same calm ink, only the sign and the shorter eyebrow differ. Number box widths: `+13` 49, `0` 22, `−4` 37; text column x = number width + 12. Board section labels (not part of the product): `UP · A MOVEMENT HAPPENED`, `QUIET · NOTHING YET`, `DOWN · A DIP IS SHOWN TOO` (Bold, `#0b8fa3`, 20 high).

Eyebrow rule inferred from the three: singular "MOVEMENT" when one is shown (up has "BEAUTIFUL"), plural "MOVEMENTS" when zero.

## 2. W1 / M1 / Y1 (`563:140532`, `563:141989`, `563:143701`; each 428x1952)

Strip nodes: W `563:141973`, M `563:143685`, Y `563:145317` (all x=18, y=214, 392x100, same plates/button as section 1, up state with button).

| frame | eyebrow (exact) | number | name | sub line (exact) |
|---|---|---|---|---|
| W1 | `BIGGEST MOVEMENT THIS WEEK` (w 209) | `+13` | `Deactivation` | `Sun 25 Oct · From 6 to 19` |
| M1 | `BIGGEST MOVEMENT THIS MONTH` (w 221) | `+13` | `Deactivation` | `Sun 25 Oct · From 6 to 19` |
| Y1 | `BIGGEST MOVEMENT THIS YEAR` (w 206) | `+13` | `Deactivation` | `Sun 25 Oct · From 6 to 19` |

Sub-line pattern: `{Dow} {d} {Mon} · From {before} to {after}` (the date replaces "in N minutes"; no duration). Text block is 136 wide (Day: 141). Name stays at x=61 from Content left, so the row geometry is the Day one. Dip variant (negative biggest movement) is not drawn for W/M/Y; use the same pattern with `−N` and `YOUR` copy unchanged (flag: not specified in Figma).

Layout (all three identical): period tabs y=105 (392x60), date row y=177..205 (arrows x=96 / x=304, 28x28), strip y=214..314, graph title "YOUR POINT OF ATTRACTION" y=334.2, POA graph frame y=346 (374x619), "YOUR PROGRESS" y=993.6, cards Morning/Afternoon y=1026 (170x108, x=45 / x=227), progress graph group y=1152 (414x713), legend group y=1875.9 (414x65), frame height 1952. These are the same y values as the v11 Day home D1 (`563:136960`), so the strip is the same slot on every period.

Versus the old v8 frames/prototype (`src/`, which has NO strip): everything from "YOUR POINT OF ATTRACTION" downward moved DOWN by 120 px (strip 100 + 20 gap; verified: v8 cards top 906 in `src/components/Shell.tsx` vs 1026 in v11; frame 1832 to 1952). Period tabs, date stepper and header are unmoved (y=105 / 177). Removed vs the Day D2/v8 interaction state: the tap tooltips that were stacked on/near the strip and the two `Focus ring` ellipses (D1 `563:138204` at 303,1282 and `563:138205` at 300,1620, 30x30) are NOT in W1/M1/Y1; W1/M1/Y1 contain no tooltip nodes at all. Tooltips on the graphs themselves (v8 `Tooltip.tsx`: stripPos/stripNeg/poa etc.) are unchanged and stay graph-local; they must not render over the strip, and the strip's only interaction is its round button (opens the sheet drilled to that movement). I could not open the original v8 Figma frames (no node ids given), so "moved versus v8" is verified from the repo prototype and D1/W1 coordinates, not from the old frames.

Small deltas between the three (graph art only, do not redraw): Y1 has an extra marker group `563:144917` at (280,1479); bottom axis x differs (W 24, M 32, Y 28) and zoom buttons (W y1820 x9/x371, M y1821 x17/x379, Y y1820 x9/x375); date labels differ in width (W 68.06, M 94.3, Y 34.35 at x=179.75 / 166.75 / 196.5). Filter button x=367 in W1 (D1 365).

## 3. Sheet states: `renderSheetPage2(events)` (board `568:136130`, 2012x1440)

Sheet card = 428x330. The sheet has 3 pages: 1 Look what you shifted, 2 What happened next, 3 Relief moments. Page 2 (this spec) shows pagination dots with the MIDDLE dot active. Screenshot crops SS1..SS7 are 460x362 (16 px shadow bleed).

### 3.1 Verbatim rules block (`568:136398`, "RULES FOR ALL STATES")
1. "The sheet has 3 pages: 1 Look what you shifted · 2 What happened next · 3 Relief moments. Swipe, or tap the button on page 1."
2. "Page 2 lists what really happened after the movement, oldest first. Max 3 rows, then a "See all" link."
3. "Only ONE button. It is ENJOY THIS MOMENT when a positive match is not enjoyed yet; otherwise CLOSE."
4. "Nothing is required. Swiping down or tapping outside closes the sheet."
5. "Never draw a line between check-ins. Matches have no level. Only a movement has before — after."
6. "Minutes are counted from the end of the movement."

### 3.2 The seven states, verbatim notes, exact copy

Common: eyebrow `WHAT HAPPENED NEXT`. Button per rules above. `{N}` = `minutesAfter`; `{name}` = movement name ("Deactivation" in the design).

| # | Figma node / title | Card notes (verbatim) | Title (24 Bold) | Sub (14 SemiBold) | Icon | Note box text (13 Regular) | Button |
|---|---|---|---|---|---|---|---|
| 1 | `568:136132` NOTHING YET | When: no match and no check-in after the movement. / Shows: "Nothing yet" + one calm line. No icon. / Button: CLOSE — closes the sheet, back to the Day graph. / Data: events = [] | `Nothing yet` (x=28, no icon) | `Your day is still open.` (x=28) | none | `No match or check-in came after this movement.` | Close |
| 2 | `568:136156` POSITIVE MATCH | When: one positive match after the movement. / Shows: positive triangle (same marker as the graph), minutes after, soft note. / Button: ENJOY THIS MOMENT — opens flow screen 5 "Enjoy this moment" (heart with the match note). / Data: events = [{ type: "positive_match", minutesAfter: 20, note }] | `A positive match` | `20 minutes after your Deactivation` | positive triangle | `You noticed something good. No feeling was recorded with it.` | Enjoy this moment |
| 3 | `568:136185` NEGATIVE MATCH | When: one negative match after the movement. / Shows: negative triangle, minutes after, calm note. Never red, never a warning. / Button: CLOSE — back to Day. Enjoy is never offered for a negative match. / Data: events = [{ type: "negative_match", minutesAfter: 15 }] | `A negative match` | `15 minutes after your Deactivation` | negative triangle (grey, pointing down, "−") | `You noticed something heavy. It is part of your day.` | Close |
| 4 | `568:136241` CHECK-IN ONLY | When: a check-in came after the movement, no match. / Shows: C marker + level. Note depends on level: same or higher — "the relief stayed with you"; lower — "A little lower now. That is part of the day." / Button: CLOSE — back to Day. / Data: events = [{ type: "check_in", minutesAfter: 34, level: 19 }] | `You checked in at 19` | `34 minutes after your Deactivation` | C marker | same/higher: `Still high on your scale — the relief stayed with you.` ; lower: `A little lower now. That is part of the day.` | Close |
| 5 | `568:136270` POSITIVE MATCH + CHECK-IN | When: both happened after the movement. Rows sorted by time, oldest first. / Shows: two rows, no note box (keeps the sheet short). / Button: ENJOY THIS MOMENT (for the positive match) — flow screen 5. When the person returns, the sheet shows state 7. / Data: events = [positive_match, check_in] | row 1 `A positive match`; row 2 `You checked in at 19` | `20 minutes after your Deactivation`; `34 minutes after your Deactivation` | triangle; C | NONE | Enjoy this moment |
| 6 | `568:136306` NEGATIVE MATCH + CHECK-IN | When: a negative match and a check-in after the movement. / Shows: two rows, same layout as state 5. / Button: CLOSE — back to Day. / Data: events = [negative_match, check_in] | row 1 `A negative match`; row 2 `You checked in at 9` | `15 minutes after your Deactivation`; `30 minutes after your Deactivation` | neg triangle; C | NONE | Close |
| 7 | `568:136369` POSITIVE MATCH · ENJOYED | When: the person finished "Enjoy this moment" for this match. / Shows: same as state 2 with "Enjoyed" added to the sub line. / Button: CLOSE — back to Day. Enjoy is offered once per match. / Data: events = [{ type: "positive_match", enjoyed: true }] | `A positive match` | `20 minutes after your Deactivation · Enjoyed` | positive triangle | `You stayed with it. That counts.` | Close |

### 3.3 Decision procedure (implementable; items marked [inferred] are not in Figma)

```
rows = events sorted by minutesAfter ascending (oldest first); stable by insertion
if rows.length == 0                        -> STATE 1 (header block w/o icon, note, Close)
rows3 = rows.slice(0, 3); if rows.length > 3 show a "See all" link under row 3 [style not drawn]
single = rows.length == 1
button = rows.some(e => e.type=='positive_match' && !e.enjoyed) ? 'Enjoy this moment' : 'Close'
   (Enjoy targets the OLDEST un-enjoyed positive match = firstUnenjoyed(); never for negative)
row copy:
  positive_match: title 'A positive match'; sub `${N} minutes after your ${name}` + (enjoyed ? ' · Enjoyed' : '')
  negative_match: title 'A negative match'; sub `${N} minutes after your ${name}`
  check_in:       title `You checked in at ${level}`; sub `${N} minutes after your ${name}`
note box (only when single):
  positive_match: enjoyed ? 'You stayed with it. That counts.' : 'You noticed something good. No feeling was recorded with it.'
  negative_match: 'You noticed something heavy. It is part of your day.'
  check_in:       level >= movement.after ? 'Still high on your scale — the relief stayed with you.'
                                          : 'A little lower now. That is part of the day.'
  [inferred: "same or higher" compares against the movement's end level; 19 vs after 19 in the sample]
two or more rows: no note box.
```
Matches carry NO level and no line is drawn between check-ins (rule 5). A positive match shows its saved `note` nowhere on this page (note box text is fixed copy; the note belongs to the flow-5 "heart with the match note" screen).

State machine for the one button: state 2 / 5 (un-enjoyed positive) -> Enjoy opens flow screen 5; on return the match gets `enjoyed:true`, so single-row renders state 7 and a match + check-in renders state 5's rows with `· Enjoyed` and the Close button (Figma says only "shows state 7"; with a check-in too, use the two-row layout [inferred]). Enjoy is offered once per match.

Not specified in Figma (decide, do not guess silently): pluralisation for N=1 ("1 minute"); the visual style and y-position of "See all" and the layout of a 3rd row (rows 1-2 use pitch 74 px, so row 3 would sit at y=204 and push the button; card height 330 is drawn only for <=2 rows); mixed positive + negative matches; negative-match + enjoyed (never offered).

### 3.4 Sheet geometry and styles (identical on all 7)
- Card 428x330, radius 28, fill linear top-to-bottom `#ffffff` to `#eaf2ff`, shadow `0 -4 8 rgba(0,0,0,.18)` (drop shadow only).
- Grabber (44x5, r3, `#c3d0ea`) at x=192, y=12.
- Eyebrow `WHAT HAPPENED NEXT`: Bold 12, `#0b8fa3`, x=28, y=28.
- Title: Bold 24, `#3e4e78`, x=96 (x=28 in state 1), y=56. Sub: SemiBold 14, `#5a6a95`, x=96 (28 in state 1), y=92. Two-row states: row 2 title y=130, sub y=166 (pitch 74), same x.
- Icons: positive triangle 34x29.15 at (30,56); negative triangle 34x29.15 at (30,58); C marker 33.6x33.6 at (28,52) as the only row (state 4) or (28,126) as row 2. Row 1 with icon starts at y=56.
- Note box (single-row states): 372x64 at (28,132), radius 16, fill `rgba(27,143,116,0.08)` (flat); text 13 Regular `#3e4e78` at (44,148), width 340, 1 line (20 high).
- Button (three-layer mint pill, drop shadow only): 372x46 at (28,212), radius 23, fill linear top-to-bottom `#5cebca` to `#b5f8e7`, 1.5 px border `#acf8e4`, shadow `1 3 5 0 rgba(0,0,0,.25)`. Label Bold 15, `#0b4f5a`, centred, text top 14.25. Labels: `Close`, `Enjoy this moment`. The button sits at y=212 in every state (it does not move with one vs two rows; two rows replace the note box).
- Pagination dots: 7x7 at y=286.5, x=194.5 / 210.5 / 226.5; the middle one is the active (page 2) dot (`s-sheet-dot-on.svg`), the others `s-sheet-dot-off.svg`.
- Notes under each card (outside the product): title Bold `#0b8fa3` 24 high, lines 13 Regular (18 high).

## 4. Assets (all in `public/v11/`, prefix `s-`; SVG exports include shadow bleed, keep their width/height attributes)

| file | Figma node | svg size | placed at |
|---|---|---|---|
| `s-icon-positive-match.svg` | `568:136174` (states 2/5/7: `568:136288`, `568:136387`) | 45x38 | box 34x29.15; svg offset -6.4,-4.5 from the box (inset -15.51% -13.3% -13.79% -18.72%) |
| `s-icon-negative-match.svg` | `568:136407` (state 6 copy `568:136412`). Ignore the sibling `icon` group `568:136203`/`568:136324` (stale "positive no emotion" parts under the final icon) | 42x36 | box 34x29.15 at (30,58) |
| `s-icon-checkin.svg` | `568:136259` (state 5 row 2 `568:136295`, state 6 `568:136358`) | 53x52 | box 33.6 square; inset -25.83% -28.33% -28.33% -28.33% |
| `s-strip-button-open.svg` | `564:136234` (same button in W/M/Y `563:141983`, ...) | 51x52 | see section 1 |
| `s-sheet-dot-off.svg` | `568:136147` (and `568:136149`) | 7x7 | pagination |
| `s-sheet-dot-on.svg` | `568:136148` | 7x7 | active dot |

Not exported (build in CSS from the values above): strip plates (`564:136225/136226`, `564:136242/136243`, `564:136259/136260`), sheet card, note box, button pill, grabber, all text. Graph art untouched (exists in repo).
