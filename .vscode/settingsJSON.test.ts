import vscodeSettingsJSON from "./settings.json";

test("it is a configuration object and the most important config options are correct", () => {
	expect(typeof vscodeSettingsJSON).toEqual("object");

	// https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
	expect(vscodeSettingsJSON["eslint.options"].ignorePath).toEqual(".gitignore");
	expect(vscodeSettingsJSON["eslint.options"].overrideConfigFile).toEqual(
		"lib/eslint.config.cjs",
	);

	// Specify that the Git hook files are shell scripts because VS Code misidentifies them as either Markdown, plain text or YAML.
	expect(vscodeSettingsJSON["files.associations"]["commit-msg"]).toEqual(
		"shellscript",
	);
	expect(vscodeSettingsJSON["files.associations"]["pre-commit"]).toEqual(
		"shellscript",
	);
	expect(vscodeSettingsJSON["files.associations"]["pre-push"]).toEqual(
		"shellscript",
	);

	// Configure the icons for the following files that aren't automatically assigned a custom icon.
	// Excerpt from https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme:
	// > You can customize the icon associations directly in the user settings.
	// > With the `*.[extension]` pattern you can define custom file icon associations.
	// > If there's no leading `*` it will be automatically configured as filename and not as file extension.
	expect(
		vscodeSettingsJSON["material-icon-theme.files.associations"][
			"src/semantic-release.config.cts"
		],
	).toEqual("semantic-release");

	// https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
	expect(vscodeSettingsJSON["prettier.configPath"]).toEqual(
		"lib/prettier.config.js",
	);
	expect(vscodeSettingsJSON["prettier.ignorePath"]).toEqual(".gitignore");
});
