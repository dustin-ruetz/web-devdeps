import renovateJSON from "../renovate.json";

test("the most important configuration options are correct", () => {
	expect(renovateJSON.extends).toStrictEqual(["config:recommended"]);

	// Excerpt from https://docs.renovatebot.com/configuration-options/#branchnamestrict:
	// > Whether to be strict about the use of special characters within the branch name.
	// > If `true`, Renovate removes special characters when slugifying the branch name:
	// > - all special characters are removed
	// > - only alphabetic characters are allowed
	// > - hyphens `-` are used to separate sections
	// > The default `false` behavior will mean that special characters like `.` and `/` may end up in the branch name.
	expect(renovateJSON.branchNameStrict).toBe(true);

	// Excerpt from https://docs.renovatebot.com/configuration-options/#semanticcommits:
	// > Enable Semantic Commit prefixes for commits and PR titles.
	// > If you are using a semantic prefix for your commits, then you will want to enable this setting.
	// > Although it's configurable to a package-level, it makes most sense to configure it at a repository level.
	// > If configured to `enabled`, then the `semanticCommitScope` and `semanticCommitType` fields
	// > will be used for each commit message and PR title.
	expect(renovateJSON.semanticCommits).toBe("enabled");
});
