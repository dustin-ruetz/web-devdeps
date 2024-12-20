import packageJSON from "../package.json" with {type: "json"};

test("the most important configuration options are correct", () => {
	expect(packageJSON.name).toBe("web-devdeps");
	expect(packageJSON.author).toBe("Dustin Ruetz");
	// Excerpt from https://docs.npmjs.com/cli/v6/configuring-npm/package-json#main:
	// > The main field is a module ID that is the primary entry point to your program.
	// > That is, if your package is named `foo`, and a user installs it, and then does
	// > `require("foo")`, then your main module's exports object will be returned.
	// > This should be a module ID relative to the root of your package folder.
	expect(packageJSON.main).toBe("./lib/exports.js");
	// Excerpt from https://docs.npmjs.com/cli/v6/configuring-npm/package-json#bin:
	// > A lot of packages have one or more executable files that they'd like to install into the PATH.
	// > To use this, supply a `bin` field in your package.json which is a map of command name to local file name. On install,
	// > npm will symlink that file into `prefix/bin` for global installs, or `./node_modules/.bin/` for local installs.
	expect(packageJSON.bin).toStrictEqual({
		"web-devdeps": "lib/index.js",
	});
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
	// Excerpt from https://docs.npmjs.com/generating-provenance-statements:
	// > You can generate provenance statements for the packages you publish. This allows you to publicly establish where
	// > a package was built and who published a package, which can increase supply-chain security for your packages.
	expect(packageJSON.publishConfig.provenance).toBe(true);
	expect(packageJSON.repository.url).toContain(
		"github.com/dustin-ruetz/web-devdeps",
	);
	expect(packageJSON.type).toBe("module");
});

test("NPM packages are installed with exact version numbers", () => {
	expect.hasAssertions();

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
