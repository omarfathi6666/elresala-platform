const { FlatCompat } = require("@eslint/eslintrc");

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

module.exports = [
  ...compat.extends("next", "next/core-web-vitals"),
  {
    rules: {
      "react/no-unescaped-entities": "warn",
    },
  },
];
