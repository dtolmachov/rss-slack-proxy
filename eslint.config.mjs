import ParserTypescriptEslint from "@typescript-eslint/parser"

export default {
  files: ["./src/**"],
  exclude: ["node_modules/**"],
  languageOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
    parser: ParserTypescriptEslint,
    parserOptions: {
      project: ["./tsconfig.json"],
      tsconfigRootDir: new URL(".", import.meta.url).pathname,
    },
  },
  rules: {
    quotes: ["warn", "double"],
    "@typescript-eslint/explicit-module-boundary-types": "warn",
  },
};