/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['plugin:astro/recommended', "eslint-config-prettier"],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    sourceType: 'module',
    ecmaVersion: 'latest'
  },
  overrides: [
    {
      files: ['*.astro'],
      parser: 'astro-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro'],
      },
      rules: {
        "no-unused-vars": "error",
        "quotes": ["error", "single"],
		    "semi": ["error", "never"],
        "space-before-function-paren": ["error", "never"],
        "@typescript-eslint/no-unused-vars": "off",
        "unused-imports/no-unused-imports": "error",
        "object-curly-newline": [
          "warn",
          {
            consistent: true,
            multiline: true,
          },
        ],
        "object-curly-spacing": ["warn", "always"],
        "array-element-newline": ["warn", "consistent"],
        "array-bracket-newline": ["warn", "consistent"],
      },
    },
    {
			// Define the configuration for `<script>` tag.
			// Script in `<script>` is assigned a virtual file name with the `.js` extension.
			files: ["**/*.astro/*.js", "*.astro/*.js"],
			parser: "@typescript-eslint/parser",
		},
  ]
}