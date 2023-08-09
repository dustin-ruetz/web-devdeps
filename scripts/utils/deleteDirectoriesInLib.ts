import {rm} from "node:fs/promises";

/** Delete the lib/cjs/ and lib/esm/ directories. */
export const deleteDirectoriesInLib = async () => {
	await rm("lib/cjs/", {force: true, recursive: true});
	await rm("lib/esm/", {force: true, recursive: true});
};
