// The following packages don't include their type definitions, nor do they have
// entries in the `DefinitelyTyped` repo, so just declare their shapes here.

/**
 * @description Type declarations for the Jest ESLint plugin.
 * @see {@link https://github.com/jest-community/eslint-plugin-jest/issues/1469}
 * @todo Check if these type declarations can be removed after `eslint-plugin-jest`
 *       gets a new release that addresses the above issue.
 */
declare module "eslint-plugin-jest" {
	import type {Linter} from "eslint";

	declare const jest: {
		readonly configs: {
			readonly "flat/recommended": {
				readonly rules: Readonly<Linter.RulesRecord>;
			};
			readonly "flat/style": {
				readonly rules: Readonly<Linter.RulesRecord>;
			};
		};
	};

	export = jest;
}
/**
 * @description Type declarations for the React Hooks ESLint plugin.
 * @see {@link https://github.com/facebook/react/issues/30119}
 * @todo Check if these type declarations can be removed after `eslint-plugin-react-hooks`
 *       gets a new release that addresses the above issue.
 */
declare module "eslint-plugin-react-hooks" {
	// eslint-disable-next-line no-duplicate-imports
	import type {Linter} from "eslint";

	declare const reactHooks: {
		readonly configs: {
			readonly recommended: {
				readonly rules: Readonly<Linter.RulesRecord>;
			};
		};
		readonly rules: {
			"exhaustive-deps": SharedConfig.RuleEntry;
			"rules-of-hooks": SharedConfig.RuleEntry;
		};
	};

	export = reactHooks;
}
