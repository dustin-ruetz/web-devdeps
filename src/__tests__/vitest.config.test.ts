import vitestConfig from "../vitest.config.js";

test("it exports a configuration object", () => {
	expect(typeof vitestConfig).toEqual("object");
});

test("the most important configuration options are correct", () => {
	expect(vitestConfig.test?.coverage?.provider).toEqual("v8");
	expect(vitestConfig.test?.globals).toBe(true);
});
