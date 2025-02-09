// - This is the main file for exporting everything that consuming repos can use from the `web-devdeps` package.
// - This file's compiled `lib/exports.js` path is the value of the `main` field of the `package.json` file.

export {makeCommitlintConfig} from "./config/commitlint.config.ts";
export {makeESLintConfig} from "./config/eslint.config.ts";
export {makeJestConfig} from "./config/jest.config.ts";
export {makeLintstagedConfig} from "./config/lint-staged.config.ts";
export {makePrettierConfig} from "./config/prettier.config.ts";
export {makeSemanticReleaseConfig} from "./config/semantic-release.config.ts";
export {makeStylelintConfig} from "./config/stylelint.config.ts";
