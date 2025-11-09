import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
    },
    rules: {
      indent: ["error", 2],
      "no-unused-vars": "warn",
      "no-undef": "error"
    }
  }
];
