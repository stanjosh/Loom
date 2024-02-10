import { defineConfig } from 'astro/config';
import node from "@astrojs/node";
import auth from "auth-astro";

// https://astro.build/config
export default defineConfig({
  output: "hybrid",
        adapter: node({
            mode: "standalone"
        }),
        server: {
            host: "0.0.0.0"
        },
  adapter: node({
    mode: "standalone"
  }),
  integrations: [ auth()]
});