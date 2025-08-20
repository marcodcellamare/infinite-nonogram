import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite';
import { visualizer } from 'rollup-plugin-visualizer';
import * as dotenv from 'dotenv';

// https://vite.dev/config/

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), ['VITE_', 'FIREBASE_']);
	const firebaseEnv = dotenv.config({ path: '.env.firebase' }).parsed || {};

	return {
		base: '/infinite-nonogram/',
		plugins: [
			react(),
			tailwindcss(),
			tsconfigPaths(),
			visualizer({ open: false }),
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
							if (id.includes('react-dom')) return 'react-dom';

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
