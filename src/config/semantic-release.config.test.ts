import {makeSemanticReleaseConfig} from "./semantic-release.config.js";

test("it exports a configuration object and the most important config options are correct", () => {
	const semanticReleaseConfig = makeSemanticReleaseConfig();

	expect(typeof semanticReleaseConfig).toBe("object");

	expect(semanticReleaseConfig.branches).toStrictEqual([
		"main",
		{name: "rc-*", prerelease: true},
	]);

	expect(semanticReleaseConfig.plugins).toStrictEqual([
		"@semantic-release/commit-analyzer",
		[
			"@semantic-release/release-notes-generator",
			{preset: "conventionalcommits"},
		],
		"@semantic-release/npm",
		"@semantic-release/github",
	]);
});
