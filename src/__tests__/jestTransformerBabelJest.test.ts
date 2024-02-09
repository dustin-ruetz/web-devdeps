import jestTransformerBabelJest from "../jestTransformerBabelJest.js";

test("it exports a transformer object", () => {
	expect(typeof jestTransformerBabelJest).toEqual("object");
});
