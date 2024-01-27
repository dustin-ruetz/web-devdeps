import type {Config} from "jest";

/** Binary file extensions 1) to ignore in test coverage, and 2) to transform the imported values to filenames. */
const binaryFileExtensions = {
	list: [".jpg", ".png", ".woff2"],
	getTransformRegExp() {
		return `(${this.list.join("|")})`;
	},
} as const;

/** Paths to the files/node_modules used as transformers. */
const transformers = {
	babelJest: "jestTransformerBabelJest.js",
	binaryFile: "jestTransformerBinaryFile.js",
	svgFile: "jestTransformerSVGFile.js",
	tsJest: "ts-jest",
} as const;

/** Regular expressions to match file extensions to the appropriate transformer. */
const transformFileExtensions = {
	binary: binaryFileExtensions.getTransformRegExp(),
	javascript: ".(js|jsx)",
	svg: ".svg",
	typescript: ".(ts|tsx)",
} as const;

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
	// Specify `collectCoverageFrom` to ensure that Jest collects test coverage for all JavaScript and TypeScript files.
	// Excerpt from https://jestjs.io/docs/configuration#collectcoveragefrom-array:
	// > An array of glob patterns indicating a set of files for which coverage information should be collected.
	// > If a file matches the specified glob pattern, coverage information will be collected for it even if
	// > no tests exist for this file and it's never required in the test suite.
	collectCoverageFrom: ["**/*.{js,jsx,ts,tsx}"],
	// https://stackoverflow.com/questions/69567201/coveragepathignorepatterns-ignore-files-with-specific-ending
	coveragePathIgnorePatterns: [
		"/lib/",
		"/node_modules/",
		...binaryFileExtensions.list,
		".svg",
	],
	// Specify `coverageReporters` to prevent the default reporters from writing a coverage/ directory to disk.
	coverageReporters: ["text", "text-summary"],
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
	// Specify the `rootDir` so that Jest finds all of the test files located in various directories.
	// (i.e. <rootDir>/__tests__/, <rootDir>/scripts/ and <rootDir>/src/).
	// Excerpt from https://jestjs.io/docs/configuration#rootdir-string:
	// > The root directory that Jest should scan for tests and modules within.
	// > Oftentimes, you'll want to set this to `"src"` or `"lib"`, corresponding to where in your repository the code is stored.
	rootDir: "../",
	// Explicitly declare one of `"node"|"jsdom"` as the testing environment for each extending repository that uses this Jest config.
	// Excerpt from https://jestjs.io/docs/configuration#testenvironment-string:
	// > The test environment that will be used for testing. The default environment in Jest is a Node.js environment.
	// > If you are building a web app, you can use a browser-like environment through `jsdom` instead.
	testEnvironment: "node",
	transform: {
		[transformFileExtensions.binary]:
			// Set the path to the transformer relative to the Jest <rootDir>.
			`<rootDir>/lib/${transformers.binaryFile}`,
		[transformFileExtensions.javascript]: `<rootDir>/lib/${transformers.babelJest}`,
		[transformFileExtensions.svg]: `<rootDir>/lib/${transformers.svgFile}`,
		[transformFileExtensions.typescript]: [
			transformers.tsJest,
			{isolatedModules},
		],
	},
	// Don't transform anything in node_modules/, and don't transform .json files to prevent the following ts-jest warning:
	// > `ts-jest[ts-jest-transformer] (WARN) Got a unknown file type to compile (file: *.json).`
	transformIgnorePatterns: ["/node_modules/", ".json"],
	verbose: true,
} as const;

/**
 * The purpose of the `dr-devdeps` package is to provide standardized configurations and dependencies for other repositories to extend.
 * `jestConfigOverrides` depends on the `extending-repo` using the following folder/file structure and updates the paths accordingly:
 *
 * ```
 * // Created using the Shinotatwu-DS.file-tree-generator extension for Visual Studio Code.
 * 📂 extending-repo
 * ┣ 📂 config
 * ┃ ┗ 📄 jest.config.js
 * ┣ 📂 node_modules
 * ┃ ┗ 📂 dr-devdeps
 * ┃ ┃ ┗ 📂 lib
 * ┗ 📄 tsconfig.json
 * ```
 */
export const jestConfigOverrides: Config = {
	transform: {
		[transformFileExtensions.binary]:
			// Reference `dr-devdeps` in this way because it's installed in the
			// node_modules/ directory as a dependency of the extending repository.
			`dr-devdeps/lib/${transformers.binaryFile}`,
		[transformFileExtensions.javascript]: `dr-devdeps/lib/${transformers.babelJest}`,
		[transformFileExtensions.svg]: `dr-devdeps/lib/${transformers.svgFile}`,
		[transformFileExtensions.typescript]: [
			transformers.tsJest,
			{isolatedModules},
		],
	},
} as const;

export default jestConfig;
