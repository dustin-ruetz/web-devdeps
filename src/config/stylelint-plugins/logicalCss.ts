/**
 * @description "A Stylelint plugin to enforce the use of logical CSS properties, values and units."
 * @see {@link https://github.com/yuschick/stylelint-plugin-logical-css}
 */
export const logicalCssStylelintPlugin = {
	name: "stylelint-plugin-logical-css",
	rules: {
		"plugin/use-logical-properties-and-values": "error",
		"plugin/use-logical-units": "error",
	},
} as const;
