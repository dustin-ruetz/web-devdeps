import {copyFile, readdir} from "node:fs/promises";
import {cjsFiles, esmFiles} from "../__mocks__/files";
import {copyCompiledFilesToLib} from "../copyCompiledFilesToLib";

jest.mock("node:fs/promises", () => ({
	copyFile: jest.fn(),
	readdir: jest.fn((path) => {
		switch (path) {
			case "lib/cjs/":
				return cjsFiles;
			case "lib/esm/":
				return esmFiles;
		}
	}),
}));

test("it copies the compiled files from lib/cjs/ and lib/esm/ to lib/", async () => {
	await copyCompiledFilesToLib();

	// Verify that `readdir` was called twice and on the correct directories.
	expect(readdir).toHaveBeenCalledTimes(2);
	expect(readdir).toHaveBeenNthCalledWith(1, "lib/cjs/");
	expect(readdir).toHaveBeenNthCalledWith(2, "lib/esm/");

	// Verify that `copyFile` was called once per item in both `cjsFiles` and `esmFiles`.
	expect(copyFile).toHaveBeenCalledTimes(14);
	// Verify that a sampling of `copyFile` calls received the correct arguments.
	expect(copyFile).toHaveBeenNthCalledWith(
		1,
		"lib/cjs/.commitlintrc.cjs",
		"lib/.commitlintrc.cjs",
	);
	expect(copyFile).toHaveBeenNthCalledWith(
		7,
		"lib/cjs/jestTransformerSVGFile.cjs",
		"lib/jestTransformerSVGFile.cjs",
	);
	expect(copyFile).toHaveBeenNthCalledWith(
		8,
		"lib/esm/.commitlintrc.mjs",
		"lib/.commitlintrc.mjs",
	);
	expect(copyFile).toHaveBeenNthCalledWith(
		14,
		"lib/esm/jestTransformerSVGFile.mjs",
		"lib/jestTransformerSVGFile.mjs",
	);
});
