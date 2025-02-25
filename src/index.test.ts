import {clean} from "./scripts/clean.ts";
import {initRepo, logInitRepoHelpText} from "./scripts/initRepo.ts";
import {runCLI} from "./scripts/runCLI.ts";
import {runScript} from "./index.ts";

jest.mock("./scripts/clean.ts");
jest.mock("./scripts/initRepo.ts");
jest.mock("./scripts/runCLI.ts");

afterEach(() => {
	jest.clearAllMocks();
});

const initialProcessArgv = process.argv;
afterAll(() => {
	process.argv = initialProcessArgv;
});

const processArgv = ["_execPath", "_filePath"] as const;

describe("`clean` script is called with the correct arguments", () => {
	beforeEach(() => {
		process.argv = [...processArgv, "clean"];
	});

	test("when the required `paths` argument is not passed", async () => {
		expect.hasAssertions();

		await runScript();

		expect(clean).toHaveBeenCalledTimes(1);
		expect(clean).toHaveBeenCalledWith([]);
	});

	test("when the required `paths` argument is passed an array with an empty string", async () => {
		expect.hasAssertions();

		process.argv.push("");

		await runScript();

		expect(clean).toHaveBeenCalledTimes(1);
		expect(clean).toHaveBeenCalledWith([""]);
	});

	test("when the required `paths` argument is passed an array of strings", async () => {
		expect.hasAssertions();

		process.argv.push("./folder/");
		process.argv.push("./file.txt");

		await runScript();

		expect(clean).toHaveBeenCalledTimes(1);
		expect(clean).toHaveBeenCalledWith(["./folder/", "./file.txt"]);
	});
});

describe("`initRepo` script", () => {
	beforeEach(() => {
		process.argv = [...processArgv, "init-repo"];
	});

	describe("logs the help text", () => {
		test("when no arguments are passed", async () => {
			expect.hasAssertions();

			await runScript();

			expect(logInitRepoHelpText).toHaveBeenCalledTimes(1);
			expect(initRepo).not.toHaveBeenCalled();
		});

		test("when the `--help` argument is passed", async () => {
			expect.hasAssertions();

			process.argv.push("--help");

			await runScript();

			expect(logInitRepoHelpText).toHaveBeenCalledTimes(1);
			expect(initRepo).not.toHaveBeenCalled();
		});

		test("when the `-h` argument is passed", async () => {
			expect.hasAssertions();

			process.argv.push("-h");

			await runScript();

			expect(logInitRepoHelpText).toHaveBeenCalledTimes(1);
			expect(initRepo).not.toHaveBeenCalled();
		});
	});

	describe("is called with the correct arguments", () => {
		test("when the required `repoName` argument is not passed", async () => {
			expect.hasAssertions();

			// @ts-expect-error if a non-string value is pushed into the `argv` array.
			process.argv.push(undefined);

			await runScript();

			expect(logInitRepoHelpText).not.toHaveBeenCalled();
			expect(initRepo).toHaveBeenCalledTimes(1);
			expect(initRepo).toHaveBeenCalledWith("", []);
		});

		test("when the required `repoName` argument is passed as an empty string", async () => {
			expect.hasAssertions();

			process.argv.push("");

			await runScript();

			expect(logInitRepoHelpText).not.toHaveBeenCalled();
			expect(initRepo).toHaveBeenCalledTimes(1);
			expect(initRepo).toHaveBeenCalledWith("", []);
		});

		test("when the required `repoName` argument is passed *and* the optional flags are not passed", async () => {
			expect.hasAssertions();

			process.argv.push("repo-name");

			await runScript();

			expect(logInitRepoHelpText).not.toHaveBeenCalled();
			expect(initRepo).toHaveBeenCalledTimes(1);
			expect(initRepo).toHaveBeenCalledWith("repo-name", []);
		});

		test("when the required `repoName` argument is passed *and* the optional flags are passed", async () => {
			expect.hasAssertions();

			process.argv.push(
				"repo-name",
				"--configure-stylelint",
				"--node-version=10",
			);

			await runScript();

			expect(logInitRepoHelpText).not.toHaveBeenCalled();
			expect(initRepo).toHaveBeenCalledTimes(1);
			expect(initRepo).toHaveBeenCalledWith("repo-name", [
				"--configure-stylelint",
				"--node-version=10",
			]);
		});
	});
});

describe("`runCLI` script", () => {
	beforeEach(() => {
		process.argv = [...processArgv];
	});

	test.each`
		script                   | cli              | args
		${"format"}              | ${"prettier"}    | ${["--flag-name", "flag-arg"]}
		${"githooks.commit-msg"} | ${"commitlint"}  | ${["--flag-name", "flag-arg"]}
		${"githooks.pre-commit"} | ${"lint-staged"} | ${["--flag-name", "flag-arg"]}
		${"lint.js-ts"}          | ${"eslint"}      | ${["--flag-name", "flag-arg"]}
		${"lint.styles"}         | ${"stylelint"}   | ${["--flag-name", "flag-arg"]}
		${"test.unit"}           | ${"jest"}        | ${["--flag-name", "flag-arg"]}
	`(
		`Executing "pnpm $script" script results in a call of runCLI("$cli", $args)`,
		async (testRow: {script: string; cli: string; args: string[]}) => {
			expect.hasAssertions();

			process.argv.push(testRow.script, ...testRow.args);

			await runScript();

			expect(runCLI).toHaveBeenCalledTimes(1);
			expect(runCLI).toHaveBeenCalledWith(testRow.cli, testRow.args);
		},
	);
});

describe("throws an error", () => {
	beforeEach(() => {
		process.argv = [...processArgv];
	});

	test("when no script name is passed", async () => {
		expect.hasAssertions();

		await expect(async () => {
			await runScript();
		}).rejects.toThrow(/ERR_UNKNOWN_SCRIPT/);
	});

	test("when an unknown script is passed", async () => {
		expect.hasAssertions();

		process.argv.push("unknown-script");

		await expect(async () => {
			await runScript();
		}).rejects.toThrow(/ERR_UNKNOWN_SCRIPT/);
	});
});
