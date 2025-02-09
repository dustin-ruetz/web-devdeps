import {semVerRegExp} from "./semVerRegExp.ts";

describe("it correctly identifies matches for the semantic version format", () => {
	test.each`
		semVer                   | isMatch
		${"-1"}                  | ${false}
		${"-1."}                 | ${false}
		${"-1.2"}                | ${false}
		${"-1.2."}               | ${false}
		${"-1.2.3"}              | ${false}
		${"-1.2.3."}             | ${false}
		${"0"}                   | ${true}
		${"0."}                  | ${false}
		${"0.1"}                 | ${true}
		${"0.1."}                | ${false}
		${"0.1.2"}               | ${true}
		${"0.1.2."}              | ${false}
		${"0.1.2.3"}             | ${false}
		${"1"}                   | ${true}
		${"1."}                  | ${false}
		${"1.2"}                 | ${true}
		${"1.2."}                | ${false}
		${"1.2.3"}               | ${true}
		${"1.2.3."}              | ${false}
		${"1.2.3.4"}             | ${false}
		${"10"}                  | ${true}
		${"10."}                 | ${false}
		${"10.11"}               | ${true}
		${"10.11."}              | ${false}
		${"10.11.12"}            | ${true}
		${"10.11.12."}           | ${false}
		${"10.11.12.13"}         | ${false}
		${"v10.20.30"}           | ${false}
		${"10.20.30-alpha"}      | ${false}
		${"10.20.30-beta"}       | ${false}
		${"10.20.30-build1"}     | ${false}
		${"10.20.30-prerelease"} | ${false}
		${"10.20.30-rc1"}        | ${false}
	`(
		`semVerRegExp("$semVer").isMatch === $isMatch`,
		(testRow: {semVer: string; isMatch: boolean}) => {
			expect(semVerRegExp(testRow.semVer).isMatch).toBe(testRow.isMatch);
		},
	);
});
