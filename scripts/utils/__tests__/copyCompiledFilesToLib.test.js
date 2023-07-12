import {copyFile, readdir} from "node:fs/promises";
import {cjsFiles, esmFiles} from "../__mocks__/files.js";
import {copyCompiledFilesToLib} from "../copyCompiledFilesToLib.js";

// `readdir` is already equal to a mocked `jest.fn()` here due to the Jest config
// `setupFilesAfterEnv` option and the lib/jestMockNodeCoreModules.mjs file, so just use
// `mockImplementation` to mock out its return values based on the `path` argument.
readdir.mockImplementation((path) => {
	switch (path) {
		case "lib/cjs/":
			return cjsFiles;
		case "lib/esm/":
			return esmFiles;
	}
});

test("it copies the compiled files from lib/cjs/ and lib/esm/ to lib/", async () => {
	await copyCompiledFilesToLib();

	// Verify that `readdir` was called twice and on the correct directories.
	expect(readdir).toHaveBeenCalledTimes(2);
	expect(readdir).toHaveBeenNthCalledWith(1, "lib/cjs/");
	expect(readdir).toHaveBeenNthCalledWith(2, "lib/esm/");

	// Verify that `copyFile` was called once per item in both `cjsFiles` and `esmFiles`.
	expect(copyFile).toHaveBeenCalledTimes(10);
	// Verify that a sampling of `copyFile` calls received the correct arguments.
	expect(copyFile).toHaveBeenNthCalledWith(
		1,
		"lib/cjs/.jestrc.cjs",
		"lib/.jestrc.cjs",
	);
	expect(copyFile).toHaveBeenNthCalledWith(
		5,
		"lib/cjs/jestTransformerBinaryFile.cjs",
		"lib/jestTransformerBinaryFile.cjs",
	);
	expect(copyFile).toHaveBeenNthCalledWith(
		6,
		"lib/esm/.jestrc.mjs",
		"lib/.jestrc.mjs",
	);
	expect(copyFile).toHaveBeenNthCalledWith(
		10,
		"lib/esm/jestTransformerBinaryFile.mjs",
		"lib/jestTransformerBinaryFile.mjs",
	);
});
