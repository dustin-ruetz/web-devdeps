import {readdir, rename} from "node:fs/promises";

/** Rename files in lib/esm/ by changing their extensions from .js to .mjs */
export const renameFilesInLibESM = async () => {
	const esmFiles = await readdir("lib/esm/");
	const esmFileNames = esmFiles.map((file) => file.replace(".js", ""));
	for (const fileName of esmFileNames) {
		await rename(`lib/esm/${fileName}.js`, `lib/esm/${fileName}.mjs`);
	}
};
