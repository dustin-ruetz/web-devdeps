import {CustomError} from "./CustomError.js";

const errorMessage = "error message";

describe("CustomError throws errors", () => {
	test('when the error code does not start with the "ERR_" substring', () => {
		expect(() => {
			const customError = () =>
				new CustomError(errorMessage, {
					cause: {code: "INVALID_ERR_CODE"},
					// @ts-expect-error since the `CustomError"` name is just a mock value in order to keep this test generic.
					name: "CustomError",
				});

			customError();
		}).toThrow(/ERR_INVALID_ERROR_CODE/);
	});

	test("when the error code contains lowercase characters", () => {
		expect(() => {
			const customError = () =>
				new CustomError(errorMessage, {
					cause: {code: "ERR_lowercase_code"},
					// @ts-expect-error - See above comment.
					name: "CustomError",
				});

			customError();
		}).toThrow(/ERR_INVALID_ERROR_CODE/);
	});

	test('when the error name does not end with the "Error" substring', () => {
		expect(() => {
			const customError = () =>
				new CustomError(errorMessage, {
					cause: {code: "ERR_CODE"},
					// @ts-expect-error since the `InvalidErrorName"` name is intentionally wrong in order
					// order to confirm that `CustomError` throws a specific error in this scenario.
					name: "InvalidErrorName",
				});

			customError();
		}).toThrow(/ERR_INVALID_ERROR_NAME/);
	});
});

describe("CustomError is thrown correctly", () => {
	const errorName = "CustomError";

	test("with its cause object, code/message string, and name", () => {
		const customError = new CustomError(errorMessage, {
			cause: {code: "ERR_CODE"},
			// @ts-expect-error - See above comment.
			name: errorName,
		});

		expect(customError.cause).toStrictEqual({code: "ERR_CODE"});
		expect(customError.message).toBe("ERR_CODE - error message");
		expect(customError.name).toBe("CustomError");
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
