import {getAbsoluteRepoRootPath} from "./getAbsoluteRepoRootPath.ts";

jest.mock("./getAbsoluteRepoRootPath.ts", () => ({
	// The function returns a string, so have the mock return an empty string by default.
	getAbsoluteRepoRootPath: jest.fn(() => ""),
}));

/**
 * @description Reusable mock for the `getAbsoluteRepoRootPath` utility function.
 * @example
 * ```js
 * getAbsoluteRepoRootPathMock.mockReturnValue("/Users/username/repos/repo-name")
 * ```
 */
export const getAbsoluteRepoRootPathMock = jest.mocked(getAbsoluteRepoRootPath);
