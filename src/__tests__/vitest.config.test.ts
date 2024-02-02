import vitestConfig from "../vitest.config.js";

test("it exports a configuration object", () => {
	expect(typeof vitestConfig).toMatch("object");
});

test("the most important configuration options are correct", () => {
	// The configuration's `test` object may be `undefined`,
	// so throw an error immediately if this is the case.
	if (typeof vitestConfig.test === "undefined") {
		throw new Error(
			"vitestConfig.test should be an object; value is undefined.",
		);
	}

	expect(vitestConfig.test.globals).toBe(true);
});
