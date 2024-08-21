import type {Options} from "semantic-release";

/** https://semantic-release.gitbook.io/semantic-release/usage/configuration */
const semanticReleaseConfig: Options = {
	plugins: [
		"@semantic-release/commit-analyzer",
		// https://github.com/semantic-release/release-notes-generator
		[
			"@semantic-release/release-notes-generator",
			// Set `preset: "conventionalcommits"` to use the conventional-changelog-conventionalcommits package.
			{preset: "conventionalcommits"},
		],
		// https://github.com/semantic-release/changelog
		[
			"@semantic-release/changelog",
			{
				changelogFile: "CHANGELOG.md",
				changelogTitle: "# CHANGELOG",
			},
		],
		"@semantic-release/npm",
		// https://github.com/semantic-release/git
		[
			"@semantic-release/git",
			{
				assets: ["CHANGELOG.md", "package-lock.json", "package.json"],
				message:
					// Paraphrased excerpt from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString:
					// > The `toISOString()` method of `Date` instances returns a string representing this date in the date time string format,
					// > a _simplified_ format based on ISO 8601, which is always 24 characters long (`YYYY-MM-DDTHH:mm:ss.sssZ`). The timezone
					// > is always UTC, as denoted by the suffix `Z`.
					//
					// Ignore the "unexpected template string expression" lint error since the variables in the message are replaced when committing.
					// eslint-disable-next-line no-template-curly-in-string
					"chore(🤖 release): v${nextRelease.version} - <%= new Date().toISOString() %> [skip ci]\n\n${nextRelease.notes}",
			},
		],
		"@semantic-release/github",
	],
} as const;

export default semanticReleaseConfig;
