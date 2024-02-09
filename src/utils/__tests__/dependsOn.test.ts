import {readFile} from "node:fs/promises";
import {type MockedFunction, vi} from "vitest";
import {dependsOn} from "../dependsOn.js";
import {getRepoMetadata} from "../getRepoMetadata.js";

vi.mock("node:fs/promises", () => ({
	readFile: vi.fn(),
}));
// Paraphrased excerpt from https://www.mikeborozdin.com/post/changing-jest-mocks-between-tests:
// > Typecast the imported mocked module into a mocked function with writeable properties.
const mockReadFile = readFile as MockedFunction<typeof readFile>;

vi.mock("../getRepoMetadata.js", () => ({
	getRepoMetadata: vi.fn(() => ({
		absoluteRootDir: "/Users/username/repos/dr-devdeps",
		dependencyPartialPath: "node_modules/dr-devdeps",
		isDevDepsRepo: true,
	})),
}));

afterEach(() => {
	vi.clearAllMocks();
});

test("throws errors if the `deps` argument is invalid", () => {
	expect(async () => {
		// @ts-expect-error if no `deps` argument is passed.
		await dependsOn();
	}).rejects.toThrow();

	expect(async () => {
		// @ts-expect-error if `deps` argument is not an array.
		await dependsOn("package1");
	}).rejects.toThrow();

	expect(async () => {
		// Expect an error if `deps` argument is an empty array.
		await dependsOn([]);
	}).rejects.toThrow();

	expect(async () => {
		// @ts-expect-error if `deps` argument is an array containing non-string values.
		await dependsOn(["package1", 2, "package3"]);
	}).rejects.toThrow();
});

test("returns `false` if the repo does not depend on the package", async () => {
	const packageJsonContents = `
{
	"dependencies": {
		"dep1": "major.minor.patch"
	}
}
`;
	mockReadFile.mockResolvedValue(packageJsonContents);

	const dependsOnDep0 = await dependsOn(["dep0"]);

	expect(getRepoMetadata).toHaveBeenCalledTimes(1);
	expect(mockReadFile).toHaveBeenCalledWith(
		"/Users/username/repos/dr-devdeps/package.json",
		{encoding: "utf-8"},
	);
	expect(dependsOnDep0).toBe(false);
});

test("returns `true` if the repo does depend on the package", async () => {
	const packageJsonContents = `
{
	"devDependencies": {
		"devDep1": "major.minor.patch"
	}
}
`;
	mockReadFile.mockResolvedValue(packageJsonContents);

	const dependsOnDevDep1 = await dependsOn(["devDep1"]);

	expect(getRepoMetadata).toHaveBeenCalledTimes(1);
	expect(mockReadFile).toHaveBeenCalledTimes(1);
	expect(dependsOnDevDep1).toBe(true);
});

test("returns `true` if the repo depends on at least one of the passed packages", async () => {
	const packageJsonContents = `
{
	"dependencies": {
		"dep1": "major.minor.patch"
	},
	"devDependencies": {
		"devDep1": "major.minor.patch"
	},
	"peerDependencies": {
		"peerDep1": "major.minor.patch"
	}
}
`;
	mockReadFile.mockResolvedValue(packageJsonContents);

	const dependsOnPeerDep1 = await dependsOn(["dep0", "devDep0", "peerDep1"]);

	expect(getRepoMetadata).toHaveBeenCalledTimes(1);
	expect(mockReadFile).toHaveBeenCalledTimes(1);
	expect(dependsOnPeerDep1).toBe(true);
});
