import {exports} from "./exports.js";

test("abc", () => {
	expect(typeof exports.commitlintConfig).toEqual("object");
	expect(typeof exports.eslintConfig).toEqual("object");
	expect(typeof exports.jestConfig).toEqual("object");
	expect(typeof exports.lintstagedConfig).toEqual("object");
	expect(typeof exports.prettierConfig).toEqual("object");
	expect(typeof exports.semanticReleaseConfig).toEqual("object");
	expect(typeof exports.stylelintConfig).toEqual("object");
});
