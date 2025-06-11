import {logicalCssStylelintPlugin} from "./logicalCss.ts";

test("it exports a configuration object, and the most important config options and plugin name are correct", () => {
	expect(typeof logicalCssStylelintPlugin).toBe("object");

	expect(logicalCssStylelintPlugin.name).toBe("stylelint-plugin-logical-css");
	expect(logicalCssStylelintPlugin.rules).toStrictEqual({
		"plugin/use-logical-properties-and-values": "error",
		"plugin/use-logical-units": "error",
	});
});
