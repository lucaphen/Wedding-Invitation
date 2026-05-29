# Convite de Casamento — Rute & Bernardo

An elegant, interactive wedding-invitation single-page site. A beige linen
envelope flips to reveal an old-British-style wax seal; clicking the seal opens
the envelope and slides out a reversible burgundy invitation card, with a map.

Built with **Next.js (App Router) + TypeScript + Tailwind CSS + Framer Motion**
and exported as a **fully static site** (hostable anywhere).

## The experience

1. **Front** — the envelope shows the `R & B` monogram. _Toque para virar._
2. **Flip** — the envelope turns to its flap side with a wax seal. _Clique para abrir._
3. **Open** — clicking the seal lifts the flap and the burgundy card rises out.
4. **Reversible card** — flip between the invitation and _Mais detalhes_ (RSVP).
5. **Map** — _Ver mapa_ opens the route map plus a Google Maps link.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build a static, deployable package

```bash
npm run build    # outputs a static site to ./out
npm run serve    # preview the exported build locally (npx serve out)
```

The contents of `out/` are plain static files — deploy them to GitHub Pages,
Netlify, Vercel, Cloudflare Pages, S3, or any static host.

## Editing the invitation

- **All text and details** (names, date, venues, RSVP numbers, Google Maps
  link, button labels) live in [`lib/content.ts`](lib/content.ts). Edit there —
  no need to touch the components.
- **Colours** are defined as Tailwind tokens in
  [`tailwind.config.ts`](tailwind.config.ts) (`burgundy` `#9E0000`, `blush`
  `#FFEBFF`, `linen`, `wax`).
- **The route map** currently uses a placeholder at
  `public/map-placeholder.svg`. Drop the real stylized map image into `public/`
  and point `wedding.map.image` in `lib/content.ts` at it.

## Structure

```
app/            layout (fonts/metadata), globals.css, page.tsx (orchestration)
components/     Envelope, WaxSeal, Letter, MapModal
lib/content.ts  all copy + wedding data (edit here)
public/         map placeholder + assets
```
