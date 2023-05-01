import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import svelte from "@astrojs/svelte";
import deno from "@astrojs/deno";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind(), svelte()],
  output: "server",
  adapter: deno()
});