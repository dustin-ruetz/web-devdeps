import {mkdir, readdir, readFile, writeFile} from "node:fs/promises";

import {
	writeGitAttributes,
	writeGitHooks,
	writeGitIgnore,
	writeJestSetupFile,
	writeLicense,
	writeNodeVersion,
	writePackageJson,
	writeReadme,
	writeRenovate,
	writeTsConfig,
	writeTsConfigBuild,
	writeVsCodeSettings,
} from "./initRepoHelpers.ts";

jest.mock("node:fs/promises");
const readdirMock = jest.mocked(readdir);
const readFileMock = jest.mocked(readFile);

afterEach(() => {
	jest.clearAllMocks();
});

test("writeGitAttributes", async () => {
	expect.hasAssertions();

	await writeGitAttributes();

	expect(writeFile).toHaveBeenCalledTimes(1);
	expect(writeFile).toHaveBeenCalledWith(
		expect.stringContaining(".gitattributes"),
		expect.stringContaining("* text=auto"),
	);
});

test("writeGitHooks", async () => {
	expect.hasAssertions();

	const githooksDirectoryContents = [
		"_",
		"commit-msg",
		"pre-commit",
		"pre-push",
	] as const;
	// @ts-expect-error @todo Figure out how to correctly type the promise's resolved value here.
	readdirMock.mockResolvedValue(githooksDirectoryContents);
	// Filter out the "_" underscore directory since it contains the husky-specific script files.
	const githooksFiles = githooksDirectoryContents.filter(
		(item) => item !== "_",
	);

	await writeGitHooks();

	githooksFiles.forEach((githook, index) => {
		/** The path of the filename to write. */
		const file = `.githooks/${githook}`;
		/** The contents to write to the file. */
		const contents = `./node_modules/web-devdeps/.githooks/_/${githook}`;

		expect(mkdir).toHaveBeenCalledTimes(1);
		expect(mkdir).toHaveBeenCalledWith(expect.stringContaining(".githooks/"));
		expect(writeFile).toHaveBeenNthCalledWith(
			index + 1,
			expect.stringContaining(file),
			expect.stringContaining(contents),
		);
	});
});

test("writeGitIgnore", async () => {
	expect.hasAssertions();

	await writeGitIgnore();

	expect(writeFile).toHaveBeenCalledTimes(1);
	expect(writeFile).toHaveBeenCalledWith(
		expect.stringContaining(".gitignore"),
		expect.stringContaining("node_modules/"),
	);
});

test("writeJestSetupFile", async () => {
	expect.hasAssertions();

	await writeJestSetupFile();

	expect(mkdir).toHaveBeenCalledTimes(1);
	expect(mkdir).toHaveBeenCalledWith(expect.stringContaining("config/"));
	expect(writeFile).toHaveBeenCalledTimes(1);
	expect(writeFile).toHaveBeenCalledWith(
		expect.stringContaining("config/jest.setupFilesAfterEnv.ts"),
		expect.stringContaining('import "@testing-library/jest-dom";'),
	);
});

test("writeLicense", async () => {
	expect.hasAssertions();

	readFileMock.mockResolvedValue("Copyright (c) 1999 Dustin Ruetz");
	const currentYear = new Date().getFullYear().toString();

	await writeLicense();

	expect(readFile).toHaveBeenCalledTimes(1);
	expect(readFile).toHaveBeenCalledWith(expect.stringContaining("LICENSE"), {
		encoding: "utf-8",
	});
	expect(writeFile).toHaveBeenCalledTimes(1);
	expect(writeFile).toHaveBeenCalledWith(
		expect.stringContaining("LICENSE"),
		`Copyright (c) ${currentYear} Dustin Ruetz`,
	);
});

test("writeNodeVersion", async () => {
	expect.hasAssertions();

	await writeNodeVersion("10");

	expect(writeFile).toHaveBeenCalledTimes(1);
	expect(writeFile).toHaveBeenCalledWith(
		expect.stringContaining(".node-version"),
		"10",
	);
});

