import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { sveltePreprocess } from 'svelte-preprocess';

const dev = "production" === "development";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
        adapter: adapter({
            pages: "docs",
            assets: "docs"
        }),
        paths: {
            // change below to your repo name
			base: "/subphenonet"
        },
        // hydrate the <div id="svelte"> element in src/app.html
        //target: "#svelte"
    },
	preprocess: sveltePreprocess({ })
	//preprocess: [vitePreprocess()]
};

export default config;
