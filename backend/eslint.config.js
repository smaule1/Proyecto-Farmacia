import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: {...globals.node,},
    },
    plugins: {
      js,
    },
    rules: {
      "max-lines-per-function": ["warn", { max: 25, skipBlankLines: true, skipComments: true }],
    },
  },
]);



