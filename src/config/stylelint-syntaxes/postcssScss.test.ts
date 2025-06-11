import {postcssScssStylelintSyntax} from "./postcssScss.ts";

test("it exports a configuration object, and the most important config options are correct", () => {
	expect(typeof postcssScssStylelintSyntax).toBe("object");

	expect(postcssScssStylelintSyntax.customSyntax).toBe("postcss-scss");
	expect(postcssScssStylelintSyntax.files).toBe("**/*.scss");
	expect(postcssScssStylelintSyntax.rules["scss/load-partial-extension"]).toBe(
		"always",
	);
});
