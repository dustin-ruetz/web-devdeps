import packageJSON from "../package.json";

test("the most important configuration options are correct", () => {
	expect(packageJSON.name).toEqual("@dustin-ruetz/web-dev-deps");
	expect(packageJSON.author).toEqual("Dustin Ruetz");
	// Set `publishConfig.access` to `public` to prevent the following NPM error:
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
