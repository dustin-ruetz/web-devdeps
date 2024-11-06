import exports from "./exports.js";

test("the configuration objects are all available on the module's primary `exports` object", () => {
	expect(typeof exports.commitlintConfig).toBe("object");
	expect(typeof exports.eslintConfig).toBe("object");
	expect(typeof exports.jestConfig).toBe("object");
	expect(typeof exports.lintstagedConfig).toBe("object");
	expect(typeof exports.prettierConfig).toBe("object");
	expect(typeof exports.semanticReleaseConfig).toBe("object");
	expect(typeof exports.stylelintConfig).toBe("object");
});
