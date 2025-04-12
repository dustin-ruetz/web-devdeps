import {readFile} from "node:fs/promises";
import type {PackageJsonTypes} from "../types.d.ts";
import {getAbsoluteRepoRootPath} from "./getAbsoluteRepoRootPath.ts";
import {CustomError} from "./CustomError.ts";

/**
 * @description Given a list of dependencies, check the repository's `package.json` file
 *              and determine whether or not the project depends on any of them.
 * @param deps - Names of packages to check the various `dependencies` objects for.
 * @returns Boolean indicating whether or not the repo depends on the passed package(s).
 * @example
 * ```js
 * // The following line of code checks the repository's `package.json` file to determine
 * // whether or not the project depends on either the Pug or React packages.
 * const testEnvironment = await dependsOn(["pug", "react"]) ? "jsdom" : "node";
 * ```
 */
export const dependsOn = async (deps: string[]) => {
	// It's possible to use this function directly from the compiled lib/ .js file,
	// so start with validation checks and throw errors early if needed.
	if (!Array.isArray(deps) || deps.length < 1) {
		throw new CustomError(
			"Argument for the `deps` parameter must be an array of strings with a length >= 1.",
			{
				cause: {
					code: "ERR_INVALID_DEPS_ARRAY",
					values: {deps, "typeof deps": typeof deps},
				},
				name: "InvalidInputError",
			},
		);
	}
	deps.forEach((dep) => {
		if (dep === "" || typeof dep !== "string") {
			throw new CustomError(
				"All values in the `deps` array argument must be non-empty strings.",
				{
					cause: {
						code: "ERR_TYPEOF_DEP_NOT_STRING",
						values: {deps, dep, "typeof dep": typeof dep},
					},
					name: "InvalidInputError",
				},
			);
		}
	});

	// Read the package.json file and parse its string contents into an object,
	// then merge its three dependency objects into one combined object.
	const packageJsonPath = `${getAbsoluteRepoRootPath()}/package.json`;
	const packageJsonContents = await readFile(packageJsonPath, {
		encoding: "utf-8",
	});
	// eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
	const packageJson = JSON.parse(packageJsonContents) as PackageJsonTypes;
	const allDependencies = {
		...packageJson.dependencies,
		...packageJson.devDependencies,
		...packageJson.peerDependencies,
	};

	// Determine whether or not the package.json file has any of the passed dependencies.
	let hasDependency = false;
	deps.forEach((dep) => {
		if (allDependencies[dep]) {
			hasDependency = true;
		}
	});

	return hasDependency;
};
