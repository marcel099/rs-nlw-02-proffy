module.exports = {
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "plugin:react/recommended",
    "airbnb",
    "plugin:@typescript-eslint/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": [
    "react",
    "@typescript-eslint",
    "eslint-plugin-import-helpers"
  ],
  "rules": {
    "camelcase": "off",
    "import/no-unresolved": "error",
    "linebreak-style": [
      "error",
      process.env.NODE_ENV === 'production' ? "unix" : "windows"
    ],
    "import/prefer-default-export": "off",
    "dot-notation": "off",
    "import/no-extraneous-dependencies": "off",
    "operator-linebreak": [
      "error",
      "after",
      {
        "overrides": {
          "?": "before",
          ":": "before",
          "<": "before",
          ">": "before",
        },
      },
    ],
    "no-nested-ternary": "off",
    "comma-dangle": ["error", {
      "arrays": "always-multiline",
      "objects": "always-multiline",
      "imports": "always-multiline",
      "exports": "always-multiline",
      "functions": "never"
    }],
    "react/require-default-props": "off",
    "react/jsx-filename-extension": ["error", { "extensions": [".tsx"] }],
    "react/jsx-props-no-spreading": "off",
    "react/jsx-no-bind": "off",
    "react/jsx-one-expression-per-line": ["off"],
    "react/no-unused-prop-types": "warn",
    "react/react-in-jsx-scope": "off",
    "import-helpers/order-imports": [
      "warn",
      {
        "newlinesBetween": "always",
        "groups": [
          "module",
          [
            "/^@assets/"
          ],
          [
            "/^@configs/",
            "/^@contexts/",
            "/^@dtos/",
            "/^@routes/",
            "/^@services/",
            "/^@utils/"
          ],
          [
            "/^@pages/",
            "/^@components/"
          ],
          [
            "parent",
            "sibling",
            "index"
          ]
        ],
        "alphabetize": { "order": "asc", "ignoreCase": true }
      }
    ],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        "ts": "never",
        "tsx": "never"
      }
   ],
    "@typescript-eslint/quotes": [
      "error",
      "single",
      { "allowTemplateLiterals": true }
    ],
    "max-len": [
      "error", {
        "code": 80,
        "ignoreStrings": true,
        "ignoreTemplateLiterals": true,
      },
    ],
  },
  "settings": {
    "import/resolver": {
      "typescript": {}
    }
  }
}
