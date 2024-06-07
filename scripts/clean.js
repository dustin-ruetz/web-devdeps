import {rm} from "node:fs/promises";

/** Delete the lib/ directory where the compiled code is built to. */
export const clean = async () => {
	const environments = {
		/**
		 * Excerpt from https://docs.github.com/en/actions/learn-github-actions/variables#default-environment-variables:
		 * > `CI` - Always set to `true`.
		 */
		isCI: process.env.CI === "true",
		/**
		 * Excerpt from https://jestjs.io/docs/environment-variables:
		 * > `NODE_ENV` - Set to `"test"` if it's not already set to something else.
		 */
		isTest: process.env.NODE_ENV === "test",
	};

	// Return early to avoid `clean`ing in the CI/CD or test environments because:
	if (
		// 1. The CI/CD environment will never have the lib/ directory because A) lib/ is in the .gitignore file,
		//    and B) GitHub Actions does a fresh Git checkout of the repo every time a workflow is run.
		environments.isCI ||
		// 2. The unit test for this file imports the `clean` function and then calls it during the "act" part of the AAA
		//    testing process, so return here to A) avoid executing the function's actual logic, and B) simplify testing.
		environments.isTest
	) {
		return;
	}

	const dirToDelete = "lib/";

	// eslint-disable-next-line no-console
	console.log(`🧹 Removing ${dirToDelete} directory`);

	// The following line simulates the behavior of the Unix `rm -rf directoryName/` command,
	// but since this is a Node script this operation can be run in a cross-platform way.
	await rm(dirToDelete, {force: true, recursive: true});
};

void clean();
