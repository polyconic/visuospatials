# visuospatials.com

A design and artwork studio site. Static HTML, no build step, no dependencies,
no analytics, no fonts fetched from anyone. Every page is a plain `.html` file
with inline `<style>` and `<script>`. The shared files are `base.css`,
`nav.js` and `theme.js`.

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
| `index.html` | The front. Converging geometric wordmark, hidden index. |
| `work/index.html` | The portfolio grid. Reads `work/pieces.js`; empty state points at Instagram. |
| `work/pieces.js` | The manifest — the one file to edit when a piece is added. |
| `studio.html` | The collaboration idea and the contact. |
| `404.html` | Dot-matrix 404 that repels the pointer. GitHub Pages serves this. |
| `nav.js` | Wires the back arrow. Loaded by every page except the front. |
| `theme.js` | Wires the light/dark toggle. Loaded by every page. |

## The front page

- **No photo, no ground.** The page is black with the wordmark alone. The
  photo hero was replaced on 2026-09-25, first by a belt of extruded-cube SVGs
  and then by this; both are in history. `blur.webp` is off the page but is
  still the `og:image`.
- **No corner marks.** The back and home marks are on every page *except* this
  one. That is deliberate: the front should read as a dead end. Don't add them.
- **The name is the way in.** The wordmark is `<a class="flicker-text"
  href="/studio.html">` — its text is made transparent and sits under the
  canvas (which ignores pointers), so the whole word area clicks through to
  Studio/About, even while the pieces are scattered. Being a real
  link, it gets the page fade, the prerender and keyboard access for free.
  The front page does not load `nav.js` at all — it has no arrow to wire.
- **The wordmark is built from flat shapes and converges.** Each letter is a
  few filled primitives (`GLYPHS`: bars, triangles with a triangle notch cut
  out, half discs, ring slices). The A is generated as the V flipped, so the
  two always carry the same weight — a hand-drawn A once had a smaller notch
  and read visibly heavier. A thin hairline cut was tried the same day and
  Greg went back to this heavier one. Every piece slides left at 1, 2 or 3 laps per 26s
  cycle and wraps, so they line up into the word once a cycle; time is warped
  to slow around that moment so the word holds, then comes apart. Greg asked
  for this motion on 2026-09-25, replacing the still dot-field wordmark (which
  lives on in the 404). The word's size is read off the link's text width, so
  the CSS clamp still sets it and the hit area matches the drawing. About one
  piece in five is grey (`DIM`); that and the speeds come from a fixed seed,
  so every load looks and moves the same way. Reduced motion draws the word once, assembled.
  - CSS `width: 100%; height: 100%` on the canvas is **required**. A canvas is a
    replaced element, so `inset: 0` alone does not stretch it — it falls back to
    its intrinsic size and the drawing lands at device-pixel scale.
- **Typing `spatial` still explodes it**: every piece flies out and fades over
  6s, then settles back over 2.5s. The blast clock starts at `-1e9`, not `0` —
  `performance.now()` begins near zero, so a zero start puts a freshly loaded
  page inside the explode window.

## The secrets

There is no index of the doors any more. `void.html` used to list them and was
removed on 2026-09-23 — Greg called it gimmicky. **Don't rebuild it**, and don't
add a page whose only way in is a secret.

The full set: typing `spatial`, the Konami code, the 404, and the console log
on the front page. **The Lab is gone** — its five tool rooms (halftone, moiré,
type, poster and the directory), `stow.js`, the 7%-opacity dot that linked to
it and the `lab` typed shortcut were removed on 2026-09-25; Greg called it
gimmicky. It's all in history. Don't bring it back as a secret either.

Secrets are shortcuts, never the only route. There is no on-screen hint for the name link; a
"click the name" whisper was removed on 2026-09-24 at Greg's request. Don't add
one back. The console log still says it, for anyone who looks there.

The link pads its box vertically (`padding: 0.4em 0`) so it's an easy target on a phone.

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
  **Don't repeat the bar in page content.** Studio's links row used to
  list the sections right above a bar that already did. Outside links
  now live in studio's **Elsewhere** list — Audiospatials, Instagram, Gregor
  Egan — as ruled rows: name left, address right with
  a ↗. Links go to final URLs (`www.audiospatials.com`, `www.instagram.com`)
  to skip a redirect, and all open in a new tab.
  Paths in the shared tags are **root-absolute**, so they work the same from `/`
  and from `/work/`; they do not work over `file://`.

- **The back arrow is history, not a link home.** `nav.js` calls `history.back()`
  only when `document.referrer` is same-origin; otherwise the `href="/"` takes
  over. Testing `history.length` alone is not enough — it counts entries from
  anywhere, so a visitor arriving from a search result would be walked straight
  back out of the site. The arrow is site navigation; it should never leave.

