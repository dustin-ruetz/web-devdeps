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
});

test("the XML plugin and configuration are present", () => {
	expect(prettierConfig.plugins).toStrictEqual(["@prettier/plugin-xml"]);
	/* eslint-disable dot-notation */
	expect(prettierConfig["xmlQuoteAttributes"]).toEqual("double");
	expect(prettierConfig["xmlSelfClosingSpace"]).toBe(true);
	expect(prettierConfig["xmlSortAttributesByKey"]).toBe(true);
	expect(prettierConfig["xmlWhitespaceSensitivity"]).toEqual("ignore");
	/* eslint-enable dot-notation */
});
