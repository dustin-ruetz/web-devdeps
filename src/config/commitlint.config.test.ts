import {makeCommitlintConfig} from "./commitlint.config.ts";

test("it exports a configuration object and the most important config options are correct", () => {
	const commitlintConfig = makeCommitlintConfig();

	expect(typeof commitlintConfig).toBe("object");

	expect(commitlintConfig.extends).toStrictEqual([
		"@commitlint/config-conventional",
	]);
});
