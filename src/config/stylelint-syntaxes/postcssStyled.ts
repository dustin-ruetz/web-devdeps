/**
 * @description "PostCSS syntax for CSS-in-JS like styled-components."
 * @see {@link https://github.com/hudochenkov/postcss-styled-syntax#stylelint}
 */
export const postcssStyledStylelintSyntax = {
	customSyntax: "postcss-styled-syntax",
	files: "**/*.{jsx,tsx}",
} as const;
