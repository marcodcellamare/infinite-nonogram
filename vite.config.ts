import { ConfigEnv, defineConfig, loadEnv } from 'vite';
import { aliases } from './vite.alias.ts';

import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite';
import { visualizer } from 'rollup-plugin-visualizer';
import { VitePWA } from 'vite-plugin-pwa';
import * as dotenv from 'dotenv';

// https://vite.dev/config/

export default defineConfig(({ mode }: ConfigEnv) => {
	const env = loadEnv(mode, process.cwd(), ['VITE_']);
	const firebaseEnv = dotenv.config({ path: '.env.firebase' }).parsed || {};

	return {
		base: '/infinite-nonogram/',
		plugins: [
			react(),
			tailwindcss(),
			tsconfigPaths(),
			visualizer({ open: false }),
			VitePWA({
				outDir: 'dist',
				devOptions: {
					enabled: false,
				},
				registerType: 'autoUpdate',
				injectRegister: 'script-defer',
				workbox: {
					globPatterns:
						mode === 'production'
							? ['**/*.{js,css,html,svg,woff2,woff,ttf}']
							: [],
					maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
					runtimeCaching: [
						{
							urlPattern: ({ request }) =>
								request.mode === 'navigate',
							handler: 'NetworkFirst',
							options: {
								cacheName: 'html-cache',
								networkTimeoutSeconds: 3,
								expiration: {
									maxEntries: 20,
									maxAgeSeconds: 60 * 60 * 24,
								},
							},
						},
						{
							urlPattern: ({ request }) =>
								[
									'script',
									'style',
									'font',
									'image',
									'sounds',
								].includes(request.destination),
							handler: 'CacheFirst',
							options: {
								cacheName: 'static-assets',
								expiration: {
									maxEntries: 200,
									maxAgeSeconds: 60 * 60 * 24 * 365,
								},
							},
						},
					],
				},
			}),
		],
		define: {
			'process.env': {
				...env,
				...firebaseEnv,
			},
			'import.meta.env': {
				...env,
				...firebaseEnv,
			},
		},
		server: {
			watch: {
				usePolling: true,
			},
			hmr: true,
		},
		resolve: {
			alias: aliases,
		},
		esbuild: {
			target: 'esnext',
		},
		build: {
			target: 'esnext',
			emptyOutDir: true,
			minify: 'terser',
			terserOptions: {
				compress: {
					drop_console: true,
					drop_debugger: true,
				},
				format: {
					comments: false,
				},
			},
			rollupOptions: {
				output: {
					format: 'es',
					manualChunks(id) {
						if (id.includes('node_modules')) {
							if (id.includes('react-dom-server-legacy'))
								return 'server-legacy';
							if (id.includes('react-dom-server'))
								return 'server';
							if (id.includes('react-dom-client'))
								return 'client';

							if (id.includes('react-router')) return 'router';

							if (id.includes('firebase/firestore'))
								return 'firestore';
							if (id.includes('firebase')) return 'firebase';

							if (id.includes('i18next')) return 'localization';
							if (id.includes('howler')) return 'audio';
							if (id.includes('lucide-react')) return 'icons';

							if (id.includes('uuid')) return 'utils';
							if (id.includes('culori')) return 'utils';
							if (id.includes('seedrandom')) return 'utils';

							return 'vendor';
						} else {
							if (id.includes('assets')) return 'assets';
						}
					},
				},
			},
			commonjsOptions: {
				transformMixedEsModules: true,
			},
		},
	};
});
