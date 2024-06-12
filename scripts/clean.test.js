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

describe("error handling", () => {
	/** Custom class to mock how Node.js throws errors. It 1) requires an error `message`, and 2) supports an optional `options` object. */
	class RmErrorMock extends Error {
		constructor(message, options) {
			// Mock the `super(...)` call and `options` object so that the error info matches the same format that `rm` throws it in.
			super(
				`${options.code}: ${message}, ${options.syscall} '${options.path}'`,
			);
			Object.setPrototypeOf(this, RmErrorMock.prototype);
			this.code = options.code;
			this.name = this.constructor.name;
			this.path = options.path;
			this.syscall = options.syscall;
		}
	}

	test("it gracefully handles the 'ENOENT' error when the lib/ directory does not exist", async () => {
		rm.mockRejectedValue(
			new RmErrorMock("no such file or directory", {
				code: "ENOENT",
				path: "lib/",
				syscall: "lstat",
			}),
		);

		await clean();

		expect(consoleLogSpy).toHaveBeenCalledTimes(2);
		expect(consoleLogSpy).toHaveBeenCalledWith(
			"🧹-ℹ️ Attempting to remove lib/ directory...",
		);
		expect(rm).toHaveBeenCalledTimes(1);
		expect(consoleLogSpy).toHaveBeenCalledWith(
			"🧹-⚠️ The lib/ directory does not exist; nothing to remove.",
		);
	});

	test("it throws when an unknown error occurs", () => {
		rm.mockRejectedValue(
			new RmErrorMock("unknown error", {code: "ERR_UNKNOWN"}),
		);

		expect(async () => {
			await clean();
		}).rejects.toThrow(/ERR_UNKNOWN/);
	});
});
