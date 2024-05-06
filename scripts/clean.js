import {rm} from "node:fs/promises";

/** Delete the lib/ directory where the compiled code is built to. */
export const clean = async () => {
	// The following line simulates the behavior of the Unix `rm -rf directoryName/` command,
	// but since this is a Node script this operation can be run in a cross-platform way.
	await rm("lib/", {force: true, recursive: true});
};

// The unit test for this file imports the `clean` function to test it, but the problem with this is that `clean`
// gets called in the test just from importing it. Since Jest automatically sets the `NODE_ENV=true` environment variable
// when the test suite is run, use this as the conditional logic so that the `clean` function is only called via the
// `npm run clean` script and not automatically when it's imported for the unit test.
//
// It's very difficult to test whether or not the `clean` function is called based on the value of `NODE_ENV`,
// so use the special `v8` comment to exclude these lines from the test coverage report.
// TODO: Post this issue as a question on Stack Overflow.
/* v8 ignore next 3 */
if (process.env.NODE_ENV !== "test") {
	void clean();
}
