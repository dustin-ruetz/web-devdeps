import eslintPluginJSDoc from "eslint-plugin-jsdoc";
import typescripteslint from "typescript-eslint";
import type {ConfigArray} from "typescript-eslint";

/**
 * @description "JSDoc-specific linting rules."
 * @param hasTSConfigFile - Determines the base JSDoc lint configuration (either JS or TS) to use.
 * @returns Configuration for the JSDoc ESLint plugin.
 * @see {@link https://github.com/gajus/eslint-plugin-jsdoc}
 */
export const makeJSDocPlugin = (hasTSConfigFile: boolean): ConfigArray =>
	typescripteslint.config(
		hasTSConfigFile
			? eslintPluginJSDoc.configs["flat/recommended-typescript-error"]
			: eslintPluginJSDoc.configs["flat/recommended-error"],
		{
			name: "jsdoc/user-defined-config",
			plugins: {
				jsdoc: eslintPluginJSDoc,
			},
			// https://github.com/gajus/eslint-plugin-jsdoc#rules
			rules: {
				"jsdoc/check-line-alignment": "error",
				"jsdoc/informative-docs": "error",
				"jsdoc/require-asterisk-prefix": "error",
				"jsdoc/require-hyphen-before-param-description": "error",
				// Excerpt from https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-jsdoc.md:
				// > Checks for presence of JSDoc comments, on class declarations as well as functions.
				"jsdoc/require-jsdoc": [
					"error",
					{
						// Excerpt from https://github.com/gajus/eslint-plugin-jsdoc/blob/main/docs/rules/require-jsdoc.md#publiconly:
						// > This option will insist that missing JSDoc blocks are only reported for
						// > function bodies/class declarations that are exported from the module.
						publicOnly: true,
					},
				],
				"jsdoc/require-throws": "error",
				"jsdoc/sort-tags": "error",
			},
		},
	);
