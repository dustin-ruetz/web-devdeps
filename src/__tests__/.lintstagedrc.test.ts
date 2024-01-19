import lintstagedConfig from "../.lintstagedrc";

test("it exports a configuration object", () => {
	expect(typeof lintstagedConfig).toMatch("object");
});
