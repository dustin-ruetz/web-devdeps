import {appendFile, copyFile, readdir, rename} from "node:fs/promises";

// Originally I wanted to use async/await with the forEach() function, but this doesn't always
// work the way that I expect it to. MDN suggests using `for of` as a succinct alternative.
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises#composition

/**
 * Append files in lib/cjs/ with a `module.exports` line in order to:
 * 1. simplify the codebase by having everything written in ESModule syntax,
 * 2. export both CommonJS- and ESModule-compatible code from their respective lib/ directories, and
 * 3. use tsc for building/compiling without needing to install additional dependencies.
 */
const appendFilesInLibCJS = async () => {
	const cjsFiles = await readdir("lib/cjs/");

	for (const file of cjsFiles) {
		switch (file) {
			// Note that Prettier requires a CommonJS file using `module.exports` in its current v2 iteration, but if this changes
			// in v3 then it may be possible to remove all CommonJS-related code/compilation entirely from this repo.
			// Excerpt from https://prettier.io/docs/en/configuration.html:
			// > You can configure Prettier via a `.prettierrc.cjs` file that exports an object using `module.exports`.
			case ".prettierrc.cjs": {
				await appendFile(
					"lib/cjs/.prettierrc.cjs",
					"module.exports = exports.prettierConfig;\n",
				);
				break;
			}
		}
	}
};

/** Copy the uncompiled non-TypeScript files from src/ to lib/ */
const copyFiles = async () => {
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

/** Rename files in lib/cjs/ by changing their extensions from .js to .cjs */
const renameFilesInLibCJS = async () => {
	const cjsFiles = await readdir("lib/cjs/");
	const cjsFileNames = cjsFiles.map((file) => file.replace(".js", ""));
	for (const fileName of cjsFileNames) {
		await rename(`lib/cjs/${fileName}.js`, `lib/cjs/${fileName}.cjs`);
	}
};

const postbuild = async () => {
	await renameFilesInLibCJS();
	await appendFilesInLibCJS();
	await copyFiles();
};
postbuild();
