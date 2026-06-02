import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";
import path from "path";

function wallpaperListPlugin() {
  return {
    name: "wallpaper-list",
    resolveId(id) {
      if (id === "virtual:wallpapers") return "\0virtual:wallpapers";
    },
    load(id) {
      if (id === "\0virtual:wallpapers") {
        const dir = path.resolve("public/assets/wallpaper");
        if (!fs.existsSync(dir)) {
          console.warn("[wallpaper-list] pasta não encontrada:", dir);
          return "export default []";
        }
        const files = fs
          .readdirSync(dir)
          .filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f))
          .sort((a, b) => a.localeCompare(b));
        return `export default ${JSON.stringify(files)}`;
      }
    },
    configureServer(server) {
      const dir = path.resolve("public/assets/wallpaper");
      if (!fs.existsSync(dir)) return;
      server.watcher.add(dir);
      ["add", "unlink", "change"].forEach((event) => {
        server.watcher.on(event, (file) => {
          if (file.startsWith(dir)) {
            const mod = server.moduleGraph.getModuleById(
              "\0virtual:wallpapers",
            );
            if (mod) server.moduleGraph.invalidateModule(mod);
            server.ws.send({ type: "full-reload" });
          }
        });
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), wallpaperListPlugin()],
  base: process.env.NODE_ENV === "production" ? "/wallpaper-slider/" : "/",
});
