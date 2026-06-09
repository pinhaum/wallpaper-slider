# wallpaper slider

A pixel-art styled wallpaper gallery built with React and Vite. Features a full-screen image slider with auto-advance, a timer bar, keyboard navigation, and a retro terminal aesthetic.

## Stack

- **React 18** + **Vite 5**
- **Playwright** for e2e tests

## Features

- Auto-advancing slider with animated timer bar
- Keyboard navigation (← →)
- Dot indicators
- Responsive layout
- Retro pixel / scanline visual theme

## Getting started

```bash
npm install
npm start
```

## Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm start`       | Dev server               |
| `npm run build`   | Production build         |
| `npm run preview` | Preview production build |
| `npm test`        | Run Playwright tests     |

## Adding wallpapers

Drop image files (`.jpg`, `.jpeg`, `.png`, `.webp`) into `public/assets/wallpaper/`. The app picks them up automatically via the `virtual:wallpapers` Vite plugin.
