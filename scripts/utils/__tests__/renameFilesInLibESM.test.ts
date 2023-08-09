import {readdir, rename} from "node:fs/promises";
import {compiledFiles} from "../__mocks__/files";
import {renameFilesInLibESM} from "../renameFilesInLibESM";

// const esmFiles = [
// 	".jestrc.js",
// 	".prettierrc.js",
// 	"jestMockNodeCoreModules.js",
// 	"jestTransformerBabelJest.js",
// 	"jestTransformerBinaryFile.js",
// ];

// Refer to scripts/utils/__tests__/copyCompiledFilesToLib.test.js for how/where `readdir` is mocked.
jest.mocked(readdir as jest.Mock).mockImplementation(() => compiledFiles);

test("it renames the files in lib/esm/ by changing their extensions from .js to .mjs ", async () => {
	await renameFilesInLibESM();

	// Verify that `readdir` was called once and on the lib/esm/ directory.
	expect(readdir).toHaveBeenCalledTimes(1);
	expect(readdir).toHaveBeenCalledWith("lib/esm/");

	// Verify that `rename` was called once for each item in `compiledFiles`.
	expect(rename).toHaveBeenCalledTimes(5);
	// Verify that a sampling of `rename` calls received the correct arguments.
	expect(rename).toHaveBeenNthCalledWith(
		1,
		"lib/esm/.jestrc.js",
		"lib/esm/.jestrc.mjs",
	);
	expect(rename).toHaveBeenNthCalledWith(
		5,
		"lib/esm/jestTransformerBinaryFile.js",
		"lib/esm/jestTransformerBinaryFile.mjs",
	);
});
