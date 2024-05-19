import {readdir} from "node:fs/promises";

test("INTEGRATION: ensure that the original src/ files are mapped one-to-one with the compiled lib/ files", async () => {
	/** Normalizes the contents of a directory by reading it, filtering out items as needed, sorting it, and removing the file extensions. */
	const getDirectoryFiles = async (directory: string) => {
		/** Contents of passed `directory` (includes its subdirectory folders/files due to the `recursive: true` option). */
		const directoryContents: string[] = await readdir(directory, {
			encoding: "utf-8",
			recursive: true,
		});

		/** Normalized array of strings representing the directory's files. */
		const files = directoryContents
			// Filter out all folder names as well as mock and test files (the latter two are deliberately excluded from compilation).
			.filter(
				// Filter the item _in_ as a file if:
				(item) =>
					// 1. It _does_ end with one of the following file extensions; and
					(item.endsWith(".cjs") ||
						item.endsWith(".cts") ||
						item.endsWith(".js") ||
						item.endsWith(".ts")) &&
					// 2. It _does not_ contain the ".mock" or ".test" substrings.
					!(item.includes(".mock") || item.includes(".test")),
			)
			// Sort the array in alphabetical order.
			.sort()
			// Trim off the file extensions to easily compare files between the src/ and lib/ directories.
			.map((file) => {
				let fileWithoutExtension = "";

				if (file.endsWith(".cjs")) {
					fileWithoutExtension = file.replace(".cjs", "");
				}
				if (file.endsWith(".cts")) {
					fileWithoutExtension = file.replace(".cts", "");
				}
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

	const [srcFiles, libFiles] = await Promise.all([
		await getDirectoryFiles("src/"),
		await getDirectoryFiles("lib/"),
	]);

	expect(srcFiles.length).toEqual(libFiles.length);
	expect(srcFiles).toStrictEqual(libFiles);
});
