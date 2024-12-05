import {dependsOnMock} from "../utils/dependsOn.mock.js";
import {makeStylelintConfig} from "./stylelint.config.js";

describe("it exports a configuration object and the most important config options are correct", () => {
	test("for the parts of the config that *are not* affected by conditional logic", async () => {
		expect.hasAssertions();

		const stylelintConfig = await makeStylelintConfig();

		expect(typeof stylelintConfig).toBe("object");

		expect(stylelintConfig.extends).toStrictEqual([
			"stylelint-config-standard",
		]);
		expect(stylelintConfig.reportDescriptionlessDisables).toBe(true);
		expect(stylelintConfig.reportInvalidScopeDisables).toBe(true);
		expect(stylelintConfig.reportNeedlessDisables).toBe(true);
		expect(stylelintConfig.reportUnscopedDisables).toBe(true);
		expect(stylelintConfig.rules?.["no-unknown-custom-properties"]).toBe(true);
		expect(stylelintConfig.rules?.["declaration-no-important"]).toBe(true);
		expect(stylelintConfig.rules?.["unit-disallowed-list"]).toStrictEqual([
			"em",
		]);
		expect(stylelintConfig.rules?.["max-nesting-depth"]).toBe(3);
		expect(stylelintConfig.rules?.["font-weight-notation"]).toBe("numeric");
	});

	test("when testing this devdeps repo (which *does not* have frontend style-related dependencies)", async () => {
		expect.hasAssertions();

		const hasFrontendStyleDependencies = false;
		dependsOnMock.mockResolvedValue(hasFrontendStyleDependencies);

		const stylelintConfig = await makeStylelintConfig();

		expect(dependsOnMock).toHaveBeenCalledWith(["sass"]);
		expect(dependsOnMock).toHaveBeenCalledWith(["styled-components"]);
		expect(stylelintConfig.overrides).toStrictEqual([]);
	});

	test("when testing a repo that has the `sass` package installed", async () => {
		expect.hasAssertions();

		const hasSassDependency = true;
		dependsOnMock.mockResolvedValue(hasSassDependency);

		const stylelintConfig = await makeStylelintConfig();

		expect(stylelintConfig.extends).toStrictEqual(
			expect.arrayContaining(["stylelint-config-standard-scss"]),
		);
		expect(stylelintConfig.overrides).toStrictEqual(
			expect.arrayContaining([
				{
					customSyntax: "postcss-scss",
					files: ["**/*.scss"],
					rules: {
						"scss/load-partial-extension": "always",
					},
				},
			]),
		);
	});

	test("when testing a repo that has the `styled-components` package installed", async () => {
		expect.hasAssertions();

		const hasStyledComponentsDependency = true;
		dependsOnMock.mockResolvedValue(hasStyledComponentsDependency);

		const stylelintConfig = await makeStylelintConfig();

		expect(stylelintConfig.overrides).toStrictEqual(
			expect.arrayContaining([
				{
					customSyntax: "postcss-styled-syntax",
					files: ["**/*.{jsx,tsx}"],
				},
			]),
		);
	});
});
