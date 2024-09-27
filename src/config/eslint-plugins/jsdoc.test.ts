import {makeJSDocPlugin} from "./jsdoc.js";

describe("it exports a configuration array and the most important config options are correct", () => {
	test("for the parts of the config that *are not* affected by conditional logic", () => {
		const hasTSConfigFile = false;
		const jsdocPlugin = makeJSDocPlugin(hasTSConfigFile);

		expect(Array.isArray(jsdocPlugin)).toBe(true);

		const userDefinedConfig = jsdocPlugin.find(
			(configObj) => configObj.name === "jsdoc/user-defined-config",
		);

		// Verify that the user-defined configuration is correct.
		expect(typeof userDefinedConfig?.plugins?.["jsdoc"]).toEqual("object");
		expect(userDefinedConfig?.rules?.["jsdoc/informative-docs"]).toEqual(
			"error",
		);
		expect(userDefinedConfig?.rules?.["jsdoc/require-jsdoc"]).toStrictEqual([
			"error",
			{publicOnly: true},
		]);
		expect(userDefinedConfig?.rules?.["jsdoc/sort-tags"]).toEqual("error");
	});

	test("when the repo *does not* depend on TypeScript", () => {
		const hasTSConfigFile = false;
		const jsdocPlugin = makeJSDocPlugin(hasTSConfigFile);

		const recommendedErrorConfig = jsdocPlugin.find(
			(configObj) => configObj.name === "jsdoc/flat/recommended-error",
		);
		// Verify that the following rules are configured correctly in the JavaScript-specific configuration:
		// - `require-param-type` should `error` for JavaScript repos because it's helpful/relevant:
		expect(recommendedErrorConfig?.rules?.["jsdoc/require-param-type"]).toEqual(
			"error",
		);
		// - `no-types` should be `off` for JavaScript repos because having them `error` is helpful/relevant:
		expect(recommendedErrorConfig?.rules?.["jsdoc/no-types"]).toEqual("off");
	});

	test("when the repo *does* depend on TypeScript", () => {
		const hasTSConfigFile = true;
		const jsdocPlugin = makeJSDocPlugin(hasTSConfigFile);

		const recommendedTypeScriptErrorConfig = jsdocPlugin.find(
			(configObj) =>
				configObj.name === "jsdoc/flat/recommended-typescript-error",
		);
		// Verify that the following rules are configured correctly in the TypeScript-specific configuration:
		// - `require-param-type` should be `off` for TypeScript repos because specifying types in JSDoc comments would be redundant in TS:
		expect(
			recommendedTypeScriptErrorConfig?.rules?.["jsdoc/require-param-type"],
		).toEqual("off");
		// - `no-types` should `error` for TypeScript repos because specifying types in JSDoc comments would be redundant in TS:
		expect(recommendedTypeScriptErrorConfig?.rules?.["jsdoc/no-types"]).toEqual(
			"error",
		);
	});
});
