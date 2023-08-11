import {copyFile, readdir} from "node:fs/promises";

/** Copy the uncompiled non-TypeScript files from src/ to lib/ */
export const copyUncompiledFilesToLib = async () => {
	const srcFiles = await readdir("src/");

	const dotFiles = srcFiles.filter(
		(file) => file.startsWith(".") && !file.endsWith(".ts"),
	);
	const jsonFiles = srcFiles.filter((file) => file.endsWith(".json"));

	const filesToCopy = [...dotFiles, ...jsonFiles];
	for (const file of filesToCopy) {
		await copyFile(`src/${file}`, `lib/${file}`);
	}
};
