import type {Config} from "stylelint";

/** https://stylelint.io/user-guide/configure */
const stylelintConfig: Config = {
	extends: ["stylelint-config-standard", "stylelint-config-standard-scss"],
	rules: {
		// https://stylelint.io/user-guide/rules#avoid-errors
		// > This rule considers the identifiers of `@keyframes` rules defined within the same source to be known.
		"no-unknown-animations": true,
		// > This rule considers custom media queries defined **within the same source** to be known.
		"no-unknown-custom-media": true,
		// > This rule considers custom properties defined within the same source to be known.
		"no-unknown-custom-properties": true,
		// https://stylelint.io/user-guide/rules#enforce-conventions
		// > Disallow `!important` within declarations.
		"declaration-no-important": true,
		// > Limit the depth of nesting.
		// > **Note**: root-level at-rules will **not be included** in the nesting depth calculation, because
		// > most users would take for granted that root-level at-rules are "free" (since they're necessary).
		"max-nesting-depth": 3,
		// > Require numeric or named (where possible) `font-weight` values.
		"font-weight-notation": "numeric",
	},
	// Use two plugins from https://stylelint.io/awesome-stylelint#custom-syntaxes
	// to enable Stylelint to check Sass and styled-components code.
	overrides: [
		// https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint#only-css-and-postcss-are-validated-by-default
		{
			customSyntax: "postcss-scss",
			files: ["**/*.scss"],
		},
		// https://github.com/hudochenkov/postcss-styled-syntax#stylelint
		{
			customSyntax: "postcss-styled-syntax",
			files: ["**/*.{jsx,tsx}"],
		},
	],
} as const;

export default stylelintConfig;
