import {ValidationError} from "./ValidationError.js";

describe("ValidationError is thrown correctly", () => {
	test("*with* a `values` object when it's provided", () => {
		const validationError = new ValidationError("error message", {
			cause: {code: "ERR_CODE_WITH_VALUES", values: {parameter: "argument"}},
		});

		expect(validationError.cause).toStrictEqual({
			code: "ERR_CODE_WITH_VALUES",
			values: {parameter: "argument"},
		});
		expect(validationError.message).toEqual(
			"ERR_CODE_WITH_VALUES - error message",
		);
		expect(validationError.name).toEqual("ValidationError");
	});

	test("*without* a `values` object when it's not provided", () => {
		const validationError = new ValidationError("error message", {
			cause: {code: "ERR_CODE_WITHOUT_VALUES"},
		});

		expect(validationError.cause).toStrictEqual({
			code: "ERR_CODE_WITHOUT_VALUES",
		});
		expect(validationError.message).toEqual(
			"ERR_CODE_WITHOUT_VALUES - error message",
		);
		expect(validationError.name).toEqual("ValidationError");
	});
});
