import {spawn} from "node:child_process";
import {getAbsoluteRepoRootPathMock} from "../utils/getAbsoluteRepoRootPath.mock.ts";
import {type cli, runCLI} from "./runCLI.ts";

jest.mock("node:child_process", () => ({
	spawn: jest.fn(() => ({
		on: jest.fn(),
	})),
}));

beforeAll(() => {
	jest.spyOn(console, "error").mockImplementation();
	jest.spyOn(console, "log").mockImplementation();
});

afterEach(() => {
	jest.clearAllMocks();
});

describe("the CLI programs are spawned correctly with their expected `args` when passed the `--config` flag", () => {
	test.each`
		cli              | configArgs                                 | autoAddedArgs
		${"commitlint"}  | ${["--config", "./commitlint.config.js"]}  | ${["--edit"]}
		${"eslint"}      | ${["--config", "./eslint.config.js"]}      | ${["--cache", "--cache-location", "./.caches/.eslintcache"]}
		${"jest"}        | ${["--config", "./jest.config.js"]}        | ${["--cache"]}
		${"lint-staged"} | ${["--config", "./lint-staged.config.js"]} | ${["--relative"]}
		${"prettier"}    | ${["--config", "./prettier.config.js"]}    | ${["--cache", "--cache-location", "./.caches/.prettiercache", "--ignore-path", "./.gitignore"]}
		${"stylelint"}   | ${["--config", "./stylelint.config.js"]}   | ${["--cache", "--cache-location", "./.caches/.stylelintcache", "--ignore-path", "./.gitignore"]}
	`(
		`$cli`,
		(testRow: {cli: cli; configArgs: string[]; autoAddedArgs: string[]}) => {
			const args = [...testRow.configArgs, ...testRow.autoAddedArgs];

			runCLI(testRow.cli, args);

			// Verify that the command being run (and all of the flags/arguments passed to it) are logged for ease-of-reference.
			/* eslint-disable no-console */
			expect(console.log).toHaveBeenCalledTimes(1);
			expect(console.log).toHaveBeenNthCalledWith(
				1,
				expect.stringContaining(`${testRow.cli} command being run`),
			);
			/* eslint-enable no-console */

			expect(spawn).toHaveBeenCalledTimes(1);
			expect(spawn).toHaveBeenCalledWith(testRow.cli, args, {stdio: "inherit"});
		},
	);
});

describe("the CLI programs automatically pass the correct argument to the `--config` flag when the command is being run from", () => {
	describe("this `web-devdeps` repo", () => {
		test.each`
			cli
			${"commitlint"}
			${"eslint"}
			${"jest"}
			${"lint-staged"}
			${"prettier"}
			${"stylelint"}
		`(`$cli`, (testRow: {cli: cli}) => {
			getAbsoluteRepoRootPathMock.mockReturnValue(
				"/Users/username/repos/web-devdeps",
			);

			runCLI(testRow.cli, []);

			expect(spawn).toHaveBeenCalledTimes(1);
			expect(spawn).toHaveBeenCalledWith(
				testRow.cli,
				expect.arrayContaining([
					"--config",
					`./lib/config/${testRow.cli}.config.js`,
				]),
				{stdio: "inherit"},
			);
		});
	});

	describe("a `consuming-repo`", () => {
		test.each`
			cli
			${"commitlint"}
			${"eslint"}
			${"jest"}
			${"lint-staged"}
			${"prettier"}
			${"stylelint"}
		`(`$cli`, (testRow: {cli: cli}) => {
			getAbsoluteRepoRootPathMock.mockReturnValue(
				"/Users/username/repos/consuming-repo",
			);

			runCLI(testRow.cli, []);

			expect(spawn).toHaveBeenCalledTimes(1);
			expect(spawn).toHaveBeenCalledWith(
				testRow.cli,
				expect.arrayContaining([
					"--config",
					`./node_modules/web-devdeps/lib/config/${testRow.cli}.config.js`,
				]),
				{stdio: "inherit"},
			);
		});
	});
});

test("the command to run the CLI program receives all of the arbitrary flags and arguments that are passed", () => {
	// @ts-expect-error since the `"cli"` argument is just a mock value in order to keep this test generic.
	runCLI("cli", [
		"--config",
		"./cli.config.js",
		"--flag-name",
		"flag-arg",
		"./",
	]);

	expect(spawn).toHaveBeenCalledTimes(1);
	expect(spawn).toHaveBeenCalledWith(
		"cli",
		expect.arrayContaining([
			"--config",
			"./cli.config.js",
			"--flag-name",
			"flag-arg",
			"./",
		]),
		{stdio: "inherit"},
	);
});
