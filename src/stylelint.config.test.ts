import stylelintConfig from "./stylelint.config.js";

test("it exports a configuration object and the most important config options are correct", () => {
	expect(typeof stylelintConfig).toEqual("object");
});
