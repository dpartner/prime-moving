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
  define: {
    // By default, Vite doesn't include shims for NodeJS/
    // necessary for segment analytics lib to work
    global: {},
  },
};
