import type {Config} from "stylelint";

import {dependsOn} from "../utils/dependsOn.ts";

import {logicalCssStylelintPlugin} from "./stylelint-plugins/logicalCss.ts";
import {postcssScssStylelintSyntax} from "./stylelint-syntaxes/postcssScss.ts";
import {postcssStyledStylelintSyntax} from "./stylelint-syntaxes/postcssStyled.ts";

/**
 * @description "A mighty CSS linter that helps you avoid errors and enforce conventions."
 * @returns Configuration for Stylelint.
 * @see {@link https://stylelint.io/user-guide/configure}
 */
export const makeStylelintConfig = async (): Promise<Config> => {
	const hasSassDependency = await dependsOn(["sass"]);
	const hasStyledComponentsDependency = await dependsOn(["styled-components"]);

	const overrides: Config["overrides"] = [];
	// Use two custom syntaxes from https://stylelint.io/awesome-stylelint/#custom-syntaxes-1
	// so that Stylelint is also able to check Sass and styled-components code.
	if (hasSassDependency) {
		overrides.push(postcssScssStylelintSyntax);
	}
	if (hasStyledComponentsDependency) {
		overrides.push(postcssStyledStylelintSyntax);
	}

	return {
		extends: [
			"stylelint-config-standard",
			// Conditionally extend the standard SCSS configuration if the consuming repository has a dependency on the `sass` package.
			...(hasSassDependency ? ["stylelint-config-standard-scss"] : []),
		],
		plugins: [logicalCssStylelintPlugin.name],
		// Excerpt from https://stylelint.io/user-guide/configure#report:
		// > These `report*` properties provide extra validation for `stylelint-disable` comments.
		// > This can help enforce useful and well-documented disables.
		reportDescriptionlessDisables: true,
		reportInvalidScopeDisables: true,
		reportNeedlessDisables: true,
		reportUnscopedDisables: true,
		rules: {
			// https://stylelint.io/user-guide/rules#avoid-errors
			// > Longhand hex colors can be either 6 or 8 (with alpha channel) hexadecimal characters.
			// > And their shorthand variants are 3 and 4 characters respectively.
			"color-no-invalid-hex": true,
			// > Syntax strings are used for the `syntax` descriptor value of the `@property` at-rule.
			// > This rule checks their grammar and flags unsupported type names.
			"syntax-string-no-invalid": true,
			// > A common mistake (matching outdated non-standard syntax) is
			// > to use just a side-or-corner without the preceding `to`.
			"function-linear-gradient-no-nonstandard-direction": true,
			// > This rule considers functions defined in the CSS Specifications to be known.
			// > This rule ignores double-dashed custom functions, e.g. `--custom-function()`.
			"function-no-unknown": true,
			// > This rule considers the identifiers of `@keyframes` rules defined within the same source to be known.
			"no-unknown-animations": true,
			// > This rule considers custom media queries defined **within the same source** to be known.
			"no-unknown-custom-media": true,
			// > This rule considers custom properties defined within the same source to be known.
			"no-unknown-custom-properties": true,
			// > This rule considers units defined in the CSS Specifications,
			// > up to and including Editor's Drafts, to be known.
			"unit-no-unknown": true,
			// https://stylelint.io/user-guide/rules#enforce-conventions
			// https://stylelint.io/user-guide/rules/#allowed-disallowed--required
			// > Disallow `!important` within declarations.
			"declaration-no-important": true,
			// > Specify a list of disallowed units.
			"unit-disallowed-list": ["em"],
			// https://stylelint.io/user-guide/rules/#max--min
			// > Limit the depth of nesting.
			// > **Note**: root-level at-rules will **not be included** in the nesting depth calculation, because
			// > most users would take for granted that root-level at-rules are "free" (since they're necessary).
			"max-nesting-depth": 3,
			// https://stylelint.io/user-guide/rules/#notation
			// > Require numeric or named (where possible) `font-weight` values.
			"font-weight-notation": "numeric",
			// https://stylelint.io/user-guide/rules/#pattern
			// > Specify a pattern for the selectors of rules nested within rules.
			"selector-class-pattern": [
				// - Regular expression for BEM-style (block, element, modifier) selectors,
				//   which use the two underscores (__) and two hyphens (--) syntax.
				// - Adapted from https://github.com/Darkzarich/stylelint-config-two-dash-bem/blob/main/index.js
				"^[a-z][-a-z0-9]+(__[-a-z0-9]+)?(--[a-z0-9]+)?$",
				{
					/* v8 ignore next 2 */
					message: (selector: string) =>
						`Selector class ${selector} does not adhere to BEM conventions`,
					resolveNestedSelectors: true,
				},
			],
			...logicalCssStylelintPlugin.rules,
		},
		overrides,
	};
};

export default makeStylelintConfig();
