import {getAbsoluteRepoRootPathMock} from "../../utils/getAbsoluteRepoRootPath.mock.js";
import {getRootPaths} from "./getRootPaths.js";

afterEach(() => {
	jest.clearAllMocks();
});

const initialProcessCwd = process.cwd();
afterAll(() => {
	process.cwd = () => initialProcessCwd;
});

describe("the returned root paths (1. to read from, and 2. to write to) are correct when called from", () => {
	test("this `web-devdeps` repo", () => {
		getAbsoluteRepoRootPathMock.mockReturnValue(
			"/Users/username/repos/web-devdeps",
		);

		const rootPaths = getRootPaths();

		expect(rootPaths.readFrom).toBe("/Users/username/repos/web-devdeps");
		expect(rootPaths.writeTo).toBe(
			"/Users/username/repos/web-devdeps/.init-repo-script-test-output",
		);
	});

	test("a consuming repo that has installed the `web-devdeps` package", () => {
		const consumingRepoAbsoluteRootDir = "/Users/username/repos/consuming-repo";
		getAbsoluteRepoRootPathMock.mockReturnValue(consumingRepoAbsoluteRootDir);

		process.cwd = () => consumingRepoAbsoluteRootDir;

		const rootPaths = getRootPaths();

		expect(rootPaths.readFrom).toBe(
			"/Users/username/repos/consuming-repo/node_modules/web-devdeps",
		);
		expect(rootPaths.writeTo).toBe("/Users/username/repos/consuming-repo");
	});
});
