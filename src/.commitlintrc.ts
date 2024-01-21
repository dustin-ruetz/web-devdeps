import type {UserConfig} from "@commitlint/types";

/** https://commitlint.js.org/#/reference-configuration */
export const commitlintConfig: UserConfig = {
	extends: ["@commitlint/config-conventional"],
} as const;
