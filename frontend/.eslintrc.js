module.exports = {
  extends: ["eslint:recommended"],
  plugins: ["react"],
  rules: {
    // react plugin - options
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
  },
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 8, // optional, recommended 6+
  },
  globals: {
    tw: true,
    paypal: true,
  },
  env: {
    browser: true
  }
}