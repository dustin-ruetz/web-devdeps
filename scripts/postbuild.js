import {appendFile, copyFile, readdir, rename, rm} from "node:fs/promises";

// Originally I wanted to use async/await with the forEach() function, but this doesn't always
// work the way that I expect it to. MDN suggests using `for of` as a succinct alternative.
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises#composition

// Append certain files in lib/cjs/ with a `module.exports` line in order to:
// 1. simplify the codebase by keeping everything in src/ written in ESModule syntax,
// 2. export both CommonJS- and ESModule-compatible code from the lib/ directory, and
// 3. use tsc for building/compiling without needing to install additional dependencies.

/**
 * Note that Prettier requires a CommonJS file using `module.exports` in its current v2 iteration, but if this changes
 * in v3 then it may be possible to remove all CommonJS-related code/compilation from this repository entirely.
 *
 * Excerpt from https://prettier.io/docs/en/configuration.html:
 * > You can configure Prettier via a `.prettierrc.cjs` file that exports an object using `module.exports`.
 */
const appendPrettierConfigFile = async () => {
	await appendFile(
		"lib/cjs/.prettierrc.cjs",
		"module.exports = exports.prettierConfig;\n",
	);
};

const copyCompiledFilesToLib = async () => {
	const cjsFiles = await readdir("lib/cjs/");
	for (const file of cjsFiles) {
		await copyFile(`lib/cjs/${file}`, `lib/${file}`);
	}

	const esmFiles = await readdir("lib/esm/");
	for (const file of esmFiles) {
		await copyFile(`lib/esm/${file}`, `lib/${file}`);
	}
};

/** Copy the uncompiled non-TypeScript files from src/ to lib/ */
const copyUncompiledFilesToLib = async () => {
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

/** Delete the lib/cjs/ and lib/esm/ directories. */
const deleteDirectoriesInLib = async () => {
	await rm("lib/cjs/", {force: true, recursive: true});
	await rm("lib/esm/", {force: true, recursive: true});
};

/** Rename files in lib/cjs/ by changing their extensions from .js to .cjs */
const renameFilesInLibCJS = async () => {
	const cjsFiles = await readdir("lib/cjs/");
	const cjsFileNames = cjsFiles.map((file) => file.replace(".js", ""));
	for (const fileName of cjsFileNames) {
		await rename(`lib/cjs/${fileName}.js`, `lib/cjs/${fileName}.cjs`);
	}
};
/** Rename files in lib/esm/ by changing their extensions from .js to .mjs */
const renameFilesInLibESM = async () => {
	const esmFiles = await readdir("lib/esm/");
	const esmFileNames = esmFiles.map((file) => file.replace(".js", ""));
	for (const fileName of esmFileNames) {
		await rename(`lib/esm/${fileName}.js`, `lib/esm/${fileName}.mjs`);
	}
};

const postbuild = async () => {
	// Make use of `Promise.all` to kick off multiple asynchronous operations simultaneously
	// and wait for all of them to resolve before proceeding to the next operation.
	await Promise.all([renameFilesInLibCJS(), renameFilesInLibESM()]);
	await appendPrettierConfigFile();
	await Promise.all([copyCompiledFilesToLib(), copyUncompiledFilesToLib()]);
	// Delete lib/cjs/ and lib/esm/ now that their child files have been copied to the lib/ directory.
	await deleteDirectoriesInLib();
};
postbuild();
