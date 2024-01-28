import prettierConfig from "../prettier.config.js";

test("it exports a configuration object", () => {
	expect(typeof prettierConfig).toMatch("object");
});

test("the most important configuration options are correct", () => {
	expect(prettierConfig.endOfLine).toBeUndefined();
	expect(prettierConfig.printWidth).toEqual(80);
	expect(prettierConfig.proseWrap).toMatch("preserve");
	expect(prettierConfig.singleQuote).toBe(false);
	expect(prettierConfig.trailingComma).toMatch("all");
	expect(prettierConfig.useTabs).toBe(true);
	expect(prettierConfig.overrides).toStrictEqual([
		{
			files: "*.json",
			options: {
				trailingComma: "none",
			},
		},
	]);
});
