import jestConfig, {getTransformConfig} from "../jest.config.js";

test("it exports a configuration object and a `getTransformConfig` function", () => {
	expect(typeof jestConfig).toMatch("object");
	expect(typeof getTransformConfig).toMatch("function");
});

test("the most important configuration options are correct", () => {
	expect(jestConfig.rootDir).toMatch("../../../");
	expect(jestConfig.testEnvironment).toMatch("node");
	expect(jestConfig.verbose).toBe(true);
});

test("the `transform` configuration is correct", () => {
	// Verify the values of the config object.
	expect(jestConfig.transform).toStrictEqual({
		"(.jpg|.png|.woff2)":
			"<rootDir>/node_modules/dr-devdeps/lib/jestTransformerBinaryFile.js",
		".(js|jsx)":
			"<rootDir>/node_modules/dr-devdeps/lib/jestTransformerBabelJest.js",
		".svg": "<rootDir>/node_modules/dr-devdeps/lib/jestTransformerSVGFile.js",
		".(ts|tsx)": [
			"ts-jest",
			{
				tsconfig: "<rootDir>/node_modules/dr-devdeps/tsconfig.test.json",
			},
		],
	});
	// Verify the return value of the `getTransformConfig()` function.
	expect(jestConfig.transform).toStrictEqual(getTransformConfig());
});
