import {
	commitlintConfig,
	eslintConfig,
	jestConfig,
	lintstagedConfig,
	prettierConfig,
	semanticReleaseConfig,
	stylelintConfig,
} from "./exports.js";

test("abc", () => {
	expect(typeof commitlintConfig).toEqual("object");
	expect(typeof eslintConfig).toEqual("object");
	expect(typeof jestConfig).toEqual("object");
	expect(typeof lintstagedConfig).toEqual("object");
	expect(typeof prettierConfig).toEqual("object");
	expect(typeof semanticReleaseConfig).toEqual("object");
	expect(typeof stylelintConfig).toEqual("object");
});
