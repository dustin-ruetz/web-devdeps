import lintstagedConfig from "../lint-staged.config";

test("it exports a configuration object", () => {
	expect(typeof lintstagedConfig).toMatch("object");
});
