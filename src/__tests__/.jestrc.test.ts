import jestConfig, {binaryFileExtensions} from "../.jestrc";

test("it exports a configuration object", () => {
	expect(typeof jestConfig).toMatch("object");
});

test("the most important configuration options are correct", () => {
	expect(jestConfig.rootDir).toMatch("../src/");
	expect(jestConfig.testEnvironment).toMatch("node");
	expect(jestConfig.verbose).toBe(true);
});

test("`binaryFileExtensions.getTransformRegExp()` returns the correct regular expression", () => {
	const transformRegExp = binaryFileExtensions.getTransformRegExp();
	expect(transformRegExp).toMatch("(.jpg|.png|.woff2)");
});
