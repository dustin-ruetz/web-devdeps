import {findConfigObjectByName} from "../eslint-utils/findConfigObjectByName.ts";

import {makeImportPlugin} from "./import.ts";

describe("it exports a configuration array and the most important config options are correct", () => {
	test("for the parts of the config that *are not* affected by conditional logic", () => {
		const hasReactDependency = false;
		const hasTSConfigFile = false;
		const importPlugin = makeImportPlugin(hasReactDependency, hasTSConfigFile);

		expect(Array.isArray(importPlugin)).toBe(true);

		// Verify that a sampling of recommended rules are included in the configuration.
		const recommendedConfig = findConfigObjectByName(
			importPlugin,
			"import/recommended",
		);

		expect(recommendedConfig?.rules?.["import/export"]).toBe("error");

		// Verify that a sampling of the user-defined rules are correct.
		const userDefinedConfig = findConfigObjectByName(
			importPlugin,
			"import/user-defined-config",
		);

		expect(
			userDefinedConfig?.rules?.["import/no-extraneous-dependencies"],
		).toBe("error");
		expect(userDefinedConfig?.rules?.["import/no-cycle"]).toBe("error");
		expect(userDefinedConfig?.rules?.["import/first"]).toBe("error");
	});

	test("when the repo *does* depend on React", () => {
		const hasReactDependency = true;
		const hasTSConfigFile = false;
		const importPlugin = makeImportPlugin(hasReactDependency, hasTSConfigFile);

		// Get the React-related config by array position since it's unnamed.
		const [_recommendedConfig, reactConfig] = importPlugin;

		expect(reactConfig?.settings?.["import/extensions"]).toContain(".js");
		expect(reactConfig?.settings?.["import/extensions"]).toContain(".jsx");
	});

	test("when the repo *does* depend on TypeScript", () => {
		const hasReactDependency = false;
		const hasTSConfigFile = true;
		const importPlugin = makeImportPlugin(hasReactDependency, hasTSConfigFile);

		// Get the TypeScript-related config by array position since it's unnamed.
		const [_recommendedConfig, typescriptConfig] = importPlugin;

		expect(typescriptConfig?.settings?.["import/extensions"]).toContain(".ts");
		expect(typescriptConfig?.settings?.["import/extensions"]).toContain(".tsx");
		expect(typescriptConfig?.rules?.["import/named"]).toBe("off");
	});
});
