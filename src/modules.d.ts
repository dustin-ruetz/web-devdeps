// The following packages don't include their type definitions, nor do they have
// entries in the `DefinitelyTyped` repo, so just declare their interfaces here.

/**
 * @description Type declarations for the import ESLint plugin.
 * @see {@link https://github.com/import-js/eslint-plugin-import/issues/3175}
 * @todo Check if these type declarations can be removed after `eslint-plugin-import`
 *       gets a new release that addresses the above issue.
 */
declare module "eslint-plugin-import" {
	/**
	 * Below types were adapted from the `index.d.ts` file that has been merged
	 * into `main` but hasn't been included in a release as of the most recent
	 * version (currently v2.31.0 which was released on 2024-Oct-03).
	 * @see {@link https://github.com/import-js/eslint-plugin-import/blob/main/index.d.ts}
	 */
	import type {Linter, Rule} from "eslint";

	declare const eslintPluginImport: {
		readonly flatConfigs: {
			readonly react: Linter.Config;
			readonly recommended: Linter.Config;
			readonly typescript: Linter.Config;
		};
		readonly rules: Record<string, Rule.RuleModule>;
	};

	export = eslintPluginImport;
}
