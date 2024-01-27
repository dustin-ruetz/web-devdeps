import {eslintConfig} from "../eslint.config.js";

test("it exports a configuration object", () => {
	expect(typeof eslintConfig).toMatch("object");
});

test("the most important configuration options are correct", () => {
	// The configuration's `parserOptions` and `rules` objects may be `undefined`,
	// so throw an error immediately if this is the case.
	const getErrorMessage = (keyName: "parserOptions" | "rules") =>
		`eslintConfig.${keyName} should be an object; value is undefined.`;
	if (typeof eslintConfig.parserOptions === "undefined") {
		throw new Error(getErrorMessage("parserOptions"));
	}
	if (typeof eslintConfig.rules === "undefined") {
		throw new Error(getErrorMessage("rules"));
	}

	// Continue with the assertions now that the config object's structure has been verified.
	expect(eslintConfig.env).toStrictEqual({
		browser: true,
		es2024: true,
		jest: true,
		node: true,
	});
	expect(eslintConfig.extends).toStrictEqual([
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
	]);
	expect(eslintConfig.ignorePatterns).toStrictEqual(["!*.*.js", "!*.*.ts"]);
	expect(eslintConfig.parser).toMatch("@typescript-eslint/parser");
	expect(eslintConfig.parserOptions.sourceType).toMatch("module");
	expect(eslintConfig.plugins).toStrictEqual(["@typescript-eslint"]);
	expect(eslintConfig.root).toBe(true);
	expect(eslintConfig.rules.camelcase).toMatch("error");
	expect(eslintConfig.rules["no-console"]).toMatch("warn");
	expect(eslintConfig.rules["no-var"]).toMatch("error");
	expect(eslintConfig.overrides).toStrictEqual([
		{
			files: ["*.test.+(js|jsx|ts|tsx)"],
			rules: {
				"no-magic-numbers": "off",
			},
		},
	]);
});
