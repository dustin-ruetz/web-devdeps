import commitlintConfig from "./config/commitlint.config.js";
import eslintConfig from "./config/eslint.config.js";
import jestConfig from "./config/jest.config.js";
import lintstagedConfig from "./config/lint-staged.config.js";
import prettierConfig from "./config/prettier.config.js";
import semanticReleaseConfig from "./config/semantic-release.config.js";
import stylelintConfig from "./config/stylelint.config.js";

/**
 * @description The module's primary export of configuration objects.
 * @see [package.json](../package.json) (specifically the `packageJSON.main` field)
 */
export const exports = {
	commitlintConfig,
	eslintConfig,
	jestConfig,
	lintstagedConfig,
	prettierConfig,
	semanticReleaseConfig,
	stylelintConfig,
} as const;
