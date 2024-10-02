import {fileURLToPath} from "node:url";
import {getAbsoluteRepoRootPath} from "./getAbsoluteRepoRootPath.js";

jest.mock("node:url", () => ({
	fileURLToPath: jest.fn(),
}));
// Paraphrased excerpt from https://www.mikeborozdin.com/post/changing-jest-mocks-between-tests:
// > Typecast the imported mocked module into a mocked function with writeable properties.
const fileURLToPathMock = jest.mocked(fileURLToPath);

/** Object of static strings and helper methods meant to keep code DRY and organized. */
const absolutePaths = {
	// Start by defining the static partials that comprise the absolute paths.
	base: "/Users/username/repos",
	scope: "@dustin-ruetz",
	name: "devdeps",
	relativeFilePath: "utils/getAbsoluteRepoRootPath",
	// Combine the static partials in the return values of the methods.
	/**
	 * @description Test the value of `getAbsoluteRepoRootPath()` when used by a repository that depends on the `devdeps` package.
	 * @returns Simulated path of devdeps being installed as a dependency running from a `node_modules/` folder.
	 */
	asDependency() {
		return `${this.base}/consuming-repo/node_modules/${this.scope}/${this.name}/lib/${this.relativeFilePath}.js`;
	},
	/**
	 * @description Test the value of `getAbsoluteRepoRootPath()` when used in a `lib/*.js` file.
	 * @returns Simulated path of this devdeps repo running a compiled `.js` file.
	 */
	asLibraryJavaScriptFile() {
		return `${this.base}/${this.name}/lib/${this.relativeFilePath}.js`;
	},
	/**
	 * @description Test the value of `getAbsoluteRepoRootPath()` during a test run in a `src/*.ts` test file.
	 * @returns Simulated path of this devdeps repo running a source `.ts` file.
	 */
	asSourceTypeScriptFile() {
		return `${this.base}/${this.name}/src/${this.relativeFilePath}.ts`;
	},
} as const;

test("throws an error if partialPath is not present within absolutePath", () => {
	const absolutePath = `${absolutePaths.base}/bad-path`;
	fileURLToPathMock.mockReturnValue(absolutePath);

	expect(() => {
		getAbsoluteRepoRootPath();
	}).toThrow(/ERR_PATH_MISMATCH/);
});

describe("it determines the correct absolute root directory", () => {
	test("when installed as a dependency running from a `node_modules/` folder", () => {
		const absolutePath = absolutePaths.asDependency();
		fileURLToPathMock.mockReturnValue(absolutePath);

		const absoluteRepoRootPath = getAbsoluteRepoRootPath();

		expect(absoluteRepoRootPath).toBe("/Users/username/repos/consuming-repo");
	});

	test("when run as a JavaScript file inside the lib/ folder", () => {
		const absolutePath = absolutePaths.asLibraryJavaScriptFile();
		fileURLToPathMock.mockReturnValue(absolutePath);

		const absoluteRepoRootPath = getAbsoluteRepoRootPath();

		expect(absoluteRepoRootPath).toBe("/Users/username/repos/devdeps");
	});

	test("when run as a TypeScript file inside the src/ folder", () => {
		const absolutePath = absolutePaths.asSourceTypeScriptFile();
		fileURLToPathMock.mockReturnValue(absolutePath);

		const absoluteRepoRootPath = getAbsoluteRepoRootPath();

		expect(absoluteRepoRootPath).toBe("/Users/username/repos/devdeps");
	});
});
