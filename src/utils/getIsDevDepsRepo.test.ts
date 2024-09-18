import {getIsDevDepsRepo} from "./getIsDevDepsRepo.js";

describe("it correctly identifies whether or not the passed path represents the `devdeps` repo", () => {
	test.each`
		path                                       | isDevDepsRepo
		${""}                                      | ${false}
		${"/Users/username/repos/devdeps/"}        | ${true}
		${"/Users/username/repos/devdeps"}         | ${true}
		${"/Users/username/repos/consuming-repo/"} | ${false}
		${"/Users/username/repos/consuming-repo"}  | ${false}
	`(
		`getIsDevDepsRepo("$path") === $isDevDepsRepo`,
		(testRow: {path: string; isDevDepsRepo: boolean}) => {
			expect(getIsDevDepsRepo(testRow.path)).toEqual(testRow.isDevDepsRepo);
		},
	);
});
