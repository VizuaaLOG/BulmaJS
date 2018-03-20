module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module"
    },
    "rules": {
        "indent": ["error", 4],
        "linebreak-style": ["error", "unix"],
        "quotes": ["error", "single"],
        "semi": ["error", "always"],
        "curly": ["error", "all"],
        "valid-jsdoc": 1,
        "eqeqeq": "error",
        "array-bracket-spacing": ["error", "never"],
        "brace-style": ["error", "1tbs"],
        "camelcase": 1,
        "indent": ["error", 4]
    }
};