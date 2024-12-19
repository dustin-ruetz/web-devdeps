import {getIsWebDevdepsRepo} from "./getIsWebDevdepsRepo.js";

describe("it correctly identifies whether or not the passed path represents the `web-devdeps` repo", () => {
	test.each`
		path                                       | isWebDevdepsRepo
		${""}                                      | ${false}
		${"/Users/username/repos/web-devdeps/"}    | ${true}
		${"/Users/username/repos/web-devdeps"}     | ${true}
		${"/Users/username/repos/consuming-repo/"} | ${false}
		${"/Users/username/repos/consuming-repo"}  | ${false}
	`(
		`getIsWebDevdepsRepo("$path") === $isWebDevdepsRepo`,
		(testRow: {path: string; isWebDevdepsRepo: boolean}) => {
			expect(getIsWebDevdepsRepo(testRow.path)).toBe(testRow.isWebDevdepsRepo);
		},
	);
});
