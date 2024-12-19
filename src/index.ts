#!/usr/bin/env node

import {initRepo, logInitRepoHelpText} from "./scripts/initRepo.js";
import {runCLI} from "./scripts/runCLI.js";
import {CustomError} from "./utils/CustomError.js";

/**
 *
 * @description Function that serves as the entrypoint for the runnable Node.js CLI scripts provided by `web-devdeps`.
 * @see [package.json](../package.json) (specifically the `packageJSON.bin` field)
 */
export const runScript = async () => {
	const [
		_execPath, // executor - the Node.js executable
		_filePath, // ignoredBin - ./lib/ (i.e. the path to the JavaScript file being executed)
		script, // the name of the script to run
		...args // all arguments that follow the script name
	] = process.argv;

	/** List of known scripts. */
	/* eslint sort-keys: ["error", "asc"] */
	const scripts = {
		format: "format",
		githooksCommitMsg: "githooks/commit-msg",
		githooksPreCommit: "githooks/pre-commit",
		initRepo: "init-repo",
		lintJsTs: "lint/js-ts",
		lintStyles: "lint/styles",
		testUnit: "test/unit",
	} as const;

	switch (script) {
		case scripts.format: {
			runCLI("prettier", args);
			return;
		}
		case scripts.githooksCommitMsg: {
			runCLI("commitlint", args);
			return;
		}
		case scripts.githooksPreCommit: {
			runCLI("lint-staged", args);
			return;
		}
		case scripts.initRepo: {
			const hasHelpFlag = Boolean(
				args.find((arg) => arg === "--help" || arg === "-h"),
			);

			// If either 1) no arguments are passed, or 2) one of the `help` flags are passed, then:
			if (args.length === 0 || hasHelpFlag) {
				// 1. Log the help text for the command.
				void logInitRepoHelpText();
				// 2. Terminate the script.
				return;
			}

			// The repository name is the only required argument and it has to be the first one, so:
			// 1. `shift` it out of the `args` array if it's defined; or
			// 2. Set it to an empty string if it's `undefined` and let the `initRepo` function throw an error.
			const repoName = args.shift() ?? "";
			await initRepo(repoName, args);
			return;
		}
		case scripts.lintJsTs: {
			runCLI("eslint", args);
			return;
		}
		case scripts.lintStyles: {
			runCLI("stylelint", args);
			return;
		}
		case scripts.testUnit: {
			runCLI("jest", args);
			return;
		}
		default: {
			throw new CustomError(
				`Unknown script. Known scripts are: [${Object.values(scripts).join(", ")}]`,
				{
					cause: {
						code: "ERR_UNKNOWN_SCRIPT",
						values: {script},
					},
					name: "InvalidInputError",
				},
			);
		}
	}
};

// The unit test for this file imports the `runScript` function to test it, but the problem with this
// is that `runScript` gets called in the test just from importing it. Since Jest automatically sets
// the `NODE_ENV=test` environment variable when the test suite is run, use this as the conditional
// logic to prevent `runScript` from being automatically called when it's imported for the unit test.
//
// It's very difficult to test whether or not the `runScript` function is called based on the value of `NODE_ENV`,
// so use the special `v8 ignore next #` comment to exclude these lines from the test coverage report.
/* v8 ignore next 3 */
if (process.env["NODE_ENV"] !== "test") {
	void runScript();
}
