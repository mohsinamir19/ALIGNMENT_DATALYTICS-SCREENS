# POA graph spec: "YOUR POINT OF ATTRACTION" (top graph)

Source: Figma file mtJwAlzXjAgclXudyFSCwh. Frames 428x1832: Day 528:14618, Week 528:16022, Month 528:17613, Year 528:19263 (NOTE: 528:20823 given for Year is only the "D4 · Year" label; real Year frame is **528:19263**). Font Reem Kufi. All text in the graph (labels, axis, ball digits) is outlined vector in Figma, so sizes below are derived from glyph box heights. All coordinates are FRAME pixels unless stated "plot-relative". Geometry (container, plot box, scale, midline, labels, axis) is identical in all 4 frames; the plot-bg gradient was verified on Day only (same node size in the others).

## 1. Layout (frame px)
- Heading "YOUR POINT OF ATTRACTION": x80.6 y214.2 w265.3 h14.3 (vector text).
- Date row: arrows at x96/x304, y177, 28x28; date label centered ~y187.
- Glass container (L-shaped rail: left scale tube + bottom axis tube): frame node x25 y226 w374 h619. Asset `poa-container-frame.svg` (386x631 viewBox incl. 6px shadow bleed, placed with inset -0.97% / -1.6%, i.e. at x19 y221 after bleed). Three stacked layers, all fill linear `#DEE9FF -> #F7F9FF` (near-horizontal, left to right): outer (x25,y226,374x619, filter drop 0/0 blur 3 black 25%), mid (x28,y231,368x611, drop 0/0 blur3 25% + inner white highlight offset -2,-2 blur 1), inner (x32,y235,362x604, same, highlight blur 1.5). Rail inner width ~31px (x6..43 in svg), bottom rail from y~589 of svg.
- Plot area box: x61 y247 w332 h560 (right edge 393, bottom 807). Background `poa-plot-bg.svg` = rectangle 332x560, linear gradient userSpace (15,560) -> (19.15,0.02) (essentially vertical, bottom->top). No rounded corners visible, no border.
- Plot-relative conversion: plotX = x-61, plotY = y-247.
- X axis ("DL · top axis"): frame x43 y813 w368 h26. Baseline 1px line from x60.5 to 393.5 at y=815.5, color `#B8C2E0`; major ticks 7px tall (y812.5..819.5) 1px wide color `#8B99C4`; minor ticks 4px tall same color; labels color `#3E4E78`, glyph height ~7.4px (about 10px font), label top y~826.7, centered under tick. Asset `poa-axis-day.svg`.
  - Day: 9 major ticks hourly at frame x = 61 + 41.5625*k (k=0..8): 8:00 9:00 10:00 11:00 12:00 13:00 14:00 15:00 16:00; 8 minor (half-hour) ticks between. Labels "8:00" ... "16:00".
  - Week: 7 labels centered at x = 84.5, 132, 179.6, 227, 274.4, 321.9, 369.3 (spacing 47.5): Mon Tue Wed Thu Fri Sat Sun. Baseline only, no ticks/vertical.
  - Month: ticks+labels at day 1/8/15/22/29, frame x = 66.35, 141.3, 216.3, 291.3, 366.2 (day d at x = 66.35 + 10.714*(d-1)); tick major 7px.
  - Year: 12 ticks, frame x = 74.8 + 27.67*m (m=0..11): Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec (ticks at 74.8,102.5,130.2,157.8,185.5,213.2,240.8,268.5,296.2,323.8,351.5,379.2).
- Quadrant labels (in plot, outlined text; fill colors): top-left "IN ALIGNMENT" x85.5 y252.6 123x11.85 `#8D63A8` (caps ~16px, letterspaced); sub "Feeling good · attracting wanted" x85.2 y267.7 166.9x11.8 `#6D5A86` (~11px). Bottom-left "NOT IN ALIGNMENT" x85.4 y763.5 163.7x11.9 `#56649A`; sub "Not feeling good · attracting unwanted" x85.2 y785.7 200.7x11.8 `#56649A`. Assets: `poa-label-in-name.svg`, `poa-label-in-sub.svg`, `poa-label-out-name.svg`, `poa-label-out-sub.svg`.
- Midline (dashed): frame x61 y431..433 (center y432), w333, rotated -0.17deg, color `#A5A2A2`, 1px, round caps, dash 1.5 + gap 4.5 (period 6.04). Sits at level ~14.9 (the white "15" scale ball row). Asset `poa-midline.svg` (outlined dashes, 333x1).

