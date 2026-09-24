# visuospatials.com

A design and artwork studio site. Static HTML, no build step, no dependencies,
no analytics, no fonts fetched from anyone. Every page is a plain `.html` file
with inline `<style>` and `<script>`. The shared files are `base.css`,
`nav.js`, `stow.js` and `theme.js`.

**`README.md` is the public face of the repo — short, no secrets.** This file is
the working document. Keep them separate: anything that spoils a secret or
reads as an internal note belongs here, not there.

## Deploy

GitHub Pages from `main`. `CNAME` points at `visuospatials.com`.
**Pushing to `main` publishes the live site** — there is no staging.

Repo: `github.com/polyconic/visuospatials`, cloned at `~/Documents/GitHub/visuospatials`.
Some history was made through the GitHub web UI ("Add files via upload"), so run
`git status` and `git fetch` before assuming the local clone is current.

## Pages

| File | What it is |
|---|---|
| `index.html` | The front. Photo, exploding wordmark, hidden index. |
| `work/index.html` | The portfolio grid. Reads `work/pieces.js`; empty state points at Instagram. |
| `work/pieces.js` | The manifest — the one file to edit when a piece is added. |
| `lab/index.html` | Directory of the four rooms. |
| `lab/halftone.html` | Image → dot halftone, ordered/diffusion dither, ascii, scanline, crosshatch. |
| `lab/moire.html` | Two overlaid grids composited with `difference`. Pointer steers layer two. |
| `lab/type.html` | Kinetic type specimen. Copies its own CSS. |
| `lab/poster.html` | Seeded generative poster, exports at 2400px. |
| `studio.html` | The collaboration idea and the contact. |
| `404.html` | Dot-matrix 404 that repels the pointer. GitHub Pages serves this. |
| `nav.js` | Wires the back arrow. Loaded by every page except the front. |
| `stow.js` | Drives the Hide/Edit toggle. Loaded by the four tool rooms only. |
| `theme.js` | Wires the light/dark toggle. Loaded by every page. |

## The front page

- **No corner marks.** The back and home marks are on every page *except* this
  one. That is deliberate: the front should read as a dead end. Don't add them.
- **The hold gesture goes to Studio/About**, not to an index. About is the main
  content; the Lab is a bonus you reach from the exit bar once you are inside.
  The front page does not load `nav.js` at all — it has no arrow to wire.
- **The wordmark is a dot field**, the same mask trick as the 404: the type is
  drawn into an offscreen canvas, `getImageData` finds the letterforms, and a dot
  is kept wherever one landed. The pointer pushes them aside. The `<span>` still
  holds the real text for readers and search — it is only made transparent — and
  the metrics are read back off it with `getComputedStyle`, so the CSS clamp
  stays the single source of truth for the size.
  - **The grid is locked to the type, not the window.** Cap height is exactly
    `ROWS` cells (11), every letter's origin is snapped to a column, and a cell
    gets a dot when at least half of it is ink in a 4x supersampled mask. That
    makes repeated letters (three S, two A, two I) dot-for-dot identical and
    keeps the word looking the same at every width. The first version sampled
    one pixel per cell on a grid pinned to the window corner, so the phase
    drifted letter to letter and the rest state looked scattered. Don't go back.
  - Below 760px, without a fine pointer, or under reduced motion, the canvas is
    removed and the plain text shows. Dots that small cannot resolve into
    letters and a phone has no cursor to react to.
  - CSS `width: 100%; height: 100%` on the canvas is **required**. A canvas is a
    replaced element, so `inset: 0` alone does not stretch it — it falls back to
    its intrinsic size and the drawing lands at device-pixel scale.
- **Nothing animates the wordmark on a timer.** The explode is still only
  reachable by typing `spatial`; in dot mode it scatters the dots instead of the
  letter spans. Greg asked for still; do not restore the interval. The blast
  clock starts at `-1e9`, not `0` — `performance.now()` begins near zero, so a
  zero start puts a freshly loaded page inside the explode window.
- Its colour is the literal `#5c5c58`, deliberately a step darker than `--dim`
  and tuned against the current hero. Worth re-checking if the hero changes.
- The hero has been swapped several times. The routine each time: commit the
  original at full resolution **first**, then resize in a second commit, then
  delete the superseded file. Everything stays recoverable from history.

## Poster vocabulary

`WORDS` and `TAILS` at the top of `lab/poster.html` are placeholder copy written
by Claude, not Greg's. Every poster draws its title, subtitle and tagline from
those two arrays via the seed. Replacing them with his own vocabulary is an open
task, not a bug.

## The secrets

There is no index of the doors any more. `void.html` used to list them and was
removed on 2026-09-23 — Greg called it gimmicky. **Don't rebuild it**, and don't
add a room whose only way in is a secret.

