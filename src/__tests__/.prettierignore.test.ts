import {readFile} from "node:fs/promises";

test("it ignores the most important directories", async () => {
	// Note that the path to the .prettierignore file is an absolute path from the root of the repo.
	const prettierignore = await readFile("./src/.prettierignore", {
		encoding: "utf-8",
	});

	expect(prettierignore).toContain("build/");
	expect(prettierignore).toContain("coverage/");
	expect(prettierignore).toContain("dist/");
	expect(prettierignore).toContain("lib/");
	expect(prettierignore).toContain("node_modules/");
	expect(prettierignore).toContain("www/");
});
