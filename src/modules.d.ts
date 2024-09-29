/**
 * @description Fix `typescript-eslint` errors on the `eslintjs.configs.recommended` config object and avoid the need to install
 *              the `@types/eslint__js` package by declaring the shape of the `@eslint/js` default module export here.
 * @see {@link https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/eslint__js/index.d.ts}
 * @todo Figure out how to use ESLint's `Linter.RulesRecord` type for the `rules` configuration objects.
 */
declare module "@eslint/js" {
	const js = {
		configs: {
			all: {
				rules: {},
			},
			recommended: {
				rules: {},
			},
		},
	} as const;

	export default js;
}

/**
 * @description The `eslint-plugin-jest` doesn't have a DefinitelyTyped entry, so declare its shape here.
 */
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
