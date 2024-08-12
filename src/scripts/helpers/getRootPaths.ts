import {getRepoMetadata} from "../../utils/getRepoMetadata.js";

/** Determines the root paths when running the `init-repo` script and its associated helper functions. */
export const getRootPaths = () => {
	const {absoluteRootDir, dependencyPartialPath, isDevDepsRepo} =
		getRepoMetadata();

	const rootPaths = {
		readFrom: "",
		writeTo: "",
	};

	// *If* developing/testing locally from this `devdeps` repo:
	// 1. Read from the root of the repo, and
	// 2. Write to the .gitignore'd `_/` directory.
	if (isDevDepsRepo) {
		rootPaths.readFrom = absoluteRootDir;
		rootPaths.writeTo = `${absoluteRootDir}/_`;
	}
	// *Else* the script is being run from a consuming repo, so:
	// 1. Read from the `node_modules/@dustin-ruetz/devdeps/` directory, and
	// 2. Write to the root of the consuming repo.
	else {
		rootPaths.readFrom = `${absoluteRootDir}/${dependencyPartialPath}`;
		rootPaths.writeTo = absoluteRootDir;
	}

	return rootPaths;
};
