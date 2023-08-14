import {readdir, rename} from "node:fs/promises";

/** Rename files in lib/cjs/ by changing their extensions from .js to .cjs */
export const renameFilesInLibCJS = async () => {
	const cjsFiles = await readdir("lib/cjs/");
	const cjsFileNames = cjsFiles.map((file) => file.replace(".js", ""));

	await Promise.all(
		cjsFileNames.map((fileName) =>
			rename(`lib/cjs/${fileName}.js`, `lib/cjs/${fileName}.cjs`),
		),
	);
};
