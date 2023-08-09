import {copyFile, readdir} from "node:fs/promises";
import {uncompiledFiles} from "../__mocks__/files";
import {copyUncompiledFilesToLib} from "../copyUncompiledFilesToLib";

jest.mock("node:fs/promises");
jest.mocked(readdir as jest.Mock).mockImplementation(() => uncompiledFiles);

test("it copies uncompiled non-TypeScript files from src/ to lib/", async () => {
	await copyUncompiledFilesToLib();

	// Verify that `readdir` was called once on the src/ directory.
	expect(readdir).toHaveBeenCalledTimes(1);
	expect(readdir).toHaveBeenCalledWith("src/");

	// Verify that `copyFile` was called once for each item in `uncompiledFiles`.
	expect(copyFile).toHaveBeenCalledTimes(4);
	// Verify that a sampling of `copyFile` calls received the correct arguments.
	expect(copyFile).toHaveBeenNthCalledWith(
		1,
		"src/.prettierignore",
		"lib/.prettierignore",
	);
	expect(copyFile).toHaveBeenNthCalledWith(
		4,
		"src/tsconfig.esm.json",
		"lib/tsconfig.esm.json",
	);
});
