# Progress graph spec (bottom glass card, "YOUR PROGRESS" section)

Source: Figma file `mtJwAlzXjAgclXudyFSCwh`, frames Day `528:14618`, Week `528:16022`, Month `528:17613`, Year `528:19263` (NOTE: the brief gave Year as `528:20823`, which is a tiny 91x18 date label; the real Year 428x1832 frame is `528:19263`). Card group node: Day `528:14925`, Week `528:16023`, Month `528:17614`, Year `528:19264`.
Font: Reem Kufi. NOTE: nearly all text in the graph (ball numbers, scale labels, axis labels, tooltip lines, x-N counts) is OUTLINED VECTORS in Figma, so sizes below are derived from outline boxes, not CSS font sizes. Use the exported pg-label-* SVGs for pixel-exact text, or re-create as text.

All coordinates below are ABSOLUTE in the 428x1832 frame (origin top-left) unless marked "plot-local". Plot-local = abs - (39, 1099). Value (1..22 ball scale) = 22 - (y - 1102.6) / 26.081 (ball centres). Data below is `y` of marker/bar CENTRES.

## 1. Card container
- Group at (7,1032) 414x713. Two stacked plates ("tube" look):
  - outer plate: (7,1032) 414x713, radius 28, linear gradient top->bottom #E3F0FF -> #FFFFFF. Shadows: drop (2,4) blur 6 rgba(0,0,0,.25) + (-2,-2) blur 2 solid white (opacity 1). Asset: pg-card-plate-outer.svg (426x727 incl. 4px shadow padding, shape inset 4).
  - inner plate: (13,1038) 402x701, radius 22, same gradient and same two shadows. Asset: pg-card-plate-inner.svg.
