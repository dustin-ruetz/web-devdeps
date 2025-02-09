import {dependsOnMock} from "../utils/dependsOn.mock.ts";
import {makePrettierConfig} from "./prettier.config.ts";
import {pugPrettierPlugin} from "./prettier-plugins/pug.ts";
import {xmlPrettierPlugin} from "./prettier-plugins/xml.ts";

test("it exports a configuration object and the most important config options are correct", async () => {
	expect.hasAssertions();

	const prettierConfig = await makePrettierConfig();

	expect(typeof prettierConfig).toBe("object");

	expect(prettierConfig.endOfLine).toBe("auto");
	expect(prettierConfig.printWidth).toBe(80);
	expect(prettierConfig.proseWrap).toBe("preserve");
	expect(prettierConfig.singleQuote).toBe(false);
	expect(prettierConfig.trailingComma).toBe("all");
	expect(prettierConfig.useTabs).toBe(true);
});

describe("plugin names and configurations are correct", () => {
	test("for the XML plugin", async () => {
		expect.hasAssertions();

		const prettierConfig = await makePrettierConfig();

		expect(prettierConfig.plugins).toStrictEqual(["@prettier/plugin-xml"]);
		expect(prettierConfig).toStrictEqual(
			expect.objectContaining(xmlPrettierPlugin.config),
		);
	});

	describe("for the Pug plugin", () => {
		test("when Pug *is* installed as a dependency", async () => {
			expect.hasAssertions();

			const hasPugDependency = true;
			dependsOnMock.mockResolvedValue(hasPugDependency);

			const prettierConfig = await makePrettierConfig();

			expect(prettierConfig.plugins).toContain("@prettier/plugin-pug");
			expect(prettierConfig).toStrictEqual(
				expect.objectContaining(pugPrettierPlugin.config),
			);
		});

		test("when Pug *is not* installed as a dependency", async () => {
			expect.hasAssertions();

			const hasPugDependency = false;
			dependsOnMock.mockResolvedValue(hasPugDependency);

			const prettierConfig = await makePrettierConfig();

			expect(prettierConfig.plugins).not.toContain("@prettier/plugin-pug");
			expect(prettierConfig).toStrictEqual(
				expect.not.objectContaining(pugPrettierPlugin.config),
			);
		});
	});
});
