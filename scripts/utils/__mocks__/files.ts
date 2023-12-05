/** Mock filenames compiled from src/ to lib/cjs/ and lib/esm/ */
export const compiledFiles = [
	".jestrc.js",
	".prettierrc.js",
	"jestTransformerBabelJest.js",
	"jestTransformerBinaryFile.js",
	"jestTransformerSVGFile.js",
];

/** Mock filenames after the `renameFilesInLibCJS` operation completes. */
export const cjsFiles = compiledFiles.map((file) =>
	file.replace(".js", ".cjs"),
);

/** Mock filenames after the `renameFilesInLibESM` operation completes. */
export const esmFiles = compiledFiles.map((file) =>
	file.replace(".js", ".mjs"),
);

/** Mock filenames of the non-TypeScript files copied from src/ to lib/ */
export const uncompiledFiles = [
	".prettierignore",
	"tsconfig.base.json",
	"tsconfig.cjs.json",
	"tsconfig.esm.json",
];
