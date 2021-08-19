module.exports = {
    parser: "@typescript-eslint/parser",
    extends: ["airbnb-typescript/base", "plugin:prettier/recommended"],
    parserOptions: {
        project: './tsconfig.json',
    }
};
