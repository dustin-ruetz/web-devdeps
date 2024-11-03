import {reactHooksPlugin} from "./react-hooks.js";

test("it exports a configuration array and the most important config options are correct", () => {
	expect(Array.isArray(reactHooksPlugin)).toBe(true);

	const reactHooksConfig = reactHooksPlugin.find(
		(configObj) => configObj.name === "react-hooks/config",
	);

	// The `eslint-plugin-react-hooks` configuration contains only two rules, so verify that both are present.
	expect(reactHooksConfig?.rules?.["react-hooks/rules-of-hooks"]).toBe("error");
	expect(reactHooksConfig?.rules?.["react-hooks/exhaustive-deps"]).toBe("warn");
});
