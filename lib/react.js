/** @type {import('eslint').Linter.Config} */
module.exports = {
    extends: [
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:jsx-a11y/recommended',
    ],
    rules: {
        'react/prop-types': 'off',
        'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
    globals: {
        React: 'writable',
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
    env: {
        browser: true,
    },
};
