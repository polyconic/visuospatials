# visuospatials.com

A design and artwork studio site. Static HTML, no build step, no dependencies,
no analytics, no fonts fetched from anyone. Every page is a plain `.html` file
with inline `<style>` and `<script>`. The shared files are `base.css`,
`theme.css`, `pages.css`, `theme.js`, `nav.js`, `menu.js` and `geo.js`.

**Visually the same as audiospatials.com** (2026-11-16, Gregor: "make this site
visually the same as Audiospatials, including loading screen"). `base.css`,
`geo.js`, `nav.js`, `menu.js`, `theme.css` and `theme.js` are copies of
audiospatials' `css/` and `js/` files, changed only where the name is in them
(the loading screen's word, the `vs-theme` / `vs-loaded` storage keys).
`pages.css` is the part of audiospatials' `css/pages.css` this site uses (top
nav, phone menu, titles, footer, scroll effects). Read
`~/Local Desktop/GitHub/audiospatials/CLAUDE.md` for how each works; when one
changes there, copy it here.

**`README.md` is the public face of the repo — short, no secrets.** This file is
the working document. Keep them separate: anything that spoils a secret or
reads as an internal note belongs here, not there.

## Deploy

GitHub Pages from `main`. `CNAME` points at `visuospatials.com`.
**Pushing to `main` publishes the live site** — there is no staging.

Repo: `github.com/polyconic/visuospatials`, cloned at `~/Local Desktop/GitHub/visuospatials`.
Some history was made through the GitHub web UI ("Add files via upload"), so run
`git status` and `git fetch` before assuming the local clone is current.

## Pages

| File | What it is |
|---|---|
| `index.html` | The front. The blurred photo and Enter →; the name is a visually hidden h1. |
| `work.html` | The portfolio grid, at `/work`. Reads `pieces/pieces.js`; empty state points at Instagram. |
| `pieces/pieces.js` | The manifest — the one file to edit when a piece is added. Files sit beside it in `pieces/`. |
| `studio.html` | The collaboration idea and the contact, at `/studio`. |
| `404.html` | A 404 in the geometric alphabet, converging every 16s. GitHub Pages serves this. |
| `nav.js` | Wires the back arrow and prerendering. Loaded by every page except the front. |
| `menu.js` | The phone menu (≤760px): a button beside the mail mark drops the `.exit` bar's own links. Also writes the © line at the end of the page (`.footcopy`). |
| `theme.js` / `theme.css` | Light 9am–5pm on the visitor's clock, dark otherwise, plus the toggle and the loading screen. Loaded in every page's head. |
| `pages.css` | Inside-page styles shared with audiospatials: the top nav, titles, footer, scroll effects. Studio and Work load it. |
| `geo.js` | The geometric alphabet, heading renderer and converge engine. Loaded by every page. |

## Clean addresses

The site links to `/studio` and `/work`, never `studio.html` or `work/`.
GitHub Pages serves `studio.html` at `/studio` and `work.html` at `/work` on
its own. The Work page moved from `work/index.html` to `work.html` on
2026-09-26 so its address loses the trailing slash, and its manifest and files
moved to `pieces/` — **a `work/` folder must not come back**, or Pages sees the
folder first and redirects `/work` to `/work/`. Old links are caught: both
pages `replaceState` a `.html` address to the clean one, and the 404 sends
`/work/` and `/work/index.html` on to `/work`. Canonicals, `og:url` and the
sitemap use the clean addresses. The local `python3 -m http.server` preview
does **not** do this mapping, so test locally at `/studio.html` and
`/work.html`.

## The geometric alphabet

Set 2026-09-25: the whole site follows the wordmark — flat shapes, black
ground, minimal. `geo.js` holds A–Z plus `0 4 . / ↗` and space, each letter a
few primitives (bars, triangles with a notch, half discs, ring slices) in a box
one unit tall at stroke weight `T = 0.2`. It is the single source of letters:

- **Page headings stay Helvetica but arrive like the alphabet.** `data-arrive`
  splits an element into per-letter spans that slide in from the right once on
  load, with the same seeded offsets and easing as an assembling geo heading.
  A `↗` in the text becomes the alphabet's arrow (`.geo.arrow`, cap height, red
  via the `<em>`). Greg tried the headings in the alphabet itself on
  2026-09-25 and went back to Helvetica for them, keeping the motion and the
  arrow. The real text sits in a visually hidden `.geo-text` span.
