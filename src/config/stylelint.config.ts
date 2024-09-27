import type {Config} from "stylelint";
import {dependsOn} from "../utils/dependsOn.js";

/**
 * @description "A mighty CSS linter that helps you avoid errors and enforce conventions."
 * @returns Configuration for Stylelint.
 * @see {@link https://stylelint.io/user-guide/configure}
 */
export const makeStylelintConfig = async (): Promise<Config> => {
	const hasSassDependency = await dependsOn(["sass"]);
	const hasStyledComponentsDependency = await dependsOn(["styled-components"]);

	const overrides: Config["overrides"] = [];
	// Use two plugins from https://stylelint.io/awesome-stylelint#custom-syntaxes
	// so that Stylelint is also able to check Sass and styled-components code.
	if (hasSassDependency) {
		// https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint#only-css-and-postcss-are-validated-by-default
		overrides.push({
			customSyntax: "postcss-scss",
			files: ["**/*.scss"],
		});
	}
	if (hasStyledComponentsDependency) {
		// https://github.com/hudochenkov/postcss-styled-syntax#stylelint
		overrides.push({
			customSyntax: "postcss-styled-syntax",
			files: ["**/*.{jsx,tsx}"],
		});
	}

	return {
		extends: [
			"stylelint-config-standard",
			// Conditionally extend the standard SCSS configuration if the consuming repository has a dependency on the `sass` package.
			...(hasSassDependency ? ["stylelint-config-standard-scss"] : []),
		],
		// Excerpt from https://stylelint.io/user-guide/configure#report:
		// > These `report*` properties provide extra validation for `stylelint-disable` comments.
		// > This can help enforce useful and well-documented disables.
		reportDescriptionlessDisables: true,
		reportInvalidScopeDisables: true,
		reportNeedlessDisables: true,
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
			// > Specify a list of disallowed units.
			"unit-disallowed-list": ["em"],
			// > Limit the depth of nesting.
			// > **Note**: root-level at-rules will **not be included** in the nesting depth calculation, because
			// > most users would take for granted that root-level at-rules are "free" (since they're necessary).
			"max-nesting-depth": 3,
			// > Require numeric or named (where possible) `font-weight` values.
			"font-weight-notation": "numeric",
		},
		overrides,
	};
};

const stylelintConfig = makeStylelintConfig();
export default stylelintConfig;
