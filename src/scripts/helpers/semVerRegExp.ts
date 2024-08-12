/**
 * Regular expression to check if the passed string matches the `major.minor.patch`
 * semantic version format, where both the `minor` and `patch` groups are optional.
 *
 * RegExp pattern adapted from:
 * @link https://semver.org/#is-there-a-suggested-regular-expression-regex-to-check-a-semver-string
 */
export const semVerRegExp = (semVer: string) => {
	const expression = /^(0|[1-9]\d*)(?:\.(0|[1-9]\d*))?(?:\.(0|[1-9]\d*))?$/;
	const isMatch = expression.test(semVer);

	return {expression, isMatch};
};
