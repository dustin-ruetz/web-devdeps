import type {Config} from "jest";

/** Binary file extensions 1) to ignore in test coverage, and 2) to transform the imported values to filenames. */
const binaryFileExtensions = {
	list: [".jpg", ".png", ".woff2"],
	getTransformRegExp() {
		return `(${this.list.join("|")})`;
	},
} as const;

/**
 * The purpose of the `dr-devdeps` package is to provide standardized configurations and dependencies for other repositories to consume.
 * `getTransform` depends on the `consuming-repo` using the following folder/file structure and updates the paths accordingly:
 *
 * ```
 * // Created using the Shinotatwu-DS.file-tree-generator extension for Visual Studio Code.
 * 📂 consuming-repo
 * ┣ 📂 node_modules
 * ┃ ┗ 📂 dr-devdeps
 * ┃ ┃ ┗ 📂 lib
 * ┃ ┃ ┃ ┗ 📄 jest.config.js
 * ┗ 📄 package.json
 * ┗ 📄 tsconfig.json
 * ```
 */
export const getTransformConfig = (overrides?: {
	isDevDepsJestConfig: boolean;
}) => {
	/** The base path to the files/node_modules used as Jest transformers. */
	const basePath = overrides?.isDevDepsJestConfig
		? // If running tests on this `dr-devdeps` repo, set the path relative to the Jest <rootDir>.
			"<rootDir>"
		: // If running tests on a `consuming-repo`, set the path relative to its `dr-devdeps` dependency.
			"<rootDir>/node_modules/dr-devdeps";

	const transformConfig: Config["transform"] = {
		[binaryFileExtensions.getTransformRegExp()]: `${basePath}/lib/jestTransformerBinaryFile.js`,
		".(js|jsx)": `${basePath}/lib/jestTransformerBabelJest.js`,
		".svg": `${basePath}/lib/jestTransformerSVGFile.js`,
		".(ts|tsx)": [
			"ts-jest",
			{
				// Set the `tsconfig` config option due to the need for a test-specific TypeScript configuration file.
				tsconfig: `${basePath}/tsconfig.test.json`,
				useESM: true,
			},
		],
	} as const;

	return transformConfig;
};

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
		"<rootDir>/lib/",
		"<rootDir>/node_modules/",
		"<rootDir>/www/",
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
	// Excerpt from https://jestjs.io/docs/configuration#extensionstotreatasesm-arraystring:
	// > Jest will run `.mjs` and `.js` files with nearest `package.json`'s `type` field set to `module` as ECMAScript Modules.
	// > If you have any other files that should run with native ESM, you need to specify their file extension here.
	extensionsToTreatAsEsm: [".jsx", ".ts", ".tsx"],
	// Excerpt from https://jestjs.io/docs/configuration#modulefileextensions-arraystring:
	// > We recommend placing the extensions most commonly used in your project on the left, so if you are
	// > using TypeScript, you may want to consider moving "ts" and/or "tsx" to the beginning of the array.
	moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
	// TypeScript knows how to map imported files with the ".js" extension to their ".ts" counterparts. Jest/ts-jest
	// doesn't handle this automatically, so specify `moduleNameMapper` to handle `.js` and `.jsx` file extensions.
	// Specify the `moduleNameMapper` to handle the fact that tests import ".js" file extensions.
	// Excerpt from https://jestjs.io/docs/configuration#modulenamemapper-objectstring-string--arraystring:
	// > A map from regular expressions to module names or to arrays of module names that
	// > allow to stub out resources, like images or styles with a single module.
	moduleNameMapper: {
		// https://github.com/kulshekhar/ts-jest/issues/1057#issuecomment-1482644543:
		"^(\\.\\.?\\/.+)\\.jsx?$": "$1",
	},
	// Specify the `rootDir` so that Jest finds all of the test files located in various directories.
	// (i.e. <rootDir>/__tests__/, <rootDir>/scripts/ and <rootDir>/src/)
	//
	// Excerpt from https://jestjs.io/docs/configuration#rootdir-string:
	// > The root directory that Jest should scan for tests and modules within.
	// > Oftentimes, you'll want to set this to `"src"` or `"lib"`, corresponding to where in your repository the code is stored.
	//
	// This path traverses three levels upwards to get to the root directory of the `consuming-repo`.
	// (i.e. starting from lib/, move upwards to dr-devdeps/ ^ node_modules/ ^ consuming-repo/)
	rootDir: "../../../",
	// Explicitly declare one of `"node"|"jsdom"` as the testing environment for each repository that uses this Jest config.
	// Excerpt from https://jestjs.io/docs/configuration#testenvironment-string:
	// > The test environment that will be used for testing. The default environment in Jest is a Node.js environment.
	// > If you are building a web app, you can use a browser-like environment through `jsdom` instead.
	testEnvironment: "node",
	transform: getTransformConfig(),
	// Don't transform anything in node_modules/, and don't transform .json files to prevent the following ts-jest warning:
	// > `ts-jest[ts-jest-transformer] (WARN) Got a unknown file type to compile (file: *.json).`
	transformIgnorePatterns: ["<rootDir>/node_modules/", ".json"],
	verbose: true,
} as const;

export default jestConfig;
