// .eslintrc.js
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:nuxt/recommended",
    "plugin:vue/vue3-recommended",
    "prettier",
  ],
  parserOptions: {
    ecmaVersion: "latest",
    parser: "@typescript-eslint/parser",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "vitest"],
  overrides: [
    {
      files: ["layouts/*.vue", "pages/**/*.vue"],
      rules: { "vue/multi-word-component-names": "off" },
    },
  ],
  rules: {
    "no-undef": "off",
  },
};
