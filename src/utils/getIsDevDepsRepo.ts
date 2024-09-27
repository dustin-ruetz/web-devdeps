import {packageName} from "../constants.js";

/**
 * @description Given a path, determine whether or not it's this `devdeps` repository.
 * @param path - The path to check for the presence of the `devdeps` substring.
 * @returns Boolean indicating whether or not the path represents this `devdeps` repo or not.
 */
export const getIsDevDepsRepo = (path: string) =>
	/**
	 * @todo Figure out why the following conditional logic (which _is_ in fact covered in the unit test)
	 *       erroneously and flakily reports "Uncovered Line #s" errors in the test coverage report.
	 */
	/* v8 ignore next 1 */
	path.endsWith(packageName) || path.endsWith(`${packageName}/`);
