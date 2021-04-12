module.exports = {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    ...require('@betahuhn/config').eslint,
    root: true,
    parser: "@typescript-eslint/parser",
    plugins: [
        "@typescript-eslint"
    ],
    extends: [
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:vue/recommended"
    ],
    parserOptions: {
        "parser": "babel-eslint"
    },
    rules: {
        "@typescript-eslint/no-explicit-any": 0,
        "@typescript-eslint/explicit-module-boundary-types": 0,
        "typescript-eslint/no-var-requires": 0
    }
}