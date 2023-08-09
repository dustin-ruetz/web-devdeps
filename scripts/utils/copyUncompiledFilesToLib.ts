import {copyFile, readdir} from "node:fs/promises";

/** Copy the uncompiled non-TypeScript files from src/ to lib/ */
export const copyUncompiledFilesToLib = async () => {
	const srcFiles = await readdir("src/");

	const dotFiles = srcFiles.filter((file) => {
		if (file[0] === "." && !file.includes(".ts")) {
			return file;
		}
	});
	const jsonFiles = srcFiles.filter((file) => file.includes(".json"));

	const filesToCopy = [...dotFiles, ...jsonFiles];
	for (const file of filesToCopy) {
		await copyFile(`src/${file}`, `lib/${file}`);
	}
};
