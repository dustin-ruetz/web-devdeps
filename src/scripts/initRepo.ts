// To develop and test this script locally:
// 1. Execute the `pnpm dev` command so that `tsc` watches and auto-compiles all changes to this file.
// 2. Execute the following command to run the script (note the optional flags):
//    ```sh
//    pnpm init-repo repo-name --configure-frontend-testing --configure-stylelint --node-version=major.minor.patch
//    ```

import {readFile} from "node:fs/promises";

import {packageName} from "../constants.ts";
import {CustomError} from "../utils/CustomError.ts";

import {getRootPaths} from "./helpers/getRootPaths.ts";
import {
	writeGitAttributes,
	writeGitHooks,
	writeGitIgnore,
	writeJestSetupFile,
	writeLicense,
	writeNodeVersion,
	writePackageJson,
	writePnpmWorkspaceYaml,
	writeReadme,
	writeRenovate,
	writeTsConfig,
	writeTsConfigBuild,
	writeVsCodeSettings,
} from "./helpers/initRepoHelpers.ts";
import {semVerRegExp} from "./helpers/semVerRegExp.ts";

/**
 * @description Defines the information about the arguments for running the `init-repo` script.
 * @returns Object of information about the arguments (both required and optional) for the `init-repo` script.
 */
const getInitRepoArgs = async () => {
	const rootPathToReadFrom = getRootPaths().readFrom;

	/** Parse the `.node-version` file and use its value to determine the default version of Node.js to use. */
	let defaultNodeVersion = await readFile(
		`${rootPathToReadFrom}/.node-version`,
		{encoding: "utf-8"},
	);
	defaultNodeVersion = defaultNodeVersion.trim();

	/** Each child objects's keys are ordered in the way that they should be printed in the `console.table` help text. */
	return {
		// Required args:
		repoName: {
			type: "required",
			defaultValue: undefined,
			longFlag: null,
			shortFlag: null,
			description:
				"The name of the repository. Written to `package.json` and `README.md`.",
		},
		// Optional args:
		configureFrontendTesting: {
			type: "optional",
			defaultValue: false,
			longFlag: "--configure-frontend-testing",
			shortFlag: "-cft",
			description:
				"Includes the `jest.setupFilesAfterEnv.ts` file in the output.",
		},
		configureStylelint: {
			type: "optional",
			defaultValue: false,
			longFlag: "--configure-stylelint",
			shortFlag: "-cs",
			description:
				"Includes the Stylelint configuration and scripts in the output.",
		},
		nodeVersion: {
			type: "optional",
			defaultValue: defaultNodeVersion,
			longFlag: "--node-version",
			shortFlag: "-nv",
			description:
				"Node.js version number in SemVer (semantic version) format to use for the repo.",
		},
	} as const;
};

/* eslint-disable no-console */
/*
 * Log all messages in the passed array, then log a blank new line at the end
 * to help visually indicate where one section ends and another one begins.
 */
const logSection = (messages: string[]) => {
	messages.forEach((message) => {
		console.log(message);
	});
	console.log("");
};

/** Log a generic introduction prior to throwing an error, then log a message on how to get help running the command. */
const logErrorIntro = () => {
	logSection([
		"❌ An error occurred; see below for details.",
		`ℹ️ Run \`pnpx ${packageName} init-repo --help\` for documentation on this command.`,
	]);
};

/** Log the help text for this `init-repo` script. */
export const logInitRepoHelpText = async () => {
	const initRepoArgs = await getInitRepoArgs();

	logSection(["The `init-repo` script initializes a new repository."]);

	const baseCommand = `pnpx ${packageName} init-repo repo-name`;

	logSection(["Command example:", `  ${baseCommand}`]);

	logSection([
		"Command examples with optional flags:",
		// First command example using the `--long-flag` format.
		`  ${baseCommand}` +
			` ${initRepoArgs.configureFrontendTesting.longFlag}` +
			` ${initRepoArgs.configureStylelint.longFlag}` +
			` ${initRepoArgs.nodeVersion.longFlag}=${initRepoArgs.nodeVersion.defaultValue}`,
		// Second command example using the `-shortflag` format.
		`  ${baseCommand}` +
			` ${initRepoArgs.configureFrontendTesting.shortFlag}` +
			` ${initRepoArgs.configureStylelint.shortFlag}` +
			` ${initRepoArgs.nodeVersion.shortFlag}=${initRepoArgs.nodeVersion.defaultValue}`,
	]);

	console.log("Arguments:");
	console.table(initRepoArgs);
};
/* eslint-enable no-console */

/**
 * @description Writes the initial files needed for web-based projects when creating a new Git repository.
 * @param repoName - The name of the repository. Written to the `package.json` and `README.md` files.
 * @param args - The array of arguments passed to the `init-repo` script. Refer to the arg descriptions in `getInitRepoArgs` for more information.
 */
