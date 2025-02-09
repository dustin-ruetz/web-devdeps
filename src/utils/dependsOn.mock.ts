import {dependsOn} from "./dependsOn.ts";

jest.mock("./dependsOn.ts", () => ({
	dependsOn: jest.fn(),
}));

/**
 * @description Reusable mock for the `dependsOn` utility function.
 * @example
 * ```js
 * // Use the mocked implementation of `dependsOn` by resolving its promise to the value needed for the test.
 * const doesDependOnFrontendPackages = dependsOnMock.mockResolvedValue(true)
 * const doesNotDependOnFrontendPackages = dependsOnMock.mockResolvedValue(false)
 * ```
 */
export const dependsOnMock = jest.mocked(dependsOn);