The full set: press and hold anywhere on the front page (a ring closes around
the pointer over 1.1s, then goes to Studio/About), the 7%-opacity dot
bottom-right, typing `lab` or `spatial`, the Konami code, backtick in halftone,
space/s/h in moiré, poster seeds, the 404, and the console log on the front
page. The three drifting lines that used to sit bottom left were the door to the
void; they went on 2026-09-23 along with `cross.js`.

Secrets are shortcuts, never the only route. Every room is reachable from the
`.exit` bar and from `lab/`. The front page reveals a "hold anywhere" whisper
after 24 seconds so nobody is stuck behind a gesture they can't guess.

The hold gesture is bound to `document`, so it fires over the photo too. That is
why the front page suppresses `contextmenu` — without it a long press on the
image raises the save-image callout and eats the gesture on touch.

## Conventions

- `base.css` holds tokens, the reset, the grain overlay, the `.exit` bar and the
  corner marks. Page-specific CSS stays inline in that page.
  Don't grow `base.css` into a framework.

- **Every page except the front carries two corner marks**, left to right:
  `<a class="backmark">` (arrow) and `<a class="homemark">` (house). Both sit
  right after `<body>`, with `<script src="/nav.js"></script>` right before
  `</body>`. `nav.js` no-ops when there is no `.backmark`.

  There was a third mark — a sandwich that opened a full-screen index overlay.
  Greg had it removed on 2026-09-23, once the `.exit` bar on every page carried
  the same three sections. **The section list now lives in the exit bars and
  nowhere else**, so adding a section means editing each page's bar: the front
  page has none, the 404 uses its own nav line, and the rest carry `.exit`.
  **The Lab goes last in every list.** It is the bonus, not the work; Greg asked
  for that ordering on 2026-09-23 and it holds for the exit bars, the 404's nav
  line and studio's links row alike.
  Paths in the shared tags are **root-absolute**, so they work the same from `/`
  and from `/lab/`; they do not work over `file://`.

- **The back arrow is history, not a link home.** `nav.js` calls `history.back()`
  only when `document.referrer` is same-origin; otherwise the `href="/"` takes
  over. Testing `history.length` alone is not enough — it counts entries from
  anywhere, so a visitor arriving from a search result would be walked straight
  back out of the site. The arrow is site navigation; it should never leave.

- Both marks are inline SVG, not characters, so their stroke weights match
  each other rather than depending on font fallback. They use `mix-blend-mode:
  difference` so they stay readable over any ground, and flip to normal blend
  and the signal red on hover.

- `base.css`, `nav.js` and `stow.js` are unversioned, so a returning visitor can
  briefly run a stale copy after a deploy — GitHub Pages caches assets for ten
  minutes. The marks degrade to plain links to `/` in that window rather than
  breaking. Worth remembering when a change "doesn't work" right after a push.
  Anything placed in the top-left corner of a page has to clear them — that is why
  halftone's sidebar, moiré's panel, poster's stage and type's stage carry extra
  top padding, and why the editorial pages bump `padding-top` under 620px.
- Palette is `--bg` near-black, `--fg` near-white, one signal red `--sig`.
  Monochrome plus the one red; no second accent.
- **Everything is Helvetica.** One family site-wide, no webfonts; `--sans` is the
  only face token. Small labels are Helvetica at 10-11px with wide tracking and
  uppercase — the `.label` class. The one exception is halftone's ASCII renderer,
  which must stay monospace or its fixed character grid collapses; that font
  string is hardcoded in the room with a comment saying why. Widths set in `ch`
  were tuned for Helvetica's narrower advance, so re-check them if the face
  ever changes.
- Control panels share a shape across rooms: `legend` + `.ctl` rows + range
  inputs + the `.btn` row. Copy an existing room rather than inventing a fourth
  panel style.

- **Every tool room stows.** One `<button class="stow">Hide</button>` plus
  `<script src="/stow.js"></script>`. `stow.js` only toggles `body.stowed` and
  the button label; each room decides for itself what that class hides, so a new
  room must add its own `body.stowed` rules — hide the panel, collapse the grid
  to one track, and give the work `min-height: 100vh` with minimal padding.
  `base.css` handles the shared part: the corner marks and the `.exit` bar fade out and
  the button itself drops to 22% until hovered. `H` toggles, `Esc` un-stows.
  `.exit` reserves 96px of right padding so the button never lands on it.

## Theme

Two themes, one `localStorage` key, `vs-theme`, values `light` / `dark`.
**Dark is the default** — the art direction is dark, and `prefers-color-scheme`
is deliberately *not* consulted. Only an explicit toggle switches it.

Every page resolves the class in an inline `<head>` script **before first paint**.
Do not move that into a deferred script or the page flashes the wrong theme.

