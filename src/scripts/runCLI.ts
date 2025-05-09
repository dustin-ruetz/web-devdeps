import {spawn} from "node:child_process";

import {nodeModulesPackagePath} from "../constants.ts";
import {getAbsoluteRepoRootPath} from "../utils/getAbsoluteRepoRootPath.ts";
import {getIsWebDevdepsRepo} from "../utils/getIsWebDevdepsRepo.ts";
import {makeCachePath} from "../utils/makeCachePath.ts";

export type cli =
	| "commitlint"
	| "eslint"
	| "jest"
	| "lint-staged"
	| "prettier"
	| "stylelint";

/**
 * @description Executes the CLI program of an installed package and determines the path to its configuration file.
 * @param cli - The CLI program to execute. Should be a package listed in the `dependencies` of the `package.json` file.
 * @param args - The array of `args` (i.e. flags and their arguments) passed to the CLI program.
 */
export const runCLI = (cli: cli, args: string[]) => {
	let cliEmoji = "";

	// Automatically add specific arguments to the command based on the CLI program that is being run.
	// #region 🦾 automatically added args
	const cacheFlag = "--cache";
	const cacheLocationFlag = "--cache-location";
	const ignorePathFlag = "--ignore-path";
	const ignorePathArg = "./.gitignore";

	switch (cli) {
		// https://commitlint.js.org/reference/cli.html
		case "commitlint": {
			cliEmoji = "💬";
			// Excerpt from documentation:
			// > --edit - read last commit message from the specified file or fallback to `.git/COMMIT_EDITMSG`
			args.unshift("--edit");
			break;
		}
		// https://eslint.org/docs/latest/use/command-line-interface
		case "eslint": {
			cliEmoji = "📚";
			const cacheLocationArg = `./${makeCachePath(".eslintcache")}`;
			args.unshift(cacheFlag, cacheLocationFlag, cacheLocationArg);
			break;
		}
		// https://jestjs.io/docs/cli
		case "jest":
			cliEmoji = "🃏";
			args.unshift(cacheFlag);
			break;
		// https://github.com/lint-staged/lint-staged#command-line-flags
		case "lint-staged": {
			cliEmoji = "🛡️";
			// Excerpt from documentation:
			// > --relative - pass filepaths relative to `process.cwd()` (where `lint-staged` runs) to tasks; default is `false`
			args.unshift("--relative");
			break;
		}
		// https://prettier.io/docs/en/cli.html
		case "prettier": {
			cliEmoji = "🪞";
			const cacheLocationArg = `./${makeCachePath(".prettiercache")}`;
			args.unshift(
				cacheFlag,
				cacheLocationFlag,
				cacheLocationArg,
				ignorePathFlag,
				ignorePathArg,
			);
			break;
		}
		case "stylelint": {
			cliEmoji = "📐";
			const cacheLocationArg = `./${makeCachePath(".stylelintcache")}`;
			args.unshift(
				cacheFlag,
				cacheLocationFlag,
				cacheLocationArg,
				ignorePathFlag,
				ignorePathArg,
			);
			break;
		}
	}
	// #endregion 🦾 automatically added args

	// #region ⚙️ config args
	const configFlag = "--config";
	const configFlagIndex = args.findIndex(
		// - Ideally the below function would also check for the presence of the short-form `-c` flag as well,
		//   but unfortunately the `commitlint` CLI uses `-c` as its short syntax for the `--color` flag.
		// - https://commitlint.js.org/reference/cli.html#cli
		(arg) => arg === configFlag,
	);
	const configArg = args[configFlagIndex + 1];
	const hasConfigFlag = configFlagIndex !== -1;
	const hasConfigArg = configArg !== undefined;

	const absoluteRepoRootPath = getAbsoluteRepoRootPath();
	const isWebDevdepsRepo = getIsWebDevdepsRepo(absoluteRepoRootPath);

	/**
	 * Normalize how the `--config` flag and its argument are passed to the CLI program,
	 * i.e. ensure that they are the first two items in the `args` array.
	 */
	// 1. If they _are_ passed:
	if (hasConfigFlag && hasConfigArg) {
		// 1a. Remove them from the `args` array.
		// eslint-disable-next-line @typescript-eslint/no-magic-numbers
		args.splice(configFlagIndex, 2);
		// 1b. Re-insert them at the beginning of the `args` array.
		args.unshift(configFlag, configArg);
	}
	// 2. If they _are not_ passed:
	else {
		const configFilePath = `lib/config/${cli}.config.js`;

		// 2a. Determine the path to the configuration file depending on the repo.
		const configPath = isWebDevdepsRepo
			? `./${configFilePath}`
			: `./${nodeModulesPackagePath}/${configFilePath}`;
		// 2b. Prepend the `--config` flag and its argument to the existing `args` array.
		args.unshift(configFlag, configPath);
	}
	// #endregion ⚙️ config args

	// #region ℹ️ log command
	let runCLIpath = "lib/scripts/runCLI.js";
	runCLIpath = isWebDevdepsRepo
		? `./${runCLIpath}`
		: `./${nodeModulesPackagePath}/${runCLIpath}`;
	// Log out the command that is being run (and all of the flags/arguments passed to it)
	// for ease-of-reference and to avoid any perceived attempts at "magic".
	// eslint-disable-next-line no-console
	console.log(
		`${cliEmoji} ${cli} command being run (as generated by ${runCLIpath}):` +
			"\n" +
			`> ${cli} ${args.join(" ")}`,
	);
	// #endregion ℹ️ log command

	// It's very difficult to test the methods on the `spawn` function,
	// so exclude these lines from the test coverage report.
	/* v8 ignore next 9 */
	spawn(cli, [...args], {stdio: "inherit"}).on("close", (exitCode) => {
		if (exitCode !== 0) {
			// eslint-disable-next-line no-console
			console.error(
				`${cliEmoji} ${cli} terminated with non-zero exit code ${String(exitCode)}.`,
			);
		}
		process.exit(exitCode);
	});
};
