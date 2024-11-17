import {packageName} from "../constants.js";

/**
 * @description Given a path, determine whether or not it's this `devdeps` repository.
 * @param path - The path to check for the presence of the `devdeps` substring.
 * @returns Boolean indicating whether or not the path represents this `devdeps` repo or not.
 */
export const getIsDevDepsRepo = (path: string) =>
	path.endsWith(packageName) || path.endsWith(`${packageName}/`);
