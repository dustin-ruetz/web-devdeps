import {appendFile} from "node:fs/promises";

/**
 * Note that Prettier requires a CommonJS file using `module.exports` in its current v2 iteration, but if this changes
 * in v3 then it may be possible to remove all CommonJS-related code/compilation from this repository entirely.
 *
 * Excerpt from https://prettier.io/docs/en/configuration.html:
 * > You can configure Prettier via a `.prettierrc.cjs` file that exports an object using `module.exports`.
 */
export const appendPrettierConfigFile = async () => {
	await appendFile(
		"lib/cjs/.prettierrc.cjs",
		"module.exports = exports.prettierConfig;\n",
	);
};
