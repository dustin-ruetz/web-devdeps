import {getAbsoluteRepoRootPath} from "../../utils/getAbsoluteRepoRootPath.js";
import {getRootPaths} from "./getRootPaths.js";

jest.mock("../../utils/getAbsoluteRepoRootPath.js", () => ({
	getAbsoluteRepoRootPath: jest.fn(() => ""),
}));
const mockGetAbsoluteRepoRootPath =
	getAbsoluteRepoRootPath as jest.MockedFunction<
		typeof getAbsoluteRepoRootPath
	>;

afterEach(() => {
	jest.clearAllMocks();
});

const initialProcessCwd = process.cwd;
afterAll(() => {
	process.cwd = initialProcessCwd;
});

describe("the returned root paths (1. to read from, and 2. to write to) are correct when called from", () => {
	test("this devdeps repo", () => {
		mockGetAbsoluteRepoRootPath.mockReturnValue(
			"/Users/username/repos/devdeps",
		);

		const rootPaths = getRootPaths();

		expect(rootPaths.readFrom).toEqual("/Users/username/repos/devdeps");
		expect(rootPaths.writeTo).toEqual(
			"/Users/username/repos/devdeps/.init-repo-script-test-output",
		);
	});

	test("a consuming repo that has installed the devdeps package", () => {
		const consumingRepoAbsoluteRootDir = "/Users/username/repos/consuming-repo";
		mockGetAbsoluteRepoRootPath.mockReturnValue(consumingRepoAbsoluteRootDir);

		process.cwd = () => consumingRepoAbsoluteRootDir;

		const rootPaths = getRootPaths();

		expect(rootPaths.readFrom).toEqual(
			"/Users/username/repos/consuming-repo/node_modules/@dustin-ruetz/devdeps",
		);
		expect(rootPaths.writeTo).toEqual("/Users/username/repos/consuming-repo");
	});
});
