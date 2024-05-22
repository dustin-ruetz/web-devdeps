/** https://semantic-release.gitbook.io/semantic-release/usage/configuration */
const semanticReleaseConfig = {
	// TODO: This `branches` array is for testing purposes; remove before merging this PR.
	// branches: ["configure-semantic-release"],
	plugins: [
		"@semantic-release/commit-analyzer",
		"@semantic-release/release-notes-generator",
		// https://github.com/semantic-release/changelog
		[
			"@semantic-release/changelog",
			{
				changelogFile: "CHANGELOG.md",
				changelogTitle: "CHANGELOG",
			},
		],
		"@semantic-release/npm",
		// https://github.com/semantic-release/git
		[
			"@semantic-release/git",
			{
				assets: ["CHANGELOG.md", "package-lock.json", "package.json"],
				message:
					// eslint-disable-next-line no-template-curly-in-string
					"chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}",
			},
		],
		"@semantic-release/github",
	],
};

module.exports = semanticReleaseConfig;
