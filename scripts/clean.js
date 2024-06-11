import {rm} from "node:fs/promises";

/**
 * Delete the lib/ directory where the compiled code is built to. Log a message in the event
 * of both success (lib/ is removed) and failure (i.e. lib/ does not exist).
 */
export const clean = async () => {
	const dirToDelete = "lib/";

	/* eslint-disable no-console */
	try {
		console.log(`🧹-ℹ️ Attempting to remove ${dirToDelete} directory...`);

		// The following line simulates the behavior of the Unix `rm -rf directoryName/` command, but since this is
		// a Node.js script this operation can be run in an OS-agnostic way (i.e. on Linux, macOS or Windows).
		await rm(dirToDelete, {recursive: true});

		console.log(`🧹-✅ Successfully removed ${dirToDelete} directory.`);
	} catch (error) {
		// Ideally the only conditional check here would be on the `error.code`, but mocking the thrown error
		// does not work as expected in the unit test, so include an extra check on the `error.message` here.
		if (error.code === "ENOENT" || error.message.includes("ENOENT")) {
			console.log(
				`🧹-⚠️ The ${dirToDelete} directory does not exist; nothing to remove.`,
			);
			return;
		}

		throw error;
	}
	/* eslint-enable no-console */
};

// - Ideally the `clean` function would just be called unconditionally at the end of this `clean.js` file,
//   since it's meant to be used as a Node.js script and run via the `node ./scripts/clean.js` CLI command.
// - While this does work, an unfortunate side effect is that `clean` gets automatically called
//   just from importing the function in its associated unit test file.
// - The conditional logic below ensures that `clean` is only called by the `npm run clean` command.
// - Exclude the following lines from the test coverage report since it's difficult
//   to mock the value of this environment variable since it's outside of `clean`.
/* v8 ignore next 3 */
if (process.env.npm_lifecycle_event === "clean") {
	void clean();
}
