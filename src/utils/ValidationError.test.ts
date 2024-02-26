import {ValidationError} from "./ValidationError.js";

test("ValidationError", () => {
	const validationError = new ValidationError("error message", {
		cause: {code: "ERR_CODE"},
	});

	expect(validationError.cause).toEqual({code: "ERR_CODE"});
	expect(validationError.message).toEqual("ERR_CODE - error message");
	expect(validationError.name).toEqual("ValidationError");
});
