import jestTransformerBabelJest from "../jestTransformerBabelJest";

test("it exports a transformer object", () => {
	expect(typeof jestTransformerBabelJest).toMatch("object");
});
