import type {UserConfig} from "@commitlint/types";

/**
 * @description "Lint commit messages so that they adhere to a commit convention."
 * @see {@link https://commitlint.js.org/reference/configuration.html}
 */
const commitlintConfig: UserConfig = {
	extends: ["@commitlint/config-conventional"],
} as const;

export default commitlintConfig;
