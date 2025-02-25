import {readdir} from "node:fs/promises";
import {packageName} from "../src/constants.ts";
import packageJSON from "../package.json" with {type: "json"};

test("INTEGRATION: the NPM package name matches the one exported from the `constants` file", () => {
	expect(packageJSON.name).toBe(packageName);
});

test("INTEGRATION: the original `src/` files are mapped one-to-one with the compiled `lib/` files", async () => {
	expect.hasAssertions();

	/**
	 * @description Normalizes the contents of a directory by reading it, filtering out
	 *              items as needed, sorting it, and removing the file extensions.
	 * @param directory - The directory of files to read.
	 * @returns Normalized array of strings representing the directory's files.
	 */
	const getDirectoryFiles = async (directory: string) => {
		/** Contents of passed `directory` (includes its subdirectory folders/files due to the `recursive: true` option). */
		const directoryContents = await readdir(directory, {
			encoding: "utf-8",
			recursive: true,
		});

		/* eslint-disable jest/no-conditional-in-test */
		/** Normalized array of strings representing the directory's files. */
		const files = directoryContents
			// Filter out all folder names as well as mock and test files (the latter two are deliberately excluded from compilation).
			.filter(
				// Filter the item _in_ as a file if:
				(item) =>
					// 1. It *does* end with one of the following file extensions; and
					(item.endsWith(".js") || item.endsWith(".ts")) &&
					// 2. It *does not* contain one of the following substrings.
					!(
						item.endsWith(".d.ts") ||
						item.includes(".mock") ||
						item.includes(".test")
					),
			)
			// Sort the array in alphabetical order.
			.sort()
			// Trim off the file extensions to easily compare files between the `src/` and `lib/` directories.
			.map((file) => {
				let fileWithoutExtension = "";

				if (file.endsWith(".js")) {
					fileWithoutExtension = file.replace(".js", "");
				}
				if (file.endsWith(".ts")) {
					fileWithoutExtension = file.replace(".ts", "");
				}

				return fileWithoutExtension;
			});

		return files;
	};
	/* eslint-enable jest/no-conditional-in-test */

	const [srcFiles, libFiles] = await Promise.all([
		getDirectoryFiles("src/"),
		getDirectoryFiles("lib/"),
	]);

	expect(srcFiles).toHaveLength(libFiles.length);
	expect(srcFiles).toStrictEqual(libFiles);
});
