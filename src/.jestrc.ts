import type {Config} from "jest";

/** Binary file extensions 1) to ignore in test coverage, and 2) to transform the imported values to filenames. */
export const binaryFileExtensions = {
	list: [".jpg", ".png", ".woff2"],
	getTransformRegExp: function () {
		return `(${this.list.join("|")})`;
	},
};

// https://jestjs.io/docs/configuration
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
	/**
	 * Excerpt from https://jestjs.io/docs/configuration#modulefileextensions-arraystring:
	 * > We recommend placing the extensions most commonly used in your project on the left, so if you are
	 * > using TypeScript, you may want to consider moving "ts" and/or "tsx" to the beginning of the array.
	 */
	moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
	rootDir: "../src/",
	/**
	 * Explicitly declare either `"node"|"jsdom"` as the testing environment for each repo that extends this Jest config.
	 *
	 * Excerpt from https://jestjs.io/docs/configuration#testenvironment-string:
	 * > The test environment that will be used for testing. The default environment in Jest is a Node.js environment.
	 * > If you are building a web app, you can use a browser-like environment through `jsdom` instead.
	 */
	testEnvironment: "node",
	transform: {
		[binaryFileExtensions.getTransformRegExp()]:
			// Set the path to the transformer relative to the Jest <rootDir>.
			"../lib/jest-binary-file-transformer.mjs",
		".(ts|tsx)": [
			"ts-jest",
			// The below config object is adapted from the ts-jest "jest-esm-isolated" example:
			// https://github.com/kulshekhar/ts-jest/blob/main/examples/ts-only/jest-esm-isolated.config.mjs
			{
				// Note that including the `isolatedModules` config option here shouldn't be necessary because it's deprecated in TypeScript v5,
				// but setting it to `true` fixes the below error when attempting to run the Jest test suite.
				// > error TS1286: ESM syntax is not allowed in a CommonJS module when 'verbatimModuleSyntax' is enabled.
				// https://github.com/kulshekhar/ts-jest/issues/4081#issuecomment-1503684089
				isolatedModules: true,
				// Set the `tsconfig` config option due to the custom location of the TypeScript configuration file
				tsconfig: "lib/tsconfig.esm.json",
			},
		],
	},
	/**
	 * Don't transform anything in node_modules/, and don't transform .json files to prevent the following ts-jest warning:
	 * > ts-jest[ts-jest-transformer] (WARN) Got a unknown file type to compile (file: *.json).
	 */
	transformIgnorePatterns: ["/node_modules/", ".json"],
	verbose: true,
};

export default jestConfig;
