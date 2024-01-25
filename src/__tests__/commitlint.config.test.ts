import commitlintConfig from "../commitlint.config";

test("it exports a configuration object", () => {
	expect(typeof commitlintConfig).toMatch("object");
});

test("the most important configuration options are correct", () => {
	expect(commitlintConfig.extends).toStrictEqual([
		"@commitlint/config-conventional",
	]);
});
