import type {Config} from "jest";
import jestConfig, {getTransformConfig} from "./jest.config.js";

const devDepsIgnorePatterns = [
	// Ignore the scripts/ directory because the unit tests are using `vi` for mocking
	// and `v8` (instead of `istanbul`) as the coverage provider.
	"<rootDir>/scripts/",
	// Ignore the hasDependency.ts file because it references the `import.meta.url` variable which causes
	// Jest/Babel to throw the `ERROR: unknown: import.meta may appear only with 'sourceType: "module"'`.
	"<rootDir>/src/hasDependency.ts",
	// Ignore this file since it's too much hassle to test the `jestConfig.coveragePathIgnorePatterns` conditional.
	"<rootDir>/src/jest.config.devdeps.ts",
];

/** Jest configuration specifically for running the tests on this `dr-devdeps` repository. */
const jestConfigDevDeps: Config = {
	...jestConfig,
	rootDir: "../",
	// Some options can be either an array of strings or `undefined`; set them to an empty array in the latter case.
	coveragePathIgnorePatterns: [
		// Ignore the `jestConfig.coveragePathIgnorePatterns` conditional since it's too much hassle to test it.
		/* v8 ignore next 1 */
		...(jestConfig.coveragePathIgnorePatterns || []),
		...devDepsIgnorePatterns,
	],
	testPathIgnorePatterns: [
		...(jestConfig.testPathIgnorePatterns || []),
		...devDepsIgnorePatterns,
	],
	transform: getTransformConfig({isDevDepsJestConfig: true}),
};

export default jestConfigDevDeps;
