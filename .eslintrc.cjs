/* eslint-env node */
/** @type {import("eslint").Linter.Config} */

module.exports = {
  parser: "@typescript-eslint/parser",
  root: true,
  plugins: ["@typescript-eslint", "astro"],
  extends: [
    "eslint:recommended",
    "plugin:astro/recommended",
    "plugin:astro/jsx-a11y-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:jsx-a11y/recommended",
    "plugin:tailwindcss/recommended",
    "prettier",
  ],
  parserOptions: {
    sourceType: "module",
    ecmaVersion: "latest",
    project: ["./tsconfig.json"],
  },
  rules: {
    "tailwindcss/classnames-order": "off", // Enforced by Prettier
    "tailwindcss/no-custom-classname": "off", // Avoid distractions while typing
    "@typescript-eslint/no-unused-vars": "warn",
  },
  overrides: [
    {
      files: ["*.astro"],
      parser: "astro-eslint-parser",
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".astro"],
      },
      rules: {
        "import/no-unresolved": "off",
        "@typescript-eslint/no-unsafe-assignment": "off",
      },
    },
  ],
};
