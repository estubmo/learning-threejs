/** @type {import("prettier").Config} */
module.exports = {
  ...require("prettier-config-standard"),
  pluginSearchDirs: [__dirname],
  tailwindConfig: "./tailwind.config.mjs",
  plugins: [
    require.resolve("prettier-plugin-astro"),
    require.resolve("prettier-plugin-tailwindcss"),
    require.resolve("@ianvs/prettier-plugin-sort-imports"),
  ],
  singleQuote: false,
  jsxSingleQuote: false,
  semi: true,
  trailingComma: "all",
  tabWidth: 2,
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
};
