import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-static';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

const commandArgs = process.argv.reduce((arg, val) => {
	const splitVal = val.split("=")
	arg[splitVal[0]] = splitVal[1]
	return arg
}, {})

// Define paths
const paths = commandArgs['paths']
? {
	paths: {
		base: commandArgs['paths'],
		assets: commandArgs['paths']
	}
}
: {}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			postcss: {
				plugins: [
				 tailwindcss,
				 autoprefixer
				],
			}
		}),
	],

	kit: {
		appDir: 'app',
		...paths,
		adapter: adapter({
			// default options are shown
			pages: 'build',
			assets: 'build',
			fallback: null
		})
	}
};

export default config;
