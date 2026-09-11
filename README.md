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

## Design files

`Main.dc.html` and `charan-naik-portfolio.html` contain the current design preview. `DirectionA.dc.html`, `DirectionB.dc.html`, and `DirectionC.dc.html` preserve the initial explorations.

The generated background and its brief are in `assets/`.
