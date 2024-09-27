/**
 * @description Regular expression to check if the passed string matches the `major.minor.patch`
 *              semantic version format, where both the `minor` and `patch` groups are optional.
 * @param semVer - The version number to check.
 * @returns The regular expression itself and whether or not the passed `semVer` is a match.
 */
export const semVerRegExp = (semVer: string) => {
	/**
	 * RegExp pattern sourced from [semver.org](https://semver.org/#is-there-a-suggested-regular-expression-regex-to-check-a-semver-string)
	 * and then adapted to make the first capture group (i.e. `major`) required and latter two (i.e. `minor` and `patch`) optional.
	 */
	const expression = /^(0|[1-9]\d*)(?:\.(0|[1-9]\d*))?(?:\.(0|[1-9]\d*))?$/;
	const isMatch = expression.test(semVer);

	return {expression, isMatch};
};
