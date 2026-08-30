# visuospatials.com

A design and artwork studio site. Static HTML, no build step, no dependencies,
no analytics, no fonts fetched from anyone. Every page is a plain `.html` file
with inline `<style>` and `<script>`; the only shared file is `base.css`.

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

- `base.css` holds tokens, the reset, the grain overlay and the `.exit` bar.
  Page-specific CSS stays inline in that page. Don't grow `base.css` into a
  framework.
- Palette is `--bg` near-black, `--fg` near-white, one signal red `--sig`.
  Monochrome plus the one red; no second accent.
- Type is system Helvetica/Arial for display, system mono for labels. No webfonts.
- Control panels share a shape across rooms: `legend` + `.ctl` rows + range
  inputs + the `.btn` row. Copy an existing room rather than inventing a fourth
  panel style.

## Canvas rooms

- Rooms that size a canvas to their container **must** tolerate a zero-size first
  paint. `poster.html` and `halftone.html` bail out below 40px and redraw from a
  `ResizeObserver` plus `load`; `404.html` rebuilds its mask lazily in the loop.
  Removing those guards reproduces a blank or postage-stamp canvas on load.
- Export renders a *fresh* canvas at print size rather than upscaling the on-screen
  one, so cell sizes are scaled by `longEdge` inside `render`/`compose`.
- Keydown handlers guard `e.target instanceof Element` before `matches()` —
  `document` has no `matches` and the handler throws without it.

## Placeholders to replace

- `studio.html` links `mailto:hello@visuospatials.com`. That address is a
  placeholder and has never been verified to exist. Point it at a real inbox
  before telling anyone about the page.
- The studio copy (sections 01–03) is written to be replaced by Greg's own words.
