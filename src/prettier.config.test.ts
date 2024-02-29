import {dependsOn} from "./utils/dependsOn.js";
import {makePrettierConfig} from "./prettier.config.js";
import {pugPrettierPlugin} from "./prettier-plugins/pug.js";
import {xmlPrettierPlugin} from "./prettier-plugins/xml.js";

jest.mock("./utils/dependsOn.js", () => ({
	dependsOn: jest.fn(),
}));
/**
 * Usage: Call `mockDependsOn.mockResolvedValue(false|true)` based on the array of dependencies that are passed in to
 * the function to determine the value of the `hasPugDependency` variable in the prettier.config.ts file. For example:
 * - Resolve to `true` to simulate that the `pug` package *is* installed as a dependency.
 * - Resolve to `false` to simulate that the `pug` package *is not* installed as a dependency.
 */
const mockDependsOn = dependsOn as jest.MockedFunction<typeof dependsOn>;

test("it exports a configuration object", async () => {
	const prettierConfig = await makePrettierConfig();

	expect(typeof prettierConfig).toEqual("object");
});

test("the most important configuration options are correct", async () => {
	const prettierConfig = await makePrettierConfig();

	expect(prettierConfig.endOfLine).toBeUndefined();
	expect(prettierConfig.printWidth).toEqual(80);
	expect(prettierConfig.proseWrap).toEqual("preserve");
	expect(prettierConfig.singleQuote).toBe(false);
	expect(prettierConfig.trailingComma).toEqual("all");
	expect(prettierConfig.useTabs).toBe(true);
});

describe("plugin names and configurations are correct for", () => {
	test("the XML plugin", async () => {
		const prettierConfig = await makePrettierConfig();

		expect(prettierConfig.plugins).toStrictEqual(["@prettier/plugin-xml"]);
		expect(prettierConfig).toEqual(
			expect.objectContaining(xmlPrettierPlugin.config),
		);
	});

	test("the Pug plugin", async () => {
		const hasPugDependency = true;
		mockDependsOn.mockResolvedValue(hasPugDependency);

		const prettierConfig = await makePrettierConfig();

		expect(prettierConfig.plugins).toContain("@prettier/plugin-pug");
		expect(prettierConfig).toEqual(
			expect.objectContaining(pugPrettierPlugin.config),
		);
	});
});
