import {
	CustomError,
	makeCommitlintConfig,
	makeESLintConfig,
	makeJestConfig,
	makeLintstagedConfig,
	makePrettierConfig,
	makeSemanticReleaseConfig,
	makeStylelintConfig,
} from "./exports.js";

test("all of the module's exports are available from the primary `exports` file", () => {
	expect(typeof CustomError).toBe("function");
	expect(typeof makeCommitlintConfig).toBe("function");
	expect(typeof makeESLintConfig).toBe("function");
	expect(typeof makeJestConfig).toBe("function");
	expect(typeof makeLintstagedConfig).toBe("function");
	expect(typeof makePrettierConfig).toBe("function");
	expect(typeof makeSemanticReleaseConfig).toBe("function");
	expect(typeof makeStylelintConfig).toBe("function");
});
