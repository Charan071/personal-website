# Charan Naik — Personal Website

A responsive portfolio with a warm architectural background, selected projects, and contact links.

## Preview locally

```sh
python3 -m http.server 4173
```

Open http://localhost:4173. The website entry point is `index.html`; no build step or dependencies are required.

## Motion

The background uses a slow animated zoom, ambient light, and pointer parallax. A pause control and reduced-motion support are included. The paper plane is a separate transparent image that follows a curved path as you scroll through the hero, banking and fading into the distance. Scrolling upward reverses the flight. Pause freezes the plane as well as ambient motion; reduced-motion preferences keep it static.

After editing `index.html`, run `python3 scripts/sync-design.py` to update the self-contained design previews.

## Project structure

```text
index.html                  Website markup and content
assets/
  css/styles.css            Layout, responsive styles, and animations
  js/main.js                Scroll flight and motion controls
  images/                   Images used by the website
  README.md                 Image provenance and generation briefs
design/
  Main.dc.html              Self-contained current design preview
  charan-naik-portfolio.html Full design canvas
  Direction*.dc.html        Original design explorations
  canvas.json               Canvas layout
  reference/                Original background before plane extraction
scripts/
  sync-design.py            Rebuild the self-contained design previews
reference/                  Local résumé and source notes (gitignored)
skill-observations/         Local agent workflow notes (gitignored)
```

Edit `index.html`, `assets/css/styles.css`, or `assets/js/main.js` for site changes. Then run `python3 scripts/sync-design.py` to keep both design previews up to date.

Only `index.html` and `assets/` are needed to serve the website. The design archive and local notes are not website dependencies.
