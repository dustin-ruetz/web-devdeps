import {appendFile} from "node:fs/promises";

/**
 * Note that ESLint requires a CommonJS file using `module.exports` in its current v8 iteration, but this changes as of v9;
 * at that point it should be possible to remove all CommonJS-related code/compilation from this repository entirely.
 */
export const appendESLintConfigFile = async () => {
	await appendFile(
		"lib/cjs/eslint.config.cjs",
		"module.exports = exports.eslintConfig;",
	);
};
