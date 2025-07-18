import {access, constants} from "node:fs/promises";

import {includeIgnoreFile} from "@eslint/compat";
import eslintjs from "@eslint/js";
import globals from "globals";
import typescripteslint, {type Config} from "typescript-eslint";

import {dependsOn} from "../utils/dependsOn.ts";
import {getAbsoluteRepoRootPath} from "../utils/getAbsoluteRepoRootPath.ts";

import {makeImportPlugin} from "./eslint-plugins/import.ts";
import {makeJestPlugin} from "./eslint-plugins/jest.ts";
import {makeJSDocPlugin} from "./eslint-plugins/jsdoc.ts";
import {jsxA11yPlugin} from "./eslint-plugins/jsx-a11y.ts";
import {reactHooksPlugin} from "./eslint-plugins/react-hooks.ts";
import {reactPlugin} from "./eslint-plugins/react.ts";
import {typescripteslintPlugin} from "./eslint-plugins/typescript-eslint.ts";
import {mockAndTestFilesGlobPattern} from "./eslint-utils/mockAndTestFilesGlobPattern.ts";
import {
	noMagicNumbersRuleOptions,
	noShadowRuleOptions,
	noShadowRuleOptionsForTestFiles,
} from "./eslint-utils/ruleOptions.ts";

/**
 * @description "ESLint statically analyzes your code to quickly find problems."
 * @returns Configuration for ESLint.
 * @see {@link https://eslint.org/docs/latest/use/configure/}
 */
