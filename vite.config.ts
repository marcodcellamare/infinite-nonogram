import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/

export default defineConfig({
	base: './',
	plugins: [react(), tailwindcss(), tsconfigPaths()],
	server: {
		watch: {
			usePolling: true,
		},
		hmr: true,
	},
	esbuild: {
		target: 'esnext',
	},
	build: {
		target: 'esnext',
		rollupOptions: {
			output: {
				format: 'es',
			},
		},
	},
});
