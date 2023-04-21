import type {Config} from "jest";

/** Binary file extensions 1) to ignore in test coverage, and 2) to transform the imported values to filenames. */
export const binaryFileExtensions = {
	list: [".jpg", ".png", ".woff2"],
	getTransformRegExp: function () {
		return `(${this.list.join("|")})`;
	},
};

/**
 * Note that including the ts-jest `isolatedModules` config option here shouldn't be necessary because it's deprecated
 * in TypeScript v5, but setting it to `true` fixes the below error when attempting to run the Jest test suite.
 * > `error TS1286: ESM syntax is not allowed in a CommonJS module when 'verbatimModuleSyntax' is enabled.`
 *
 * https://github.com/kulshekhar/ts-jest/issues/4081#issuecomment-1503684089
 */
const isolatedModules = true;

/** https://jestjs.io/docs/configuration */
const jestConfig: Config = {
	// https://stackoverflow.com/questions/69567201/coveragepathignorepatterns-ignore-files-with-specific-ending
	coveragePathIgnorePatterns: ["/node_modules/", ...binaryFileExtensions.list],
	coverageThreshold: {
		global: {
			branches: 100,
			functions: 100,
			lines: 100,
			statements: 100,
		},
	},
	// Excerpt from https://jestjs.io/docs/configuration#modulefileextensions-arraystring:
	// > We recommend placing the extensions most commonly used in your project on the left, so if you are
	// > using TypeScript, you may want to consider moving "ts" and/or "tsx" to the beginning of the array.
	moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
	// Specify both `rootDir` and `roots` so that Jest 1) finds all of the test files, and 2) collects test coverage for everything.
	// Excerpt from https://jestjs.io/docs/configuration#rootdir-string:
	// > The root directory that Jest should scan for tests and modules within.
	// > Oftentimes, you'll want to set this to `"src"` or `"lib"`, corresponding to where in your repository the code is stored.
	rootDir: "../src/",
	// Excerpt from https://jestjs.io/docs/configuration#roots-arraystring:
	// > A list of paths to directories that Jest should use to search for files in.
	// > By default, `roots` has a single entry `<rootDir>` but there are cases where you may want to have multiple roots within one project,
	// > for example roots: `["<rootDir>/src/", "<rootDir>/tests/"]`.
	roots: ["../scripts/", "../src/"],
	// Explicitly declare either `"node"|"jsdom"` as the testing environment for each extending repository that uses this Jest config.
	// Excerpt from https://jestjs.io/docs/configuration#testenvironment-string:
	// > The test environment that will be used for testing. The default environment in Jest is a Node.js environment.
	// > If you are building a web app, you can use a browser-like environment through `jsdom` instead.
	testEnvironment: "node",
	transform: {
		[binaryFileExtensions.getTransformRegExp()]:
			// Set the path to the transformer relative to the Jest <rootDir>.
			"../lib/jest-binary-file-transformer.mjs",
		".(ts|tsx)": [
			"ts-jest",
			// The config object below is adapted from the ts-jest "jest-esm-isolated" example:
			// https://github.com/kulshekhar/ts-jest/blob/main/examples/ts-only/jest-esm-isolated.config.mjs
			{
				isolatedModules,
				// Set the `tsconfig` config option due to the custom location of the TypeScript configuration file.
				tsconfig: "lib/tsconfig.esm.json",
			},
		],
	},
	// Don't transform anything in node_modules/, and don't transform .json files to prevent the following ts-jest warning:
	// > `ts-jest[ts-jest-transformer] (WARN) Got a unknown file type to compile (file: *.json).`
	transformIgnorePatterns: ["/node_modules/", ".json"],
	verbose: true,
};

/**
 * The purpose of the `dr-devdeps` package is to provide standardized configurations and dependencies for other repositories to extend.
 * `jestConfigOverrides` assumes that the `extending-repo` uses the following folder/file structure and updates the paths accordingly:
 *
 * ```
 * // Created using the Shinotatwu-DS.file-tree-generator extension for Visual Studio Code.
 * 📂 extending-repo
 * ┣ 📂 config
 * ┃ ┗ 📄 .jestrc.js
 * ┣ 📂 node_modules
 * ┃ ┗ 📂 dr-devdeps
 * ┃ ┃ ┗ 📂 lib
 * ┗ 📄 tsconfig.json
 * ```
 */
export const jestConfigOverrides: Config = {
	transform: {
		[binaryFileExtensions.getTransformRegExp()]:
			// Reference `dr-devdeps` in this way because it's installed in the node_modules/ directory.
			// as a dependency of the extending repository.
			"dr-devdeps/lib/jest-binary-file-transformer.mjs",
		".(ts|tsx)": [
			"ts-jest",
			{
				isolatedModules,
				// Reference tsconfig.json in this way because it's located in the root of the extending repository.
				tsconfig: "tsconfig.json",
			},
		],
	},
};

export default jestConfig;
