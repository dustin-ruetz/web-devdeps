import {pugPrettierPlugin} from "./pug.js";

test("it exports a configuration object, and the most important config options and plugin name are correct", () => {
	expect(typeof pugPrettierPlugin).toEqual("object");

	expect(pugPrettierPlugin.config.pugAttributeSeparator).toEqual("as-needed");
	expect(pugPrettierPlugin.config.pugExplicitDiv).toBe(true);
	expect(pugPrettierPlugin.config.pugSortAttributes).toEqual("asc");

	expect(pugPrettierPlugin.name).toEqual("@prettier/plugin-pug");
});
