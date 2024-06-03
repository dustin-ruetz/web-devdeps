import {rm} from "node:fs/promises";
import {clean} from "./clean.js";

jest.mock("node:fs/promises");
const consoleLogSpy = jest.spyOn(console, "log").mockImplementation();

describe("it *does not* remove the lib/ directory when in the", () => {
	test("CI/CD environment", async () => {
		process.env.CI = "true";

		await clean();

		expect(consoleLogSpy).not.toHaveBeenCalled();
		expect(rm).not.toHaveBeenCalled();
	});

	test("test environment", async () => {
		process.env.NODE_ENV = "test";

		await clean();

		expect(consoleLogSpy).not.toHaveBeenCalled();
		expect(rm).not.toHaveBeenCalled();
	});
});

test("it *does* remove the lib/ directory with the 'force' and 'recursive' options", async () => {
	// Delete both of the relevant environment variables to make them `undefined`.
	delete process.env.CI;
	delete process.env.NODE_ENV;

	await clean();

	expect(consoleLogSpy).toHaveBeenCalledTimes(1);
	expect(consoleLogSpy).toHaveBeenCalledWith("🧹 Removing lib/ directory");
	expect(rm).toHaveBeenCalledTimes(1);
	expect(rm).toHaveBeenCalledWith("lib/", {
		force: true,
		recursive: true,
	});
});
