import { defineConfig } from "vite";

export default defineConfig({
  root: "src",
  base: "/gl-fdm-3d/",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
  },
});