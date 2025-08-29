import {rm} from "node:fs/promises";

import {CustomError} from "../utils/CustomError.ts";

/**
 * @description Cross-platform/OS-agnostic Node.js script equivalent of the
 *              POSIX `rm -rf` command; in other words, it recursively and
 *              forcibly removes the passed `paths`.
 *              **Important:** For safety, any passed path that isn't explicitly relative to the current
 *              directory (i.e. not equal to or beginning with the `./` substring) will be ignored.
 * @param paths - The array of items (either directories, files, or both) to delete from the disk.
 * @throws An error if the array of `paths` is not passed.
 */
export const clean = (paths: string[]) => {
	if (!Array.isArray(paths) || paths.length < 1) {
		throw new CustomError(
			"Argument for the `paths` parameter must be an array of strings with a length >= 1." +
				" Note that non-relative paths (i.e. those not beginning with the `./` substring) will be ignored.",
			{
				cause: {
					code: "ERR_INVALID_PATHS_ARRAY",
					values: {paths, "typeof paths": typeof paths},
				},
				name: "InvalidInputError",
			},
		);
	}

	for (const path of paths) {
		/* eslint-disable no-console */

		// Prevent the path from being removed:
		// 1. If it represents the repo's local directory; or
		if (path === "./") {
			console.warn(`⛔️ Ignored path: ./`);
		}
		// 2. If it's non-relative (i.e. doesn't begin with `./`).
		else if (!path.startsWith("./")) {
			console.warn(
				"⛔️ Ignored path (since it doesn't begin with `./`): " + path,
			);
		}
		// Else the path is relative to the repo, in which case it's safe to delete it.
		else {
			void rm(path, {
				force: true,
				recursive: true,
			});
			console.log(`🧹 Deleted path: ${path}`);
		}

		/* eslint-enable no-console */
	}
};
