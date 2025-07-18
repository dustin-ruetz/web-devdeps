import {flatConfigs} from "eslint-plugin-import";
import typescripteslint, {type ConfigArray} from "typescript-eslint";

/**
 * @description "ESLint plugin with rules that help validate proper imports."
 * @param hasReactDependency - Determines whether or not to include React-related configuration.
 * @param hasTSConfigFile - Determines whether or not to include TS-related configuration.
 * @returns Configuration for the import ESLint plugin.
 * @see {@link https://github.com/import-js/eslint-plugin-import/}
 */
export const makeImportPlugin = (
	hasReactDependency: boolean,
	hasTSConfigFile: boolean,
): ConfigArray =>
	typescripteslint.config(
		flatConfigs.recommended,
		hasReactDependency ? flatConfigs.react : [],
		hasTSConfigFile ? flatConfigs.typescript : [],
		{
			name: "import/user-defined-config",
			rules: {
				// https://github.com/import-js/eslint-plugin-import/#helpful-warnings
				"import/no-deprecated": "error",
				"import/no-empty-named-blocks": "error",
				/**
				 * Excerpt from https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-extraneous-dependencies.md:
				 * > Forbid the import of external modules that are not declared in the `package.json`'s
				 * > `dependencies`, `devDependencies`, `optionalDependencies`, `peerDependencies`, or
				 * > `bundledDependencies`. The closest parent `package.json` will be used. If no
				 * > `package.json` is found, the rule will not lint anything.
				 */
				"import/no-extraneous-dependencies": "error",
				"import/no-mutable-exports": "error",
				// https://github.com/import-js/eslint-plugin-import/#static-analysis
				"import/enforce-node-protocol-usage": ["error", "always"],
				"import/no-absolute-path": "error",
				"import/no-cycle": "error",
				"import/no-self-import": "error",
				/**
				 * Ideally the `typescript-eslint` package shouldn't need to be ignored
				 * here, but since its `package.json` file doesn't have the `main` key
				 * this causes `eslint-plugin-import` to incorrectly report the
				 * `Unable to resolve path to module` error when importing it.
				 * @see {@link https://github.com/import-js/eslint-plugin-import/issues/1810}
				 */
				"import/no-unresolved": [
					"error",
					{
						commonjs: true,
						ignore: ["typescript-eslint"],
					},
				],
				"import/no-useless-path-segments": "error",
				// https://github.com/import-js/eslint-plugin-import/#style-guide
				"import/first": "error",
				"import/newline-after-import": "error",
				"import/no-anonymous-default-export": "error",
				/**
				 * Excerpt from https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/no-duplicates.md:
				 * > ⚠️ This rule _warns_ in the following configs: ☑️ recommended
				 *
				 * > Reports if a resolved path is imported more than once.
				 *
				 * > ESLint core has a similar rule (`no-duplicate-imports`), but this version is different in two key ways:
				 *
				 * > 1. The paths in the source code don't have to exactly match, they just have to
				 * >    point to the same module on the filesystem. (i.e. `./foo` and `./foo.js`)
				 * > 2. This version distinguishes Flow `type` imports from standard imports.
				 */
				"import/no-duplicates": "error",
				/** @see {@link https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/order.md} */
				"import/order": [
					"error",
					{
						alphabetize: {
							caseInsensitive: true,
							order: "asc",
						},
						groups: [
							"builtin",
							"external",
							"internal",
							"parent",
							"sibling",
							"index",
						],
						named: {
							// > Enforce ordering of names within imports and exports.
							enabled: true,
							// > `mixed`: Sorts all identifiers (i.e. `type` _and_ variable imports) in alphabetical order.
							types: "mixed",
						},
						"newlines-between": "always",
						warnOnUnassignedImports: true,
					},
				],
			},
		},
	);
