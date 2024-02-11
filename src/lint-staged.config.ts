import {type Config} from "lint-staged";

/** https://github.com/lint-staged/lint-staged */
const lintstagedConfig: Config = {
	/**
	 * Note: Run "format" and "lint" as their base scripts (i.e. _not_ "format:check" and "lint:check")
	 * because lint-staged will pass just the paths of the staged files as an argument to these commands.
	 */
	// Fix code formatting for all file types that Prettier supports.
	"*": "npm run format -- --ignore-unknown --write",
	"*.{js,jsx,ts,tsx}": "npm run lint -- --fix",
	// This repo has unit tests for JSON files, so include them in the glob pattern.
	"*.{js,jsx,json,ts,tsx}": (relativePaths) => {
		const filesToIncludeInCoverage = relativePaths.map(
			// Use `--coverage.include=${relativePath}` to generate a scoped test coverage report.
			(relativePath) => `--coverage.include=${relativePath}`,
		);

		const testCommand =
			"npm run vitest --" +
			// Excerpt from https://vitest.dev/guide/cli.html#vitest-related:
			// > Run only tests that cover a list of source files. All files should be relative to root folder.
			` related --run ${relativePaths.join(" ")}` +
			` --coverage.enabled ${filesToIncludeInCoverage.join(" ")}`;

		return testCommand;
	},
	// Disable typechecking because of obtuse errors.
	// "*.{ts,tsx}": "npm run typecheck",
} as const;

export default lintstagedConfig;