export const initRepo = async (repoName: string, args?: string[]) => {
	// #region ❝ repoName
	if (!repoName || repoName.length < 1) {
		logErrorIntro();
		throw new CustomError(
			"Argument for the required `repoName` parameter must be a string with a length >= 1.",
			{
				cause: {
					code: "ERR_INVALID_REPONAME",
					values: {repoName},
				},
				name: "InvalidInputError",
			},
		);
	}
	// #endregion repoName

	const initRepoArgs = await getInitRepoArgs();

	/** Array of objects containing the information about the script's optional arguments. */
	const optionalArgs = Object.values(initRepoArgs).filter(
		(arg) => arg.type === "optional",
	);
	/** Array of strings listing the script's optional flags (in both long and short formats). */
	const optionalFlags = optionalArgs.flatMap((arg) => [
		arg.longFlag,
		arg.shortFlag,
	]);
	// Throw an error if an invalid flag was passed, i.e. one that's not present in the `optionalFlags` array.
	args?.forEach((arg) => {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
		const [flag] = arg.split("=") as typeof optionalFlags;
		if (flag && !optionalFlags.includes(flag)) {
			throw new CustomError(`Invalid flag passed: ${flag}`, {
				cause: {
					code: "ERR_INVALID_FLAG_PASSED",
					values: {flags: args, invalidFlag: flag},
				},
				name: "InvalidInputError",
			});
		}
	});

	// #region 🃏 configureFrontendTesting
	// Determine whether or not to write the `config/jest.setupFilesAfterEnv.ts` file.
	let configureFrontendTesting: boolean =
		initRepoArgs.configureFrontendTesting.defaultValue;
	const configureFrontendTestingFlag = args?.filter(
		(arg) =>
			arg === initRepoArgs.configureFrontendTesting.longFlag ||
			arg === initRepoArgs.configureFrontendTesting.shortFlag,
	);
	if (configureFrontendTestingFlag && configureFrontendTestingFlag.length > 1) {
		throw new CustomError(
			"Multiple `configureFrontendTesting` flags received; only one may be passed.",
			{
				cause: {
					code: "ERR_OPTIONAL_FLAG_PASSED_MULTIPLE_TIMES",
					values: {configureFrontendTestingFlag},
				},
				name: "InvalidInputError",
			},
		);
	}
	if (
		configureFrontendTestingFlag &&
		configureFrontendTestingFlag.length === 1
	) {
		configureFrontendTesting = true;
	}
	// #endregion 🃏 configureFrontendTesting

	// #region 📐 configureStylelint
	// Determine whether or not to configure Stylelint.
	let configureStylelint: boolean =
		initRepoArgs.configureStylelint.defaultValue;
	const configureStylelintFlag = args?.filter(
		(arg) =>
			arg === initRepoArgs.configureStylelint.longFlag ||
			arg === initRepoArgs.configureStylelint.shortFlag,
	);
	if (configureStylelintFlag && configureStylelintFlag.length > 1) {
		throw new CustomError(
			"Multiple `configureStylelint` flags received; only one may be passed.",
			{
				cause: {
					code: "ERR_OPTIONAL_FLAG_PASSED_MULTIPLE_TIMES",
					values: {configureStylelintFlag},
				},
				name: "InvalidInputError",
			},
		);
	}
	if (configureStylelintFlag && configureStylelintFlag.length === 1) {
		configureStylelint = true;
	}
	// #endregion 📐 configureStylelint

	// #region ⬢ nodeVersion
	// Determine whether or not to use the default Node.js version or the passed one.
	let nodeVersion = initRepoArgs.nodeVersion.defaultValue;
	const nodeVersionFlagAndArg = args?.filter((arg) => {
		const [flag] = arg.split("=");
		return (
			flag === initRepoArgs.nodeVersion.longFlag ||
			flag === initRepoArgs.nodeVersion.shortFlag
		);
	});
	if (nodeVersionFlagAndArg && nodeVersionFlagAndArg.length > 1) {
		throw new CustomError(
			"Multiple `nodeVersion` flags received; only one may be passed.",
			{
				cause: {
					code: "ERR_OPTIONAL_FLAG_PASSED_MULTIPLE_TIMES",
					values: {nodeVersionFlagAndArg},
				},
				name: "InvalidInputError",
			},
		);
	}
	if (nodeVersionFlagAndArg?.[0] && nodeVersionFlagAndArg.length === 1) {
		const flag = nodeVersionFlagAndArg[0].split("=")[0];
		const version = nodeVersionFlagAndArg[0].split("=")[1] ?? "";

		const isValidSemanticVersion = semVerRegExp(version).isMatch;
		if (!isValidSemanticVersion) {
			logErrorIntro();
			throw new CustomError(
				"Argument for the optional" +
					` \`${initRepoArgs.nodeVersion.longFlag}\`/\`${initRepoArgs.nodeVersion.shortFlag}\` ` +
					"flag must be a valid semantic version number.",
				{
					cause: {
						code: "ERR_INVALID_NODEVERSION",
						values: {flag, version},
					},
					name: "InvalidInputError",
				},
			);
		}
		nodeVersion = version;
	}
	// #endregion ⬢ nodeVersion

	await Promise.all([
		writeGitAttributes(),
		writeGitHooks(),
		writeGitIgnore(),
		configureFrontendTesting && writeJestSetupFile(),
		writeLicense(),
		writeNodeVersion(nodeVersion),
		writePackageJson(repoName, configureStylelint),
		writePnpmWorkspaceYaml(),
		writeReadme(repoName),
		writeRenovate(),
		writeTsConfigBuild(),
		writeTsConfig(),
		writeVsCodeSettings(configureStylelint),
	]);
};
