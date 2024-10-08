/** @type {import('eslint').Linter.Config} */
module.exports = {
    extends: ['plugin:@next/next/recommended'],
    rules: {
        '@next/next/no-html-link-for-pages': 'off',
        '@typescript-eslint/require-await': 'off',
        'react-refresh/only-export-components': 'off',
    },
};
