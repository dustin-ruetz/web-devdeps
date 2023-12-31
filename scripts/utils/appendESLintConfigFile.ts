import {appendFile} from "node:fs/promises";

/**
 * Note that ESLint requires a CommonJS file using `module.exports` in its current v8 iteration, but this changes as of v9;
 * at that point it should be possible to remove all CommonJS-related code/compilation from this repository entirely.
 *
 * Excerpt from https://eslint.org/docs/latest/use/configure/configuration-files#configuration-file-formats:
 * > Use `.eslintrc.cjs` when running ESLint in JavaScript packages that specify `"type":"module"` in their `package.json`.
 */
export const appendESLintConfigFile = async () => {
	await appendFile(
		"lib/cjs/.eslintrc.cjs",
		"module.exports = exports.eslintConfig;",
	);
};
