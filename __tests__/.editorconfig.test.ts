import {readFile} from "node:fs/promises";

test("the most important configuration options are correct", async () => {
	// Note that the path to the .editorconfig file is relative to the root of the repo.
	const editorconfig = await readFile("./.editorconfig", {
		encoding: "utf-8",
	});

	expect(editorconfig).toContain("root = true");
	expect(editorconfig).toContain("charset = utf-8");
	expect(editorconfig).not.toContain("end_of_line = cr");
	expect(editorconfig).not.toContain("end_of_line = crlf");
	expect(editorconfig).not.toContain("end_of_line = lf");
	expect(editorconfig).toContain("indent_style = tab");
	expect(editorconfig).toContain("insert_final_newline = true");
	expect(editorconfig).toContain("trim_trailing_whitespace = true");
});
