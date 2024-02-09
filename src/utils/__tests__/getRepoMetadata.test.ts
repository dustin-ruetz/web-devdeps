import {fileURLToPath} from "node:url";
import {type MockedFunction, vi} from "vitest";
import {getRepoMetadata} from "../getRepoMetadata.js";

vi.mock("node:url", () => ({
	fileURLToPath: vi.fn(),
}));
// Paraphrased excerpt from https://www.mikeborozdin.com/post/changing-jest-mocks-between-tests:
// > Typecast the imported mocked module into a mocked function with writeable properties.
const mockFileURLToPath = fileURLToPath as MockedFunction<typeof fileURLToPath>;

test("throws an error if partialPath is not present within absolutePath", () => {
	const absolutePath = "/Users/username/repos/bad-path";
	mockFileURLToPath.mockReturnValue(absolutePath);

	expect(() => {
		getRepoMetadata();
	}).toThrow();
});

describe("it determines the correct absolute root directory", () => {
	test("when installed as a dependency being run inside a node_modules folder", () => {
		const absolutePath =
			"/Users/username/repos/consuming-repo/node_modules/dr-devdeps/lib/utils/getRepoMetadata.js";
		mockFileURLToPath.mockReturnValue(absolutePath);

		const {absoluteRootDir, isDevDepsRepo} = getRepoMetadata();

		expect(absoluteRootDir).toStrictEqual(
			"/Users/username/repos/consuming-repo",
		);
		expect(absoluteRootDir).not.toContain("node_modules/dr-devdeps");
		expect(absoluteRootDir).not.toContain("lib");
		expect(absoluteRootDir).not.toContain("utils/getRepoMetadata.js");
		expect(isDevDepsRepo).toBe(false);
	});

	// Simulate this dr-devdeps repo accessing the compiled .js file.
	test("when run as a JavaScript file inside the lib/ folder", () => {
		const absolutePath =
			"/Users/username/repos/dr-devdeps/lib/utils/getRepoMetadata.js";
		mockFileURLToPath.mockReturnValue(absolutePath);

		const {absoluteRootDir, isDevDepsRepo} = getRepoMetadata();

		expect(absoluteRootDir).toStrictEqual("/Users/username/repos/dr-devdeps");
		expect(absoluteRootDir).not.toContain("lib");
		expect(absoluteRootDir).not.toContain("utils/getRepoMetadata.js");
		expect(isDevDepsRepo).toBe(true);
	});

	// Simulate this dr-devdeps repo accessing the source .ts file during a test run.
	test("when run as a TypeScript file inside the src/ folder", () => {
		const absolutePath =
			"/Users/username/repos/dr-devdeps/src/utils/getRepoMetadata.ts";
		mockFileURLToPath.mockReturnValue(absolutePath);

		const {absoluteRootDir, isDevDepsRepo} = getRepoMetadata();

		expect(absoluteRootDir).toStrictEqual("/Users/username/repos/dr-devdeps");
		expect(absoluteRootDir).not.toContain("src");
		expect(absoluteRootDir).not.toContain("utils/getRepoMetadata.ts");
		expect(isDevDepsRepo).toBe(true);
	});
});
