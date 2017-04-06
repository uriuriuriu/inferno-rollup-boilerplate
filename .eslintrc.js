module.exports = {
  "extends": ["eslint:recommended", "plugin:inferno/recommended"],
  "plugins": [
    "import",
    "inferno"
  ],
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true,
      "experimentalObjectRestSpread": true
    }
  },
  "globals": {
    "$": true,
    "ga": true,
    "google": true,
    "FB": true,
    "Intercom": true,
    "intercomSettings": true,
    "Raven": true,
    "store": true,
    "NODE_ENV": true
  },
  "rules": {
    "comma-spacing": 2,
    "eqeqeq": [2, "always"],
    "indent": [2, 2],
    "jsx-quotes": [2, "prefer-single"],
    "keyword-spacing": ["error", { "before": true, "after": true }],
    "no-console": 0,
    "no-irregular-whitespace": 2,
    "quotes": [2, "single"],
    "padded-blocks": 2,
    "semi": [2, "never"]
  }
}