- `data-geo` still exists — it redraws an element in the alphabet as inline SVG
  (`.geo`, one cap height tall) and assembles it — but nothing uses it now.
  Pieces take `currentColor`, so hover colours work; a child in a different
  colour keeps its own. `body` clips horizontal overflow so incoming letters
  and pieces don't add a scrollbar.
- **Canvas**: `Geo.converge(canvas, text, place, {cycle, hold})` runs the looping
  version for the 404 (the front page used it until 2026-11-16).
- A missing character renders as a space — add a glyph to `G` before using a
  new letter or digit in a heading. The A is always generated as the V flipped,
  and both use the heavy V: a short, narrow notch (Greg preferred it to the
  deeper, thinner-stroked one).
- Pieces that butt together get a hairline stroke in the same colour (`SEAM`)
  so no anti-aliased seam shows between them. It is **0.7 screen pixels at any
  size** (`vector-effect: non-scaling-stroke` in SVG, divided by the scale on
  the canvas). It used to be a fraction of the letter height, which on a big
  screen grew to several pixels and visibly spilled a white piece over a grey
  neighbour. Where two touching pieces land in **different** tones even that
  can read as overlap, so a glyph may carry `clear` alternates: the S's bars
  swap to a shape stopping a hair short of the half disc only when their tone
  differs from it. Same tones must keep touching — a gap between two same-tone
  pieces shows as a dark line (Greg flagged exactly that). Because of that stroke, **never cut a
  notch as an even-odd hole that touches a letter's outer edge** — the stroke
  traces the hole's open side as a visible line (it did across the V and A).
  Draw the notch into a single outline instead, as the V, A, K and Y are.
- Body copy, labels and the exit bar stay small Helvetica; the contrast is the
  point. The corner and viewer icons are flat filled shapes, not strokes.

## The front page

- **The photo is back.** `blur.webp`, the blurred black-and-white portrait,
  sits full bleed with its slow 90s drift (`.hero`). It was
  off the page for a day while the cube belt and then a bare #0a0a0a ground
  were tried; Greg asked for it back on 2026-09-26. It is also the `og:image`.
- **No wordmark** (2026-11-16, Gregor: "remove the moving wordmark"). The
  converging `Geo.converge` wordmark over the photo, its link and the `spatial`
  explode egg are gone; the page is the photo and the Enter → link. The name
  stays in a visually hidden `<h1>` for readers and search. The front no longer
  loads `geo.js`. It's all in git history if wanted back.
- **No corner marks.** The back and home marks are on every page *except* this
  one. That is deliberate: the front should read as a dead end. Don't add them.
  The front page does not load `nav.js` at all — it has no arrow to wire.

## The secrets

There is no index of the doors any more. `void.html` used to list them and was
removed on 2026-09-23 — Greg called it gimmicky. **Don't rebuild it**, and don't
add a page whose only way in is a secret.

The full set: the Konami code, the 404, and the console log on the front
page (which now hints the Konami code). Typing `spatial` went with the wordmark
on 2026-11-16. **The Lab is gone** — its five tool rooms (halftone, moiré,
type, poster and the directory), `stow.js`, the 7%-opacity dot that linked to
it and the `lab` typed shortcut were removed on 2026-09-25; Greg called it
gimmicky. It's all in history. Don't bring it back as a secret either.

Secrets are shortcuts, never the only route. The front page has an **Enter →**
link bottom center, to `/work` — the only way in since the wordmark went. Added 2026-09-29 to match
audiospatials.com, whose `.enter` it copies exactly (bold 12px tracked caps, a
filled arrow, no box, difference blend, `bottom: max(clamp(40px, 8vh, 90px),
safe-area)`; hover goes red and nudges the arrow, on hover devices only). Keep
the two in step. It replaced nothing: an earlier faded "click the name" whisper
was removed on 2026-09-24 and should stay gone — Enter is a link, not a hint.

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
  list the sections right above a bar that already did. The studio's own
  Instagram, @visuospatials, has its own one-row block just above (`.follow`).
  Other outside links
  live in studio's **Elsewhere** list — Audiospatials and Gregor Egan
  (each with site and Instagram side by side in a `.pair` row, each its own
  link),
  Hunter Bowersmith (his Instagram) — as ruled rows: name left, address right with
  a ↗. Links go to final URLs (`www.audiospatials.com`, `www.instagram.com`)
  to skip a redirect, and all open in a new tab.
  Paths in the shared tags are **root-absolute**, so they work the same from `/`
  and from any other page; they do not work over `file://`.

