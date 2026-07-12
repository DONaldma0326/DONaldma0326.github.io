// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: process.env.SITE_URL ?? 'https://donaldma0326.github.io',
	base: process.env.BASE_PATH ?? '/',
});
