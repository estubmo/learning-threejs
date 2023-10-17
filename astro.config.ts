import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import vue from "@astrojs/vue";
import { defineConfig } from "astro/config";
import rehypePrettyCode from "rehype-pretty-code";

const prettyCodeOptions = {
  theme: "nord",
  tokensMap: {},
};

// https://astro.build/config
export default defineConfig({
  integrations: [
    mdx(),
    tailwind(),
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) =>
            tag.startsWith("Tres") && tag !== "TresCanvas",
        },
      },
    }),
  ],
  markdown: {
    syntaxHighlight: "shiki",
    rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
  },
});
