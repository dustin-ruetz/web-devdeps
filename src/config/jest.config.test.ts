import {dependsOnMock} from "../utils/dependsOn.mock.ts";
import {getAbsoluteRepoRootPathMock} from "../utils/getAbsoluteRepoRootPath.mock.ts";

import {makeJestConfig} from "./jest.config.ts";

afterEach(() => {
	jest.clearAllMocks();
});

describe("it exports a configuration object and the most important config options are correct", () => {
	test("for the parts of the config that *are not* affected by conditional logic", async () => {
		expect.hasAssertions();

		const hasFrontendDependencies = false;
		dependsOnMock.mockResolvedValue(hasFrontendDependencies);
		getAbsoluteRepoRootPathMock.mockReturnValue(
			"/Users/username/repos/web-devdeps",
		);

		const jestConfig = await makeJestConfig();

		expect(dependsOnMock).toHaveBeenCalledWith(["pug", "react"]);

		expect(typeof jestConfig).toBe("object");

		expect(jestConfig.cacheDirectory).toBe("<rootDir>/.caches/.jestcache/");
		expect(jestConfig.coverageProvider).toBe("v8");
		expect(jestConfig.transform?.[".(js|jsx|ts|tsx)"]?.[0]).toBe("@swc/jest");
		expect(jestConfig.verbose).toBe(true);
	});

	test("when testing this `web-devdeps` repo (which *does not* have frontend dependencies)", async () => {
		expect.hasAssertions();

		const hasFrontendDependencies = false;
		dependsOnMock.mockResolvedValue(hasFrontendDependencies);
		getAbsoluteRepoRootPathMock.mockReturnValue(
			"/Users/username/repos/web-devdeps",
		);

		const jestConfig = await makeJestConfig();

		expect(jestConfig.rootDir).toBe("/Users/username/repos/web-devdeps");
		expect(jestConfig.setupFilesAfterEnv).toStrictEqual([]);
		expect(jestConfig.testEnvironment).toBe("node");
		// Sample the transform config object to verify that the paths to the transformer files are correct.
		expect(jestConfig.transform?.[".svg"]).toBe(
			"<rootDir>/lib/config/jest-utils/svgFile.transformer.js",
		);
	});

	test("when testing a repo that has installed the `web-devdeps` package (repo *does* have frontend dependencies)", async () => {
		expect.hasAssertions();

		const hasFrontendDependencies = true;
		dependsOnMock.mockResolvedValue(hasFrontendDependencies);
		getAbsoluteRepoRootPathMock.mockReturnValue(
			"/Users/username/repos/consuming-repo",
		);

		const jestConfig = await makeJestConfig();

		expect(jestConfig.rootDir).toBe("/Users/username/repos/consuming-repo");
		expect(jestConfig.setupFilesAfterEnv).toStrictEqual([
			"<rootDir>/node_modules/web-devdeps/lib/config/jest-utils/setupFilesAfterEnv.cjs",
		]);
		expect(jestConfig.testEnvironment).toBe("jsdom");
		// Sample the transform config object to verify that the paths to the transformer files are correct.
		expect(jestConfig.transform?.[".svg"]).toBe(
			"<rootDir>/node_modules/web-devdeps/lib/config/jest-utils/svgFile.transformer.js",
		);
	});
});
