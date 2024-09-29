import {jestPlugin} from "./jest.js";

test("it exports a configuration array and the most important config options are correct", () => {
	expect(Array.isArray(jestPlugin)).toBe(true);

	const userDefinedConfig = jestPlugin.find(
		(configObj) => configObj.name === "jest/user-defined-config",
	);

	// Verify that a sampling of recommended rules are included in the configuration.
	expect(userDefinedConfig?.rules?.["jest/expect-expect"]).toBe("warn");
	expect(userDefinedConfig?.rules?.["jest/no-conditional-expect"]).toBe(
		"error",
	);

	// Verify that one of the stylistic rules are included in the configuration.
	expect(userDefinedConfig?.rules?.["jest/prefer-to-be"]).toBe("error");

	// Verify that a sampling of the user-defined rules are correct.
	expect(userDefinedConfig?.rules?.["jest/consistent-test-it"]).toBe("error");
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
	expect(userDefinedConfig?.rules?.["jest/unbound-method"]).toBe("error");
});
