import {type Config} from "lint-staged";

/** https://github.com/lint-staged/lint-staged */
const lintstagedConfig: Config = {
	/**
	 * Note: Run "format" and "lint" as their base scripts (i.e. _not_ "format:check" and "lint:check")
	 * because lint-staged will pass just the paths of the staged files as an argument to these commands.
	 */
	// Fix code formatting for all file types that ESLint and Prettier support.
	"*": "npm run format -- --ignore-unknown --write",
	"*.{js,jsx,ts,tsx}": "npm run lint -- --fix",
	// This repo has unit tests for JSON files, so include them in the glob pattern.
	"*.{js,jsx,json,ts,tsx}": (relativePaths) => {
		const testRunners = {
			jest: "jest",
			vitest: "vitest",
		} as const;
		const {TEST_RUNNER} = process.env;

		switch (TEST_RUNNER) {
			case testRunners.jest:
			case typeof "undefined":
			default: {
				const jestCommand =
					"npm run jest:coverage --" +
					// Excerpt from https://jestjs.io/docs/cli#--findrelatedtests-spaceseparatedlistofsourcefiles:
					// > Find and run the tests that cover a space-separated list of source files that were passed in as arguments.
					// > Useful for pre-commit hook integration to run the minimal amount of tests necessary.
					" --findRelatedTests" +
					// Excerpt from https://jestjs.io/docs/cli#--collectcoveragefromglob:
					// > A glob pattern relative to `rootDir` matching the files that coverage info needs to be collected from.
					" --collectCoverageFrom=" +
					// Important: Add a space between `--collectCoverageFrom=` and the relative paths to properly scope the coverage report.
					` ${relativePaths.join(" ")}`;

				return jestCommand;
			}
			case testRunners.vitest: {
				const filesToIncludeInCoverage = relativePaths.map(
					// Use `--coverage.include` to generate a scoped test coverage report.
					(relativePath) => `--coverage.include=${relativePath}`,
				);

				const vitestCommand =
					"npm run vitest --" +
					// Excerpt from https://vitest.dev/guide/cli.html#vitest-related:
					// > Run only tests that cover a list of source files. All files should be relative to root folder.
					` related --run ${relativePaths.join(" ")}` +
					// > Excerpt from https://vitest.dev/config/#coverage-include:
					// > List of files included in coverage as glob patterns.
					` --coverage.enabled ${filesToIncludeInCoverage.join(" ")}`;

				return vitestCommand;
			}
		}
	},
	// Disable typechecking because of obtuse errors.
	// "*.{ts,tsx}": "npm run typecheck",
} as const;

export default lintstagedConfig;
