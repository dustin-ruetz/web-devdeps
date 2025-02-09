import {xmlPrettierPlugin} from "./xml.ts";

test("it exports a configuration object, and the most important config options and plugin name are correct", () => {
	expect(typeof xmlPrettierPlugin).toBe("object");

	expect(xmlPrettierPlugin.config.xmlQuoteAttributes).toBe("double");
	expect(xmlPrettierPlugin.config.xmlSortAttributesByKey).toBe(true);
	expect(xmlPrettierPlugin.config.xmlWhitespaceSensitivity).toBe("ignore");

	expect(xmlPrettierPlugin.name).toBe("@prettier/plugin-xml");
});
