import {jsxA11yPlugin} from "./jsx-a11y.js";

test("it exports a configuration array and the most important config options are correct", () => {
	expect(Array.isArray(jsxA11yPlugin)).toBe(true);

	const strictConfig = jsxA11yPlugin.find(
		(configObj) => configObj.name === "jsx-a11y/strict",
	);

	// Verify that one of the strict rules is included in the configuration.
	expect(strictConfig?.rules?.["jsx-a11y/alt-text"]).toBe("error");
});
