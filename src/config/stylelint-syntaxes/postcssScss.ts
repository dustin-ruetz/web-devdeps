/**
 * @description "SCSS parser for PostCSS."
 * @see {@link https://github.com/postcss/postcss-scss}
 */
export const postcssScssStylelintSyntax = {
	// https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint#only-css-and-postcss-are-validated-by-default
	customSyntax: "postcss-scss",
	files: "**/*.scss",
	rules: {
		// https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/double-slash-comment-empty-line-before/README.md
		// > Require or disallow an empty line before `//`-comments.
		"scss/double-slash-comment-empty-line-before": [
			"always",
			{
				except: ["first-nested"],
				ignore: ["between-comments", "inside-block", "stylelint-commands"],
			},
		],
		// https://github.com/stylelint-scss/stylelint-scss/blob/master/src/rules/load-partial-extension/README.md
		// > Require or disallow extension in `@import`, `@use`, `@forward`, and `[meta.load-css]` commands.
		"scss/load-partial-extension": "always",
	},
} as const;
