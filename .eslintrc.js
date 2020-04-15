module.exports = {
    "env": {
        "commonjs": true,
        "es6": true,
        "mocha": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "rules": {
        "indent": [
            "error",
            4
        ]
    },
    "overrides": [
        {
          "files": ["*.js"],
          "rules": {
            "no-unused-vars": "off"
          }
        }
      ]
};