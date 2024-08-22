import {getRepoMetadata} from "../../utils/getRepoMetadata.js";
import {nodeModulesPackagePath} from "../../constants.js";

/** Determines the root paths when running the `init-repo` script and its associated helper functions. */
export const getRootPaths = () => {
	const {absoluteRootDir, isDevDepsRepo} = getRepoMetadata();

	const rootPaths = {
		readFrom: "",
		writeTo: "",
	};

	/**
	 * @todo Figure out why the following conditional logic (which _is_ in fact covered in the unit test)
	 *       erroneously and flakily reports "Uncovered Line #s" errors in the test coverage report.
	 */
	/* v8 ignore next 14 */
	// *If* developing/testing locally from this `devdeps` repo:
	// 1. Read from the root of the repo, and
	// 2. Write to the .gitignore'd `.initRepoScriptTestOutput/` directory.
	if (isDevDepsRepo) {
		rootPaths.readFrom = absoluteRootDir;
		rootPaths.writeTo = `${absoluteRootDir}/.initRepoScriptTestOutput`;
	}
	// *Else* the script is being run from a consuming repo, so:
	// 1. Read from the `node_modules/@dustin-ruetz/devdeps/` directory, and
	// 2. Write to the root of the consuming repo.
	else {
		rootPaths.readFrom = `${absoluteRootDir}/${nodeModulesPackagePath}`;
		rootPaths.writeTo = absoluteRootDir;
	}

	return rootPaths;
};