- Plot area: rect (39,1099) 312x560, no radius, vertical multi-stop gradient (bottom->top; defined in pg-plot-gradient.svg: 0.6% #DDE9F4, 2.6% #DAE8F2, 6.4% #C4D5E4, 8.5% #BECEE3, 10% #BDC4EA, 15.6% #C1B9F1, 17% #E0C2E5, 20.5% #E9CEDD, 23.9% #EDD3DA, 25.3% #F5D6E1, 29.2% #F3E5CD, 33.3% #F3F4DF, 38.8% #F4F8E4, 40.1% #EBFCD4, 44.5% #E3FFC9, 46.5% #D4FDD5, 49.3% #C9F9DE, 51.6% #B4F7D4, 54% #B9F5D8, 55% #BCFEF4, 56.1% #B0FEF3, 63.3% #BFF8EF, 65.9% #DDF1E8, 67.8% #E4F0EB, 70.3% #C4FFF9, 79.3% #E8F3FB, 80.6% #FEEFFF, 86.4% #FEEFFF, 88.1% #FAE9FB, 91.7% #FDEEFE, 97.3% #FEEFFF; offsets measured from BOTTOM, y1=560 -> y2=0). Same gradient in all four periods.
- Left ball scale: 22 balls x=19, width 13, first top y=1096.09, pitch 26.081 (centre of ball n at y=1102.6+(22-n)*26.081). Top is 22, bottom is 1. Each ball = 3 concentric ellipses with a vertical-ish gradient + number text #3E4E78. Assets pg-ball-1..22.svg (include shadow padding; sizes vary 22-35px). Ball gradients (from->to): 1 #C5D3FF->#4669CC, 2 #B8CCFF->#6D87C9, 3 #D3B0FF->#4B57B2, 4 #B4A0FC->#C27BBD, 5 #ED8BBB->#FDD2E1, 6 #F28BAA->#FBC2E1, 7 #FFE3D3->#F8A371, 8 #FFD1B5->#FFF4CA, 9 #FFEECD->#FDF3DD, 10 #D9ECBC->#ADC755, 11 #7DFC58->#DDFFD3, 12 #38C957->#C8EAE0, 13/14 #0CF1E2->#A5FFF4 (inner #BBFFFB->#62C1BB), 15 (flat/other, see svg), 16/17 #B3FFF8->#F2FFFE, 18 #C0FDFB->#EAD1F2, 19 #BCF5F3->#EAD1F2, 20 #FAC8FF->#FBE0FF, 21 #F4D3F7->#FCEEFD, 22 #F4D3F7->#FCEEFD.
- Right scale labels (outlined text, colour #333131, ~7.5px cap height, letter-spaced uppercase) at x=353: SUPER HIGH y=1099.6 (57.4x7.5); HIGH y=1239.6 (24x7.5); BORDEM y=1280.4 (42.2x7.6) and MEDIUM y=1296.4 (40.5x7.6) stacked; LOW y=1496.6 (22.5x7.7); VERY LOW y=1646.6 (50.6x7.7). Assets pg-label-*.svg.
- Filter button: (367,1044) 40x40 (Day has a duplicate at (365,1044)). Glass circle: 3 stacked ellipses (40px, 35.2px inset 2.8/2.45, soft shadow ellipse) + icon "clarity:filter-grid-circle-line" 18x18 at (+10.8,+10.96), icon colour #3E4E78. Asset pg-filter-button.svg (60.6x55.7 with shadow padding; render so the 40px circle sits at the node box).
- Zoom buttons: 26x26 glass buttons, glyph 10x10 at (+8,+8). Zoom out glyph = single horizontal bar 10x2.5 colour #7D8AA0 (greyed/disabled look); zoom in glyph = plus (10x2.5 + 2.5x10) colour #1F3B5C. Base assets pg-zoom-out-base.svg / pg-zoom-in-base.svg (32x33 incl. shadow), glyphs pg-zoom-*-glyph.svg. Positions: Day out (14,1700) in (361,1699); Week out (9,1700) in (371,1700); Month out (17,1701) in (379,1701); Year out (9,1700) in (375,1700).

## 2. Strips (positive / negative "no emotion")
- Positive strip well: (38,1065) 313x30; negative strip well: (42,1672) 313x30. Three nested rounded rects (radius 4): outer 313x30 gradient #EAF1FF->#F7F9FF (drop shadow (1.3,1.3) blur 2.4 rgba(0,0,0,.25) and (-0.8,-0.26) blur 4.5 white); mid 311x28 inset 1, gradient #DEE9FF->#F7F9FF; inner 307x25 inset (3,3) gradient #EEF4FF->#F7F9FF with inner shadows. Asset pg-strip-well.svg (321.95x38.95, 5.27 padding).
- Captions (outlined, #333131): "POSTIVE NO EMOTION" (sic, keep typo) at (42.1,1053.45) 107.8x7.9; "NEGATIVE NO EMOTION" at (45.45,1662.4) 116.1x7.9.
- Strip markers: triangle icon (positive: upward teal triangle with "+" #454343, gradient #B9FFFB->#60D8D1, inner gradient to #77FFF7; negative: downward grey triangle with "-" #454343, fill #C7C7C7) + count digit to the right (teal #0B8FA3 style for positive per screenshot; grey for negative). Triangle ~11x11, marker group 17.7-19.2 wide x 11.1 tall; y=1078.4 (pos, Day 1076 w/ 16.2x13.9 icon) and y=1685.4 (neg, Day 1683). Assets pg-strip-tri-positive.svg, pg-strip-tri-negative.svg.
- Day strips: only two markers each and NO count digits (x listed in JSON). Week/Month/Year have counts (see JSON `stripPositive`/`stripNegative`, x = left of marker group, counts read from the screenshots).

## 3. Marker library (data layer)
- Bars: solid 2px wide vertical lines (Day: slightly slanted lines from lower-left P/G marker to upper-right marker; bbox widths 5-14 px), square/rounded ends hidden by markers. Blue = process (P) #3F5CC4. Pink = games (G) #E0058F. No gradient on bars. A bar is blue when both end markers are P stars, pink when they are G markers.
- P (process) marker: 5-point star, 3 stacked star outlines (gradient #E5DDFF -> #FFFFFF diagonal) with shadow (0.24,0.12) blur 0.24 rgba(0,0,0,.25) + white (-0.49,-0.37) blur 0.6; letter "P" in #008E5A centred below/inside. Size per period: Day 16.2x16.4, Week 13.8x13.9, Month 8.9x9.0, Year 10.5x10.6. Asset pg-marker-process-star.svg.
- G (games) marker: small shape (gamepad/pawn-like) built from 6 polygons + 2 small circles, gradient #F3F7FF->#BCD3FF / #D9E6FF->#FFFFFF / #C4D4F4->#FFFFFF, letter "G" #E0058F. Size: Day 12.1x16.9, Week 10.3x14.4, Month 6.65x9.3, Year 7.9x11.0. Asset pg-marker-games.svg.
- C (check-in) marker: circle with 3 concentric rings (16, 13.33, 10.67 px at Day), gradients: outer #D7DEEE->#F1F8FF, mid #DFE7FB->#F9FCFF, inner #E2EBFF->#F3F7FF (all top->bottom), shadow (1.2,1.2) blur 1.67 rgba(0,0,0,.16) + white (-1.2,-0.8) blur 1.67. Letter "C" #0B8FA3. Size: Day 16, Week 14.4, Month 8.8, Year 11.2. Asset pg-marker-checkin.svg. Legend "check-in" uses the 16px one.
- Plot triangles (positive/negative "match" markers inside the plot): positive = teal up-triangle with "+" (gradient #B9FFFB->#60D8D1, fill #B9FFFB base), sits in the upper (high-feeling) region; negative = grey down-triangle (#C7C7C7) with minus, sits in the mid region. Sizes: Day 16.2x13.9, Week 16.2x13.9, Month 12.95x11.1, Year 11.3x9.7. Assets pg-tri-positive-plot.svg, pg-tri-negative-plot.svg.
- Dotted connecting line: single stroke path colour #ABABAB, 1px, dashed (~2px dash/2px gap) joining check-in markers in time order (Week/Month/Year: #8A8A8A tint in some segments). Bounding boxes in JSON `dottedLineBBox` (abs). Follows check-in centres.
- Count labels "x N" (Week only; outlined): to the right of bar-top markers (P count #3F5CC4, G count #E0058F), under/right of C markers (#0B8FA3), triangles (#8A8A8A / #1B8F74). Month/Year have no count labels.
- "+N lift labels": not found as separate nodes. The visible "+" belongs to the teal positive triangle; "Best lift +N" appears only in the tooltip.
- Selected-point ring: 22x22 ring, 2px stroke #0B8FA3, no fill, centred on the selected bar's top marker (asset pg-selected-ring.svg). Day has no selection/tooltip.
- Day scrubber: bar thumb 70x4 at data-local (4,555) (abs (39,1653)), vertical gradient #F7FDFC->#F5F5F5, radius 2, shadow (1,1) blur 1 rgba(0,0,0,.25) - a horizontal scroll thumb along the bottom of the plot (Day only).

## 4. Tooltip bubble
- Shape asset pg-tooltip-shape.svg: body 204x78 (svg 218.85x86 incl. 4px padding), corner radius 14, fill gradient top->bottom #A2F3EE -> #DDFFFC, shadow (0,4) blur 4 rgba(0,0,0,.25). Right edge has a small outlined notch/pointer ~10.3px wide at mid-height (y=39) with a 1px inner cut-out triangle. Placed centred below the selected ring: ring bottom +7px.
- Content: padding top 12, left 14, right 30, vertical gap 4. Line1 title UPPERCASE, colour #3F5CC4, ~11px semi-bold letter-spaced, outline height 10.8; line2 colour #333131 ~12px regular, outline height ~11.4-12.8; line3 colour #333131 ~11px, outline height 10.2.
- Variants: Week: ring (302,1178); tooltip box (208,1207); lines "SATURDAY" / "3 games · avg feeling 14" / "Best lift +6" (outline widths 80.4 / 128.3 / 57.4; content box 172.3x65.9). Month: ring (231,1263); tooltip (137,1292); "THU 15 OCT" / "2 activities · avg 13" / "Best lift +6" (83.4 / 99.8 / 57.4; content 143.8x64.1). Year: ring (215,1208); tooltip (121,1237); "AUGUST" / "16 activities · avg 13" / "Best lift +10" (61.8 / 103.9 / 62.8; content 147.9x64.4). Reference renders: pg-ref-tooltip-week/month/year.png. Day: none.

## 5. X axes (inside card, bottom)
- Day: fine ruler: baseline path (41.2,1710.6) 309.8x9.2 (asset pg-day-ruler.svg) with labels 1:00, 1:10, 1:20, 1:30, 1:40, 1:50, 1:50 (sic, last is a duplicate in the design) at abs x 54, 100.7, 146.6, 193.9, 238.8, 288.9, 333.9 (label y 1723.95, ~6x? px outlined). Minor ticks between labels. Time labels also exist for the top (quadrant) graph 8:00..16:00 (out of scope).
- Week: baseline 1px at (24+14.5, 1709.5) len 313, ticks 1x7 at abs x 60.8, 105.4, 149.9, 194.5, 239.1, 283.6, 328.2 (Mon..Sun, spacing 44.57); labels MON TUE WED THU FRI SAT SUN below (y~1720).
- Month: frame (32,1708): baseline len 313 from x=46.5; ticks at abs x 52.0, 122.5, 192.9, 263.4, 333.8, labels 1, 8, 15, 22, 29 (spacing 70.45; one day slot = 10.06px).
- Year: frame (28,1707): baseline x 43..355 at y 1710; ticks 1x6 at abs x 56, 82, 108,... every 26 (12 ticks), labels Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec (text 14px high, y 1717).

## 6. Data (abs coords; mock data should mimic these)
Notation: bars list `yTop`/`yBottom` (px) with scale values `vTop`/`vBottom` (1-22); `type` P=process star ends/blue, G=games/pink; Day bars are slanted (x bottom -> x top). Month bars hang from the top marker down 162px (single end marker on top, no bottom marker). Month `checkIns` has one per bar at (bar x, bar yTop + 107.0), etc.

### Day (data frame origin abs (35,1098), 5 bars, 7 check-ins, 1 +, 1 -)
```json
{
  "dataFrameOriginAbs": [35.0,1098.0],
  "dottedLineBBox": {"x":52.8,"y":1176.5,"w":288.3,"h":401.0},
  "bars": [{"i":0,"type":"P","color":"#3F5CC4","x":{"bottom":53.1,"top":59.1},"yTop":1470.2,"yBottom":1577.2,"vTop":7.9,"vBottom":3.8},{"i":1,"type":"P","color":"#3F5CC4","x":{"bottom":105.1,"top":111.1},"yTop":1390.2,"yBottom":1523.2,"vTop":11.0,"vBottom":5.9},{"i":2,"type":"G","color":"#E0058F","x":{"bottom":169.0,"top":181.0},"yTop":1336.5,"yBottom":1470.5,"vTop":13.0,"vBottom":7.9},{"i":3,"type":"G","color":"#E0058F","x":{"bottom":266.0,"top":270.0},"yTop":1416.5,"yBottom":1523.5,"vTop":10.0,"vBottom":5.9},{"i":4,"type":"P","color":"#3F5CC4","x":{"bottom":315.1,"top":318.1},"yTop":1177.2,"yBottom":1523.2,"vTop":19.1,"vBottom":5.9}],
  "checkIns": [{"x":82.0,"y":1497.0,"v":6.9},{"x":132.0,"y":1444.0,"v":8.9},{"x":154.0,"y":1417.0,"v":9.9},{"x":206.0,"y":1364.0,"v":12.0},{"x":250.0,"y":1390.0,"v":11.0},{"x":296.0,"y":1337.0,"v":13.0},{"x":341.0,"y":1177.0,"v":19.1}],
  "plotPositiveTriangles": [{"x":288.1,"y":1229.9}],
  "plotNegativeTriangles": [{"x":242.1,"y":1363.9}],
  "stripPositive": [{"x":218,"count":null},{"x":298,"count":null}],
  "stripNegative": [{"x":108,"count":null},{"x":302,"count":null}],
  "selected": null
}

```
### Week (origin abs (39,1100); 6 bars, 6 check-ins, 4 +, 3 -)
```json
{
  "dataFrameOriginAbs": [39.0,1100.0],
  "dottedLineBBox": {"x":59.8,"y":1346.5,"w":268.4,"h":134.3},
  "bars": [{"i":0,"type":"P","color":"#3F5CC4","x":46.3,"yTop":1453.7,"yBottom":1560.3,"vTop":8.5,"vBottom":4.5},{"i":1,"type":"G","color":"#E0058F","x":90.9,"yTop":1346.8,"yBottom":1506.8,"vTop":12.6,"vBottom":6.5},{"i":2,"type":"P","color":"#3F5CC4","x":135.4,"yTop":1427.0,"yBottom":1533.7,"vTop":9.6,"vBottom":5.5},{"i":3,"type":"P","color":"#3F5CC4","x":224.6,"yTop":1267.0,"yBottom":1480.3,"vTop":15.7,"vBottom":7.5},{"i":4,"type":"G","color":"#E0058F","x":269.1,"yTop":1293.5,"yBottom":1453.5,"vTop":14.7,"vBottom":8.5},{"i":5,"type":"P","color":"#3F5CC4","x":313.7,"yTop":1187.0,"yBottom":1533.7,"vTop":18.8,"vBottom":5.5}],
  "checkIns": [{"x":60.3,"y":1480.3,"v":7.5},{"x":104.9,"y":1400.3,"v":10.6},{"x":149.4,"y":1453.7,"v":8.5},{"x":238.6,"y":1373.7,"v":11.6},{"x":283.1,"y":1347.0,"v":12.6},{"x":327.7,"y":1400.3,"v":10.6}],
  "plotPositiveTriangles": [{"x":118.9,"y":1240.3},{"x":252.6,"y":1240.3},{"x":297.1,"y":1267.0},{"x":341.7,"y":1240.3}],
  "plotNegativeTriangles": [{"x":118.9,"y":1373.7},{"x":297.1,"y":1400.3},{"x":341.7,"y":1373.7}],
  "counts": {"barTop":[2,3,1,2,3,3],"checkIns":[3,5,3,4,6,7],"plotPositive":[1,2,2,1],"plotNegative":[1,1,1],"note":"x-N labels sit to the right of bar-top markers and below/right of C markers; read from screenshot, order matches arrays above (left to right)"},
  "stripPositive": [{"x":52,"count":1},{"x":96.6,"count":2},{"x":230.3,"count":3},{"x":274.9,"count":2},{"x":319.4,"count":2}],
  "stripNegative": [{"x":56,"count":2},{"x":100.6,"count":1},{"x":145.1,"count":1},{"x":278.9,"count":1},{"x":323.4,"count":3}],
  "selected": {"ringXY":[302,1178],"bar":5}
}

```
### Month (origin abs (39,1099); 21 bars one per active day, 21 check-ins, 3 +, 3 -)
```json
{
  "dataFrameOriginAbs": [39.0,1099.0],
  "dottedLineBBox": {"x":49.5,"y":1326.5,"w":242.5,"h":187.7},
  "bars": [{"i":0,"type":"G","color":"#E0058F","x":50.0,"yTop":1379.3,"yBottom":1541.3,"vTop":11.4,"vBottom":5.2},{"i":1,"type":"P","color":"#3F5CC4","x":60.1,"yTop":1352.7,"yBottom":1514.7,"vTop":12.4,"vBottom":6.2},{"i":2,"type":"G","color":"#E0058F","x":70.2,"yTop":1406.0,"yBottom":1568.0,"vTop":10.4,"vBottom":4.2},{"i":3,"type":"P","color":"#3F5CC4","x":80.2,"yTop":1326.0,"yBottom":1488.0,"vTop":13.4,"vBottom":7.2},{"i":4,"type":"P","color":"#3F5CC4","x":100.4,"yTop":1352.7,"yBottom":1514.7,"vTop":12.4,"vBottom":6.2},{"i":5,"type":"G","color":"#E0058F","x":110.4,"yTop":1326.0,"yBottom":1488.0,"vTop":13.4,"vBottom":7.2},{"i":6,"type":"P","color":"#3F5CC4","x":120.5,"yTop":1352.7,"yBottom":1514.7,"vTop":12.4,"vBottom":6.2},{"i":7,"type":"G","color":"#E0058F","x":130.5,"yTop":1299.3,"yBottom":1461.3,"vTop":14.5,"vBottom":8.2},{"i":8,"type":"P","color":"#3F5CC4","x":140.6,"yTop":1326.0,"yBottom":1488.0,"vTop":13.4,"vBottom":7.2},{"i":9,"type":"G","color":"#E0058F","x":150.7,"yTop":1272.7,"yBottom":1434.7,"vTop":15.5,"vBottom":9.3},{"i":10,"type":"G","color":"#E0058F","x":170.8,"yTop":1299.3,"yBottom":1461.3,"vTop":14.5,"vBottom":8.2},{"i":11,"type":"P","color":"#3F5CC4","x":180.9,"yTop":1272.7,"yBottom":1434.7,"vTop":15.5,"vBottom":9.3},{"i":12,"type":"G","color":"#E0058F","x":190.9,"yTop":1246.0,"yBottom":1408.0,"vTop":16.5,"vBottom":10.3},{"i":13,"type":"P","color":"#3F5CC4","x":201.0,"yTop":1272.7,"yBottom":1434.7,"vTop":15.5,"vBottom":9.3},{"i":14,"type":"P","color":"#3F5CC4","x":221.1,"yTop":1326.0,"yBottom":1488.0,"vTop":13.4,"vBottom":7.2},{"i":15,"type":"G","color":"#E0058F","x":231.2,"yTop":1352.7,"yBottom":1514.7,"vTop":12.4,"vBottom":6.2},{"i":16,"type":"P","color":"#3F5CC4","x":241.3,"yTop":1272.7,"yBottom":1434.7,"vTop":15.5,"vBottom":9.3},{"i":17,"type":"G","color":"#E0058F","x":251.3,"yTop":1326.0,"yBottom":1488.0,"vTop":13.4,"vBottom":7.2},{"i":18,"type":"G","color":"#E0058F","x":271.5,"yTop":1246.0,"yBottom":1408.0,"vTop":16.5,"vBottom":10.3},{"i":19,"type":"P","color":"#3F5CC4","x":281.5,"yTop":1219.3,"yBottom":1381.3,"vTop":17.5,"vBottom":11.3},{"i":20,"type":"G","color":"#E0058F","x":291.6,"yTop":1166.0,"yBottom":1434.7,"vTop":19.6,"vBottom":9.3}],
  "checkIns": [{"x":50.0,"y":1487.0,"v":7.3},{"x":60.1,"y":1460.3,"v":8.3},{"x":70.2,"y":1513.7,"v":6.2},{"x":80.2,"y":1433.7,"v":9.3},{"x":100.4,"y":1460.3,"v":8.3},{"x":110.4,"y":1433.7,"v":9.3},{"x":120.5,"y":1460.3,"v":8.3},{"x":130.5,"y":1407.0,"v":10.3},{"x":140.6,"y":1433.7,"v":9.3},{"x":150.7,"y":1380.3,"v":11.4},{"x":170.8,"y":1407.0,"v":10.3},{"x":180.9,"y":1380.3,"v":11.4},{"x":190.9,"y":1353.7,"v":12.4},{"x":201.0,"y":1380.3,"v":11.4},{"x":221.1,"y":1433.7,"v":9.3},{"x":231.2,"y":1460.3,"v":8.3},{"x":241.3,"y":1380.3,"v":11.4},{"x":251.3,"y":1433.7,"v":9.3},{"x":271.5,"y":1353.7,"v":12.4},{"x":281.5,"y":1327.0,"v":13.4},{"x":291.6,"y":1380.3,"v":11.4}],
  "plotPositiveTriangles": [{"x":130.5,"y":1220.3},{"x":201.0,"y":1220.3},{"x":271.5,"y":1220.3}],
  "plotNegativeTriangles": [{"x":170.8,"y":1380.3},{"x":241.3,"y":1380.3},{"x":281.5,"y":1380.3}],
  "stripPositive": [{"x":89,"count":3},{"x":160,"count":5},{"x":231,"count":4},{"x":302,"count":2}],
  "stripNegative": [{"x":62,"count":2},{"x":133,"count":1},{"x":204,"count":3},{"x":275,"count":2}],
  "selected": {"ringXY":[231,1263],"bar":16,"note":"P bar at x=241.3 (data bar index 16-17: the P bar with top y 1273.7)"}
}

```
### Year (origin abs (39,1100); 9 bars at x=70+26k, each midway between month ticks (Jan-Feb .. Sep-Oct), 9 check-ins, 7 +, 7 -)
```json
{
  "dataFrameOriginAbs": [39.0,1100.0],
  "dottedLineBBox": {"x":77.5,"y":1378.2,"w":209.0,"h":134.3},
  "bars": [{"i":0,"type":"P","color":"#3F5CC4","x":70.0,"yTop":1432.0,"yBottom":1592.0,"vTop":9.4,"vBottom":3.2},{"i":1,"type":"G","color":"#E0058F","x":96.0,"yTop":1378.5,"yBottom":1565.2,"vTop":11.4,"vBottom":4.3},{"i":2,"type":"P","color":"#3F5CC4","x":122.0,"yTop":1352.0,"yBottom":1538.7,"vTop":12.4,"vBottom":5.3},{"i":3,"type":"G","color":"#E0058F","x":148.0,"yTop":1405.2,"yBottom":1565.2,"vTop":10.4,"vBottom":4.3},{"i":4,"type":"P","color":"#3F5CC4","x":174.0,"yTop":1298.7,"yBottom":1512.0,"vTop":14.5,"vBottom":6.3},{"i":5,"type":"G","color":"#E0058F","x":200.0,"yTop":1325.2,"yBottom":1538.5,"vTop":13.5,"vBottom":5.3},{"i":6,"type":"P","color":"#3F5CC4","x":226.0,"yTop":1218.7,"yBottom":1485.3,"vTop":17.5,"vBottom":7.3},{"i":7,"type":"G","color":"#E0058F","x":252.0,"yTop":1271.9,"yBottom":1485.2,"vTop":15.5,"vBottom":7.3},{"i":8,"type":"P","color":"#3F5CC4","x":278.0,"yTop":1192.0,"yBottom":1538.7,"vTop":18.6,"vBottom":5.3}],
  "checkIns": [{"x":78.0,"y":1512.0,"v":6.3},{"x":104.0,"y":1485.3,"v":7.3},{"x":130.0,"y":1458.7,"v":8.3},{"x":156.0,"y":1485.3,"v":7.3},{"x":182.0,"y":1432.0,"v":9.4},{"x":208.0,"y":1458.7,"v":8.3},{"x":234.0,"y":1378.7,"v":11.4},{"x":260.0,"y":1405.3,"v":10.4},{"x":286.0,"y":1405.3,"v":10.4}],
  "plotPositiveTriangles": [{"x":113.0,"y":1245.3},{"x":139.0,"y":1245.3},{"x":191.0,"y":1218.7},{"x":217.0,"y":1245.3},{"x":243.0,"y":1218.7},{"x":269.0,"y":1245.3},{"x":295.0,"y":1245.3}],
  "plotNegativeTriangles": [{"x":113.0,"y":1405.3},{"x":139.0,"y":1378.7},{"x":191.0,"y":1405.3},{"x":217.0,"y":1378.7},{"x":243.0,"y":1352.0},{"x":269.0,"y":1378.7},{"x":295.0,"y":1378.7}],
  "stripPositive": [{"x":79.0,"count":2},{"x":104.9,"count":3},{"x":130.8,"count":4},{"x":156.7,"count":3},{"x":182.6,"count":5},{"x":208.5,"count":4},{"x":234.4,"count":7},{"x":260.3,"count":6},{"x":286.2,"count":6}],
  "stripNegative": [{"x":85.0,"count":3},{"x":110.9,"count":4},{"x":136.8,"count":3},{"x":162.7,"count":5},{"x":188.6,"count":2},{"x":214.5,"count":4},{"x":240.4,"count":2},{"x":266.3,"count":3},{"x":292.2,"count":3}],
  "selected": {"ringXY":[215,1208],"bar":6}
}
```

## 7. Asset index (public/assets/, prefix pg-)
pg-card-plate-outer/inner.svg, pg-plot-gradient.svg, pg-strip-well.svg, pg-strip-tri-positive/negative.svg, pg-label-superhigh/high/bordem/medium/low/verylow/posno/negno.svg, pg-ball-1..22.svg, pg-filter-button.svg, pg-zoom-in/out-base.svg + -glyph.svg, pg-marker-process-star/games/checkin.svg, pg-tri-positive-plot/negative-plot.svg, pg-selected-ring.svg, pg-tooltip-shape.svg, pg-day-ruler.svg, and reference renders pg-ref-{day,week,month,year}-card.png, pg-ref-{day,week,month,year}-data.svg (the full flattened data layers, 100% faithful), pg-ref-tooltip-{week,month,year}.png.
Asset SVGs include effect-shadow padding (e.g. star 18.6x18.8 for a 16.2 shape); position them by the node box and let padding overflow.

## 8. Not fetched / caveats
- Tooltip title/body text, scale labels and axis labels are outline vectors only (no text nodes); strings read from node names/screenshots. Exact font-size/weight are estimates.
- Per-marker count labels (x N) and strip counts were read visually from screenshots; positions approximate (+-2px). Month/Year strip x positions interpolated from group bounds.
- Hidden nodes in each frame (extra markers, G sample markers at y~1339-1624, 'Vector 208') are leftover/hidden and ignored.
- "+N lift labels" separate from tooltips and per-bar start/end text were not found as layers.
