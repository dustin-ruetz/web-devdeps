import {makeJestPlugin} from "./jest.js";

describe("it exports a configuration array and the most important config options are correct", () => {
	test("for the parts of the config that *are not* affected by conditional logic", () => {
		const hasTSConfigFile = false;
		const jestPlugin = makeJestPlugin(hasTSConfigFile);

		expect(Array.isArray(jestPlugin)).toBe(true);

		const userDefinedConfig = jestPlugin.find(
			(configObj) => configObj.name === "jest/user-defined-config",
		);

		// Verify that a sampling of recommended rules are included in the configuration.
		expect(userDefinedConfig?.rules?.["jest/expect-expect"]).toBe("warn");
		expect(userDefinedConfig?.rules?.["jest/no-conditional-expect"]).toBe(
			"error",
		);

		// Verify that one of the stylistic rules is included in the configuration.
		expect(userDefinedConfig?.rules?.["jest/prefer-to-be"]).toBe("error");

		// Verify that a sampling of the user-defined rules are correct.
		expect(userDefinedConfig?.rules?.["jest/no-test-return-statement"]).toBe(
			"error",
		);
		expect(
			userDefinedConfig?.rules?.["jest/prefer-expect-assertions"],
		).toStrictEqual([
			"error",
			{
				onlyFunctionsWithAsyncKeyword: true,
				onlyFunctionsWithExpectInCallback: true,
				onlyFunctionsWithExpectInLoop: true,
			},
		]);
	});

	test("when the repo *does* depend on TypeScript", () => {
		const hasTSConfigFile = true;
		const jestPlugin = makeJestPlugin(hasTSConfigFile);

		const userDefinedConfig = jestPlugin.find(
			(configObj) => configObj.name === "jest/user-defined-config",
		);

		expect(userDefinedConfig?.rules?.["jest/unbound-method"]).toBe("error");
	});

	test("when the repo *does not* depend on TypeScript", () => {
		const hasTSConfigFile = false;
		const jestPlugin = makeJestPlugin(hasTSConfigFile);

		const userDefinedConfig = jestPlugin.find(
			(configObj) => configObj.name === "jest/user-defined-config",
		);

		expect(userDefinedConfig?.rules?.["jest/unbound-method"]).toBe("off");
	});
});