The pair of controls lives in `<div class="corner">` at top right: the toggle
then mail. **The landing page has the mail only** — no toggle, and it does not
load `theme.js`. It still runs the inline `<head>` script, so a theme chosen
elsewhere is honoured there; there is just nothing to switch it with. Both are difference-blended like the left-hand marks, and both fade
out under `body.stowed`. Anything a page puts in its top
right corner has to clear them — that is why halftone's proof-sheet hint sits at
`top: 56px` and poster's sidebar carries 58px of top padding.

Canvases paint their own ground and cannot inherit a class, so each handles it:

- `404.html` reads the class every frame and swaps its two dot colours.
- `lab/moire.html` **must** keep drawing white-on-black. Its interference comes
  from a `difference` composite, and drawing dark lines on a light ground makes
  that operation a no-op — the pattern vanishes. Light mode flips the finished
  frame with a CSS `filter: invert(1)`, and the PNG export inverts to match.
- Halftone, poster and type leave their artwork alone. That output is the user's
  work, not chrome; halftone's Invert and poster's stocks stay independent of the
  site theme. Type's own Invert button was removed — the site toggle does it now.

## Footer

Every page except the landing page carries `&copy; 2026 Visuospatials`. On pages
with the `.exit` bar it is the last item in that bar; the 404 has no bar, so it
sits in flow at the end of the content.

## Search

- **Every indexable page declares a canonical.** Without one, `/lab/` and
  `/lab/index.html` both return 200 and Google reports "Duplicate without
  user-selected canonical". Add the tag when you add a page, and add the page to
  `sitemap.xml`.
- `404.html` is `noindex` and is **not** in the sitemap.
- "Page with redirect" in Search Console is expected: `www` and the
  `polyconic.github.io` address both 301 to the apex domain. Nothing to fix.

## The work page

`work/pieces.js` is the whole interface: one object per piece, newest first. Add
the file to `work/`, add a line, done — `work/index.html` builds the grid and the
viewer from the array and never needs touching.

- **Give every piece `w` and `h`.** The grid is CSS `columns`, so without an
  intrinsic size the whole column reflows as each file lands.
- `.mp4` / `.webm` / `.mov` render as muted looping video in the grid and gain
  controls in the viewer. Everything else is an `<img>`.
- A piece with `link` becomes an `<a>` that opens the release instead of the
  viewer. Without one it is a `<button>` that opens the viewer.
- With the array empty the page says so and sends people to Instagram. That is
  deliberate — the account is the live feed and the site is the finished cut.

## Images

- **Max 2560px on the long edge, webp quality 85**, same rule as the portfolio:
  `magick in.webp -resize 2560x2560\> -quality 85 -define webp:method=6 out.webp`
  Commit the original first so the full-resolution file stays in history, then
  resize in a second commit.
- `blur.webp` is the front page hero. `visuo.webp` is **not** dead — it is
  the default image halftone loads. Don't delete it.
- Superseded heroes are removed from the tree but stay in history, originals
  included: `git log --oneline --diff-filter=D -- '*.webp' '*.jpg'` finds them.
- The favicon is `favicon.png` (512px) plus `apple-touch-icon.png` (180px), both
  cut from a 2133px original in history. It carries its own black ground rather
  than transparency, so the white mark reads on a light browser tab too. Every
  page links both, root-absolute.

## Canvas rooms

- Rooms that size a canvas to their container **must** tolerate a zero-size first
  paint. `poster.html` and `halftone.html` bail out below 40px and redraw from a
  `ResizeObserver` plus `load`; `404.html` rebuilds its mask lazily in the loop.
  Removing those guards reproduces a blank or postage-stamp canvas on load.
- Export renders a *fresh* canvas at print size rather than upscaling the on-screen
  one, so cell sizes are scaled by `longEdge` inside `render`/`compose`.
- Poster export is driven by a physical sheet size (`data-w`/`data-h` in inches on
  each format button) times the chosen ppi, so 72/150/300 are real resolutions
  rather than arbitrary pixel counts. A canvas PNG carries no resolution at all,
  so `stampResolution` splices a `pHYs` chunk in after IHDR — without it every
  export opens as 72ppi in print software no matter how many pixels it has.
- Keydown handlers guard `e.target instanceof Element` before `matches()` —
  `document` has no `matches` and the handler throws without it.
- **Shortcut guards, in this order, in every room and in `stow.js`:** bail on any
  modifier (Cmd+S would save *and* open the browser's Save Page; Cmd+H would stow
  as the app hides); bail when focus is in a text field; and bail on Space only
  when focus is on a button, since a button clicks itself on Space. Do **not**
  go back to guarding every `input` and `button` — a slider keeps focus after a
  drag, so that version killed tweak-then-press-S, and one click on any button
  silenced every shortcut until you clicked empty space.

## Contact

- `studio.html` links `mailto:gregor.art@pm.me` — Greg's public contact for this
  site. It is deliberately not the address on his GitHub account; keep the two
  separate.
