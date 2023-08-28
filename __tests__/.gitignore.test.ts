import {readFile} from "node:fs/promises";

test("the most important configuration options are correct", async () => {
	// Note that the path to the .gitignore file is relative to the root of the repo.
	const gitignore = await readFile("./.gitignore", {
		encoding: "utf-8",
	});

	expect(gitignore).toContain("coverage/");
	expect(gitignore).toContain("lib/");
	expect(gitignore).toContain("node_modules/");
});
