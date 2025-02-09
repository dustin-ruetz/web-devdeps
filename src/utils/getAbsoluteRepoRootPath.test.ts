import {fileURLToPath} from "node:url";
import {getAbsoluteRepoRootPath} from "./getAbsoluteRepoRootPath.ts";

jest.mock("node:url", () => ({
	fileURLToPath: jest.fn(),
}));
const fileURLToPathMock = jest.mocked(fileURLToPath);

/** Object of static strings and helper methods meant to keep code DRY and organized. */
const absolutePaths = {
	// Start by defining the static partials that comprise the absolute paths.
	base: "/Users/username/repos",
	name: "web-devdeps",
	// Combine the static partials in the return values of the methods.
	/**
	 * @description Test the value of `getAbsoluteRepoRootPath()` when used by a repository that depends on the `web-devdeps` package.
	 * @returns Simulated path to `web-devdeps` when it's installed as a dependency running from a `node_modules/` folder.
	 */
	asDependency: () =>
		`${absolutePaths.base}/consuming-repo/node_modules/${absolutePaths.name}/` as const,
	/**
	 * @description Test the value of `getAbsoluteRepoRootPath()` when used in this `web-devdeps` repo.
	 * @returns Simulated path to this `web-devdeps` repo.
	 */
	asRepo: () => `${absolutePaths.base}/${absolutePaths.name}/` as const,
} as const;

describe("it determines the correct absolute root directory", () => {
	test("when installed as a dependency running from a `node_modules/` folder", () => {
		const absolutePath = absolutePaths.asDependency();
		fileURLToPathMock.mockReturnValue(absolutePath);

		const absoluteRepoRootPath = getAbsoluteRepoRootPath();

		expect(absoluteRepoRootPath).toBe("/Users/username/repos/consuming-repo");
	});

	test("when run from this `web-devdeps` repo", () => {
		const absolutePath = absolutePaths.asRepo();
		fileURLToPathMock.mockReturnValue(absolutePath);

		const absoluteRepoRootPath = getAbsoluteRepoRootPath();

		expect(absoluteRepoRootPath).toBe("/Users/username/repos/web-devdeps");
	});
});

test("throws an error if path does not end with either `/node_modules/web-devdeps/` or `/web-devdeps/`", () => {
	const absolutePath = `${absolutePaths.base}/bad-path`;
	fileURLToPathMock.mockReturnValue(absolutePath);

	expect(() => {
		getAbsoluteRepoRootPath();
	}).toThrow(/ERR_PATH_MISMATCH/);
});
