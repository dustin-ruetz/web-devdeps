import {rm} from "node:fs/promises";

export const prebuild = async () => {
	// Delete the lib/ directory.
	// The following line simulates behavior of the Unix `rm -rf directoryName/` command,
	// but since this is a Node script this operation can be run in a cross-platform way.
	await rm("lib/", {force: true, recursive: true});
};

// The unit test for this file imports the `prebuild` function to test it, but the problem with this is that `prebuild`
// gets called in the test just from importing it. Since Jest automatically sets the `NODE_ENV=true` environment variable
// when the test suite is run, use this as the conditional logic so that the `prebuild` function is only called via the
// `npm run prebuild` script and not automatically when it's imported for the unit test.

// It's very difficult to test whether or not the `prebuild` function is called based on the value of `NODE_ENV`,
// so use the special `istanbul` comment to exclude these lines from the test coverage report.
// TODO: Post this issue as a question on Stack Overflow.

// Excerpt from https://github.com/istanbuljs/nyc#parsing-hints-ignoring-lines:
// > There may be some sections of your codebase that you wish to purposefully exclude
// > from coverage tracking, to do so you can use the following parsing hints:
// > - `/* istanbul ignore next */`: ignore the next _thing_ in the source-code
// >   (functions, if statements, classes, you name it).
/* v8 ignore next 3 */
if (process.env.NODE_ENV !== "test") {
	void prebuild();
}
