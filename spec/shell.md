# Datalytics shell (top section + legend bar) - Figma mtJwAlzXjAgclXudyFSCwh

Frames 428x1832: Day 528:14618, Week 528:16022, Month 528:17613, Year 528:19263
(NOTE: the brief's Year id 528:20823 is only the Year date label; the Year frame is 528:19263).
All px are relative to the 428-wide frame, top-left origin. Assets live in `public/assets/`.

## IMPORTANT: text is outlined
Every text in this shell (title, headings, tabs, date, card texts, legend labels) is vector outlines in Figma, NOT live text
(only the status-bar "11:11" is real text). Font-size/weight/letter-spacing/line-height are therefore NOT stored in the file.
Use the SVG assets for pixel parity. If live text is needed, the glyph bounding boxes + colors below are the targets
(font Reem Kufi, uppercase, bold-ish, tracked; match by overlaying the SVG). Colors below are read from the SVG fills.
Only status time is real text: Roboto Medium 17px, line-height 17px, letter-spacing -0.5px, color #797777, font-feature "ss03", centered at x=70 (left=calc(50%-159px) center), y=center of 17px bar.

## Page
- Frame fill: solid #EAFFFD (r.916 g1 b.991). No gradient, no stroke, no frame effects, no clipping, corner 0.
- "bg color" group 528:14619 at (0,105) 381x851.55, group opacity 0.16, LAYER_BLUR radius 133 (CSS blur ~66px, figma radius = 2*sigma => `filter: blur(66.5px)`), children (x,y,w,h inside frame coords, ellipse fill, fill opacity):
  - Ellipse 66 (0,105) 212.76x454.84 #6A35FF op 1.0 -> bg-ellipse-66.svg
  - Ellipse 68 (0,387.82) 234.64x529.19 #FF00E5 op 0.8 -> bg-ellipse-68.svg
  - Ellipse 67 (117.84,128.73) 253.50x491.28 #15FF73 op 0.8 -> bg-ellipse-67.svg
  - Ellipse 69 (156.17,450.50) 224.83x450.46 #FFE600 op 0.8 -> bg-ellipse-69.svg
  - fa:repeat (260.82,876.97) 14.1x34.63 (fill #3E4E78/white, hidden fill), Vector (256.63,926.52) 9.66x30.03 #3E4E78, Group 2136 (116.53,805.22) 39.17x96.2 - tiny stray decorations inside the 0.16 group; assets bg-fa-repeat.svg, bg-vector.svg, bg-group-2136.svg (visually negligible).
  - Reference raster of whole group: bg-color-group-snapshot.png
```css
.dl-frame{position:relative;width:428px;height:1832px;background:#EAFFFD}
.dl-bg{position:absolute;left:0;top:105px;width:381px;height:851.55px;opacity:.16;filter:blur(66.5px)}
.dl-bg .e66{left:0;top:0;width:212.76px;height:454.84px;background:#6A35FF;border-radius:50%}          /* group-relative: y = frame y - 105 */
.dl-bg .e68{left:0;top:282.82px;width:234.64px;height:529.19px;background:#FF00E5;opacity:.8;border-radius:50%}
.dl-bg .e67{left:117.84px;top:23.73px;width:253.5px;height:491.28px;background:#15FF73;opacity:.8;border-radius:50%}
.dl-bg .e69{left:156.17px;top:345.5px;width:224.83px;height:450.46px;background:#FFE600;opacity:.8;border-radius:50%}
```
(Metadata lists child coords in frame space; group is at y=105 so subtract 105 for group-relative.)

## Status bar (instance "time bar" 528:14687) at (0,12) 428x17
- Time "11:11": Roboto Medium 17/17, ls -0.5, #797777, center x = 214-159 = 55 -> text centered at x=55, vertically centered in 17px.
- Indicators: flex row gap 7, right edge inset: left 78.11% (=334.3px), right 3.59% (=15.4px), top 0, bottom 23.53% (height 13). Items: Signal 19.971x12 (status-signal.svg), Wifi 17x12.5 (status-wifi.svg), Battery 27.33x13 (status-battery.svg). All #797777 (battery has white inner fill + #797777 stroke).
```css
.status{position:absolute;left:0;top:12px;width:428px;height:17px}
.status .time{position:absolute;left:55px;top:50%;transform:translate(-50%,-50%);font:500 17px/17px Roboto;letter-spacing:-.5px;color:#797777;font-feature-settings:"ss03" 1}
.status .ind{position:absolute;left:334.3px;right:15.4px;top:0;height:13px;display:flex;gap:7px;align-items:center}
```

## Back button + home icon ("V ICON BAR" 528:14648) at (0,48) 411x39.33, flex, padding 0 16px, gap 316, items-end
- Back button group 528:14649: (16, 54.85) size 32.478x32.478. Composite glossy red-chevron button; export whole group as one asset: back-button-group-full.svg (50x47 canvas incl. shadow/bleed: place at group pos minus bleed => left -7 (21.55%*32.48), top -5 (15.4%)). Parts: back-button-base.svg (inset -15.4% -29.69% -26.61% -21.55%), back-button-arrow.svg (14.62x19.74 box at +6.67,+5.93, rotated 89.91deg).
- Home icon 528:14658: (364.48, 48) 39.33x39.33, overflow clip. Whole group: home-icon-group-full.svg (40x40). Parts: home-icon-roof.svg (inset 46.7% 19.8% 3.52% 22.55%), home-icon-body.svg (36.19x32.0 at left 4.35 top 0.89).
```css
.back{position:absolute;left:16px;top:54.85px;width:32.48px;height:32.48px;background:url(/assets/back-button-group-full.svg) no-repeat;background-size:50px 47px;background-position:-7px -5px}
.home{position:absolute;left:364.48px;top:48px;width:39.33px;height:39.33px}
```

## Title "YOUR DATALYTICS" 528:14633
- (101.46, 65.64) 225.47x18.55, fill #3E4E78 (outlined) -> title-your-datalytics.svg. Centered on page: center x = 214.2.

## Period tabs 528:15969 at (18,105) 392x60
- Container (3 stacked rounded-pill layers, all radius = height/2), asset tabs-container.svg 403x71 placed at (-5,-5) relative to the tabs frame.
  - layer1 "tube" 392x60 at (0,0): vertical linear gradient #C7F3F9 (top) -> #F6F9FF (bottom); shadows: inner-style dd: (-2,-2) blur3 (CSS blur=2*std: std1.5) white 100%; (2,2) std2 black 20%.
  - layer2 "tube inner" 384x52 at (4,4): same gradient #C7F3F9 -> #F6F9FF; shadows (-1,-1) std0.5 white; (1,1) std0.5 black 18%.
  - layer3 "well" 376x44 at (8,8): gradient #FFFFFF (top) -> #F6F9FF (bottom); INNER shadows: (-2,-2) std1.5 white 100%; (2,2) std1.5 black ~20%.
- 4 tabs, each 88x36, y=12; x = 8,104,200,296 (gap 8). Flex space-between, px 8.
- Active pill (asset tabs-active-pill-day.svg, identical for every period, 100x50, placed at (-4,-4) relative to the active tab, i.e. tab-local 88x36):
  - rim 84x36 pill? exact: layer1 rim path x4..92,y4..40 (88x36, r18) fill #ACF8E4; layer2 body x7..89,y7..37 (82x30,r15) gradient top #5CEBCA -> bottom #B5F8E7; layer3 face x10..86,y10..34 (76x24,r12) gradient #5CEBCA -> #B5F8E7. Each layer has shadow (2,4) std3 black 25% + (-2,-2) std1 white 100%.
- Label colors: inactive #6A97D8; active #1F3B5C. Labels centered in tab, sizes (w x h): DAY 29.03x10.71, WEEK 45.17x10.78, MONTH 58.00x11.14, YEAR 41.22x10.71. Assets: tabs-label-{day,week,month,year}-{active,inactive}.svg (day active = tabs-label-day-active.svg; day inactive tabs-label-day-inactive.svg).
- Active tab per frame: Day->Tab Day, Week->Tab Week, etc. (pill + dark label moves; other labels inactive).
```css
.tabs{position:absolute;left:18px;top:105px;width:392px;height:60px;display:flex;justify-content:space-between;align-items:center;padding:0 8px}
.tabs .bg{position:absolute;left:-5px;top:-5px;width:403px;height:71px}   /* tabs-container.svg */
.tab{position:relative;width:88px;height:36px;display:flex;align-items:center;justify-content:center}
.tab .pill{position:absolute;left:-4px;top:-4px;width:100px;height:50px}   /* tabs-active-pill-day.svg, only on active */
.tab.active label svg{fill:#1F3B5C} .tab:not(.active) label svg{fill:#6A97D8}
```

## Date stepper
- Prev button: Date arrow base 528:16002 at (96,177) 28x28 white circle (fill #FFFFFF), drop shadow (1,2) std1.5 black 25%; asset date-arrow-prev-base.svg 34x34 placed at (-2,-1). Chevron (528:16003) at (106.80,184.00) 6.20x14.00, fill #3E4E78, rounded stroke-converted shape, date-arrow-prev-chevron.svg (points left).
- Next button 528:16004 at (304,177) 28x28, same style: date-arrow-next-base.svg; chevron 528:16005 at (315.00,184.00) 6.20x14.00 -> date-arrow-next-chevron.svg (points right).
- Date label (outlined, color #3E4E78, Reem Kufi ~15px semi-bold, center x≈214 within buttons gap; vertical center ≈192.6):
  | Period | node | x | y | w | h | string | asset |
  | Day | 528:16006 | 177.98 | 186.84 | 71.67 | 11.48 | `Sun 25 Oct` | date-label-day.svg |
  | Week | 528:17445 | 179.75 | 186.84 | 68.06 | 11.42 | `19 - 25 Oct` (en dash with spaces) | date-label-week.svg |
  | Month | 528:19093 | 166.75 | 186.17 | 94.30 | 12.02 | `October 2026` | date-label-month.svg |
  | Year | 528:20670 | 196.52 | 187.78 | 34.35 | 10.34 | `2026` | date-label-year.svg |
```css
.dl-arrow{position:absolute;top:177px;width:28px;height:28px;border-radius:50%;background:#fff;box-shadow:1px 2px 3px rgba(0,0,0,.25)}
.dl-arrow.prev{left:96px} .dl-arrow.next{left:304px}
.dl-date{position:absolute;top:186.84px;left:50%;transform:translateX(-50%);color:#3E4E78}  /* label width varies per period (table) */
```

## Headings (outlined, color #3E4E78)
- YOUR POINT OF ATTRACTION 528:15425: (80.62, 214.23) 265.33x14.31 -> heading-your-point-of-attraction.svg (one vector per glyph; the exported svg is the full row). Same on all periods.
- YOUR PROGRESS 528:15447: (134.67, 873.61) 155.21x13.54 -> heading-your-progress.svg.

## Progress cards (y=906, both 170x108; text outlined)
Card layers (one `plate 1 outer` + `plate 2 inner`):
- Left "Card / Morning" (x=45): plate1 170x108 r22 (path r=18/22), gradient top #75EDFC -> bottom #DFFBFF, shadows (2,4) std3 black 25% + (-2,-2) std1 white 100%; plate2 at (4,4) 162x100, same gradient & shadows. Assets card-morning-plate-outer.svg (182x122 at -4,-4), card-morning-plate-inner.svg (174x114 at 0,0).
- Right "Card / Afternoon" (x=227): whole card single svg (182x122 at (-4,-4)): gradient top #C7D8FF -> bottom #ADC7FF on both plates, same shadows. Texts colors: heading #3F5CC4, value #54A79E (green "+13 level"), sub-text #485980.
- Left card text colors: heading #0B8FA3 (card-morning-heading-point-of-attraction.svg 149.28x9.48 at (10.36,15.86), text "POINT OF ATTRACTION" caps), value #3E4E78 (at ~ (55.15,48.58)), "/22" #3E4E78 (card-morning-count-slash22.svg 21.46x11.48 at (94.57,50.81)), name text #485980 at (17.5,75.2) size ~87-92x21.1 (two lines "NN RECORDED / EMOTIONS").
- Right card inner layout (whole-card svg includes everything): "BIGGEST EMOTIONAL / LIFT" (2 lines, #3F5CC4), "+13 level" (#54A79E), "DEACTIVATION / <sub>" (2 lines, #485980). Card positions in frame: Card / Afternoon (227,906).

Text per period:
| Period | Left value | Left sub (2 lines) | Right big | Right sub (2 lines) |
|---|---|---|---|---|
| Day | `11.74` `/22` | `23 RECORDED` / `EMOTIONS` | `+13 level` | `DEACTIVATION` / `5MIN` |
| Week | `11.7` `/22` | `51 RECORDED` / `EMOTIONS` | `+13 level` | `DEACTIVATION` / `SUN 25 OCT` |
| Month | `10.8` `/22` | `212 RECORDED` / `EMOTIONS` | `+13 level` | `DEACTIVATION` / `SUN 25 OCT` |
| Year | `10.4` `/22` | `391 RECORDED` / `EMOTIONS` | `+13 level` | `DEACTIVATION` / `OCT 2026` |
Left card heading `POINT OF ATTRACTION` and right heading `BIGGEST EMOTIONAL LIFT` are constant.
Per-period left-card assets (Name = sub text, Count = value; "/22" and heading shared):
- Day: card-morning-day-name.svg (86.75x21.10 @17.48,75.20), card-morning-day-count-value.svg (34.90x13.42 @55.15,48.58) [Day also has value "11.74"]
- Week: card-morning-week-name.svg (83.85x21.10 @17.73,75.20), card-morning-week-count-value.svg (25.95x13.26 @59.38,48.74)
- Month: card-morning-month-name.svg (91.55x21.10 @17.48,75.20), card-morning-month-count-value.svg (32.21x13.58 @56.24,48.58)
- Year: card-morning-year-name.svg (90.96x21.10 @17.61,75.20), card-morning-year-count-value.svg (32.13x13.44 @56.04,48.58)
- Right card: Day card-afternoon-day-full.svg; Week & Month card-afternoon-week-month-full.svg (identical); Year card-afternoon-year-full.svg.
```css
.card{position:absolute;top:906px;width:170px;height:108px}
.card.left{left:45px} .card.right{left:227px}
.plate{position:absolute;border-radius:22px;background:linear-gradient(180deg,#75EDFC,#DFFBFF);box-shadow:2px 4px 6px rgba(0,0,0,.25),-2px -2px 2px #fff}
.plate.p1{left:0;top:0;width:170px;height:108px} .plate.p2{left:4px;top:4px;width:162px;height:100px}
.card.right .plate{background:linear-gradient(180deg,#C7D8FF,#ADC7FF)}
```
(Approximation of SVG filters; prefer using the SVG assets directly.)

## Legend bar (Group 1000011955 528:15460) at (7,1755.93) 414x65
- Plate 1 "outer" 414x65 at (0,0): sharp rect (no radius), gradient top #C9EFFF -> bottom #FFFFFF, shadows (1.38,2.76) std2.07 black 25% + (-1.38,-1.38) std0.69 white 100%. Plate 2 "inner" 402x55 at (6,6.07): gradient #C9EFFE -> #E5EDFE, same shadows. Asset legend-bar-plate.svg 422.27x74.64 placed at (-2.75,-2.75) relative to the group.
- Labels (outlined, color #333131, caps ~7.5px tall). Strings: `PROCESS`, `GAMES`, `CHECK-IN`, `POSTIVE MATCH` (sic - typo "POSTIVE" is in the design), `NEGATIVE MATCH`.
- Items (frame coords; icon node pos/size, then label pos/size):
  | Item | Icon (x,y,w,h) | Icon asset(bleed offset) | Label (x,y,w,h) | Label asset |
  |---|---|---|---|---|
  | PROCESS | 30,1767, 16.19x16.37 | legend-icon-process.svg (18.63x18.81, offset -1.71,-1.58) | 52.40,1771.63, 43.67x7.45 | legend-text-process.svg |
  | GAMES | 147,1767, ~16x17.84 (composed of 5 glyph pieces + "G") | legend-icon-games-group-full.svg (52x19 incl label? exported whole group 528:15518) ; parts legend-icon-games-{2005,2242,4276,4277,4278,g}.svg | 163.88,1771.42, 34.45x7.66 | legend-text-games.svg |
  | CHECK-IN | 228,1766, 16x16 (Marker C, 3 concentric circles + letter C) | legend-icon-checkin-marker.svg (25.07x24.67, offset -4.53,-4.13) | 249.74,1769.46, 47.08x7.81 | legend-text-checkin.svg |
  | POSTIVE MATCH | 310,1765, 16.19x13.88 (green-teal triangle with +) | legend-icon-positive-match.svg (21.37x17.95, offset -3.03,-2.15) | 333.26,1768.42, 76.47x7.92 | legend-text-positive-match.svg |
  | NEGATIVE MATCH | 31,1796, 16.19x13.88 (grey down triangle) | legend-icon-negative-match.svg (19.54x16.75, offset -1.20,-1.04) | 52.05,1798.42, 85.89x7.92 | legend-text-negative-match.svg |
  Row 1 y~1766-1783 (PROCESS, GAMES, CHECK-IN, POSTIVE MATCH left-to-right); row 2 y~1796 (NEGATIVE MATCH at left). Whole bar as one asset: legend-bar-group-full.svg (423x75, offset -2.75,-2.75).
- Icon palette: positive icon gradient #77FFF7 -> #6F9997 body, outer #60D8D1, plus mark #454343 on #B9FFFB; process star white gradients with green "P" #008E5A; (see svgs).
- Marker C (check-in, 16x16, ellipse layers 16, 13.33 @1.33, 10.67 @2.67 + centered letter label 'C'): colors live in the SVG.

## Differences between periods (shell only)
Only: active tab pill/label, date label, card values/sub text (tables above). Everything else (bg, title, buttons, headings, card plates, legend) identical in all four frames (same asset hashes).

## Asset index (file -> source node)
bg-ellipse-66/67/68/69.svg -> 528:14622/14620/14623/14621; bg-fa-repeat.svg 528:14624; bg-vector.svg 528:14626; bg-group-2136.svg 528:14627; bg-color-group-snapshot.png 528:14619 (png, whole group)
status-signal/wifi/battery.svg -> 528:5388/5389/5390 inside 528:14687 (instance 52:5388..90)
title-your-datalytics.svg 528:14633
back-button-base.svg / back-button-arrow.svg (parts of 528:14649), back-button-group-full.svg 528:14649
home-icon-roof.svg 528:14660, home-icon-body.svg 528:14662, home-icon-group-full.svg 528:14658
tabs-container.svg 528:15969 (container layers); tabs-active-pill-day.svg 528:15975 (same file for all periods); tabs-label-{day,week,month,year}-{active,inactive}.svg 528:15979/15984/15990/15997 (+ per-period nodes 528:17414.. 528:19062.. 528:20639..)
date-arrow-prev-base.svg 528:16002; date-arrow-prev-chevron.svg 528:16003; date-arrow-next-base.svg 528:16004; date-arrow-next-chevron.svg 528:16005
date-label-day/week/month/year.svg 528:16006 / 528:17445 / 528:19093 / 528:20670
heading-your-point-of-attraction.svg 528:15425; heading-your-progress.svg 528:15447
card-morning-plate-outer/inner.svg 528:15568/15569; card-morning-heading-point-of-attraction.svg 528:15589; card-morning-{day,week,month,year}-name.svg 528:15570/16976/18760/20363; card-morning-{day,week,month,year}-count-value.svg 528:15608/17014/18799/20402; card-morning-count-slash22.svg 528:15614
card-afternoon-day-full.svg 528:15619; card-afternoon-week-month-full.svg 528:17024 (=528:18809); card-afternoon-year-full.svg 528:20412
legend-bar-plate.svg 528:15461; legend-bar-group-full.svg 528:15460; legend-icon-*/legend-text-* -> 528:15512/15504 (process), 528:15525.. (games parts; whole 528:15518 -> legend-icon-games-group-full.svg), 528:15561/15552 (check-in), 528:15478/15465 (positive), 528:15498/15484 (negative)

## Could NOT fetch / caveats
- Font-size/weight/letter-spacing/line-height for outlined text: not present in file (text is vector). Use the SVGs.
- Exact per-glyph live-text rendering not possible; fidelity relies on SVG assets.
- Inner-shadow second color of "well" layer approximated as black ~20% (see tabs-container.svg filter2_ii).
- Week/Month/Year frames' bg/legend/title/buttons not separately exported (identical hashes to Day).
- card-afternoon-* are "whole card" svgs (include plate + all text) because text there is one composed vector; left-card per-period pieces exported separately.
