import {rm} from "node:fs/promises";

/** Delete the lib/cjs/ and lib/esm/ directories. */
export const deleteDirectoriesInLib = async () => {
	await Promise.all(
		["lib/cjs/", "lib/esm/"].map((directory) =>
			rm(directory, {force: true, recursive: true}),
		),
	);
};
