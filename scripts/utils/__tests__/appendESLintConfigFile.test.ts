import {appendFile} from "node:fs/promises";
import {appendESLintConfigFile} from "../appendESLintConfigFile";

jest.mock("node:fs/promises");

test("it appends the ESLint config file to make it work as a CommonJS export", async () => {
	await appendESLintConfigFile();

	// Verify that `appendFile` was called once and with the correct arguments.
	expect(appendFile).toHaveBeenCalledTimes(1);
	expect(appendFile).toHaveBeenCalledWith(
		"lib/cjs/.eslintrc.cjs",
		"module.exports = exports.eslintConfig;",
	);
});
