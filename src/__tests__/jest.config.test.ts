import jestConfig, {getTransformConfig} from "../jest.config";

test("it exports a configuration object and a `getTransformConfig` function", () => {
	expect(typeof jestConfig).toMatch("object");
	expect(typeof getTransformConfig).toMatch("function");
});

test("the most important configuration options are correct", () => {
	expect(jestConfig.rootDir).toMatch("../");
	expect(jestConfig.testEnvironment).toMatch("node");
	expect(jestConfig.verbose).toBe(true);
});

test("the `transform` configuration is correct", () => {
	// Verify the values of the config object.
	expect(jestConfig.transform).toStrictEqual({
		"(.jpg|.png|.woff2)": "dr-devdeps/lib/jestTransformerBinaryFile.js",
		".(js|jsx)": "dr-devdeps/lib/jestTransformerBabelJest.js",
		".svg": "dr-devdeps/lib/jestTransformerSVGFile.js",
		".(ts|tsx)": ["ts-jest", {isolatedModules: true}],
	});
	// Verify the return value of the `getTransformConfig()` function.
	expect(jestConfig.transform).toStrictEqual(getTransformConfig());
});
