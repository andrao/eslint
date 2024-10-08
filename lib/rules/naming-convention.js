/**
 * @see https://typescript-eslint.io/rules/naming-convention
 */
const DEFAULT_RULES = [
    {
        // Variables and properties are snake_case
        selector: ['variable'],
        format: ['snake_case'],
    },
    {
        // Types are PascalCase
        selector: ['typeLike'],
        format: ['PascalCase'],
    },
    {
        // Functions and methods are camelCase
        selector: ['objectLiteralMethod', 'function'],
        format: ['camelCase'],
    },
    {
        // Functions defined as vars (e.g. if destructured) are camelCase
        selector: ['variable'],
        types: ['function'],
        format: ['camelCase'],
    },
    {
        // Global vars are UPPER_CASE
        selector: ['variable'],
        modifiers: ['global'],
        format: ['UPPER_CASE'],
    },
];

/**
 * @see https://typescript-eslint.io/rules/naming-convention
 */
module.exports = {
    default: [
        'error',
        ...DEFAULT_RULES,

        {
            // Global const functions are camelCase (includes destructured)
            selector: ['variable'],
            modifiers: ['global'],
            types: ['function'],
            format: ['camelCase'],
        },
        {
            // Permit certain lower-case global vars
            selector: ['variable'],
            modifiers: ['global'],
            format: ['snake_case'],
            filter: {
                regex: '^(ctx|t|require)$',
                match: true,
            },
        },
    ],

    react: [
        'error',
        ...DEFAULT_RULES,
        {
            // Global functions & const functions are PascalCase or camelCase (includes destructured)
            selector: ['variable', 'function'],
            modifiers: ['global'],
            types: ['function'],
            format: ['camelCase', 'PascalCase'],
        },
        {
            // Permit certain PascalCase global vars
            selector: ['variable'],
            modifiers: ['global'],
            format: ['PascalCase'],
            filter: {
                regex: 'Context$',
                match: true,
            },
        },
    ],

    tests: [
        'error',
        ...DEFAULT_RULES,
        {
            // Global MOCK_ functions are UPPER_CASE
            selector: ['variable', 'function'],
            modifiers: ['global'],
            types: ['function'],
            format: ['UPPER_CASE'],
            filter: { regex: '^MOCK_', match: true },
        },
    ],
};
