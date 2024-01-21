import {readFile} from "node:fs/promises";

test("it ignores the most important directories", async () => {
	// Note that the path to the .eslintignore file is an absolute path from the root of the repo.
	const eslintignore = await readFile("./src/.eslintignore", {
		encoding: "utf-8",
	});

	expect(eslintignore).toContain("build/");
	expect(eslintignore).toContain("coverage/");
	expect(eslintignore).toContain("dist/");
	expect(eslintignore).toContain("lib/");
	expect(eslintignore).toContain("node_modules/");
	expect(eslintignore).toContain("www/");
	expect(eslintignore).toContain("!*.*.js");
	expect(eslintignore).toContain("!*.*.ts");
});