## 2. Left scale (22 balls, level 22 top -> 1 bottom)
Ball slot 13x13.04 at frame x=37, y = 241.09 + 26.082*i (i=0 for level 22). Slot centers y = 247.6 + 26.082*i; x center 43.5. Level L -> i=22-L. The SVG assets include glossy 3-layer ball + digit + shadow bleed; place the svg so its overflow is offset by the inset percent of the 13x13 slot (inset order top right bottom left, % of slot, negative = svg overflows slot): see table. Each ball = 3 concentric circles (r ~ 13, 11.3, 9.5 scaled) with same 2-stop linear gradient, drop shadows (0.55,0.55 blur .46 black 25%) + (-2,-2 blur 2 white 75%), digit fill `#3E4E78`.
Layer names in Figma are misleading (27,02,...); mapping below is by position (verified against screenshot digits).

| Level | slot i | slot top y | Gradient (stop0 -> stop1) | Asset | inset % (t r b l) |
|---|---|---|---|---|---|
| 22 | 0 | 241.09 | #F4D3F7 -> #FCEEFD (stop2 @ 0.786458) | `poa-scale-22.svg` (26.0317x26.0723) | -53.3 -46.78 -46.64 -53.46 |
| 21 | 1 | 267.17 | #F4D3F7 -> #FCEEFD (stop2 @ 0.786458) | `poa-scale-21.svg` (28.0366x28.0772) | -61.5 -53.98 -53.81 -61.69 |
| 20 | 2 | 293.25 | #FAC8FF -> #FBE0FF (stop2 @ 0.932292) | `poa-scale-20.svg` (30.0415x30.0821) | -69.18 -61.69 -61.5 -69.4 |
| 19 | 3 | 319.34 | #BCF5F3 -> #EAD1F2 (stop2 @ 0.786458) | `poa-scale-19.svg` (26.0317x26.0723) | -53.81 -46.27 -46.12 -53.98 |
| 18 | 4 | 345.42 | #C0FDFB -> #EAD1F2 (stop2 @ 1) | `poa-scale-18.svg` (29.0391x29.0796) | -69.18 -46.27 -53.81 -77.11 |
| 17 | 5 | 371.50 | #B3FFF8 -> #F2FFFE (stop2 @ 1) | `poa-scale-17.svg` (35.0537x34.0918) | -99.93 -69.4 -61.5 -100.24 |
| 16 | 6 | 397.58 | #B3FFF8 -> #F2FFFE (stop2 @ 1) | `poa-scale-16.svg` (35.0537x34.0918) | -99.93 -69.4 -61.5 -100.24 |
| 15 | 7 | 423.66 | white -> white (stop2 @ 0.786458) | `poa-scale-15.svg` (28.0366x28.0772) | -61.5 -53.98 -53.81 -61.69 |
| 14 | 8 | 449.75 | #0CF1E2 -> #A5FFF4 (stop2 @ 1) | `poa-scale-14.svg` (35.5549x33.5906) | -80.71 -77.11 -76.87 -96.39 |
| 13 | 9 | 475.83 | #0CF1E2 -> #A5FFF4 (stop2 @ 1) | `poa-scale-13.svg` (35.5549x33.5906) | -80.71 -77.11 -76.87 -96.39 |
| 12 | 10 | 501.91 | #38C957 -> #C8EAE0 (stop2 @ 1) | `poa-scale-12.svg` (22.6234x22.664) | -36.9 -37.01 -36.9 -37.01 |
| 11 | 11 | 527.99 | #7DFC58 -> #DDFFD3 (stop2 @ 1) | `poa-scale-11.svg` (25.0293x25.0699) | -49.97 -42.41 -42.28 -50.12 |
| 10 | 12 | 554.07 | #D9ECBC -> #ADC755 (stop2 @ 1) | `poa-scale-10.svg` (26.6332x26.6738) | -44.59 -52.44 -59.96 -52.44 |
| 9 | 13 | 580.16 | #FFEECD -> #FDF3DD (stop2 @ 1) | `poa-scale-09.svg` (27.0342x25.0699) | -49.97 -50.12 -42.28 -57.83 |
| 8 | 14 | 606.24 | #FFD1B5 -> #FFF4CA (stop2 @ 1) | `poa-scale-08.svg` (25.0293x25.0699) | -49.97 -50.12 -42.28 -42.41 |
| 7 | 15 | 632.32 | #FFE3D3 -> #F8A371 (stop2 @ 1) | `poa-scale-07.svg` (28.0366x28.0772) | -57.65 -57.83 -57.65 -57.83 |
| 6 | 16 | 658.40 | #F28BAA -> #FBC2E1 (stop2 @ 1) | `poa-scale-06.svg` (26.0317x25.0699) | -49.97 -50.12 -42.28 -50.12 |
| 5 | 17 | 684.48 | #ED8BBB -> #FDD2E1 (stop2 @ 1) | `poa-scale-05.svg` (28.1369x28.0772) | -67.65 -40.87 -47.66 -75.57 |
| 4 | 18 | 710.57 | #B4A0FC -> #C27BBD (stop2 @ 1) | `poa-scale-04.svg` (24.6283x24.6689) | -52.27 -37.01 -36.9 -52.44 |
| 3 | 19 | 736.65 | #D3B0FF -> #4B57B2 (stop2 @ 1) | `poa-scale-03.svg` (24.0269x24.0674) | -52.27 -32.39 -32.29 -52.44 |
| 2 | 20 | 762.73 | #B8CCFF -> #6D87C9 (stop2 @ 1) | `poa-scale-02.svg` (21.621x21.6616) | -36.9 -29.3 -29.21 -37.01 |
| 1 | 21 | 788.81 | #C5D3FF -> #4669CC (stop2 @ 1) | `poa-scale-01.svg` (22.6234x22.664) | -44.59 -29.3 -29.21 -44.72 |

