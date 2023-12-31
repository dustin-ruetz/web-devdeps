import {appendFile} from "node:fs/promises";
import {appendPrettierConfigFile} from "../appendPrettierConfigFile";

jest.mock("node:fs/promises");

test("it appends the Prettier config file to make it work as a CommonJS export", async () => {
	await appendPrettierConfigFile();

	// Verify that `appendFile` was called once and with the correct arguments.
	expect(appendFile).toHaveBeenCalledTimes(1);
	expect(appendFile).toHaveBeenCalledWith(
		"lib/cjs/.prettierrc.cjs",
		"module.exports = exports.prettierConfig;",
	);
});
