import {readFile} from "node:fs/promises";

test("the most important configuration options are correct", async () => {
	// Note that the path to the .gitattributes file is relative to the root of the repo.
	const gitattributes = await readFile("./.gitattributes", {
		encoding: "utf-8",
	});

	expect(gitattributes).toContain("* text=auto");
	expect(gitattributes).toContain("*.md   text");
	expect(gitattributes).toContain("*.json text");
	expect(gitattributes).toContain("*.ts   text");
	expect(gitattributes).toContain("*.yaml text");
});
