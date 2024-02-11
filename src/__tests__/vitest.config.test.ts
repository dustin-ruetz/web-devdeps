import vitestConfig from "../vitest.config.js";

test("it exports a configuration object", () => {
	expect(typeof vitestConfig).toEqual("object");
});

test("the most important configuration options are correct", () => {
	expect(vitestConfig.test?.globals).toBe(true);
});
