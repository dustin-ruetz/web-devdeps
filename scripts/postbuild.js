import {appendFile, copyFile, readdir, rename} from "node:fs/promises";

export const postbuild = async () => {
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

	// Copy the uncompiled non-TypeScript files from src/ to lib/
	const srcFiles = await readdir("src/");
	const dotFiles = srcFiles.filter((file) => file.startsWith("."));
	await Promise.all(
		dotFiles.map((dotfile) => copyFile(`src/${dotfile}`, `lib/${dotfile}`)),
	);
};

// Refer to scripts/prebuild.js file for why these lines are being excluded from the test coverage report.
/* v8 ignore next 3 */
if (process.env.NODE_ENV !== "test") {
	void postbuild();
}
