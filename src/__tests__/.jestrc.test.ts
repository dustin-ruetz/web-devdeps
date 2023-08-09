import jestConfig, {jestConfigOverrides} from "../.jestrc";

test("it exports configuration objects", () => {
	expect(typeof jestConfig).toMatch("object");
	expect(typeof jestConfigOverrides).toMatch("object");
});

test("the most important configuration options are correct", () => {
	expect(jestConfig.rootDir).toMatch("../");
	expect(jestConfig.roots).toStrictEqual([
		"<rootDir>/scripts/",
		"<rootDir>/src/",
	]);
	expect(jestConfig.testEnvironment).toMatch("node");
	expect(jestConfig.verbose).toBe(true);
});

test("the `transform` config option differs between `jestConfig` and `jestConfigOverrides` ", () => {
	expect(jestConfig.transform).not.toStrictEqual(jestConfigOverrides.transform);
});
