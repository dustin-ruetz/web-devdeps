import jestConfigDevDeps from "../jest.config.devdeps.js";
import {getTransformConfig} from "../jest.config.js";

test("that the `transform` configuration is correct", () => {
	// Verify the values of the config object.
	expect(jestConfigDevDeps.transform).toStrictEqual({
		"(.jpg|.png|.woff2)": "<rootDir>/lib/jestTransformerBinaryFile.js",
		".(js|jsx)": "<rootDir>/lib/jestTransformerBabelJest.js",
		".svg": "<rootDir>/lib/jestTransformerSVGFile.js",
		".(ts|tsx)": [
			"ts-jest",
			{
				tsconfig: "<rootDir>/tsconfig.test.json",
			},
		],
	});
	// Verify the return value of the `getTransformConfig()` function.
	expect(jestConfigDevDeps.transform).toStrictEqual(
		getTransformConfig({isDevDepsJestConfig: true}),
	);
});
