# v11 QA report

Scripts and screenshots: `/tmp/claude-0/-home-user-ALIGNMENT-DATALYTICS-SCREENS/c3c08dc5-9d30-50cc-91e6-a20fc2c734b4/scratchpad/qa/` (t1 match, t2 sheet states, t3 captures, t4 viewports, t5 reduced motion; `cmp-*.png` = ref | ours | diff).

## Tested (Playwright, fresh localStorage and after Reset demo)
- Launcher: both buttons route to /match and /analytics, Reset demo works.
- /match: positive path L1 > L2 > L3 > emotion > L4 (positive 9 > 10), ENJOY > E1 (note shown) > DONE back to /match; HOW DO I FEEL NOW > E2; E2 back skips (no check-in stored); E2 pick lands on /analytics?sheet=2. Negative path (5 > 6, no ENJOY, SEE DATALYTICS). Feeling 16-22 positive, 1-14 negative, 15 neither; explicit card wins (also after tapping another feeling). L4 SEE DATALYTICS opens /analytics.
- /analytics: strip opens sheet, page 1 button > page 2, dots, swipe left/right, swipe down, tap outside, Esc; all 7 page-2 states plus 3 rows, 5 rows + "See all", enjoyed + check-in; one-button rule (ENJOY only with an un-enjoyed positive); ENJOY > E1 > DONE and E2 back/pick return to the sheet; page 3 bar tap highlights 15:05-15:10 (tooltip sits above the sheet); ?popup=process P1 buttons; Simulate button; W/M/Y show their strip, strip tap opens Day, no tooltips on load or on the strip.
- 428x926, 390x844, 1440x900: no horizontal scroll, no console errors/page errors.
- reducedMotion: sheet, P1, L4, E1 work; instant scroll, no ball fall, no heart breath.

## Bugs fixed
1. E2 pick after /match > ENJOY > HOW DO I FEEL NOW returned to /match; now always goes to /analytics?sheet=2 (the check-in state).
2. Sheet pill buttons were auto-focused and drew a heavy black focus ring; focus now goes to the dialog (Tab still reaches the buttons).
3. Sheet could not scroll the progress plate to y=60 (page too short, clamped at 66 px); bottom padding is added once the sheet has been opened.
4. No plot dim behind the sheet (spec says the graph draws white .6); added an overlay with a cut-out for the movement bar, plus the teal rings on the bar ends (D1/D2) and around the C marker (D4). Rings also show on the Day home like D1.
5. Sheet text: title line-height (+3 px), icon offsets, note box flat rgba(27,143,116,.08) on all states, page-1 headline/button offsets.
6. L2 spiral was dimmed (ref only dims L1); L4/E1 screen behind the popup now shows the collapsed cards like the ref.
7. Popup button labels top-aligned (single-line DONE sat 9 px low); level 17 reads "Optimism" in popups (L4 ref wins).
8. P1: header line now "See how much the process made you feel better." (patched over the E2 art), title/status/from-line positions match the ref.
9. Dev buttons raised to 44 px.

## Still differs
- Day graph does not draw the store's seed positive match (ref D2-D4 has a strip triangle at x 331 with a dashed link from the bar top and a ring); v8 graph art left untouched. Page-2 rings for a match are therefore not drawn.
- D2-D4 top: pale cards peek above the plate; ref has none (Figma crop).
- Popup button labels use #178f7c (ref #6cd9c7, contrast); chip text 7 px; textarea is CSS; L4 ref shows a second ball mid-fall (animation frame).
- Page 2 note box has an extra quoted second line for a saved note (design decision); sheet button sits about 2 px higher than ref on some states; ref has a status bar/time in Day frames.
- Small tap targets remain on the untouched v8 graph markers (6-22 px) and the filter toggles (30 px).
