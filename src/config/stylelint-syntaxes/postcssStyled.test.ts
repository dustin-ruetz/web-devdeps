import {postcssStyledStylelintSyntax} from "./postcssStyled.ts";

test("it exports a configuration object, and the most important config options are correct", () => {
	expect(typeof postcssStyledStylelintSyntax).toBe("object");

	expect(postcssStyledStylelintSyntax.customSyntax).toBe(
		"postcss-styled-syntax",
	);
	expect(postcssStyledStylelintSyntax.files).toBe("**/*.{jsx,tsx}");
});
