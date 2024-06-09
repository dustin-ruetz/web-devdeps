import {rm} from "node:fs/promises";
import {clean} from "./clean.js";

jest.mock("node:fs/promises");
const consoleLogSpy = jest.spyOn(console, "log").mockImplementation();

beforeEach(() => {
	// Delete both environment variables that are relevant to the clean script to make them `undefined` before each test block executes.
	delete process.env.CI;
});
afterEach(() => {
	jest.clearAllMocks();
});

test("it *does not* remove the lib/ directory in the CI/CD environment", async () => {
	process.env.CI = "true";

	await clean();

	expect(consoleLogSpy).toHaveBeenCalledTimes(1);
	expect(consoleLogSpy).toHaveBeenCalledWith(
		"ℹ️ Running in CI/CD environment; skip removing lib/ directory since there's nothing to clean",
	);
	expect(rm).not.toHaveBeenCalled();
});

test("it *does* remove the lib/ directory with the 'force' and 'recursive' options", async () => {
	await clean();

	expect(consoleLogSpy).toHaveBeenCalledTimes(1);
	expect(consoleLogSpy).toHaveBeenCalledWith("🧹 Removing lib/ directory");
	expect(rm).toHaveBeenCalledTimes(1);
	expect(rm).toHaveBeenCalledWith("lib/", {
		force: true,
		recursive: true,
	});
});
