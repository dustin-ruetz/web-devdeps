import {readFile} from "node:fs/promises";

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
import {initRepo, logInitRepoHelpText} from "./initRepo.ts";

jest.mock("node:fs/promises");
const readFileMock = jest.mocked(readFile);

jest.mock("./helpers/initRepoHelpers.ts");

const testRepoName = "repo-name";
/**
 * Node.js version number for the purposes of this unit test; use a very old/obviously
 * out-of-long-term-support version number to avoid any inclination to update it.
 */
const testNodeVersion = "10";

beforeAll(() => {
	readFileMock.mockResolvedValue(testNodeVersion);

	jest.spyOn(console, "log").mockImplementation();
	jest.spyOn(console, "table").mockImplementation();
});

/* eslint-disable no-console */
test("the `logInitRepoHelpText` helper function logs the correct values", async () => {
	expect.hasAssertions();

	const baseCommand = "pnpx web-devdeps init-repo repo-name";

	await logInitRepoHelpText();

	// Verify that the examples on how to run the command are correct.
	expect(console.log).toHaveBeenCalledWith(
		expect.stringContaining(baseCommand),
	);
	expect(console.log).toHaveBeenCalledWith(
		expect.stringContaining(
			`${baseCommand} --configure-frontend-testing --configure-stylelint --node-version=${testNodeVersion}`,
		),
	);
	expect(console.log).toHaveBeenCalledWith(
		expect.stringContaining(`${baseCommand} -cft -cs -nv=${testNodeVersion}`),
	);

	// Verify that the information about the function's arguments is logged in tabular format.
	expect(console.table).toHaveBeenCalledTimes(1);
});
/* eslint-enable no-console */

