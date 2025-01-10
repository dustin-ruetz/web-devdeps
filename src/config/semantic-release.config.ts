import type {Options} from "semantic-release";

/**
 * @description "Fully automated version management and package publishing."
 * @returns Configuration for semantic-release.
 * @see {@link https://semantic-release.gitbook.io/semantic-release/usage/configuration}
 */
export const makeSemanticReleaseConfig = (): Options => ({
	branches: [
		"main",
		// - Publish release candidate versions on branches prefixed with `rc-`.
		// - Idea adapted from https://www.benmvp.com/blog/create-one-off-releases-semantic-release/
		{name: "rc-*", prerelease: true},
	],
	plugins: [
		"@semantic-release/commit-analyzer",
		// https://github.com/semantic-release/release-notes-generator
		[
			"@semantic-release/release-notes-generator",
			// Set `preset: "conventionalcommits"` to use the conventional-changelog-conventionalcommits package.
			{preset: "conventionalcommits"},
		],
		"@semantic-release/npm",
		"@semantic-release/github",
	],
});

export default makeSemanticReleaseConfig();
