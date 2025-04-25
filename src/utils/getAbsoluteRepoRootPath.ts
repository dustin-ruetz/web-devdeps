import {fileURLToPath} from "node:url";

import {nodeModulesPackagePath, packageName} from "../constants.ts";

import {CustomError} from "./CustomError.ts";

/**
 * The purpose of this function is to provide a more robust alternative to `process.cwd()`. As per
 * the Node.js documentation on https://nodejs.org/docs/latest/api/process.html#processcwd:
 * > The `process.cwd()` method returns the current working directory of the Node.js process.
 *
 * The problem with relying on `process.cwd()` is that it's dependent on the directory where the Node.js process was
 * started from; if it's run from anywhere but the root of the repository then it will not return the desired path.
 *
 * This function uses the known location of this `utils/absoluteRepoRootPath` file within the repo's structure and
 * uses it as an anchor point to determine the absolute root path of the repo where it's being called from.
 * It's intended to return the absolute path of either:
 * 1. The consuming repository where the `web-devdeps` package is installed as a dependency; or
 * 2. This `web-devdeps` repo itself.
 *
 * **Important:** Note that the `absoluteRepoRootPath` path is intentionally returned _without_ a trailing slash.
 * @returns The absolute root path of the repo where this specific file is being accessed from.
 * @throws An error in the event of a path mismatch, i.e. if `web-devdeps` is not in the path.
 */
export const getAbsoluteRepoRootPath = () => {
	/**
	 * @description Path to the `web-devdeps` directory. Note the relative path to traverse two levels upwards,
	 *              i.e. starting from this file's location in `utils/`, move up twice: `lib/ ⬆️ web-devdeps/`
	 * @todo Replace `import.meta.url` if/when the `import.meta.resolve()` function becomes workable with Jest.
	 *
	 * Excerpt from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import.meta/resolve#comparison_with_new_url:
	 * > The `URL()` constructor accepts a second base _URL_ argument. When the first argument is a relative path
	 * > and the base URL is `import.meta.url`, the effect is similar to `import.meta.resolve()`.
	 */
	const webDevdepsPath = fileURLToPath(new URL("../../", import.meta.url));

	const nodeModulesPackagePathWithSlashes = `/${nodeModulesPackagePath}/`;
	if (webDevdepsPath.endsWith(nodeModulesPackagePathWithSlashes)) {
		return webDevdepsPath.replace(nodeModulesPackagePathWithSlashes, "");
	}

	if (webDevdepsPath.endsWith(`/${packageName}/`)) {
		// Remove the last character in the string, i.e. the path's trailing slash.
		return webDevdepsPath.slice(0, -1);
	}

	throw new CustomError(
		"`web-devdeps` subpath string is not present within the path.",
		{
			cause: {
				code: "ERR_PATH_MISMATCH",
				values: {path: webDevdepsPath},
			},
			name: "PathMismatchError",
		},
	);
};
