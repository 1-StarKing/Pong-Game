module.exports = {
  parser: "@typescript-eslint/parser",

  extends: [
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:jsx-a11y/recommended",
    "eslint:recommended",
  ],

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
    // Custom rules
  },
};
