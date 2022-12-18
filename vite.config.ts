import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
	build: {
		rollupOptions: {
			input: {
				main: resolve(__dirname, 'index.html'),
				penguin: resolve(__dirname, 'static/scenes/penguindash/index.html'),
			},
		},
	},
});
