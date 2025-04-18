import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite';
import { visualizer } from 'rollup-plugin-visualizer';
import compression from 'vite-plugin-compression';
import * as dotenv from 'dotenv';

// https://vite.dev/config/

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), ['VITE_', 'FIREBASE_']);
	const firebaseEnv = dotenv.config({ path: '.env.firebase' }).parsed || {};

	return {
		base: './',
		plugins: [
			react(),
			tailwindcss(),
			tsconfigPaths(),
			visualizer({ open: false }),
			compression(),
		],
		define: {
			'process.env': {
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
		esbuild: {
			target: 'esnext',
		},
		build: {
			target: 'esnext',
			rollupOptions: {
				output: {
					format: 'es',
					manualChunks(id) {
						if (id.includes('node_modules')) {
							if (id.includes('firebase')) return 'firebase';
							if (id.includes('i18next')) return 'i18n';
							if (id.includes('howler')) return 'howler';
							if (id.includes('lucide-react')) return 'icons';
							if (id.includes('uuid')) return 'utils';
							return 'vendor';
						}
					},
				},
			},
			minify: 'terser',
			terserOptions: {
				compress: {
					drop_console: true,
					drop_debugger: true,
				},
			},
		},
	};
});
