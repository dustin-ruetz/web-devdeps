import {rm} from "node:fs/promises";
import {clean} from "./clean.ts";

jest.mock("node:fs/promises");

beforeAll(() => {
	jest.spyOn(console, "log").mockImplementation();
	jest.spyOn(console, "warn").mockImplementation();
});

afterEach(() => {
	jest.clearAllMocks();
});

test("throws errors if the required `paths` argument is invalid", () => {
	expect(() => {
		// @ts-expect-error if `paths` is not passed.
		clean();
	}).toThrow(/ERR_INVALID_PATHS_ARRAY/);

	expect(() => {
		// @ts-expect-error if `paths` is not an array.
		clean("path");
	}).toThrow(/ERR_INVALID_PATHS_ARRAY/);

	expect(() => {
		// Expect an error if `paths` is an empty array.
		clean([]);
	}).toThrow(/ERR_INVALID_PATHS_ARRAY/);
});

/* eslint-disable no-console */
describe("logs a warning and does not remove", () => {
	test("the `./` path", () => {
		clean(["./"]);

		expect(console.warn).toHaveBeenCalledTimes(1);
		expect(console.warn).toHaveBeenCalledWith("⛔️ Ignored path: ./");
		expect(rm).not.toHaveBeenCalled();
	});

	test("non-relative paths", () => {
		clean([
			"/", // disk root
			"/directory-ending-with-slash/",
			"/directory-ending-without-slash",
			".dot-directory-ending-with-slash/",
			".dot-directory-ending-without-slash",
			"directory-ending-with-slash/",
			"directory-ending-without-slash",
			".dot-file",
			"file.txt",
		]);

		expect(console.warn).toHaveBeenCalledTimes(9);
		expect(console.warn).toHaveBeenNthCalledWith(
			1,
			"⛔️ Ignored path (since it doesn't begin with `./`): /",
		);
		expect(rm).not.toHaveBeenCalled();
	});
});

const rmOptions = {force: true, recursive: true} as const;

test("removes and logs the passed paths", () => {
	clean([
		"./directory-ending-with-slash/",
		"./directory-ending-without-slash",
		"./file.txt",
	]);

	expect(console.log).toHaveBeenCalledTimes(3);
	expect(console.log).toHaveBeenNthCalledWith(3, "🧹 Deleted path: ./file.txt");
	expect(rm).toHaveBeenCalledTimes(3);
	expect(rm).toHaveBeenNthCalledWith(3, "./file.txt", rmOptions);
});

test("correctly handles a mix of both removable and non-removable paths", () => {
	clean(["/", "./", "./directory/", "./folder", "./file.txt"]);

	expect(console.warn).toHaveBeenCalledTimes(2);
	expect(console.warn).toHaveBeenNthCalledWith(
		1,
		"⛔️ Ignored path (since it doesn't begin with `./`): /",
	);
	expect(console.warn).toHaveBeenNthCalledWith(2, "⛔️ Ignored path: ./");

	expect(rm).toHaveBeenCalledTimes(3);
	expect(console.log).toHaveBeenCalledTimes(3);
	expect(rm).toHaveBeenNthCalledWith(1, "./directory/", rmOptions);
	expect(console.log).toHaveBeenNthCalledWith(
		1,
		"🧹 Deleted path: ./directory/",
	);
	expect(rm).toHaveBeenNthCalledWith(2, "./folder", rmOptions);
	expect(console.log).toHaveBeenNthCalledWith(2, "🧹 Deleted path: ./folder");
	expect(rm).toHaveBeenNthCalledWith(3, "./file.txt", rmOptions);
	expect(console.log).toHaveBeenNthCalledWith(3, "🧹 Deleted path: ./file.txt");
});
/* eslint-enable no-console */
