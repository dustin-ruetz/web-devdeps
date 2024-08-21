import typescripteslint from "typescript-eslint";

/**
 * @description "**`typescript-eslint` enables ESLint to run on TypeScript code.** It brings in the best of
 *              both tools to help you write the best JavaScript or TypeScript code you possibly can."
 * @link https://typescript-eslint.io/getting-started/
 */
export const typescripteslintPlugin = typescripteslint.config(
	// Excerpt from https://typescript-eslint.io/getting-started/#additional-configs:
	// > `strict` - A superset of `recommended` that includes more opinionated rules which may also catch bugs.
	// > `stylistic` - Additional rules that enforce consistent styling without significantly catching bugs or changing logic.
	...typescripteslint.configs.strict,
	...typescripteslint.configs.stylistic,
	{
		name: "typescript-eslint/user-defined-config",
		rules: {
			// https://typescript-eslint.io/rules/#extension-rules
			// Excerpt from https://typescript-eslint.io/rules/no-unused-vars/#how-to-use:
			// > Note: You must disable the base rule as it can report incorrect errors.
			"no-unused-vars": "off",
			// Excerpt from https://typescript-eslint.io/rules/no-unused-vars/#benefits-over-typescript:
			// > If you would like to emulate the TypeScript style of exempting names starting with `_`,
			// > you can use this configuration (this includes errors as well):
			"@typescript-eslint/no-unused-vars": [
				"error",
				{
					args: "all",
					argsIgnorePattern: "^_",
					caughtErrors: "all",
					caughtErrorsIgnorePattern: "^_",
					destructuredArrayIgnorePattern: "^_",
					ignoreRestSiblings: true,
					varsIgnorePattern: "^_",
				},
			],
		},
	},
);
