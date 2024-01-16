import {appendFile} from "node:fs/promises";
import {appendCommitlintConfigFile} from "../appendCommitlintConfigFile";

jest.mock("node:fs/promises");

test("it appends the commintlint config file to make it work as a CommonJS export", async () => {
	await appendCommitlintConfigFile();

	// Verify that `appendFile` was called once and with the correct arguments.
	expect(appendFile).toHaveBeenCalledTimes(1);
	expect(appendFile).toHaveBeenCalledWith(
		"lib/cjs/.commitlintrc.cjs",
		"module.exports = exports.commitlintConfig;",
	);
});
