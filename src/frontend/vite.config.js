import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default () => {
  return defineConfig({
    envDir: "./../../",
    plugins: [vue()],
    server: {
      port: 80, // better to have it in .env, but quite hard to configure
      watch: {
        usePolling: true,
      },
    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  });
};
