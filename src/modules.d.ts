/**
 * @todo Figure out how to use ESLint's `Linter.RulesRecord` type for the `rules` configuration objects.
 */

/** @description The `eslint-plugin-jest` package doesn't have a DefinitelyTyped entry, so declare its shape here. */
declare module "eslint-plugin-jest" {
	const jest = {
		configs: {
			"flat/recommended": {
				rules: {},
			},
			"flat/style": {
				rules: {},
			},
		},
	} as const;

	export default jest;
}

/** @description The `eslint-plugin-react-hooks` package doesn't have a DefinitelyTyped entry, so declare its shape here. */
declare module "eslint-plugin-react-hooks" {
	const reactHooks = {
		configs: {
			recommended: {
				rules: {},
			},
		},
		rules: {},
	} as const;

	export default reactHooks;
}
