module.exports = {
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint"],
    extends: ["eslint:recommended", "@typescript-eslint/recommended"],
    env: {
        node: true,
        es2021: true,
        jest: true,
    },
    parserOptions: {
        ecmaVersion: 12,
        sourceType: "module",
    },
    rules: {
        indent: ["error", 4],
        "linebreak-style": ["error", "windows"],
        quotes: ["error", "double"],
        semi: ["error", "always"],
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": ["warn"],
        "no-console": ["warn", { allow: ["log", "warn", "error"] }],
    },
};
