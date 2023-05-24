import {copyFile, readdir} from "node:fs/promises";

// Originally I wanted to use async/await with the `forEach()` function, but this wouldn't always
// work the way that I expected it to. MDN suggests using `for of` as a succinct alternative.
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises#composition

/** Copy the compiled TypeScript files from lib/cjs/ and lib/esm/ to lib/ */
export const copyCompiledFilesToLib = async () => {
	const cjsFiles = await readdir("lib/cjs/");
	for (const file of cjsFiles) {
		await copyFile(`lib/cjs/${file}`, `lib/${file}`);
	}

	const esmFiles = await readdir("lib/esm/");
	for (const file of esmFiles) {
		await copyFile(`lib/esm/${file}`, `lib/${file}`);
	}
};
