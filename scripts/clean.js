import {rm} from "node:fs/promises";

/** Delete the lib/ directory where the compiled code is built to. */
export const clean = async () => {
	const dirToDelete = "lib/";

	/**
	 * Excerpt from https://docs.github.com/en/actions/learn-github-actions/variables#default-environment-variables:
	 * > `CI` - Always set to `true`.
	 */
	const isCI = process.env.CI === "true";
	/**
	 * Excerpt from https://jestjs.io/docs/environment-variables:
	 * > `NODE_ENV` - Set to `"test"` if it's not already set to something else.
	 */
	const isTest = process.env.NODE_ENV === "test";

	/* eslint-disable no-console */
	// Return early to avoid `clean`ing in the CI/CD or test environments because:
	// 1. The CI/CD environment will never have the lib/ directory because A) lib/ is in the .gitignore file,
	//    and B) GitHub Actions does a fresh Git checkout of the repo every time a workflow is run.
	if (isCI) {
		console.log(
			`ℹ️ Running in CI/CD environment; skip removing ${dirToDelete} directory`,
		);
		return;
	}
	// 2. The unit test for this file imports the `clean` function and then calls it during the "act" phase of the AAA
	//    testing process, so return here to A) avoid executing the function's actual logic, and B) simplify testing.
	if (isTest) {
		console.log(
			`ℹ️ Running in test environment; skip removing ${dirToDelete} directory`,
		);
		return;
	}

	console.log(`🧹 Removing ${dirToDelete} directory`);
	/* eslint-enable no-console */

	// The following line simulates the behavior of the Unix `rm -rf directoryName/` command,
	// but since this is a Node script this operation can be run in a cross-platform way.
	await rm(dirToDelete, {force: true, recursive: true});
};

void clean();
