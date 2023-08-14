import {copyFile, readdir} from "node:fs/promises";

/** Copy the compiled TypeScript files from lib/cjs/ and lib/esm/ to lib/ */
export const copyCompiledFilesToLib = async () => {
	const cjsFiles = await readdir("lib/cjs/");
	await Promise.all(
		cjsFiles.map((file) => copyFile(`lib/cjs/${file}`, `lib/${file}`)),
	);

	const esmFiles = await readdir("lib/esm/");
	await Promise.all(
		esmFiles.map((file) => copyFile(`lib/esm/${file}`, `lib/${file}`)),
	);
};