describe("writePackageJson", () => {
	/** Simplified mock of the file contents from a `package.json` file. */
	const mockPackageJsonContents = `
{
		"name": "",
		"version": "",
		"description": "",
		"scripts": {
			"example": "node ./lib/ example"
		},
		"files": [],
		"repository": {
			"url": ""
		},
		"publishConfig": {},
		"dependencies": {},
		"devDependencies": {}
}
`;
	const exampleScript = "web-devdeps example";
	const lintStylesScript = "web-devdeps lint.styles";

	test("it *does not* configure Stylelint", async () => {
		expect.hasAssertions();

		readFileMock.mockResolvedValue(mockPackageJsonContents);

		await writePackageJson("repo-name", false);

		expect(readFile).toHaveBeenCalledTimes(1);
		expect(readFile).toHaveBeenCalledWith(
			expect.stringContaining("package.json"),
			{encoding: "utf-8"},
		);

		expect(writeFile).toHaveBeenCalledTimes(1);
		expect(writeFile).toHaveBeenCalledWith(
			expect.stringContaining("package.json"),
			expect.stringMatching(new RegExp(exampleScript)),
		);
		expect(writeFile).toHaveBeenCalledWith(
			expect.stringContaining("package.json"),
			expect.not.stringMatching(new RegExp(lintStylesScript)),
		);
	});

	test("it *does* configure Stylelint", async () => {
		expect.hasAssertions();

		readFileMock.mockResolvedValue(mockPackageJsonContents);

		await writePackageJson("repo-name", true);

		expect(readFile).toHaveBeenCalledTimes(1);
		expect(readFile).toHaveBeenCalledWith(
			expect.stringContaining("package.json"),
			{encoding: "utf-8"},
		);

		expect(writeFile).toHaveBeenCalledTimes(1);
		expect(writeFile).toHaveBeenCalledWith(
			expect.stringContaining("package.json"),
			expect.stringMatching(
				// Regular expression adapted from Michael Socha's 2014-Nov-18 answer to the following question posted on Stack Overflow:
				// https://stackoverflow.com/questions/2219830/regular-expression-to-find-two-strings-anywhere-in-input/27005678#27005678
				new RegExp(`(${exampleScript}(.|\n)*${lintStylesScript})`),
			),
		);
	});
});

test("writeReadme", async () => {
	expect.hasAssertions();

	await writeReadme("repo-name");

	expect(writeFile).toHaveBeenCalledTimes(1);
	expect(writeFile).toHaveBeenCalledWith(
		expect.stringContaining("README.md"),
		"# repo-name",
	);
});

test("writeRenovate", async () => {
	expect.hasAssertions();

	await writeRenovate();

	expect(writeFile).toHaveBeenCalledTimes(1);
	expect(writeFile).toHaveBeenCalledWith(
		expect.stringContaining("renovate.json"),
		expect.stringContaining(
			'"extends": ["github>dustin-ruetz/web-devdeps:renovate.json"]',
		),
	);
});

test("writeTsConfigBuild", async () => {
	expect.hasAssertions();

	await writeTsConfigBuild();

	expect(writeFile).toHaveBeenCalledTimes(1);
	expect(writeFile).toHaveBeenCalledWith(
		expect.stringContaining("tsconfig.build.json"),
		expect.stringContaining("./node_modules/web-devdeps/tsconfig.build.json"),
	);
});

test("writeTsConfig", async () => {
	expect.hasAssertions();

	await writeTsConfig();

	expect(writeFile).toHaveBeenCalledTimes(1);
	expect(writeFile).toHaveBeenCalledWith(
		expect.stringContaining("tsconfig.json"),
		expect.stringContaining("./node_modules/web-devdeps/tsconfig.json"),
	);
});

describe("writeVsCodeSettings", () => {
	test("it *does not* configure Stylelint", async () => {
		expect.hasAssertions();

		const configureStylelint = false;

		await writeVsCodeSettings(configureStylelint);

		expect(writeFile).toHaveBeenCalledTimes(1);
		expect(writeFile).toHaveBeenCalledWith(
			expect.stringContaining(".vscode/settings.json"),
			expect.not.stringContaining("stylelint.configFile"),
		);
	});

	test("it *does* configure Stylelint", async () => {
		expect.hasAssertions();

		const configureStylelint = true;

		await writeVsCodeSettings(configureStylelint);

		expect(mkdir).toHaveBeenCalledTimes(1);
		expect(mkdir).toHaveBeenCalledWith(expect.stringContaining(".vscode/"));
		expect(writeFile).toHaveBeenCalledTimes(1);
		expect(writeFile).toHaveBeenCalledWith(
			expect.stringContaining(".vscode/settings.json"),
			expect.stringContaining("stylelint.configFile"),
		);
	});
});
