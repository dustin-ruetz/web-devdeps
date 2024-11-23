import {CustomError} from "./CustomError.js";

const errorName = "CustomError";
const errorMessage = "custom error";

describe("CustomError throws errors", () => {
	test('when the error code does not start with the "ERR_" substring', () => {
		expect(() => {
			const customError = () =>
				new CustomError(errorMessage, {
					cause: {code: "INVALID_ERR_CODE"},
					name: errorName,
				});

			customError();
		}).toThrow(/ERR_INVALID_ERROR_CODE/);
	});

	test("when the error code contains lowercase characters", () => {
		expect(() => {
			const customError = () =>
				new CustomError(errorMessage, {
					cause: {code: "ERR_lowercase_code"},
					name: errorName,
				});

			customError();
		}).toThrow(/ERR_INVALID_ERROR_CODE/);
	});

	test('when the error name does not end with the "Error" substring', () => {
		expect(() => {
			const customError = () =>
				new CustomError(errorMessage, {
					cause: {code: "ERR_CODE"},
					name: "InvalidErrorName",
				});

			customError();
		}).toThrow(/ERR_INVALID_ERROR_NAME/);
	});
});

describe("CustomError is thrown correctly", () => {
	test("with its cause object, code/message string, and name", () => {
		const customError = new CustomError(errorMessage, {
			cause: {code: "ERR_CODE"},
			name: errorName,
		});

		expect(customError.cause).toStrictEqual({code: "ERR_CODE"});
		expect(customError.message).toBe("ERR_CODE - custom error");
		expect(customError.name).toBe("CustomError");
	});

	test("*with* a `values` object when it's provided", () => {
		const customError = new CustomError(errorMessage, {
			cause: {code: "ERR_CODE_WITH_VALUES", values: {parameter: "argument"}},
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
			name: errorName,
		});

		expect(customError.cause).toStrictEqual({
			code: "ERR_CODE_WITHOUT_VALUES",
		});
	});
});
