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
    "plugin:react/recommended",
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
    // Custom rules
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
    "no-unused-vars": ["error", { varsIgnorePattern: "^h$" }],
  },
};
