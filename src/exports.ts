// - This is the main file for exporting everything needed by consuming repos that depend on the `devdeps` package.
// - This file's compiled `lib/exports.js` path is the value of the `main` field of the `package.json` file.

export {makeCommitlintConfig} from "./config/commitlint.config.js";
export {makeESLintConfig} from "./config/eslint.config.js";
export {makeJestConfig} from "./config/jest.config.js";
export {makeLintstagedConfig} from "./config/lint-staged.config.js";
export {makePrettierConfig} from "./config/prettier.config.js";
export {makeSemanticReleaseConfig} from "./config/semantic-release.config.js";
export {makeStylelintConfig} from "./config/stylelint.config.js";
export {CustomError} from "./utils/CustomError.js";
