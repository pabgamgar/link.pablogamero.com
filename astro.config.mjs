// @ts-check
import { defineConfig, sessionDrivers } from "astro/config";

import cloudflare from "@astrojs/cloudflare";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  // Images are served as-is, so no Cloudflare Images binding is needed.
  adapter: cloudflare({ imageService: "passthrough" }),
  // The site has no sessions. Without this, the adapter adds a SESSION KV binding.
  session: { driver: sessionDrivers.null() },
  vite: {
    plugins: [tailwindcss()],
  },
});
