import type {Configuration} from "lint-staged";

/**
 * @description "Run linters on Git staged files."
 * @returns Configuration for lint-staged.
 * @see {@link https://github.com/lint-staged/lint-staged}
 */
export const makeLintstagedConfig = (): Configuration => ({
	/**
	 * Note: Run "format" and "lint/*" as their base scripts (i.e. _not_ "fix/format" and "fix/lint/*") because
	 * lint-staged passes the staged files by appending their paths as the last arguments to the commands.
	 */
	// Fix code formatting for all file types that Prettier supports.
	"*": "npm run format -- --ignore-unknown --write",
	"*.{css,scss,jsx,tsx}": "npm run lint/styles -- --fix",
	"*.{js,jsx,ts,tsx}": (relativePaths) => {
		const lintJavaScriptTypeScriptCommand = `npm run lint/js-ts -- --fix ${relativePaths.join(" ")}`;

		/**
		 * The "check/types" script runs the TypeScript compiler (`tsc`), but `tsc` ignores the `tsconfig.json` file
		 * due to the file paths that are appended to the command by `lint-staged`. Work around this limitation by
		 * typechecking the entire codebase, i.e. not just the relative paths of the staged files.
		 * @see {@link https://github.com/lint-staged/lint-staged/issues/825}
		 * @see {@link https://github.com/microsoft/TypeScript/issues/27379}
		 */
		const typecheckCommand = "npm run check/types";

		const commandsToRun = [lintJavaScriptTypeScriptCommand, typecheckCommand];

		/**
		 * Array of relative paths to find related tests for (with TypeScript declaration files
		 * and file mocks filtered out, since they don't require unit tests).
		 */
		const relativePathsToFindRelatedTestsFor = relativePaths.filter(
			(relativePath) =>
				!(relativePath.endsWith(".d.ts") || relativePath.includes(".mock")),
		);

		if (relativePathsToFindRelatedTestsFor.length >= 1) {
			const unitTestCommand =
				"npm run test/unit --" +
				// Excerpt from https://jestjs.io/docs/cli#--findrelatedtests-spaceseparatedlistofsourcefiles:
				// > Find and run the tests that cover a space-separated list of source files that were passed in as arguments.
				// > Useful for pre-commit hook integration to run the minimal amount of tests necessary.
				` --findRelatedTests ${relativePathsToFindRelatedTestsFor.join(" ")}`;

			commandsToRun.push(unitTestCommand);
		}

		return commandsToRun;
	},
});

export default makeLintstagedConfig();
