import type {UserConfig} from "@commitlint/types";

/**
 * @description "Lint commit messages so that they adhere to a commit convention."
 * @returns Configuration for commitlint.
 * @see {@link https://commitlint.js.org/reference/configuration.html}
 */
export const makeCommitlintConfig = (): UserConfig => ({
	extends: ["@commitlint/config-conventional"],
});

export default makeCommitlintConfig();
