import typescripteslint, {type ConfigArray} from "typescript-eslint";

import {mockAndTestFilesGlobPattern} from "../eslint-shared/mockAndTestFilesGlobPattern.ts";
import {
	noMagicNumbersRuleOptions,
	noShadowRuleOptions,
} from "../eslint-shared/ruleOptions.ts";

/**
 * @description "**`typescript-eslint` enables ESLint to run on TypeScript code.** It brings in the best of
 *              both tools to help you write the best JavaScript or TypeScript code you possibly can."
 * @returns Configuration for the TypeScript ESLint plugin.
 * @see {@link https://typescript-eslint.io/getting-started/}
 */
export const typescripteslintPlugin: ConfigArray = typescripteslint.config(
	// Excerpt from https://typescript-eslint.io/getting-started/#additional-configs:
	// > `strict`    - A superset of `recommended` that includes more opinionated rules which may also catch bugs.
	// > `stylistic` - Additional rules that enforce consistent styling without significantly catching bugs or changing logic.
	...typescripteslint.configs.strictTypeChecked,
	...typescripteslint.configs.stylisticTypeChecked,
	{
		name: "typescript-eslint/user-defined-config",
		// https://typescript-eslint.io/getting-started/typed-linting/
		languageOptions: {
			parserOptions: {
				// Excerpt from https://typescript-eslint.io/packages/parser/#projectservice:
				// > Specifies using TypeScript APIs to generate type information for rules. It will automatically detect
				// > the TSConfig for each file (like `project: true`), and will also allow type information to be
				// > computed for JavaScript files without the `allowJs` compiler option (unlike `project: true`).
				projectService: true,
			},
		},
		// https://typescript-eslint.io/rules/
		// Excerpt from `typescript-eslint` documentation explaining when to turn off base ESLint rules:
		// > Note: You must disable the base rule as it can report incorrect errors.
		rules: {
			/**
			 * @description Prefer the `type` keyword over `interface` because it displays the full type information
			 *              in the IntelliSense hint when the mouse cursor is hovered over the type definition.
			 * @see {@link https://github.com/microsoft/TypeScript/issues/38040}
			 * @see {@link https://github.com/microsoft/TypeScript/issues/59029}
			 * @see {@link https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces}
			 * @todo Consider removing this rule from the config if this issue is addressed in a future TypeScript release.
			 */
			"@typescript-eslint/consistent-type-definitions": ["error", "type"],
			"@typescript-eslint/consistent-type-exports": [
				"error",
				{fixMixedExportsWithInlineTypeSpecifier: true},
			],
			"@typescript-eslint/consistent-type-imports": "error",

			// #region dot-notation
			// Excerpt from https://typescript-eslint.io/rules/dot-notation/:
			// > Extending `"plugin:@typescript-eslint/stylistic-type-checked"` in an ESLint configuration enables this rule.
			// > This rule extends the base `eslint/dot-notation` rule. It adds:
			// > - Support for optionally ignoring computed `private` and/or `protected` member access.
			// > - Compatibility with TypeScript's `noPropertyAccessFromIndexSignature` option.
			// #endregion dot-notation

			"@typescript-eslint/explicit-member-accessibility": "error",
			"@typescript-eslint/no-import-type-side-effects": "error",
			// Excerpt from https://typescript-eslint.io/rules/no-magic-numbers/:
			// > This rule extends the base `no-magic-numbers` rule from ESLint core. It adds support for:
			// > - numeric literal types (`type T = 1`),
			// > - `enum` members (`enum Foo { bar = 1 }`),
			// > - `readonly` class properties (`class Foo { readonly bar = 1 }`).
			"no-magic-numbers": "off",
			"@typescript-eslint/no-magic-numbers": [
				"error",
				noMagicNumbersRuleOptions,
			],
			// Excerpt from https://typescript-eslint.io/rules/no-shadow/:
			// > This rule extends the base `no-shadow` rule from ESLint core. It adds support for
			// > TypeScript's `this` parameters and global augmentation, and adds options for
			// > TypeScript features.
			"no-shadow": "off",
			"@typescript-eslint/no-shadow": [
				"error",
				{
					...noShadowRuleOptions,
					hoist: "functions-and-types",
					// ignoreTypeValueShadow: false,
					ignoreFunctionTypeParameterNameValueShadow: false,
				},
			],
			"@typescript-eslint/no-unsafe-type-assertion": "error",
			// Excerpt from https://typescript-eslint.io/rules/no-unused-vars/#benefits-over-typescript:
			// > If you would like to emulate the TypeScript style of exempting names starting with `_`,
			// > you can use this configuration (this includes errors as well):
			"no-unused-vars": "off",
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
			// Excerpt from https://typescript-eslint.io/rules/no-use-before-define/:
			// > This rule extends the base `no-use-before-define rule` from ESLint core.
			// > It adds support for `type`, `interface` and `enum` declarations.
			"no-use-before-define": "off",
			"@typescript-eslint/no-use-before-define": "error",
			"@typescript-eslint/no-useless-empty-export": "error",
			"@typescript-eslint/promise-function-async": "error",
			"@typescript-eslint/require-array-sort-compare": "error",
		},
	},
	{
		name: "typescript-eslint/user-defined-test-overrides",
		files: [mockAndTestFilesGlobPattern],
		rules: {
			// It's useful to reference arbitrary numbers directly in unit test
			// files, so disable the `no-magic-numbers` rule for tests.
			"@typescript-eslint/no-magic-numbers": "off",
			// Refer to the `jest.ts` ESLint plugin configuration file for more details about the `unbound-method` rule.
			//
			// Excerpt from https://typescript-eslint.io/rules/unbound-method/:
			// > Enforce unbound methods are called with their expected scope.
			// >
			// > Class method functions don't preserve the class scope when passed as standalone variables ("unbound").
			// > If your function does not access `this`, you can annotate it with `this: void`, or consider using
			// > an arrow function instead. Otherwise, passing class methods around as values can remove type safety
			// > by failing to capture `this`.
			// >
			// > This rule reports when a class method is referenced in an unbound manner.
			// >
			// > ℹ️ Tip: If you're working with `jest`, you can use `eslint-plugin-jest`'s version of this rule
			// > to lint your test files, which knows when it's OK to pass an unbound method to `expect` calls.
			"@typescript-eslint/unbound-method": "off",
		},
	},
);
