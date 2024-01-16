import {appendFile} from "node:fs/promises";

/**
 * Note that commitlint requires a CommonJS file using `module.exports` in its current v18 iteration.
 */
export const appendCommitlintConfigFile = async () => {
	await appendFile(
		"lib/cjs/.commitlintrc.cjs",
		"module.exports = exports.commitlintConfig;",
	);
};
