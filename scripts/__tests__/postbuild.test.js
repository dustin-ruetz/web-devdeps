import {appendPrettierConfigFile} from "../utils/appendPrettierConfigFile.js";
import {copyCompiledFilesToLib} from "../utils/copyCompiledFilesToLib.js";
import {copyUncompiledFilesToLib} from "../utils/copyUncompiledFilesToLib.js";
import {deleteDirectoriesInLib} from "../utils/deleteDirectoriesInLib.js";
import {renameFilesInLibCJS} from "../utils/renameFilesInLibCJS.js";
import {renameFilesInLibESM} from "../utils/renameFilesInLibESM.js";
import {postbuild} from "../postbuild";

// Mock out everything to ensure that the code inside these imported modules isn't actually called.
jest.mock("../utils/appendPrettierConfigFile.js");
jest.mock("../utils/copyCompiledFilesToLib.js");
jest.mock("../utils/copyUncompiledFilesToLib.js");
jest.mock("../utils/deleteDirectoriesInLib.js");
jest.mock("../utils/renameFilesInLibCJS.js");
jest.mock("../utils/renameFilesInLibESM.js");

test("it runs all of the necessary post-build file system operations", async () => {
	await postbuild();

	// List the file system operations in the same order that they're called
	// in `postbuild`, and verify that each one is called only once.
	expect(renameFilesInLibCJS).toHaveBeenCalledTimes(1);
	expect(renameFilesInLibESM).toHaveBeenCalledTimes(1);
	expect(appendPrettierConfigFile).toHaveBeenCalledTimes(1);
	expect(copyCompiledFilesToLib).toHaveBeenCalledTimes(1);
	expect(copyUncompiledFilesToLib).toHaveBeenCalledTimes(1);
	expect(deleteDirectoriesInLib).toHaveBeenCalledTimes(1);
});
