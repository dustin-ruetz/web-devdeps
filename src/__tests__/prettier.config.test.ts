import prettierConfig from "../prettier.config.js";

test("it exports a configuration object", () => {
	expect(typeof prettierConfig).toEqual("object");
});

test("the most important configuration options are correct", () => {
	expect(prettierConfig.endOfLine).toBeUndefined();
	expect(prettierConfig.printWidth).toEqual(80);
	expect(prettierConfig.proseWrap).toEqual("preserve");
	expect(prettierConfig.singleQuote).toBe(false);
	expect(prettierConfig.trailingComma).toEqual("all");
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
