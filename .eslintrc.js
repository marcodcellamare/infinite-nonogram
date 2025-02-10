module.exports = {
	parser: '@typescript-eslint/parser', // Use the TypeScript parser
	parserOptions: {
		project: './tsconfig.json', // Point to your tsconfig.json or tsconfig.paths.json if you have it
		tsconfigRootDir: __dirname, // Use the root directory for the tsconfig
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended', // Include recommended TypeScript rules
		'plugin:import/recommended', // Recommended import rules
		'plugin:import/typescript', // TypeScript-specific import rules
	],
	plugins: [
		'@typescript-eslint',
		'import',
	],
	settings: {
		'import/resolver': {
			typescript: {
				project: './tsconfig.json', // Ensure ESLint resolves path aliases from the correct tsconfig
			},
		},
	},
	rules: {
		// You can enable or disable specific rules here
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'import/no-unresolved': 'off', // Disable the unresolved import check, as we are resolving with typescript
	},
};