- Both marks are inline SVG, not characters, so their stroke weights match
  each other rather than depending on font fallback. They use `mix-blend-mode:
  difference` so they stay readable over any ground, and flip to normal blend
  and the signal red on hover.

- `base.css` and `nav.js` are unversioned, so a returning visitor can
  briefly run a stale copy after a deploy — GitHub Pages caches assets for ten
  minutes. The marks degrade to plain links to `/` in that window rather than
  breaking. Worth remembering when a change "doesn't work" right after a push.
  Anything placed in the top-left corner of a page has to clear them — that is why
  the editorial pages bump `padding-top` under 620px.
- **Page changes fade through** via a cross-document view transition —
  `@view-transition { navigation: auto; }` in `base.css`, skipped under reduced
  motion. The old page fades out (0.2s) before the new one fades in (0.34s from
  0.12s), so two layouts never sit on top of each other; a plain crossfade
  ghosted headings over each other mid-fade. Both pages must opt in, which is
  why it lives in `base.css`. Browsers without support (Firefox) just navigate.
  To check it runs, record `!!e.viewTransition` from a `pageswap` listener on
  the outgoing page. **The in-app browser pane skips transitions and runs at
  1fps when it isn't focused** — click into the page before measuring anything.
- **Prerendering (Chromium only).** `nav.js` injects speculation rules that
  prerender a same-origin page once a pointer settles on its link; the front
  page carries its own rules and prerenders `/studio.html` eagerly, since the
  name always leads there. Safari ignores them. The in-app browser doesn't
  prerender under automation, so `activationStart` reads 0 there.
- **Overlays take a history entry.** The work viewer `pushState`s when it opens, so a phone's back gesture closes them instead of
  leaving the page; closing any other way calls `history.back()` to spend it,
  and a reload with it open replaces the stale entry.
- Batching the dot fills on the 404 into one path was measured and made no
  difference in Chrome; the arcs are the cost, not the fill calls.
- Palette is `--bg` near-black, `--fg` near-white, one signal red `--sig`.
  Monochrome plus the one red; no second accent.
- **Everything is Helvetica.** One family site-wide, no webfonts; `--sans` is the
  only face token. Small labels are Helvetica at 10-11px with wide tracking and
  uppercase — the `.label` class. Widths set in `ch`
  were tuned for Helvetica's narrower advance, so re-check them if the face
  ever changes.
- Arrows used as ornaments need `\FE0E` after them (`" \2197\FE0E"`), or iOS
  draws a blue emoji tile.
## Theme

Two themes, one `localStorage` key, `vs-theme`, values `light` / `dark`.
**Dark is the default** — the art direction is dark, and `prefers-color-scheme`
is deliberately *not* consulted. Only an explicit toggle switches it.

Every page resolves the class in an inline `<head>` script **before first paint**.
Do not move that into a deferred script or the page flashes the wrong theme.

The pair of controls lives in `<div class="corner">` at top right: the toggle
then mail. **The landing page has the mail only** — no toggle, and it does not
load `theme.js`. It still runs the inline `<head>` script, so a theme chosen
elsewhere is honoured there; there is just nothing to switch it with. Both are
difference-blended like the left-hand marks. Anything a page puts in its top
right corner has to clear them.

Canvases paint their own ground and cannot inherit a class, so each handles it:

- `404.html` reads the class every frame and swaps its two dot colours.
- The front page is always black, whatever the theme; its canvas draws white.
## Footer

Every page except the landing page carries `&copy; 2026 Visuospatials`. On pages
with the `.exit` bar it is the last item in that bar; the 404 has no bar, so it
sits in flow at the end of the content.

## Search

- **Every indexable page declares a canonical.** Without one, `/work/` and
  `/work/index.html` both return 200 and Google reports "Duplicate without
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
- `blur.webp` is no longer on any page but is the `og:image`; keep it.
- Superseded heroes are removed from the tree but stay in history, originals
  included: `git log --oneline --diff-filter=D -- '*.webp' '*.jpg'` finds them.
- The favicon is `favicon.png` (512px) plus `apple-touch-icon.png` (180px), both
  cut from a 2133px original in history. It carries its own black ground rather
  than transparency, so the white mark reads on a light browser tab too. Every
  page links both, root-absolute.

## Canvases

- Canvases that size themselves to their container **must** tolerate a zero-size first
  paint. `404.html` rebuilds its mask lazily in the loop and the front page
  rebuilds whenever the window size changes, skipping a zero size. Removing
  those guards reproduces a blank or postage-stamp canvas on load.
- Keydown handlers guard `e.target instanceof Element` before `matches()` —
  `document` has no `matches` and the handler throws without it.
## Contact

- `studio.html` links `mailto:gregor.art@pm.me` — Greg's public contact for this
  site. It is deliberately not the address on his GitHub account; keep the two
  separate.
