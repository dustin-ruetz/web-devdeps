import {getRootPaths} from "./getRootPaths.js";

afterEach(() => {
	jest.clearAllMocks();
});

const initialProcessCwd = process.cwd;
afterAll(() => {
	process.cwd = initialProcessCwd;
});

describe("the returned root paths (1. to read from, and 2. to write to) are correct when called from", () => {
	test("this devdeps repo", () => {
		process.cwd = () => "/Users/username/repos/devdeps";

		const rootPaths = getRootPaths();

		expect(rootPaths.readFrom).toEqual("/Users/username/repos/devdeps");
		expect(rootPaths.writeTo).toEqual(
			"/Users/username/repos/devdeps/.initRepoScriptTestOutput",
		);
	});

	test("a consuming repo that has installed the devdeps package", () => {
		process.cwd = () => "/Users/username/repos/consuming-repo";

		const rootPaths = getRootPaths();

		expect(rootPaths.readFrom).toEqual(
			"/Users/username/repos/consuming-repo/node_modules/@dustin-ruetz/devdeps",
		);
		expect(rootPaths.writeTo).toEqual("/Users/username/repos/consuming-repo");
	});
});
