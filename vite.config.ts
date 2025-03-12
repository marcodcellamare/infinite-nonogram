import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite';
import * as dotenv from 'dotenv';

// https://vite.dev/config/

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), 'VITE_');
	const firebaseEnv = dotenv.config({ path: '.env.firebase' }).parsed || {};

	return {
		base: './',
		plugins: [react(), tailwindcss(), tsconfigPaths()],
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
				},
			},
		},
	};
});
