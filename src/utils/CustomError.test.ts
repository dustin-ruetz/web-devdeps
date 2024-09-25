import {CustomError} from "./CustomError.js";

describe("CustomError is thrown correctly", () => {
	const errorMessage = "error message";
	const errorName = "CustomError";

	test("with its cause object, code/message string, and name", () => {
		const customError = new CustomError(errorMessage, {
			cause: {code: "ERR_CODE"},
			// @ts-expect-error since the `CustomError"` name is just a mock value in order to keep this test generic.
			name: errorName,
		});

		expect(customError.cause).toStrictEqual({code: "ERR_CODE"});
		expect(customError.message).toEqual("ERR_CODE - error message");
		expect(customError.name).toEqual("CustomError");
	});

	test("*with* a `values` object when it's provided", () => {
		const customError = new CustomError(errorMessage, {
			cause: {code: "ERR_CODE_WITH_VALUES", values: {parameter: "argument"}},
			// @ts-expect-error - See above comment.
			name: errorName,
		});

		expect(customError.cause).toStrictEqual({
			code: "ERR_CODE_WITH_VALUES",
			values: {parameter: "argument"},
		});
	});

	test("*without* a `values` object when it's not provided", () => {
		const customError = new CustomError(errorMessage, {
			cause: {code: "ERR_CODE_WITHOUT_VALUES"},
			// @ts-expect-error - See above comment.
			name: errorName,
		});

		expect(customError.cause).toStrictEqual({
			code: "ERR_CODE_WITHOUT_VALUES",
		});
	});
});
