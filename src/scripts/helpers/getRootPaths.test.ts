import {getRepoMetadata} from "../../utils/getRepoMetadata.js";
import {getRootPaths} from "./getRootPaths.js";

jest.mock("../../utils/getRepoMetadata.js");
const mockGetRepoMetadata = getRepoMetadata as jest.MockedFunction<
	typeof getRepoMetadata
>;

afterEach(() => {
	jest.clearAllMocks();
});

describe("the returned root paths (1. to read from, and 2. to write to) are correct when called from", () => {
	test("this devdeps repo", () => {
		mockGetRepoMetadata.mockReturnValue({
			absoluteRootDir: "/Users/username/repos/devdeps",
			isDevDepsRepo: true,
		});

		const rootPaths = getRootPaths();

		expect(rootPaths.readFrom).toEqual("/Users/username/repos/devdeps");
		expect(rootPaths.writeTo).toEqual(
			"/Users/username/repos/devdeps/.initRepoScriptTestOutput",
		);
	});

	test("a consuming repo that has installed the devdeps package", () => {
		mockGetRepoMetadata.mockReturnValue({
			absoluteRootDir: "/Users/username/repos/consuming-repo",
			isDevDepsRepo: false,
		});

		const rootPaths = getRootPaths();

		expect(rootPaths.readFrom).toEqual(
			"/Users/username/repos/consuming-repo/node_modules/@dustin-ruetz/devdeps",
		);
		expect(rootPaths.writeTo).toEqual("/Users/username/repos/consuming-repo");
	});
});