- **The nav bar is at the top** (2026-11-16, as on audiospatials.com): fixed,
  links on the left after the back and home marks, a hairline under it,
  Helvetica Medium; the current page in red. The © line closes the page,
  centered (`.footcopy`, written by `menu.js`). **Every bar lists the sections
  in the same order** — Visuospatials, Work, Studio/About — with `.here` in
  place of the current one. On phones (≤760px) the bar is hidden and
  `menu.js` adds a two-bar button beside the mail mark that drops the same
  links down; it closes on an outside tap, Esc, a link, or coming back via
  back. `viewport-fit=cover` is on every page, and the marks keep clear of the
  notch with `env(safe-area-inset-*)`.

- **The back arrow is history, not a link home.** `nav.js` calls `history.back()`
  only when `document.referrer` is same-origin; otherwise the `href="/"` takes
  over. Testing `history.length` alone is not enough — it counts entries from
  anywhere, so a visitor arriving from a search result would be walked straight
  back out of the site. The arrow is site navigation; it should never leave.

- Both marks are inline SVG flat shapes (a triangle-and-bar arrow, a house of
  a triangle and a square with a door), matching the alphabet, as is the mail
  mark (an envelope with a V notch). **Each icon is one single outline** — no
  holes cut with even-odd and no two shapes touching. Phones drew a hairline
  where coincident edges met (Greg saw it on the mail and home marks). They use `mix-blend-mode:
  difference` so they stay readable over any ground, and flip to normal blend
  and the signal red on hover.

- `base.css`, `nav.js` and `geo.js` are unversioned, so a returning visitor can
  briefly run a stale copy after a deploy — GitHub Pages caches assets for ten
  minutes. The marks degrade to plain links to `/` in that window rather than
  breaking. Worth remembering when a change "doesn't work" right after a push —
  a stale `base.css` without the `.geo` rules shows the Helvetica heading text
  under the drawn one until it refreshes.
  Anything placed in the top-left corner of a page has to clear them.
- **Page changes fade through** via a cross-document view transition —
  `@view-transition { navigation: auto; }` in `base.css`, skipped under reduced
  motion. The old page fades out (0.22s) before the new one fades in over 0.5s
  from 0.16s, rising 10px, so two layouts never sit on top of each other; a
  plain crossfade ghosted headings over each other mid-fade. The bar and corner
  marks carry `view-transition-name`s so they hold still across pages. Both pages must opt in, which is
  why it lives in `base.css`. Browsers without support (Firefox) just navigate.
  To check it runs, record `!!e.viewTransition` from a `pageswap` listener on
  the outgoing page. **The in-app browser pane skips transitions and runs at
  1fps when it isn't focused** — click into the page before measuring anything.
- **Prerendering (Chromium only).** `nav.js` injects speculation rules that
  prerender a same-origin page once a pointer settles on its link; the front
  page carries its own rules and prerenders `/work` eagerly, since Enter
  leads there. Safari ignores them. The in-app browser doesn't
  prerender under automation, so `activationStart` reads 0 there.
- **Overlays take a history entry.** The work viewer `pushState`s when it opens, so a phone's back gesture closes them instead of
  leaving the page; closing any other way calls `history.back()` to spend it,
  and a reload with it open replaces the stale entry.
- Palette is `--bg` near-black, `--fg` near-white, one signal red `--sig`.
  Monochrome plus the one red; no second accent.
- **Everything is Helvetica.** One family site-wide, no webfonts; `--sans` is the
  only face token. Small labels are Helvetica at 10-11px with wide tracking and
  uppercase — the `.label` class. Widths set in `ch`
  were tuned for Helvetica's narrower advance, so re-check them if the face
  ever changes.
- **Hover styles go inside `@media (hover: hover)`** (2026-09-27). On iOS a tap
  on anything with a :hover style is spent showing the hover, so the menu
  took two taps. Keep `:focus-visible` outside it, for keyboards.
- Arrows used as ornaments need `\FE0E` after them (`" \2197\FE0E"`), or iOS
  draws a blue emoji tile.
## Theme

