import {appendFile, copyFile, readdir, rename} from "node:fs/promises";

const postbuild = async () => {
	// Copy the uncompiled non-TypeScript files from src/config/ to lib/
	const srcFiles = await readdir("src/");

	const jsonFiles = srcFiles.filter((file) => file.includes(".json"));

	const filesToCopy = [...jsonFiles];
	filesToCopy.forEach(async (file) => {
		await copyFile(`src/${file}`, `lib/${file}`);
	});
};
postbuild();
