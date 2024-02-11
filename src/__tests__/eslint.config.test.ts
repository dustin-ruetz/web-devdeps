import {eslintConfig} from "../eslint.config.js";

test("it exports a configuration object", () => {
	expect(typeof eslintConfig).toEqual("object");
});

test("the most important configuration options are correct", () => {
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
	expect(eslintConfig.parser).toEqual("@typescript-eslint/parser");
	expect(eslintConfig.parserOptions?.sourceType).toEqual("module");
	expect(eslintConfig.plugins).toStrictEqual(["@typescript-eslint"]);
	expect(eslintConfig.root).toBe(true);
	// Disable the following ESLint error since trying to use the `eslintConfig.rules.camelcase` syntax
	// violates TypeScript's `noPropertyAccessFromIndexSignature` setting when typechecking.
	//
	// eslint-disable-next-line dot-notation
	expect(eslintConfig.rules?.["camelcase"]).toEqual("error");
	expect(eslintConfig.rules?.["no-console"]).toEqual("warn");
	expect(eslintConfig.rules?.["no-magic-numbers"]).toStrictEqual([
		"error",
		{
			enforceConst: true,
			ignore: [-1, 0, 1],
			ignoreArrayIndexes: true,
		},
	]);
	expect(eslintConfig.rules?.["no-var"]).toEqual("error");
	expect(eslintConfig.overrides).toStrictEqual([
		{
			files: ["*.test.+(js|jsx|ts|tsx)"],
			rules: {
				"no-magic-numbers": "off",
			},
		},
	]);
});
