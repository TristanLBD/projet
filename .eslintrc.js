module.exports = {
    env: {
        node: true,
        es2021: true,
        jest: true,
    },
    extends: ["eslint:recommended"],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: "module",
    },
    rules: {
        indent: ["error", 2],
        "linebreak-style": ["error", "windows"],
        quotes: ["error", "single"],
        semi: ["error", "always"],
        "no-unused-vars": ["warn"],
        "no-console": ["warn", { allow: ["log", "warn", "error"] }],
    },
};
