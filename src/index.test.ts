import {initRepo, logInitRepoHelpText} from "./scripts/initRepo.js";
import {runCLI} from "./scripts/runCLI.js";
import {runScript} from "./index.js";

jest.mock("./scripts/initRepo.js");
jest.mock("./scripts/runCLI.js");

afterEach(() => {
	jest.clearAllMocks();
});

const initialProcessArgv = process.argv;
afterAll(() => {
	process.argv = initialProcessArgv;
});

const processArgv = ["_execPath", "_filePath"] as const;

describe("`initRepo` script", () => {
	beforeEach(() => {
		process.argv = [...processArgv, "init-repo"];
	});

	describe("logs the help text", () => {
		test("when no arguments are passed", async () => {
			await runScript();

			expect(logInitRepoHelpText).toHaveBeenCalledTimes(1);
			expect(initRepo).not.toHaveBeenCalled();
		});

		test("when the `--help` argument is passed", async () => {
			process.argv.push("--help");

			await runScript();

			expect(logInitRepoHelpText).toHaveBeenCalledTimes(1);
			expect(initRepo).not.toHaveBeenCalled();
		});

		test("when the `-h` argument is passed", async () => {
			process.argv.push("-h");

			await runScript();

			expect(logInitRepoHelpText).toHaveBeenCalledTimes(1);
			expect(initRepo).not.toHaveBeenCalled();
		});
	});

	describe("is called with the correct arguments", () => {
		test("when the required `repoName` argument is not passed", async () => {
			// @ts-expect-error if a non-string value is pushed into the `argv` array.
			process.argv.push(undefined);

			await runScript();

			expect(logInitRepoHelpText).not.toHaveBeenCalled();
			expect(initRepo).toHaveBeenCalledTimes(1);
			expect(initRepo).toHaveBeenCalledWith("", []);
		});

		test("when the required `repoName` argument is passed as an empty string", async () => {
			process.argv.push("");

			await runScript();

			expect(logInitRepoHelpText).not.toHaveBeenCalled();
			expect(initRepo).toHaveBeenCalledTimes(1);
			expect(initRepo).toHaveBeenCalledWith("", []);
		});

		test("when the required `repoName` argument is passed *and* the optional flags are not passed", async () => {
			process.argv.push("repo-name");

			await runScript();

			expect(logInitRepoHelpText).not.toHaveBeenCalled();
			expect(initRepo).toHaveBeenCalledTimes(1);
			expect(initRepo).toHaveBeenCalledWith("repo-name", []);
		});

		test("when the required `repoName` argument is passed *and* the optional flags are passed", async () => {
			process.argv.push(
				"repo-name",
				"--configure-stylelint",
				"--node-version=20",
			);

			await runScript();

			expect(logInitRepoHelpText).not.toHaveBeenCalled();
			expect(initRepo).toHaveBeenCalledTimes(1);
			expect(initRepo).toHaveBeenCalledWith("repo-name", [
				"--configure-stylelint",
				"--node-version=20",
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
		${"githooks/commit-msg"} | ${"commitlint"}  | ${["--flag-name", "flag-arg"]}
		${"githooks/pre-commit"} | ${"lint-staged"} | ${["--flag-name", "flag-arg"]}
		${"lint/js-ts"}          | ${"eslint"}      | ${["--flag-name", "flag-arg"]}
		${"test/unit"}           | ${"jest"}        | ${["--flag-name", "flag-arg"]}
	`(
		`Executing "npm run $script" script results in a call of runCLI("$cli", $args)`,
		async (testRow: {script: string; cli: string; args: string[]}) => {
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

	test("when no script name is passed", () => {
		void expect(async () => {
			await runScript();
		}).rejects.toThrow(/ERR_UNKNOWN_SCRIPT/);
	});

	test("when an unknown script is passed", () => {
		process.argv.push("unknown-script");

		void expect(async () => {
			await runScript();
		}).rejects.toThrow(/ERR_UNKNOWN_SCRIPT/);
	});
});
