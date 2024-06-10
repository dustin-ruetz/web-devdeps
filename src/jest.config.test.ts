import {dependsOnMock} from "./utils/dependsOn.mock.js";
import {getRepoMetadata} from "./utils/getRepoMetadata.js";
import {makeJestConfig} from "./jest.config.js";

jest.mock("./utils/getRepoMetadata.js", () => ({
	// Initialize the mock to return an empty object to prevent the following error from being thrown in the test run:
	// > TypeError: Cannot destructure property 'absoluteRootDir' of 'getRepoMetadata(...)' as it is undefined.
	getRepoMetadata: jest.fn(() => ({})),
}));
const mockGetRepoMetadata = getRepoMetadata as jest.MockedFunction<
	typeof getRepoMetadata
>;
/**
 * Mirror the actual implementation of `getRepoMetadata().dependencyPartialPath`
 * here since its value is always equal to the same string constant.
 */
const actualGetRepoMetadata = () =>
	({
		dependencyPartialPath: "node_modules/@dustin-ruetz/web-devdeps",
	}) as const;

afterEach(() => {
	jest.clearAllMocks();
});

describe("it exports a configuration object and the most important config options are correct", () => {
	test("for the parts of the config that *are not* affected by conditional logic", async () => {
		const hasFrontendDependencies = false;
		dependsOnMock.mockResolvedValue(hasFrontendDependencies);
		mockGetRepoMetadata.mockReturnValue({
			absoluteRootDir: "/Users/username/repos/web-devdeps",
			dependencyPartialPath: actualGetRepoMetadata().dependencyPartialPath,
			isWebDevDepsRepo: true,
		});

		const jestConfig = await makeJestConfig();

		expect(dependsOnMock).toHaveBeenCalledWith(["pug", "react"]);

		expect(typeof jestConfig).toEqual("object");

		expect(jestConfig.coverageProvider).toEqual("v8");
		expect(jestConfig.transform?.[".(js|jsx|ts|tsx)"]).toEqual("@swc/jest");
		expect(jestConfig.verbose).toBe(true);
	});

	test("when testing this web-devdeps repo (which *does not* have frontend dependencies)", async () => {
		const hasFrontendDependencies = false;
		dependsOnMock.mockResolvedValue(hasFrontendDependencies);
		mockGetRepoMetadata.mockReturnValue({
			absoluteRootDir: "/Users/username/repos/web-devdeps",
			dependencyPartialPath: actualGetRepoMetadata().dependencyPartialPath,
			isWebDevDepsRepo: true,
		});

		const jestConfig = await makeJestConfig();

		expect(jestConfig.rootDir).toEqual("/Users/username/repos/web-devdeps");
		expect(jestConfig.testEnvironment).toEqual("node");
		// Sample the transform config object to verify that the paths to the transformer files are correct.
		expect(jestConfig.transform?.[".svg"]).toEqual(
			"<rootDir>/lib/jest-transformers/svgFile.js",
		);
	});

	test("when testing a repo that has installed the web-devdeps package (repo *does* have frontend dependencies)", async () => {
		const hasFrontendDependencies = true;
		dependsOnMock.mockResolvedValue(hasFrontendDependencies);
		mockGetRepoMetadata.mockReturnValue({
			absoluteRootDir: "/Users/username/repos/consuming-repo",
			dependencyPartialPath: actualGetRepoMetadata().dependencyPartialPath,
			isWebDevDepsRepo: false,
		});

		const jestConfig = await makeJestConfig();

		expect(jestConfig.rootDir).toEqual("/Users/username/repos/consuming-repo");
		expect(jestConfig.testEnvironment).toEqual("jsdom");
		// Sample the transform config object to verify that the paths to the transformer files are correct.
		expect(jestConfig.transform?.[".svg"]).toEqual(
			"<rootDir>/node_modules/@dustin-ruetz/web-devdeps/lib/jest-transformers/svgFile.js",
		);
	});
});
