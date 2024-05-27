import packageJSON from "../package.json";

test("the most important configuration options are correct", () => {
	expect(packageJSON.name).toEqual("@dustin-ruetz/web-dev-deps");
	expect(packageJSON.author).toEqual("Dustin Ruetz");
	// Ensure that only the following allowlisted files and folders are included in the published NPM package.
	//
	// Excerpt from https://docs.npmjs.com/cli/v10/using-npm/developers#keeping-files-out-of-your-package:
	// > If, given the structure of your project, you find `.npmignore` to be a maintenance headache, you might instead try
	// > populating the `files` property of `package.json`, which is an array of file or directory names that should be included
	// > in your package. Sometimes manually picking which items to allow is easier to manage than building a block list.
	expect(packageJSON.files).toStrictEqual([
		".githooks/",
		"lib/",
		".node-version",
		"tsconfig.build.json",
		"tsconfig.json",
	]);
	// Since this is a user-scoped namespaced package, set `publishConfig.access` to `public` to prevent the following NPM error:
	// > npm error 402 Payment Required - You must sign up for private packages.
	expect(packageJSON.publishConfig.access).toEqual("public");
	expect(packageJSON.type).toEqual("module");
});

test("NPM packages are installed with exact version numbers", () => {
	const dependencyVersions = [
		...Object.values(packageJSON.dependencies).map((version) => version),
	];
	const devDependencyVersions = [
		...Object.values(packageJSON.devDependencies).map((version) => version),
	];

	[...dependencyVersions, ...devDependencyVersions].forEach((dependency) => {
		expect(dependency).not.toContain("^");
	});
});
