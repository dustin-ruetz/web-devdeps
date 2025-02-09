import {pugPrettierPlugin} from "./pug.ts";

test("it exports a configuration object, and the most important config options and plugin name are correct", () => {
	expect(typeof pugPrettierPlugin).toBe("object");

	expect(pugPrettierPlugin.config.pugAttributeSeparator).toBe("as-needed");
	expect(pugPrettierPlugin.config.pugExplicitDiv).toBe(true);
	expect(pugPrettierPlugin.config.pugSortAttributes).toBe("asc");

	expect(pugPrettierPlugin.name).toBe("@prettier/plugin-pug");
});
