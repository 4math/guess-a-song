import { fileURLToPath, URL } from "node:url";

import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

const config = dotenv.config({ path: "../.env" });
dotenvExpand.expand(config);

// https://vitejs.dev/config/
export default ({ mode }) => {
  // Load app-level env vars to node-level env vars.
  // process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [vue()],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  });
};
