import {rm} from "node:fs/promises";

/** Delete the lib/ directory where the compiled code is built to. */
export const clean = async () => {
	const dirToDelete = "lib/";

	/**
	 * Excerpt from https://docs.github.com/en/actions/learn-github-actions/variables#default-environment-variables:
	 * > `CI` - Always set to `true`.
	 */
	const isCI = process.env.CI === "true";
	if (isCI) {
		// The CI/CD environment will never have the lib/ directory because 1) lib/ is in the .gitignore file,
		// and 2) GitHub Actions does a fresh Git checkout of the repo every time a workflow is run.
		// eslint-disable-next-line no-console
		console.log(
			`ℹ️ Running in CI/CD environment; skip removing ${dirToDelete} directory since there's nothing to clean`,
		);
		return;
	}

	// eslint-disable-next-line no-console
	console.log(`🧹 Removing ${dirToDelete} directory`);

	// The following line simulates the behavior of the Unix `rm -rf directoryName/` command,
	// but since this is a Node script this operation can be run in a cross-platform way.
	await rm(dirToDelete, {force: true, recursive: true});
};

/* v8 ignore next 3 */
if (process.env.npm_lifecycle_event === "clean") {
	void clean();
}
