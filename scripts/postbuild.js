import {appendFile, readFile, rename, writeFile} from "node:fs/promises";

export const postbuild = async () => {
	// Read the contents from the Git ignore file and use it to write the ESLint and Prettier ignore files.
	const encoding = "utf-8";

	/** Contents read from the `.gitignore` file. */
	const gitignoreFileContents = await readFile(".gitignore", {encoding});

	// Write the ignore files (overwriting them if they already exist) to the root of the repository.
	// - Note that if https://github.com/prettier/prettier/issues/4081 is fixed in the future
	//	 then the files should be written to the `lib/` directory instead.
	const makeIgnoreFileComment = (filename) =>
		`# Note: Do not edit this auto-generated ${filename} file directly; refer to the scripts/postbuild.js file for details.`;

	/** Contents to write to the `.eslintignore` file. */
	const eslintignoreFileContents = `# https://eslint.org/docs/latest/use/configure/ignore
# Related file: src/eslint.config.ts (specifically \`eslintConfig.ignorePatterns\`)
${makeIgnoreFileComment(".eslintignore")}
${gitignoreFileContents}
!*.*.js
!*.*.ts`;
	await writeFile(".eslintignore", eslintignoreFileContents, {encoding});

	/** Contents to write to the `.prettierignore` file. */
	const prettierignoreFileContents = `# https://prettier.io/docs/en/ignore.html
${makeIgnoreFileComment(".prettierignore")}
${gitignoreFileContents}`;
	await writeFile(".prettierignore", prettierignoreFileContents, {encoding});

	// Note that ESLint requires a CommonJS file using `module.exports` in its current v8 iteration, but this changes as of v9;
	// at that point it should be possible to remove all CommonJS-related code/compilation from this repository entirely.
	const eslintConfigPath = {
		base: "lib/eslint.config",
		cjs() {
			return `${this.base}.cjs`;
		},
		js() {
			return `${this.base}.js`;
		},
	};
	await rename(eslintConfigPath.js(), eslintConfigPath.cjs());
	// Append lib/eslint.config.cjs with a `module.exports` line in order to:
	// 1. Simplify the codebase by keeping everything in src/ written in ESModule syntax;
	// 2. Export both CommonJS- and ESModule-compatible code from the lib/ directory; and
	// 3. Use tsc for building/compiling without relying on additional dependencies.
	await appendFile(
		eslintConfigPath.cjs(),
		"module.exports = exports.eslintConfig;",
	);
};

// Refer to scripts/prebuild.js file for why these lines are being excluded from the test coverage report.
/* v8 ignore next 3 */
if (process.env.NODE_ENV !== "test") {
	void postbuild();
}
