import {readdir, rename} from "node:fs/promises";
import {compiledFiles} from "../__mocks__/files";
import {renameFilesInLibCJS} from "../renameFilesInLibCJS";

jest.mock("node:fs/promises", () => ({
	readdir: jest.fn(() => compiledFiles),
	rename: jest.fn(),
}));

test("it renames the files in lib/cjs/ by changing their extensions from .js to .cjs ", async () => {
	await renameFilesInLibCJS();

	// Verify that `readdir` was called once and on the lib/cjs/ directory.
	expect(readdir).toHaveBeenCalledTimes(1);
	expect(readdir).toHaveBeenCalledWith("lib/cjs/");

	// Verify that `rename` was called once for each item in `compiledFiles`.
	expect(rename).toHaveBeenCalledTimes(4);
	// Verify that a sampling of `rename` calls received the correct arguments.
	expect(rename).toHaveBeenNthCalledWith(
		1,
		"lib/cjs/.jestrc.js",
		"lib/cjs/.jestrc.cjs",
	);
	expect(rename).toHaveBeenNthCalledWith(
		4,
		"lib/cjs/jestTransformerBinaryFile.js",
		"lib/cjs/jestTransformerBinaryFile.cjs",
	);
});