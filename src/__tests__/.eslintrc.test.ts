import {eslintConfig} from "../.eslintrc";

test("it exports a configuration object", () => {
	expect(typeof eslintConfig).toMatch("object");
});

test("the most important configuration options are correct", () => {
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
	expect(eslintConfig.parser).toMatch("@typescript-eslint/parser");
	expect(eslintConfig.parserOptions?.sourceType).toMatch("module");
	expect(eslintConfig.plugins).toStrictEqual(["@typescript-eslint"]);
	expect(eslintConfig.root).toBe(true);
	expect(eslintConfig.rules?.["no-console"]).toMatch("warn");
	expect(eslintConfig.rules?.["no-var"]).toMatch("error");
	expect(eslintConfig.overrides).toStrictEqual([
		{
			files: ["*.test.+(js|jsx|ts|tsx)"],
			rules: {
				"no-magic-numbers": "off",
			},
		},
	]);
});
