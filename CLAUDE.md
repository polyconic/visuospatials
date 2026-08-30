# visuospatials.com

A design and artwork studio site. Static HTML, no build step, no dependencies,
no analytics, no fonts fetched from anyone. Every page is a plain `.html` file
with inline `<style>` and `<script>`; the only shared files are `base.css` and
`menu.js`.

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
| `hole.js` | Draws the black hole. `data-scatter` drops it in a random safe band. |

## The secrets

`void.html` is the canonical list and is written for a visitor. **If you add or
move a door, update that page** — it is the only place they are all written down,
and a stale map is worse than none.

The short version: press and hold anywhere on the front page (a ring closes
around the pointer over 1.1s), the 7%-opacity dot bottom-right,
typing `lab` / `void` / `spatial`, the Konami code, the dead hairline under the
lab's room list, backtick in halftone, space/s/h in moiré, setting type's text to
VOID, poster seeds, the 404, and the console log on the front page.

Secrets are shortcuts, never the only route. Every room is reachable from the
`.exit` bar and from `lab/`. The front page reveals a "hold anywhere" whisper
after 24 seconds so nobody is stuck behind a gesture they can't guess.

The hold gesture is bound to `document`, so it fires over the photo too. That is
why the front page suppresses `contextmenu` — without it a long press on the
image raises the save-image callout and eats the gesture on touch.

## Conventions

- `base.css` holds tokens, the reset, the grain overlay, the `.exit` bar, the
  `V` mark and the index overlay. Page-specific CSS stays inline in that page.
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
- Type is system Helvetica/Arial for display, system mono for labels. No webfonts.
- Control panels share a shape across rooms: `legend` + `.ctl` rows + range
  inputs + the `.btn` row. Copy an existing room rather than inventing a fourth
  panel style.

- **Every tool room stows.** One `<button class="stow">Hide</button>` plus
  `<script src="/stow.js"></script>`. `stow.js` only toggles `body.stowed` and
  the button label; each room decides for itself what that class hides, so a new
  room must add its own `body.stowed` rules — hide the panel, collapse the grid
  to one track, and give the work `min-height: 100vh` with minimal padding.
  `base.css` handles the shared part: the `V` and the `.exit` bar fade out and
  the button itself drops to 22% until hovered. It hides entirely under
  `body.menu-open` (set by `menu.js`) so the index stays clean, and `H` is
  ignored while the index is up. `H` toggles, `Esc` un-stows.
  `.exit` reserves 96px of right padding so the button never lands on it.

## Images

- **Max 2560px on the long edge, webp quality 85**, same rule as the portfolio:
  `magick in.webp -resize 2560x2560\> -quality 85 -define webp:method=6 out.webp`
  Commit the original first so the full-resolution file stays in history, then
  resize in a second commit.
- `visuowallpaper.webp` is the front page hero. `visuo.webp` is **not** dead —
  it is the default image halftone loads, and the high-contrast black and white
  suits that room better than the wallpaper would. Don't delete it.

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
