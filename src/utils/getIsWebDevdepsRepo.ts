import {packageName} from "../constants.ts";

/**
 * @description Given a path, determine whether or not it's this `web-devdeps` repository.
 * @param path - The path to check for the presence of the `web-devdeps` substring.
 * @returns Boolean indicating whether or not the path represents this `web-devdeps` repo or not.
 */
export const getIsWebDevdepsRepo = (path: string) =>
	path.endsWith(packageName) || path.endsWith(`${packageName}/`);
