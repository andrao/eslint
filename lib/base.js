// eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-unsafe-call
const NAMING_CONVENTION = require('./rules/naming-convention');

/** @type {import("eslint").Linter.Config} */
module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: { project: true, extraFileExtensions: ['.json'] },
    env: {
        es2022: true,
        node: true,
    },

    plugins: [
        '@tanstack/query',
        '@typescript-eslint',
        'import',
        'json',
        'jsx-a11y',
        'prettier',
        'react',
        'react-hooks',
        'react-refresh',
        'unicorn',
    ],

    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/strict-type-checked',
        'plugin:@typescript-eslint/stylistic-type-checked',
        'plugin:@tanstack/eslint-plugin-query/recommended',
        'plugin:import/errors',
        'plugin:import/recommended',
        'plugin:import/typescript',
        'prettier',
    ],

    ignorePatterns: [
        'node_modules',
        'dist',
        'build',
        'out',
        '.DS_Store',
        '.astro',
        '.env',
        '.expo',
        '.jest',
        '.next',
        '.nx',
        '.turbo',
        '.vitest',
    ],

    reportUnusedDisableDirectives: true,

    settings: {
        /** @see https://github.com/import-js/eslint-import-resolver-typescript#configuration */
        'import/parsers': { '@typescript-eslint/parser': ['.ts', '.tsx'] },
        'import/resolver': {
            typescript: {
                alwaysTryTypes: true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
                project: true,
            },
        },
    },

    rules: {
        // @typescript-eslint
        '@typescript-eslint/array-type': ['error', { default: 'generic' }],
        '@typescript-eslint/consistent-type-imports': 'error',
        '@typescript-eslint/naming-convention': NAMING_CONVENTION.default,
        '@typescript-eslint/no-confusing-void-expression': [
            'error',
            { ignoreArrowShorthand: true },
        ],
        '@typescript-eslint/no-empty-function': 0,
        '@typescript-eslint/no-misused-promises': [
            'error',
            { checksVoidReturn: { attributes: false } },
        ],
        '@typescript-eslint/no-shadow': 'error',
        '@typescript-eslint/no-unused-vars': [
            'warn',
            {
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^_',
                caughtErrors: 'none',
                ignoreRestSiblings: true,
            },
        ],
        '@typescript-eslint/no-use-before-define': [
            'error',
            { functions: false, allowNamedExports: true, ignoreTypeReferences: true },
        ],
        '@typescript-eslint/prefer-promise-reject-errors': 'warn',
        '@typescript-eslint/prefer-nullish-coalescing': 'warn',
        '@typescript-eslint/restrict-template-expressions': [
            'error',
            { allowBoolean: true, allowNever: true, allowNullish: true, allowNumber: true },
        ],

        // import
        'import/no-extraneous-dependencies': [
            'error',
            {
                devDependencies: [
                    'drizzle.config.ts',
                    'next.config.mjs',
                    'postcss.config.mjs',
                    'tailwind.config.ts',
                    'vite.config.ts',
                    'vitest.config.ts',
                    'vitest.workspace.ts',
                ],
            },
        ],
        'import/no-relative-packages': 'error',

        // json
        'json/trailing-comma': 'error',
        'json/*': ['error', { allowComments: true }],

        // unicorn
        'unicorn/filename-case': 0,
        'unicorn/no-array-reduce': 0,
        'unicorn/no-nested-ternary': 0,
        'unicorn/no-null': 0,
        'unicorn/no-object-as-default-parameter': 0,
        'unicorn/no-useless-undefined': 0,
        'unicorn/prefer-export-from': 0,
        'unicorn/prefer-object-from-entries': 0,
        'unicorn/prevent-abbreviations': 0,

        // Default eslint rules
        'func-style': ['error', 'declaration'],
    },

    overrides: [
        {
            files: ['*.js', '*.jsx'],
            rules: {
                '@typescript-eslint/no-require-imports': 'off',
                'no-use-before-define': ['error', { functions: false, allowNamedExports: true }],
            },
        },
        {
            files: [
                '*.test.ts',
                '*.test.tsx',
                '**/__e2e_tests__/**',
                '**/__fixtures__/**',
                '**/__integration_tests__/**',
                '**/__mocks__/**',
                '**/__scripts__/**',
            ],
            rules: {
                'import/no-extraneous-dependencies': 0,
                '@typescript-eslint/naming-convention': NAMING_CONVENTION.tests,
            },
        },
        {
            files: ['*.tsx'],
            extends: [
                'plugin:react/recommended',
                'plugin:react-hooks/recommended',
                'plugin:jsx-a11y/recommended',
            ],
            rules: {
                'react/prop-types': 'off',
                'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
                '@typescript-eslint/naming-convention': NAMING_CONVENTION.react,
            },
            globals: { React: 'writable' },
            settings: { react: { version: 'detect' } },
            env: { browser: true },
        },
        {
            files: ['env.js', 'env.ts'],
            rules: {
                '@typescript-eslint/naming-convention': [
                    ...NAMING_CONVENTION.default,
                    {
                        // Enforce that env vars are uppercase
                        selector: ['memberLike'],
                        format: ['UPPER_CASE'],
                        filter: {
                            regex: '^(server|client|shared|runtimeEnv|skipValidation)$',
                            match: false,
                        },
                    },
                    {
                        // Permit global `const env`
                        selector: ['variable'],
                        modifiers: ['global'],
                        format: ['snake_case'],
                        filter: 'env',
                    },
                ],
            },
        },
    ],
};
