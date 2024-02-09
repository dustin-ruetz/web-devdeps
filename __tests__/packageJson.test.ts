// JSON files can be imported using the `tsconfig.compilerOptions.resolveJsonModule` setting.
// Excerpt from https://www.typescriptlang.org/tsconfig#resolveJsonModule:
// > Allows importing modules with a `.json` extension, which is a common practice in Node projects.
// > This includes generating a type for the `import` based on the static JSON shape.
import packageJson from "../package.json";

test("the most important configuration options are correct", () => {
	expect(packageJson.author).toEqual("Dustin Ruetz");
	expect(packageJson.name).toEqual("dr-devdeps");
	expect(packageJson.type).toEqual("module");
});

test("that NPM packages are installed with exact version numbers", () => {
	const dependencyVersions = [
		...Object.values(packageJson.dependencies).map((version) => version),
	];

	dependencyVersions.forEach((dependency) => {
		expect(dependency).not.toContain("^");
	});
});
