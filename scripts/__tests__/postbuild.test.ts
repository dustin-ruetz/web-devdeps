import {appendESLintConfigFile} from "../utils/appendESLintConfigFile";
import {copyCompiledFilesToLib} from "../utils/copyCompiledFilesToLib";
import {copyUncompiledFilesToLib} from "../utils/copyUncompiledFilesToLib";
import {deleteDirectoriesInLib} from "../utils/deleteDirectoriesInLib";
import {renameFilesInLibCJS} from "../utils/renameFilesInLibCJS";
import {renameFilesInLibESM} from "../utils/renameFilesInLibESM";
import {postbuild} from "../postbuild";

// Mock out everything to ensure that the code inside these imported modules isn't actually called.
jest.mock("../utils/appendESLintConfigFile");
jest.mock("../utils/copyCompiledFilesToLib");
jest.mock("../utils/copyUncompiledFilesToLib");
jest.mock("../utils/deleteDirectoriesInLib");
jest.mock("../utils/renameFilesInLibCJS");
jest.mock("../utils/renameFilesInLibESM");

test("it runs all of the necessary post-build file system operations", async () => {
	await postbuild();

	// List the file system operations in the same order that they're called
	// in `postbuild`, and verify that each one is called only once.
	expect(renameFilesInLibCJS).toHaveBeenCalledTimes(1);
	expect(renameFilesInLibESM).toHaveBeenCalledTimes(1);
	expect(appendESLintConfigFile).toHaveBeenCalledTimes(1);
	expect(copyCompiledFilesToLib).toHaveBeenCalledTimes(1);
	expect(copyUncompiledFilesToLib).toHaveBeenCalledTimes(1);
	expect(deleteDirectoriesInLib).toHaveBeenCalledTimes(1);
});