**Light by day, dark by night** (2026-11-16, matching audiospatials.com):
light (`--bg` #fbfbfb) from 9am to 5pm on the visitor's own clock, dark
(#0a0a0a) otherwise. `theme.js` sets `data-theme` on `<html>` before anything
draws, checks every minute, and updates `theme-color`; `theme.css` holds the
light colors. The half-filled circle in the corner flips it by hand and keeps
that choice in localStorage (`vs-theme`). The site was dark only from
2026-09-25 until then. **The front page ignores the theme**: the photo fills
it either way, so its mail mark keeps the difference blend and it hides the
toggle. The 404 passes `--fg` to `Geo.converge` as its ink.

**No grey text** on Studio and Work: `pages.css` sets `--dim` to the text
color, as audiospatials does.

**The loading screen**: once per visit (sessionStorage `vs-loaded`), the word
"visuospatials" in the middle with a 6px bar under it that fills, then fades.
Drawn as `html.loading::before/::after` in `theme.css` so it's there from the
first frame; skipped for prerendered pages and without JS.

## Footer

Every page except the landing page carries `&copy; <span data-yr>2026</span> Visuospatials` (a tiny inline script at the end of each page swaps in the current year; the 2026 is the no-JS fallback). On pages with the `.exit` bar it sits in the bar's markup and `menu.js` shows it as `.footcopy` at the end of the page; the 404 has no bar, so it sits in flow at the end of the content.

## Search

- **Every indexable page declares a canonical.** Without one, `/studio` and
  `/studio.html` both return 200 and Google reports "Duplicate without
  user-selected canonical". Add the tag when you add a page, and add the page to
  `sitemap.xml`.
- `404.html` is `noindex` and is **not** in the sitemap.
- "Page with redirect" in Search Console is expected: `www` and the
  `polyconic.github.io` address both 301 to the apex domain. Nothing to fix.
- The front page carries structured data (JSON-LD, 2026-09-27): the studio and
  its founders, each marked as also affiliated with Audiospatials. Audiospatials'
  front page says the same back, so search engines connect the two studios
  without either claiming the other. Deliberately not a parent/sub relation.

## The work page

`pieces/pieces.js` is the whole interface: one object per piece, newest first. Add
the file to `pieces/`, add a line, done — `work.html` builds the grid and the
viewer from the array and never needs touching.

- **Give every piece `w` and `h`.** The grid is CSS `columns`, so without an
  intrinsic size the whole column reflows as each file lands.
- `.mp4` / `.webm` / `.mov` render as muted looping video in the grid and gain
  controls in the viewer. Everything else is an `<img>`.
- **Captions are off** (`CAPTIONS = false` in `work.html`, 2026-09-27): no
  title or credit under the art in the grid or the viewer. The titles and
  credits stay in `pieces.js` — they still feed each image's alt text — so
  flipping the switch brings them all back.
- A piece with `link` becomes an `<a>` that opens the release instead of the
  viewer. Without one it is a `<button>` that opens the viewer.
- With the array empty the page says so and sends people to Instagram. That is
  deliberate — the account is the live feed and the site is the finished cut.

## Images

- **Work pieces are full resolution.** `pieces/*.webp` are converted at their
  native size, `magick in -auto-orient -strip -quality 92 -define webp:method=6
  out.webp` — Greg asked for them as sharp as possible, so the 2560px cap below
  does **not** apply to them. The originals are not committed (they run to
  18MB each); they live in `~/Desktop/visuospatials-originals/`. Noisy,
  grainy art can come out larger as webp than as its source JPEG; that's
  accepted rather than dropping quality.

- **Other site images: max 2560px on the long edge, webp quality 85**, same rule as the portfolio site:
  `magick in.webp -resize 2560x2560\> -quality 85 -define webp:method=6 out.webp`
  Commit the original first so the full-resolution file stays in history, then
  resize in a second commit.
- `blur.webp` is the front page hero and the `og:image`.
- Superseded heroes are removed from the tree but stay in history, originals
  included: `git log --oneline --diff-filter=D -- '*.webp' '*.jpg'` finds them.
- The favicon is `favicon.png` (512px) plus `apple-touch-icon.png` (180px), both
  cut from a 2133px original in history. It carries its own black ground rather
  than transparency, so the white mark reads on a light browser tab too. Every
  page links both, root-absolute.

## Canvases

- Canvases that size themselves to their container **must** tolerate a zero-size first
  paint. `Geo.converge` rebuilds whenever the window size changes and skips a
  zero size. Removing
  those guards reproduces a blank or postage-stamp canvas on load.
- Keydown handlers guard `e.target instanceof Element` before `matches()` —
  `document` has no `matches` and the handler throws without it.
## Contact

- `studio.html` links `mailto:gregor.art@pm.me` — Greg's public contact for this
  site. It is deliberately not the address on his GitHub account; keep the two
  separate.
