import { sync } from "glob";

export default {
  root: "./src",
  build: {
    rollupOptions: {
      input: sync("./src/**/*.html".replace(/\\/g, "/")),
    },
    outDir: "../dist",
    emptyOutDir: true,
  },
};
