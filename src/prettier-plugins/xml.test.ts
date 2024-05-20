import {xmlPrettierPlugin} from "./xml.js";

test("it exports a configuration object, and the most important config options and plugin name are correct", () => {
	expect(typeof xmlPrettierPlugin).toEqual("object");

	expect(xmlPrettierPlugin.config.xmlQuoteAttributes).toEqual("double");
	expect(xmlPrettierPlugin.config.xmlSortAttributesByKey).toBe(true);
	expect(xmlPrettierPlugin.config.xmlWhitespaceSensitivity).toEqual("ignore");

	expect(xmlPrettierPlugin.name).toEqual("@prettier/plugin-xml");
});
