import packageJSON from "../package.json";

test("the most important configuration options are correct", () => {
	expect(packageJSON.author).toEqual("Dustin Ruetz");
	expect(packageJSON.name).toEqual("dr-devdeps");
	expect(packageJSON.type).toEqual("module");
});

test("that NPM packages are installed with exact version numbers", () => {
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
