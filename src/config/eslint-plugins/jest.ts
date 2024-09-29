import jest from "eslint-plugin-jest";
import typescripteslint from "typescript-eslint";

export const testFilesGlobPattern = "**/*.test.+(js|jsx|ts|tsx)";

const configs = {
	recommended: jest.configs["flat/recommended"],
	style: jest.configs["flat/style"],
} as const;

/**
 * @description Jest-specific linting rules for ESLint.
 * @returns Configuration for the Jest ESLint plugin.
 * @see {@link https://github.com/jest-community/eslint-plugin-jest}
 */
export const jestPlugin = typescripteslint.config({
	name: "jest/user-defined-config",
	files: [testFilesGlobPattern],
	...configs.recommended,
	...configs.style,
	rules: {
		...configs.recommended.rules,
		...configs.style.rules,
		"jest/consistent-test-it": "error",
		"jest/no-conditional-in-test": "error",
		"jest/no-confusing-set-timeout": "error",
		"jest/no-duplicate-hooks": "error",
		"jest/no-test-return-statement": "error",
		"jest/prefer-called-with": "error",
		"jest/prefer-comparison-matcher": "error",
		"jest/prefer-each": "error",
		"jest/prefer-equality-matcher": "error",
		"jest/prefer-expect-assertions": [
			"error",
			{
				onlyFunctionsWithAsyncKeyword: true,
				onlyFunctionsWithExpectInCallback: true,
				onlyFunctionsWithExpectInLoop: true,
			},
		],
		"jest/prefer-expect-resolves": "error",
		"jest/prefer-hooks-in-order": "error",
		"jest/prefer-hooks-on-top": "error",
		"jest/prefer-jest-mocked": "error",
		"jest/prefer-mock-promise-shorthand": "error",
		"jest/prefer-spy-on": "error",
		"jest/prefer-strict-equal": "error",
		"jest/prefer-todo": "error",
		"jest/require-hook": "error",
		"jest/require-to-throw-message": "error",
		// Refer to the `typescript-eslint.ts` ESLint plugin configuration file for more details about the `unbound-method` rule.
		//
		// Excerpt from https://github.com/jest-community/eslint-plugin-jest/blob/main/docs/rules/unbound-method.md:
		// > This rule extends the base `@typescript-eslint/unbound-method` rule, meaning you must depend on
		// > `typescript-eslint` for it to work. It adds support for understanding when it's OK to pass
		// > an unbound method to `expect` calls.
		// >
		// > Note that while this rule requires type information to work, it will fail silently when not available
		// > allowing you to safely enable it on projects that are not using TypeScript.
		// >
		// > This rule should be applied to your test files in place of the original rule,
		// > which should be applied to the rest of your codebase.
		"jest/unbound-method": "error",
	},
});
