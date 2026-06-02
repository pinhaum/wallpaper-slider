import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

function wallpaperListPlugin() {
  return {
    name: 'wallpaper-list',
    resolveId(id) {
      if (id === 'virtual:wallpapers') return '\0virtual:wallpapers';
    },
    load(id) {
      if (id === '\0virtual:wallpapers') {
        const dir = path.resolve('public/assets/wallpaper');
        const files = fs.readdirSync(dir)
          .filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f))
          .sort((a, b) => a.localeCompare(b));
        return `export default ${JSON.stringify(files)}`;
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), wallpaperListPlugin()],
  base: process.env.NODE_ENV === 'production' ? '/wallpaper-slider/' : '/',
});
