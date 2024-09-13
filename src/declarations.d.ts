/**
 * Fix `typescript-eslint` errors on the `eslintjs.configs.recommended` config object and avoid the need to install
 * the `@types/eslint__js` package by declaring the shape of the `@eslint/js` default module export here.
 */
declare module "@eslint/js" {
	/**
	 * @todo Figure out how to use ESLint's `Linter.RulesRecord` type for the `rules` configuration objects.
	 * @link https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/eslint__js/index.d.ts
	 */
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
