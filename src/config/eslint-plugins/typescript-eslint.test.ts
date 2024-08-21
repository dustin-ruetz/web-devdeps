import {typescripteslintPlugin} from "./typescript-eslint.js";

test("it exports a configuration array and the most important config options are correct", () => {
	expect(Array.isArray(typescripteslintPlugin)).toBe(true);

	// Verify that one of the recommended rules is included in the configuration.
	const recommendedConfig = typescripteslintPlugin.find(
		(configObj) => configObj.name === "typescript-eslint/eslint-recommended",
	);
	expect(recommendedConfig?.rules?.["prefer-const"]).toEqual("error");

	// Verify that one of the strict rules is included in the configuration.
	const strictConfig = typescripteslintPlugin.find(
		(configObj) => configObj.name === "typescript-eslint/strict",
	);
	expect(
		strictConfig?.rules?.["@typescript-eslint/no-invalid-void-type"],
	).toEqual("error");

	// Verify that one of the stylistic rules is included in the configuration.
	const stylisticConfig = typescripteslintPlugin.find(
		(configObj) => configObj.name === "typescript-eslint/stylistic",
	);
	expect(stylisticConfig?.rules?.["@typescript-eslint/prefer-for-of"]).toEqual(
		"error",
	);

	// Verify that the user-defined configuration is correct.
	const userDefinedConfig = typescripteslintPlugin.find(
		(configObj) => configObj.name === "typescript-eslint/user-defined-config",
	);
	expect(userDefinedConfig?.rules?.["no-unused-vars"]).toEqual("off");
	expect(
		userDefinedConfig?.rules?.["@typescript-eslint/no-unused-vars"],
	).toEqual([
		"error",
		{
			args: "all",
			argsIgnorePattern: "^_",
			caughtErrors: "all",
			caughtErrorsIgnorePattern: "^_",
			destructuredArrayIgnorePattern: "^_",
			ignoreRestSiblings: true,
			varsIgnorePattern: "^_",
		},
	]);
});
