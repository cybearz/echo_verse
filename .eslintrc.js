module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: [
		"plugin:vue/vue3-essential",
		"eslint:recommended",
		"@vue/typescript/recommended",
		"standard",
	],
	parserOptions: {
		parser: "@typescript-eslint/parser",
		ecmaVersion: "2021",
	},
	plugins: [
		"@typescript-eslint",
		// https://eslint.vuejs.org/user-guide/#why-doesn-t-it-work-on-vue-files
		// required to lint *.vue files
		"vue",

	],
	rules: {
		"no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
		"no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
		"vue/no-deprecated-slot-attribute": "off",
		"vue/script-setup-uses-vars": "error",
		"@typescript-eslint/no-explicit-any": "off",
		"@typescript-eslint/explicit-function-return-type": "off",
		"@typescript-eslint/no-var-requires": "off",
		"template-curly-spacing": [ "warn", "never" ],
		"array-bracket-spacing": [
			"warn", "always", {
				"singleValue": false,
			},
		],
		"indent": [ "warn", "tab" ],
		"no-tabs": 0,
		"quotes": [ "warn", "double", "avoid-escape" ],
		"quote-props": [ "warn", "consistent" ],
		"space-before-function-paren": [
			"warn", {
				"anonymous": "never",
				"named": "never",
				"asyncArrow": "ignore",
			},
		],
		"dot-notation": "warn",
		"generator-star-spacing": "off",
		"arrow-parens": "off",
		"one-var": "off",
		"no-void": "off",
		"multiline-ternary": "off",
		"import/first": "off",
		"import/named": "error",
		"import/namespace": "error",
		"import/default": "error",
		"import/export": "error",
		"import/extensions": "off",
		"import/no-unresolved": "off",
		"import/no-extraneous-dependencies": "off",
		"prefer-promise-reject-errors": "off",
		"no-unused-vars": "warn",
		"comma-dangle": [ "warn", "always-multiline" ],
	},
}
