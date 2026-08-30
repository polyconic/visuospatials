# visuospatials.com

A design and artwork studio site. Static HTML, no build step, no dependencies,
no analytics, no fonts fetched from anyone. Every page is a plain `.html` file
with inline `<style>` and `<script>`. The shared files are `base.css`,
`menu.js`, `stow.js`, `theme.js` and `cross.js`.

**`README.md` is the public face of the repo — short, no secrets.** This file is
the working document. Keep them separate: anything that spoils `void.html` or
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
| `lab/index.html` | Directory of the five rooms. |
| `lab/halftone.html` | Image → dot halftone, ordered/diffusion dither, ascii, scanline, crosshatch. |
| `lab/moire.html` | Two overlaid grids composited with `difference`. Pointer steers layer two. |
| `lab/type.html` | Kinetic type specimen. Copies its own CSS. |
| `lab/poster.html` | Seeded generative poster, exports at 2400px. |
| `studio.html` | The collaboration idea and the contact. |
| `void.html` | Unlisted. Lists every secret on the site. `noindex`. |
| `404.html` | Dot-matrix 404 that repels the pointer. GitHub Pages serves this. |
| `menu.js` | Builds the index overlay and wires the sandwich mark. Loaded by every page. |
| `stow.js` | Drives the Hide/Edit toggle. Loaded by the four tool rooms only. |
| `cross.js` | Draws the three drifting lines. `data-corner` pins them bottom left. |
| `theme.js` | Wires the light/dark toggle. Loaded by every page. |

## The front page

- **No corner marks.** The home and sandwich marks are on every page *except* this
  one. That is deliberate: the front should read as a dead end. Don't add them.
- **The wordmark is static.** The explode animation still exists but nothing runs
  it on a timer — only typing `spatial` fires it. Greg asked for still; do not
  restore the interval.
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

`void.html` lists the doors and is written for a visitor. **If you add or move a
door, update that page** — a stale map is worse than none. Four doors are left off it on
purpose: the corner lines, the Konami code, the 404 and the front page console
log. That is Greg's call, not an oversight; don't add them back.

The short version: press and hold anywhere on the front page (a ring closes
around the pointer over 1.1s), the 7%-opacity dot bottom-right,
typing `lab` / `void` / `spatial`, the Konami code, the three drifting lines in
the front page's bottom left corner, backtick in halftone, space/s/h in moiré,
setting type's text to VOID, poster seeds, the 404, and the console log on the
front page.

Secrets are shortcuts, never the only route. Every room is reachable from the
`.exit` bar and from `lab/`. The front page reveals a "hold anywhere" whisper
after 24 seconds so nobody is stuck behind a gesture they can't guess.

The hold gesture is bound to `document`, so it fires over the photo too. That is
why the front page suppresses `contextmenu` — without it a long press on the
image raises the save-image callout and eats the gesture on touch.

## Conventions

- `base.css` holds tokens, the reset, the grain overlay, the `.exit` bar, the
  corner marks and the index overlay. Page-specific CSS stays inline in that page.
  Don't grow `base.css` into a framework.

- **Every page except the front carries two corner marks.** An
  `<a class="homemark" href="/">` holding an inline arrow SVG, then an
  `<a class="menumark" href="/">` holding a three-line sandwich SVG, both right
  after `<body>`, and
  `<script src="/menu.js"></script>` right before `</body>`. The landing page
  loads `menu.js` but shows no marks — it is meant to look like a dead end, and
  the hold gesture is its way in. `menu.js` no-ops when there is no `.menumark`.
  The href is the no-JS fallback; `menu.js` intercepts the click and opens the
  index in place instead of navigating. The room list lives in `ROOMS` in
  `menu.js` and nowhere else — add a room there and it appears everywhere at once.
  Paths in `ROOMS` and in the two shared tags are **root-absolute**, so they work
  the same from `/` and from `/lab/`; they do not work over `file://`.

- Both marks are inline SVG, not characters, so their stroke weights match each
  other rather than depending on font fallback. Both use `mix-blend-mode:
  difference` so they stay readable over any ground, and flip to normal blend
  and the signal red on hover. The sandwich's three lines cross into an X under
  `body.menu-open`, so it reads as the toggle it is.

- `base.css`, `menu.js` and `stow.js` are unversioned, so a returning visitor can
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
  the button itself drops to 22% until hovered. It hides entirely under
  `body.menu-open` (set by `menu.js`) so the index stays clean, and `H` is
  ignored while the index is up. `H` toggles, `Esc` un-stows.
  `.exit` reserves 96px of right padding so the button never lands on it.

## Theme

Two themes, one `localStorage` key, `vs-theme`, values `light` / `dark`.
**Dark is the default** — the art direction is dark, and `prefers-color-scheme`
is deliberately *not* consulted. Only an explicit toggle switches it.

Every page resolves the class in an inline `<head>` script **before first paint**.
Do not move that into a deferred script or the page flashes the wrong theme.

The pair of controls lives in `<div class="corner">` at top right: the toggle
then mail. Both are difference-blended like the left-hand marks, and both fade
out under `body.stowed` and `body.menu-open`. Anything a page puts in its top
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

Every page except the landing page carries `&copy; 2026 Audiospatials`. On pages
with the `.exit` bar it is the last item in that bar; void and 404 have no bar,
so it sits in flow at the end of the content — on the void it shares a
`.foot` flex row with the nav line, matching the bar's left/right split. Note the name: **Audiospatials**,
not Visuospatials — that is what Greg asked for.

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

## Contact

- `studio.html` links `mailto:gregor.art@pm.me` — Greg's public contact for this
  site. It is deliberately not the address on his GitHub account; keep the two
  separate.
