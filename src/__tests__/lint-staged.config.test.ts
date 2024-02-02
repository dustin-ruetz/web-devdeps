import lintstagedConfig from "../lint-staged.config.js";

test("it exports a configuration object", () => {
	expect(typeof lintstagedConfig).toMatch("object");
});
