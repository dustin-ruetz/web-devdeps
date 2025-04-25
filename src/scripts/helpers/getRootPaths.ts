import {nodeModulesPackagePath} from "../../constants.ts";
import {getAbsoluteRepoRootPath} from "../../utils/getAbsoluteRepoRootPath.ts";
import {getIsWebDevdepsRepo} from "../../utils/getIsWebDevdepsRepo.ts";

/**
 * @description Determines the root paths when running the `init-repo` script and its associated helper functions.
 * @returns The root paths for the `init-repo` script to read from and write to.
 */
export const getRootPaths = () => {
	const absoluteRepoRootPath = getAbsoluteRepoRootPath();
	const isWebDevdepsRepo = getIsWebDevdepsRepo(absoluteRepoRootPath);

	const rootPaths = {
		readFrom: "",
		writeTo: "",
	};

	// *If* developing/testing locally from this `web-devdeps` repo:
	// 1. Read from the root of the repo, and
	// 2. Write to the .gitignore'd `.init-repo-script-test-output/` directory.
	if (isWebDevdepsRepo) {
		rootPaths.readFrom = absoluteRepoRootPath;
		rootPaths.writeTo = `${absoluteRepoRootPath}/.init-repo-script-test-output`;
	}
	// *Else* the script is being run from a consuming repo, so:
	// 1. Read from the `node_modules/web-devdeps/` directory, and
	// 2. Write to the root of the consuming repo, i.e. the current working directory of the Node.js process.
	else {
		rootPaths.readFrom = `${absoluteRepoRootPath}/${nodeModulesPackagePath}`;
		rootPaths.writeTo = process.cwd();
	}

	return rootPaths;
};
