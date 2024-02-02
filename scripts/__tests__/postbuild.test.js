import {appendFile, copyFile, readdir, rename} from "node:fs/promises";
import {vi} from "vitest";
import {postbuild} from "../postbuild.js";

vi.mock("node:fs/promises", () => ({
	appendFile: vi.fn(),
	copyFile: vi.fn(),
	readdir: vi.fn(() => [
		"__tests__",
		".eslintignore",
		".prettierignore",
		"commitlint.config.ts",
		"eslint.config.ts",
		"jest.config.ts",
		"jestTransformerBabelJest.ts",
		"jestTransformerBinaryFile.ts",
		"jestTransformerSVGFile.ts",
		"lint-staged.config.ts",
		"prettier.config.ts",
		"vitest.config.ts",
	]),
	rename: vi.fn(),
}));

test("it runs all of the necessary post-build file system operations", async () => {
	await postbuild();

	// Verify that the ESLint config file was renamed (from the .js to .cjs file extension).
	expect(rename).toHaveBeenCalledTimes(1);
	expect(rename).toHaveBeenCalledWith(
		"lib/eslint.config.js",
		"lib/eslint.config.cjs",
	);

	// Verify that the ESLint config file was appended to make it work with CommonJS.
	expect(appendFile).toHaveBeenCalledTimes(1);
	expect(appendFile).toHaveBeenCalledWith(
		"lib/eslint.config.cjs",
		"module.exports = exports.eslintConfig;",
	);

	// Verify that `readdir` was called on the src/ directory.
	expect(readdir).toHaveBeenCalledTimes(1);
	expect(readdir).toHaveBeenCalledWith("src/");

	// Verify that the uncompiled files were copied from src/ to lib/
	expect(copyFile).toHaveBeenCalledTimes(2);
	expect(copyFile).toHaveBeenNthCalledWith(
		1,
		"src/.eslintignore",
		"lib/.eslintignore",
	);
	expect(copyFile).toHaveBeenNthCalledWith(
		2,
		"src/.prettierignore",
		"lib/.prettierignore",
	);
});
