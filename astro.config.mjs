import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";
import deno from "@astrojs/deno";
import astroI18next from "astro-i18next";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind(), svelte(), astroI18next()],
  output: "server",
  adapter: deno()
});