import {rm} from "node:fs/promises";
import {clean} from "./clean.js";

jest.mock("node:fs/promises");
const consoleLogSpy = jest.spyOn(console, "log").mockImplementation();

afterEach(() => {
	jest.clearAllMocks();
});

test("it removes the lib/ directory with the 'recursive' option", async () => {
	await clean();

	expect(consoleLogSpy).toHaveBeenCalledTimes(2);
	expect(consoleLogSpy).toHaveBeenCalledWith(
		"🧹-ℹ️ Attempting to remove lib/ directory...",
	);
	expect(rm).toHaveBeenCalledTimes(1);
	expect(rm).toHaveBeenCalledWith("lib/", {
		recursive: true,
	});
	expect(consoleLogSpy).toHaveBeenCalledWith(
		"🧹-✅ Successfully removed lib/ directory.",
	);
});

test("it gracefully handles the 'ENOENT' error in the event that the lib/ directory does not exist", async () => {
	rm.mockImplementationOnce(() => {
		throw new Error("ENOENT: no such file or directory, lstat 'lib/'");
	});

	await clean();

	expect(consoleLogSpy).toHaveBeenCalledTimes(2);
	expect(consoleLogSpy).toHaveBeenCalledWith(
		"🧹-ℹ️ Attempting to remove lib/ directory...",
	);
	expect(consoleLogSpy).toHaveBeenCalledWith(
		"🧹-⚠️ The lib/ directory does not exist; nothing to remove.",
	);
});

test("it throws in the event that an unknown error occurs", () => {
	rm.mockImplementationOnce(() => {
		throw new Error("ERR_UNKNOWN: unknown error");
	});

	expect(async () => {
		await clean();
	}).rejects.toThrow(/ERR_UNKNOWN/);
});
