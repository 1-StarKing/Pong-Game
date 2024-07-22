module.exports = {
  parser: "@typescript-eslint/parser",

  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:jsx-a11y/recommended",
  ],

  plugins: ["react"],

  settings: {
    react: {
      version: "detect",
    },
  },

  parserOptions: {
    ecmaVersion: 2020,

    sourceType: "module",

    ecmaFeatures: {
      jsx: true,
    },
  },

  rules: {
    "@typescript-eslint/no-unused-vars": ["error", { "varsIgnorePattern": "React|render|screen|App" }],
  },
};
