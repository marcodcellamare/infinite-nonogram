import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import tseslint from 'typescript-eslint';

export default tseslint.config(
	{ ignores: ['dist'] },
	{
		extends: [js.configs.recommended, ...tseslint.configs.recommended],
		files: ['**/*.{ts,tsx}'],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
		},
		plugins: {
			react,
			'react-hooks': reactHooks,
			'react-refresh': reactRefresh,
			'jsx-a11y': jsxA11y,
		},
		rules: {
			...reactHooks.configs.recommended.rules,
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/explicit-module-boundary-types': 'off',
			'import/no-unresolved': 'off',
			'react-refresh/only-export-components': [
				'warn',
				{ allowConstantExport: true },
			],
			'@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
		},
	},
);