describe("initRepo", () => {
	test("throws an error if the required `repoName` argument is invalid", async () => {
		expect.hasAssertions();

		const invalidRepoNameErrorCode = /ERR_INVALID_REPONAME/;
		await expect(async () => {
			// @ts-expect-error if `repoName` is not passed.
			await initRepo();
		}).rejects.toThrow(invalidRepoNameErrorCode);
		await expect(async () => {
			// Expect an error if `repoName` is an empty string.
			await initRepo("");
		}).rejects.toThrow(invalidRepoNameErrorCode);
	});

	describe("throws an error if invalid flags are passed", () => {
		const invalidFlagPassedErrorCode = "ERR_INVALID_FLAG_PASSED";

		test.each`
			argsArray
			${["--invalid-flag"]}
			${["--configure-stylelint", `--node-version=${testNodeVersion}`, "--invalid-flag"]}
		`(
			`initRepo("${testRepoName}", $argsArray) throws ${invalidFlagPassedErrorCode} error`,
			async (testRow: {argsArray: string[]}) => {
				expect.hasAssertions();

				await expect(async () => {
					await initRepo(testRepoName, testRow.argsArray);
				}).rejects.toThrow(new RegExp(invalidFlagPassedErrorCode));
			},
		);
	});

	describe("throws an error if an optional flag is passed multiple times", () => {
		const optionalFlagPassedMultipleTimesErrorCode =
			"ERR_OPTIONAL_FLAG_PASSED_MULTIPLE_TIMES";

		test.each`
			argsArray
			${["--configure-frontend-testing", "-cft"]}
			${["--configure-frontend-testing", "--configure-frontend-testing"]}
			${["-cft", "-cft"]}
			${["--configure-stylelint", "-cs"]}
			${["--configure-stylelint", "--configure-stylelint"]}
			${["-cs", "-cs"]}
			${[`--node-version=${testNodeVersion}`, `-nv=${testNodeVersion}`]}
			${[`--node-version=${testNodeVersion}`, `--node-version=${testNodeVersion}`]}
			${[`-nv=${testNodeVersion}`, `-nv=${testNodeVersion}`]}
		`(
			`initRepo("${testRepoName}", $argsArray) throws ${optionalFlagPassedMultipleTimesErrorCode} error`,
			async (testRow: {argsArray: string[]}) => {
				expect.hasAssertions();

				await expect(async () => {
					await initRepo(testRepoName, testRow.argsArray);
				}).rejects.toThrow(
					new RegExp(optionalFlagPassedMultipleTimesErrorCode),
				);
			},
		);
	});

	describe("throws an error if the optional `--node-version`/`-nv` argument is invalid", () => {
		const invalidNodeVersionErrorCode = "ERR_INVALID_NODEVERSION";

		test.each`
			argsArray
			${["--node-version"]}
			${["--node-version="]}
			${["--node-version=A"]}
			${["-nv"]}
			${["-nv="]}
			${["-nv=A"]}
		`(
			`initRepo("${testRepoName}", $argsArray) throws ${invalidNodeVersionErrorCode} error`,
			async (testRow: {argsArray: string[]}) => {
				expect.hasAssertions();

				await expect(async () => {
					await initRepo(testRepoName, testRow.argsArray);
				}).rejects.toThrow(new RegExp(invalidNodeVersionErrorCode));
			},
		);
	});

	test("executes the helper functions with the correct default arguments", async () => {
		expect.hasAssertions();

		const defaultArgumentValues = {
			configureFrontendTesting: false,
			configureStylelint: false,
			nodeVersion: testNodeVersion,
		} as const;

		await initRepo("repo-name", []);

		expect(writeGitAttributes).toHaveBeenCalledTimes(1);
		expect(writeGitIgnore).toHaveBeenCalledTimes(1);
		expect(writeGitHooks).toHaveBeenCalledTimes(1);
		expect(writeJestSetupFile).not.toHaveBeenCalled();
		expect(writeLicense).toHaveBeenCalledTimes(1);
		expect(writeNodeVersion).toHaveBeenCalledTimes(1);
		expect(writePnpmWorkspaceYaml).toHaveBeenCalledTimes(1);
		expect(writeNodeVersion).toHaveBeenCalledWith(
			defaultArgumentValues.nodeVersion,
		);
		expect(writePackageJson).toHaveBeenCalledTimes(1);
		expect(writePackageJson).toHaveBeenCalledWith(
			"repo-name",
			defaultArgumentValues.configureStylelint,
		);
		expect(writeReadme).toHaveBeenCalledTimes(1);
		expect(writeReadme).toHaveBeenCalledWith("repo-name");
		expect(writeRenovate).toHaveBeenCalledTimes(1);
		expect(writeTsConfig).toHaveBeenCalledTimes(1);
		expect(writeTsConfigBuild).toHaveBeenCalledTimes(1);
		expect(writeVsCodeSettings).toHaveBeenCalledTimes(1);
		expect(writeVsCodeSettings).toHaveBeenCalledWith(
			defaultArgumentValues.configureStylelint,
		);
	});

	describe("executes the helper functions with the correct arguments when passed", () => {
		const passedFlagValues = {
			configureFrontendTesting: true,
			configureStylelint: true,
			nodeVersion: testNodeVersion,
		} as const;

		test("with the long flags in the suggested order", async () => {
			expect.hasAssertions();

			await initRepo("repo-name", [
				"--configure-frontend-testing",
				"--configure-stylelint",
				`--node-version=${passedFlagValues.nodeVersion}`,
			]);

			expect(writeJestSetupFile).toHaveBeenCalledWith();
			expect(writeNodeVersion).toHaveBeenCalledWith(
				passedFlagValues.nodeVersion,
			);
			expect(writePackageJson).toHaveBeenCalledWith(
				"repo-name",
				passedFlagValues.configureStylelint,
			);
			expect(writeVsCodeSettings).toHaveBeenCalledWith(
				passedFlagValues.configureStylelint,
			);
		});

		test("with the long flags in a different order", async () => {
			expect.hasAssertions();

			await initRepo("repo-name", [
				`--node-version=${passedFlagValues.nodeVersion}`,
				"--configure-stylelint",
				"--configure-frontend-testing",
			]);

			expect(writeJestSetupFile).toHaveBeenCalledWith();
			expect(writeNodeVersion).toHaveBeenCalledWith(
				passedFlagValues.nodeVersion,
			);
			expect(writePackageJson).toHaveBeenCalledWith(
				"repo-name",
				passedFlagValues.configureStylelint,
			);
			expect(writeVsCodeSettings).toHaveBeenCalledWith(
				passedFlagValues.configureStylelint,
			);
		});

		test("with the short flags in the suggested order", async () => {
			expect.hasAssertions();

			await initRepo("repo-name", [
				"-cft",
				"-cs",
				`-nv=${passedFlagValues.nodeVersion}`,
			]);

			expect(writeJestSetupFile).toHaveBeenCalledWith();
			expect(writeNodeVersion).toHaveBeenCalledWith(
				passedFlagValues.nodeVersion,
			);
			expect(writePackageJson).toHaveBeenCalledWith(
				"repo-name",
				passedFlagValues.configureStylelint,
			);
			expect(writeVsCodeSettings).toHaveBeenCalledWith(
				passedFlagValues.configureStylelint,
			);
		});

		test("with the short flags in a different order", async () => {
			expect.hasAssertions();

			await initRepo("repo-name", [
				`-nv=${passedFlagValues.nodeVersion}`,
				"-cs",
				"-cft",
			]);

			expect(writeJestSetupFile).toHaveBeenCalledWith();
			expect(writeNodeVersion).toHaveBeenCalledWith(
				passedFlagValues.nodeVersion,
			);
			expect(writePackageJson).toHaveBeenCalledWith(
				"repo-name",
				passedFlagValues.configureStylelint,
			);
			expect(writeVsCodeSettings).toHaveBeenCalledWith(
				passedFlagValues.configureStylelint,
			);
		});
	});
});
