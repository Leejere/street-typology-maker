module.exports = {
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": ["eslint:recommended", "plugin:react/recommended", "react-app"],
  "overrides": [],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "plugins": ["react"],
  "rules": {
    "camelcase": ["error"],
    "comma-spacing": ["error", { "before": false, "after": true }],
    "no-trailing-spaces": ["error"],
    "no-use-before-define": ["error", { "allowNamedExports": true }],
    "no-var": ["error"],
    "object-curly-spacing": ["error", "always"],
    "semi": ["error", "always", { "omitLastInOneLineBlock": true }],
    "no-unused-vars": "off"
  }
};
