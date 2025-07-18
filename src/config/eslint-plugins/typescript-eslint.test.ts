import {typescripteslintPlugin} from "./typescript-eslint.ts";

test("it exports a configuration array and the most important config options are correct", () => {
	expect(Array.isArray(typescripteslintPlugin)).toBe(true);

	// Verify that one of the recommended rules is included in the configuration.
	const recommendedConfig = typescripteslintPlugin.find(
		(configObj) => configObj.name === "typescript-eslint/eslint-recommended",
	);
	expect(recommendedConfig?.rules?.["prefer-const"]).toBe("error");

	// Verify that one of the strict rules is included in the configuration.
	const strictConfig = typescripteslintPlugin.find(
		(configObj) => configObj.name === "typescript-eslint/strict-type-checked",
	);
	expect(strictConfig?.rules?.["@typescript-eslint/no-invalid-void-type"]).toBe(
		"error",
	);

	// Verify that one of the stylistic rules is included in the configuration.
	const stylisticConfig = typescripteslintPlugin.find(
		(configObj) =>
			configObj.name === "typescript-eslint/stylistic-type-checked",
	);
	expect(stylisticConfig?.rules?.["@typescript-eslint/prefer-for-of"]).toBe(
		"error",
	);

	// Verify that the user-defined configuration is correct.
	const userDefinedConfig = typescripteslintPlugin.find(
		(configObj) => configObj.name === "typescript-eslint/user-defined-config",
	);
	expect(userDefinedConfig?.languageOptions).toStrictEqual({
		parserOptions: {
			projectService: true,
		},
	});
	expect(
		userDefinedConfig?.rules?.[
			"@typescript-eslint/consistent-type-definitions"
		],
	).toStrictEqual(["error", "type"]);
	expect(userDefinedConfig?.rules?.["no-unused-vars"]).toBe("off");
	expect(
		userDefinedConfig?.rules?.["@typescript-eslint/no-unused-vars"],
	).toStrictEqual([
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

	// Verify that the user-defined test overrides configuration is correct.
	const userDefinedTestOverridesConfig = typescripteslintPlugin.find(
		(configObj) =>
			configObj.name === "typescript-eslint/user-defined-test-overrides",
	);
	expect(
		userDefinedTestOverridesConfig?.rules?.[
			"@typescript-eslint/no-magic-numbers"
		],
	).toBe("off");
	expect(
		userDefinedTestOverridesConfig?.rules?.[
			"@typescript-eslint/unbound-method"
		],
	).toBe("off");
});