export const makeESLintConfig = async (): Promise<Config> => {
	const absoluteRepoRootPath = getAbsoluteRepoRootPath();

	const gitignorePath = `${absoluteRepoRootPath}/.gitignore`;

	const hasReactDependency = await dependsOn(["react"]);
	const hasFrontendDependencies =
		hasReactDependency || (await dependsOn(["pug"]));

	/**
	 * Ideally a straightforward `dependsOn(["typescript"])` check would be sufficient for checking if
	 * the repo uses TypeScript (whether it's this `web-devdeps` repo or a consuming repo that has
	 * installed the `web-devdeps` package as a dependency). For TypeScript specifically this won't work
	 * since one of the primary use cases of the `web-devdeps` package is to provide development dependencies
	 * (including TS) for consuming repos without requiring the consumers to specify all of them in their
	 * `packageJSON.devDependencies` object. So rather than checking the `devDependencies` object for
	 * the `typescript` package, check for the presence of a `tsconfig.json` file instead.
	 */
	const hasTSConfigFile = await (async () => {
		try {
			// 1. _If_ the `tsconfig.json` file A) exists, and B) can be read by the calling
			//    Node.js process, then this indicates that the repo _does_ use TypeScript.
			await access(`${absoluteRepoRootPath}/tsconfig.json`, constants.R_OK);
			return true;
		} catch (_error) {
			// 2. _Else_ there was an error accessing the `tsconfig.json` file,
			//     which indicates that the repo _does not_ use TypeScript.
			return false;
		}
	})();

	return typescripteslint.config(
		// Excerpt from https://eslint.org/docs/latest/use/configure/ignore#including-gitignore-files:
		// > If you want to include patterns from a `.gitignore` file or any other file with gitignore-style patterns,
		// > you can use `includeIgnoreFile` utility from the `@eslint/compat` package. This automatically loads
		// > the specified file and translates gitignore-style patterns into `ignores` glob patterns.
		includeIgnoreFile(gitignorePath),
		// Excerpt from https://eslint.org/docs/latest/use/configure/configuration-files#using-predefined-configurations:
		// > `js.configs.recommended` - Enables the rules that ESLint recommends everyone use to avoid potential errors.
		{
			name: "eslintjs/recommended",
			...eslintjs.configs.recommended,
		},
		{
			name: "eslintjs/user-defined-config",
			languageOptions: {
				// Excerpt from https://eslint.org/docs/latest/use/configure/language-options#predefined-global-variables:
				// > Apart from the ECMAScript standard built-in globals, which are automatically enabled based on the configured
				// > `languageOptions.ecmaVersion`, ESLint doesn't provide predefined sets of global variables. You can use
				// > the `globals` package to additionally enable all globals for a specific environment.
				globals: {
					...(hasFrontendDependencies ? globals.browser : {}),
					// Always include the Node.js global variables since they're relevant in most repos; even
					// frontend-only projects often still have a need for runnable Node.js CLI scripts.
					...globals.node,
				},
			},
			// https://eslint.org/docs/latest/use/configure/configuration-files#configuring-linter-options:
			linterOptions: {
				reportUnusedDisableDirectives: "error",
				reportUnusedInlineConfigs: "error",
			},
			rules: {
				// https://eslint.org/docs/latest/rules/#possible-problems
				"array-callback-return": ["error", {checkForEach: true}],
				"no-await-in-loop": "error",
				"no-constructor-return": "error",
				"no-duplicate-imports": "error",
				"no-promise-executor-return": "error",
				"no-self-compare": "error",
				"no-template-curly-in-string": "error",
				"no-unmodified-loop-condition": "error",
				"no-unreachable-loop": "error",
				"no-use-before-define": "error",
				"require-atomic-updates": "error",
				// https://eslint.org/docs/latest/rules/#suggestions
				"arrow-body-style": "error",
				camelcase: "error",
				curly: "error",
				"dot-notation": "error",
				eqeqeq: "error",
				"guard-for-in": "error",
				"no-array-constructor": "error",
				"no-console": "warn",
				"no-empty-function": "error",
				"no-eq-null": "error",
				"no-eval": "error",
				"no-extend-native": "error",
				"no-extra-bind": "error",
				"no-implicit-coercion": "error",
				"no-implied-eval": "error",
				"no-invalid-this": "error",
				"no-iterator": "error",
				"no-label-var": "error",
				"no-labels": "error",
				"no-lonely-if": "error",
				"no-loop-func": "error",
				"no-magic-numbers": ["error", noMagicNumbersRuleOptions],
				"no-multi-assign": "error",
				"no-multi-str": "error",
				"no-new": "error",
				"no-new-func": "error",
				"no-new-wrappers": "error",
				"no-object-constructor": "error",
				"no-octal-escape": "error",
				"no-param-reassign": "error",
				"no-plusplus": ["error", {allowForLoopAfterthoughts: true}],
				"no-proto": "error",
				"no-return-assign": "error",
				"no-sequences": "error",
				"no-script-url": "error",
				"no-shadow": ["error", noShadowRuleOptions],
				"no-throw-literal": "error",
				"no-undef-init": "error",
				"no-unneeded-ternary": "error",
				"no-unused-expressions": "error",
				"no-unused-vars": "error",
				"no-useless-call": "error",
				"no-useless-computed-key": "error",
				"no-useless-concat": "error",
				"no-useless-constructor": "error",
				"no-useless-rename": "error",
				"no-useless-return": "error",
				"no-var": "error",
				"object-shorthand": "error",
				"one-var": ["error", "never"],
				"prefer-const": "error",
				"prefer-numeric-literals": "error",
				"prefer-object-has-own": "error",
				"prefer-object-spread": "error",
				"prefer-promise-reject-errors": "error",
				"prefer-spread": "error",
				radix: "error",
				"require-await": "error",
				yoda: "error",
			},
		},
		// Overrides for test files.
		{
			name: "eslintjs/user-defined-test-overrides",
			files: [mockAndTestFilesGlobPattern],
			rules: {
				// It's useful to reference arbitrary numbers directly in unit test
				// files, so disable the `no-magic-numbers` rule for tests.
				"no-magic-numbers": "off",
				"no-shadow": ["error", noShadowRuleOptionsForTestFiles],
			},
		},
		...makeJestPlugin(hasTSConfigFile),
		...makeJSDocPlugin(hasTSConfigFile),
		...makeImportPlugin(hasReactDependency, hasTSConfigFile),
		// Conditionally-included ESLint plugins.
		...(hasReactDependency ? jsxA11yPlugin : []),
		...(hasReactDependency ? reactPlugin : []),
		...(hasReactDependency ? reactHooksPlugin : []),
		...(hasTSConfigFile ? typescripteslintPlugin : []),
	);
};

// Typecast configuration to allow the `tsc` build compilation step to pass.
// eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
export default makeESLintConfig() as Config;
