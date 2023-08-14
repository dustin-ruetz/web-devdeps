import {rm} from "node:fs/promises";

/** Delete the lib/cjs/ and lib/esm/ directories. */
export const deleteDirectoriesInLib = async () => {
	const directoriesToDelete = ["lib/cjs/", "lib/esm/"];

	await Promise.all(
		directoriesToDelete.map((directory) =>
			rm(directory, {force: true, recursive: true}),
		),
	);
};
