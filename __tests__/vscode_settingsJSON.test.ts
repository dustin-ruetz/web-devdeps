import vscodeSettingsJSON from "../.vscode/settings.json";

test("it is a configuration object and the most important config options are correct", () => {
	expect(typeof vscodeSettingsJSON).toBe("object");

	// https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
	expect(vscodeSettingsJSON["eslint.options"].overrideConfigFile).toBe(
		"lib/config/eslint.config.js",
	);

	// https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
	expect(vscodeSettingsJSON["prettier.configPath"]).toBe(
		"lib/config/prettier.config.js",
	);
	expect(vscodeSettingsJSON["prettier.ignorePath"]).toBe(".gitignore");
});
