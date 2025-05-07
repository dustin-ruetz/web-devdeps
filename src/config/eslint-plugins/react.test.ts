import {reactPlugin} from "./react.ts";

test("it exports a configuration array and the most important config options are correct", () => {
	expect(Array.isArray(reactPlugin)).toBe(true);

	const userDefinedConfig = reactPlugin.find(
		(configObj) => configObj.name === "react/user-defined-config",
	);

	// The `jsx-runtime` configuration contains only two rules, so verify that both are present.
	expect(userDefinedConfig?.rules?.["react/jsx-uses-react"]).toBe(2);
	expect(userDefinedConfig?.rules?.["react/react-in-jsx-scope"]).toBe(2);

	// Verify that one of the recommended rules is included in the configuration.
	expect(userDefinedConfig?.rules?.["react/display-name"]).toBe(2);

	// Verify that the JSX-related options are included in the configuration.
	expect(
		userDefinedConfig?.languageOptions?.parserOptions?.ecmaFeatures?.jsx,
	).toBe(true);
});