Colour progression: 22-20 pink/lilac (#F4D3F7/#FAC8FF), 19-18 teal-lilac (#BCF5F3/#C0FDFB -> #EAD1F2), 17-16 aqua (#B3FFF8 -> #F2FFFE), 15 white, 14-13 teal (#0CF1E2 -> #A5FFF4), 12 green (#38C957 -> #C8EAE0), 11 lime (#7DFC58 -> #DDFFD3), 10 olive (#D9ECBC -> #ADC755), 9 cream (#FFEECD -> #FDF3DD), 8 peach (#FFD1B5 -> #FFF4CA), 7 coral (#FFE3D3 -> #F8A371), 6-5 pink (#F28BAA/#ED8BBB -> #FBC2E1/#FDD2E1), 4 violet (#B4A0FC -> #C27BBD), 3 lilac-blue (#D3B0FF -> #4B57B2), 2 blue (#B8CCFF -> #6D87C9), 1 blue (#C5D3FF -> #4669CC). (Levels 17,16 use gradient 0..1; 22-19 stop2 at 0.786-0.93; see table.)

## 3. Data line and data balls
- Data line: dashed, outlined path, fill `#6F7AA8` (stroke color), width ~1px, round caps, dash ~1.5 on / 3.5 off (period ~5px; ~2.5px visible dash). Smooth curve (Day) / straight-ish short segments between consecutive balls (Week, Month, Year; line passes behind balls, gaps in data = line breaks: Week has no Thu so two separate segments Mon-Wed and Fri-Sun).
- Data ball = same 3-layer glossy construction as scale ball (outer r=D/2, mid r=0.867*D/2, inner r=0.733*D/2, same 2-stop gradient shifted inward), drop shadow 1: (0.555,0.555) blur ~0.46 black 25%; shadow 2: (-2,-2) blur ~2 white 75%. Digit color `#3E4E78`, centered, ~ D*0.45 tall, Reem Kufi. Generic clean ball (no digit) per level: `poa-databall-LNN.svg` (colors from the scale gradient for level NN; for levels 8-14 verified against Figma data balls; others inferred) and `poa-databall-cyan.svg` / `poa-databall-cyan-4.svg` (Day cyan, with baked digit 4).
- Ball size per period: Day 26px labelled; Week 24px labelled; Month 20px labelled (4 of 21) + 8px unlabelled (17); Year 19px labelled (9).
- Ball colour = scale colour of its level, EXCEPT Day: all 3 Day balls (4, 10, 19) are cyan `#7EFFF3 -> #ECFFFD` in the design (likely placeholder; by-level colour would be violet/olive/lilac-teal). Level 13 and 14 both use `#0CF1E2 -> #A5FFF4` (3rd layer gradient `#BBFFFB -> #62C1BB` diagonal in Week 13/14).
- y -> level: level = 22.25 - (y_center - 247.6)/26.082 (rounded gives the label; verified on all labelled balls, max error 0.15). Inverse: y_center = 247.6 + (22.25 - level)*26.082. i.e. level 22 -> 254.1, 15 -> 436.7, 10 -> 567.1, 1 -> 801.8.
- Day x: hour = 8 + (x - 61)/41.5625.

## 4. Day curve (smooth, dashed, no segment breaks)
Start ball "4" (76,727) at ~8:22; rises steeply to a local max ~level 13.1 at (203,486) ~11:25; falls to a dip at ball "10" (307,567) ~13:55 (curve bottom of dip (300,571)); then rises steeply (nearly vertical, x 324->358) up to ~level 19.9 at (370,309) just left/above ball "19" (382,327) ~15:44, tiny hook into the ball. Sample points of the dashed path (frame px, sorted by x): [[75.9, 725.9], [83.9, 701.3], [90.8, 677.0], [97.7, 652.8], [104.9, 628.6], [111.7, 604.8], [119.8, 580.9], [128.9, 557.4], [140.2, 535.0], [153.9, 514.7], [171.2, 497.4], [193.2, 486.8], [215.0, 487.9], [233.9, 503.6], [249.2, 523.0], [264.1, 542.8], [280.3, 561.5], [303.9, 569.1], [316.2, 548.2], [323.9, 523.5], [329.2, 499.0], [333.7, 474.2], [337.7, 449.4], [341.5, 424.5], [345.3, 399.6], [349.1, 374.7], [353.2, 349.9], [358.2, 325.8], [370.5, 309.5]].
Suggested SVG path (frame px): `M76 726 C 120 560, 150 490, 203 486 S 285 575, 305 568 C 325 545, 338 440, 350 380 S 360 312, 370 309`.
Reference raw asset: `poa-dataline-day.svg` (306.9x418.8 placed at plot-local data origin x55 y242, offset 20.62,66.76).

## 5. Data points (frame px; plotX/plotY relative to plot box; 'fill' = gradient stop0->stop1)
```json
{
 "day": [
  {
   "x": 76.0,
   "y": 727.0,
   "plotX": 15.0,
   "plotY": 480.0,
   "size": 26,
   "level": 3.87,
   "levelInt": 4,
   "label": 4,
   "fill": "#7EFFF3->#ECFFFD",
   "hour": 8.36
  },
  {
   "x": 307.0,
   "y": 567.0,
   "plotX": 246.0,
   "plotY": 320.0,
   "size": 26,
   "level": 10.0,
   "levelInt": 10,
   "label": 10,
   "fill": "#7EFFF3->#ECFFFD",
   "hour": 13.92
  },
  {
   "x": 382.0,
   "y": 327.0,
   "plotX": 321.0,
   "plotY": 80.0,
   "size": 26,
   "level": 19.21,
   "levelInt": 19,
   "label": 19,
   "fill": "#7EFFF3->#ECFFFD",
   "hour": 15.72
  }
 ],
 "week": [
  {
   "x": 84.7,
   "y": 593.6,
   "plotX": 23.7,
   "plotY": 346.6,
   "size": 24,
   "level": 8.98,
   "levelInt": 9,
   "label": 9,
   "fill": "#FFEECD->#FDF3DD",
   "day": "Mon"
  },
  {
   "x": 132.1,
   "y": 513.6,
   "plotX": 71.1,
   "plotY": 266.6,
   "size": 24,
   "level": 12.05,
   "levelInt": 12,
   "label": 12,
   "fill": "#38C957->#C8EAE0",
   "day": "Tue"
  },
  {
   "x": 179.6,
   "y": 567.0,
   "plotX": 118.6,
   "plotY": 320.0,
   "size": 24,
   "level": 10.0,
   "levelInt": 10,
   "label": 10,
   "fill": "#D9ECBC->#ADC755",
   "day": "Wed"
  },
  {
   "x": 274.4,
   "y": 487.0,
   "plotX": 213.4,
   "plotY": 240.0,
   "size": 24,
   "level": 13.07,
   "levelInt": 13,
   "label": 13,
   "fill": "#0CF1E2->#A5FFF4",
   "day": "Fri"
  },
  {
   "x": 321.9,
   "y": 460.3,
   "plotX": 260.9,
   "plotY": 213.3,
   "size": 24,
   "level": 14.09,
   "levelInt": 14,
   "label": 14,
   "fill": "#0CF1E2->#A5FFF4",
   "day": "Sat"
  },
  {
   "x": 369.3,
   "y": 513.6,
   "plotX": 308.3,
   "plotY": 266.6,
   "size": 24,
   "level": 12.05,
   "levelInt": 12,
   "label": 12,
   "fill": "#38C957->#C8EAE0",
   "day": "Sun"
  }
 ],
 "month": [
  {
   "x": 66.3,
   "y": 620.3,
   "plotX": 5.3,
   "plotY": 373.3,
   "size": 20,
   "level": 7.96,
   "levelInt": 8,
   "label": 8,
   "day": 1,
   "fill": "#FFD1B5->#FFF4CA",
   "labeled": true
  },
  {
   "x": 77.1,
   "y": 593.6,
   "plotX": 16.1,
   "plotY": 346.6,
   "size": 8,
   "level": 8.98,
   "levelInt": 9,
   "day": 2,
   "fill": "#FFEECD->#FDF3DD",
   "labeled": false
  },
  {
   "x": 87.8,
   "y": 647.0,
   "plotX": 26.8,
   "plotY": 400.0,
   "size": 8,
   "level": 6.94,
   "levelInt": 7,
   "day": 3,
   "fill": "#FFE3D3->#F8A371",
   "labeled": false
  },
  {
   "x": 98.5,
   "y": 567.0,
   "plotX": 37.5,
   "plotY": 320.0,
   "size": 8,
   "level": 10.0,
   "levelInt": 10,
   "day": 4,
   "fill": "#D9ECBC->#ADC755",
   "labeled": false
  },
  {
   "x": 119.9,
   "y": 593.6,
   "plotX": 58.9,
   "plotY": 346.6,
   "size": 8,
   "level": 8.98,
   "levelInt": 9,
   "day": 6,
   "fill": "#FFEECD->#FDF3DD",
   "labeled": false
  },
  {
   "x": 130.6,
   "y": 567.0,
   "plotX": 69.6,
   "plotY": 320.0,
   "size": 8,
   "level": 10.0,
   "levelInt": 10,
   "day": 7,
   "fill": "#D9ECBC->#ADC755",
   "labeled": false
  },
  {
   "x": 141.3,
   "y": 593.6,
   "plotX": 80.3,
   "plotY": 346.6,
   "size": 20,
   "level": 8.98,
   "levelInt": 9,
   "label": 9,
   "day": 8,
   "fill": "#FFEECD->#FDF3DD",
   "labeled": true
  },
  {
   "x": 152.0,
   "y": 540.3,
   "plotX": 91.0,
   "plotY": 293.3,
   "size": 8,
   "level": 11.03,
   "levelInt": 11,
   "day": 9,
   "fill": "#7DFC58->#DDFFD3",
   "labeled": false
  },
  {
   "x": 162.7,
   "y": 567.0,
   "plotX": 101.7,
   "plotY": 320.0,
   "size": 8,
   "level": 10.0,
   "levelInt": 10,
   "day": 10,
   "fill": "#D9ECBC->#ADC755",
   "labeled": false
  },
  {
   "x": 173.4,
   "y": 513.6,
   "plotX": 112.4,
   "plotY": 266.6,
   "size": 8,
   "level": 12.05,
   "levelInt": 12,
   "day": 11,
   "fill": "#38C957->#C8EAE0",
   "labeled": false
  },
  {
   "x": 194.9,
   "y": 540.3,
   "plotX": 133.9,
   "plotY": 293.3,
   "size": 8,
   "level": 11.03,
   "levelInt": 11,
   "day": 13,
   "fill": "#7DFC58->#DDFFD3",
   "labeled": false
  },
  {
   "x": 205.6,
   "y": 513.6,
   "plotX": 144.6,
   "plotY": 266.6,
   "size": 8,
   "level": 12.05,
   "levelInt": 12,
   "day": 14,
   "fill": "#38C957->#C8EAE0",
   "labeled": false
  },
  {
   "x": 216.3,
   "y": 487.0,
   "plotX": 155.3,
   "plotY": 240.0,
   "size": 20,
   "level": 13.07,
   "levelInt": 13,
   "label": 13,
   "day": 15,
   "fill": "#0CF1E2->#A5FFF4",
   "labeled": true
  },
  {
   "x": 227.0,
   "y": 513.6,
   "plotX": 166.0,
   "plotY": 266.6,
   "size": 8,
   "level": 12.05,
   "levelInt": 12,
   "day": 16,
   "fill": "#38C957->#C8EAE0",
   "labeled": false
  },
  {
   "x": 248.4,
   "y": 567.0,
   "plotX": 187.4,
   "plotY": 320.0,
   "size": 8,
   "level": 10.0,
   "levelInt": 10,
   "day": 18,
   "fill": "#D9ECBC->#ADC755",
   "labeled": false
  },
  {
   "x": 259.1,
   "y": 593.6,
   "plotX": 198.1,
   "plotY": 346.6,
   "size": 8,
   "level": 8.98,
   "levelInt": 9,
   "day": 19,
   "fill": "#FFEECD->#FDF3DD",
   "labeled": false
  },
  {
   "x": 269.8,
   "y": 513.6,
   "plotX": 208.8,
   "plotY": 266.6,
   "size": 8,
   "level": 12.05,
   "levelInt": 12,
   "day": 20,
   "fill": "#38C957->#C8EAE0",
   "labeled": false
  },
  {
   "x": 280.6,
   "y": 567.0,
   "plotX": 219.6,
   "plotY": 320.0,
   "size": 8,
   "level": 10.0,
   "levelInt": 10,
   "day": 21,
   "fill": "#D9ECBC->#ADC755",
   "labeled": false
  },
  {
   "x": 302.0,
   "y": 487.0,
   "plotX": 241.0,
   "plotY": 240.0,
   "size": 8,
   "level": 13.07,
   "levelInt": 13,
   "day": 23,
   "fill": "#0CF1E2->#A5FFF4",
   "labeled": false
  },
  {
   "x": 312.7,
   "y": 460.3,
   "plotX": 251.7,
   "plotY": 213.3,
   "size": 8,
   "level": 14.09,
   "levelInt": 14,
   "day": 24,
   "fill": "#0CF1E2->#A5FFF4",
   "labeled": false
  },
  {
   "x": 323.4,
   "y": 513.6,
   "plotX": 262.4,
   "plotY": 266.6,
   "size": 20,
   "level": 12.05,
   "levelInt": 12,
   "label": 12,
   "day": 25,
   "fill": "#38C957->#C8EAE0",
   "labeled": true
  }
 ],
 "year": [
  {
   "x": 102.5,
   "y": 620.3,
   "plotX": 41.5,
   "plotY": 373.3,
   "size": 19,
   "level": 7.96,
   "levelInt": 8,
   "label": 8,
   "fill": "#FFD1B5->#FFF4CA",
   "month": "Feb"
  },
  {
   "x": 130.2,
   "y": 593.6,
   "plotX": 69.2,
   "plotY": 346.6,
   "size": 19,
   "level": 8.98,
   "levelInt": 9,
   "label": 9,
   "fill": "#FFEECD->#FDF3DD",
   "month": "Mar"
  },
  {
   "x": 157.8,
   "y": 567.0,
   "plotX": 96.8,
   "plotY": 320.0,
   "size": 19,
   "level": 10.01,
   "levelInt": 10,
   "label": 10,
   "fill": "#D9ECBC->#ADC755",
   "month": "Apr"
  },
  {
   "x": 185.5,
   "y": 593.6,
   "plotX": 124.5,
   "plotY": 346.6,
   "size": 19,
   "level": 8.98,
   "levelInt": 9,
   "label": 9,
   "fill": "#FFEECD->#FDF3DD",
   "month": "May"
  },
  {
   "x": 213.2,
   "y": 540.3,
   "plotX": 152.2,
   "plotY": 293.3,
   "size": 19,
   "level": 11.03,
   "levelInt": 11,
   "label": 11,
   "fill": "#7DFC58->#DDFFD3",
   "month": "Jun"
  },
  {
   "x": 240.8,
   "y": 567.0,
   "plotX": 179.8,
   "plotY": 320.0,
   "size": 19,
   "level": 10.01,
   "levelInt": 10,
   "label": 10,
   "fill": "#D9ECBC->#ADC755",
   "month": "Jul"
  },
  {
   "x": 268.5,
   "y": 487.0,
   "plotX": 207.5,
   "plotY": 240.0,
   "size": 19,
   "level": 13.07,
   "levelInt": 13,
   "label": 13,
   "fill": "#0CF1E2->#A5FFF4",
   "month": "Aug"
  },
  {
   "x": 296.2,
   "y": 513.6,
   "plotX": 235.2,
   "plotY": 266.6,
   "size": 19,
   "level": 12.05,
   "levelInt": 12,
   "label": 12,
   "fill": "#38C957->#C8EAE0",
   "month": "Sep"
  },
  {
   "x": 323.8,
   "y": 513.6,
   "plotX": 262.8,
   "plotY": 266.6,
   "size": 19,
   "level": 12.05,
   "levelInt": 12,
   "label": 12,
   "fill": "#38C957->#C8EAE0",
   "month": "Oct"
  }
 ]
}
```
Notes: Year balls sit on the Feb..Oct ticks (Jan, Nov, Dec empty). Week Thu empty. Month days 5,12,17,22 empty (no balls); Month labelled balls: day1 "8", day8 "9", day15 "13", day25 "12". Month small-ball levels derived from y (no digits shown), unlabelled in design.

## 6. Other assets exported (public/assets, prefix poa-)
poa-scale-01..22.svg, poa-databall-L01..L22.svg, poa-databall-cyan(.svg|-4.svg), poa-plot-bg.svg, poa-container-frame.svg, poa-midline.svg, poa-label-*.svg (4), poa-axis-day.svg, poa-dataline-day.svg, poa-top-data-day-line.svg (dup), poa-top-data-{week,month,year}.svg (whole data layer 344x570 at frame x55,y242, balls + lines + digits baked), poa-ref-day.png / poa-ref-week.png (visual reference crops, screenshot scaled 0.985, ~outset by shadow bleed).

## 7. Not fetched / caveats
- Month and Year reference PNGs, axis SVGs for Week/Month/Year, per-frame plot-bg gradient for Week/Month/Year (assumed identical).
- Digit font size, letter-spacing, exact label font sizes are not readable (outlined text); estimates only.
- Day top-data svg per-ball files were downloaded but the combined Day layer is represented by dataline + 3 balls (poa-databall-cyan-4.svg shows digit 4; digits 10/19 not exported separately).
