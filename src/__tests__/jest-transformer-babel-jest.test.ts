import jestTransformerBabelJest from "../jest-transformer-babel-jest";

test("it exports a transformer object", () => {
	expect(typeof jestTransformerBabelJest).toMatch("object");
});
