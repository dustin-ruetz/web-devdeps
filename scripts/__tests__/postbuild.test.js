import {appendFile, readFile, rename, writeFile} from "node:fs/promises";
import {postbuild} from "../postbuild.js";

jest.mock("node:fs/promises");

test("it runs all of the necessary post-build file system operations", async () => {
	await postbuild();

	// Verify that 1) the .gitignore file was read, and 2) that the .eslintignore and .prettierignore files were written.
	expect(readFile).toHaveBeenCalledTimes(1);
	expect(readFile).toHaveBeenCalledWith(".gitignore", {encoding: "utf-8"});
	expect(writeFile).toHaveBeenCalledTimes(2);
	expect(writeFile).toHaveBeenCalledWith(
		".eslintignore",
		expect.stringMatching(
			/Do not edit this auto-generated .eslintignore file directly/,
		),
		{encoding: "utf-8"},
	);
	expect(writeFile).toHaveBeenCalledWith(
		".prettierignore",
		expect.stringMatching(
			/Do not edit this auto-generated .prettierignore file directly/,
		),
		{encoding: "utf-8"},
	);

	// Verify that the ESLint config file was renamed (from the .js to .cjs file extension).
	expect(rename).toHaveBeenCalledTimes(1);
	expect(rename).toHaveBeenCalledWith(
		"lib/eslint.config.js",
		"lib/eslint.config.cjs",
	);

	// Verify that the ESLint config file was appended to make it work with CommonJS.
	expect(appendFile).toHaveBeenCalledTimes(1);
	expect(appendFile).toHaveBeenCalledWith(
		"lib/eslint.config.cjs",
		"module.exports = exports.eslintConfig;",
	);
});
