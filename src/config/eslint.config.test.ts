import type {TSESLint} from "@typescript-eslint/utils";
import globals from "globals";
import {access} from "node:fs/promises";
import {dependsOnMock} from "../utils/dependsOn.mock.js";
import {makeESLintConfig} from "./eslint.config.js";

jest.mock("node:fs/promises");
// Paraphrased excerpt from https://www.mikeborozdin.com/post/changing-jest-mocks-between-tests:
// > Typecast the imported mocked module into a mocked function with writeable properties.
const accessMock = access as jest.MockedFunction<typeof access>;

afterEach(() => {
	jest.clearAllMocks();
});

const findConfigObjectByName = (
	eslintConfig: TSESLint.FlatConfig.ConfigArray,
	name: string,
) => eslintConfig.find((configObj) => configObj.name === name);

describe("it exports a configuration array and the most important config options are correct", () => {
	test("for the parts of the config that *are not* affected by conditional logic", async () => {
		const eslintConfig = await makeESLintConfig();

		expect(Array.isArray(eslintConfig)).toBe(true);

		// Verify that the contents of the `.gitignore` file are successfully read and included as patterns.
		const importedGitignorePatterns = findConfigObjectByName(
			eslintConfig,
			"Imported .gitignore patterns",
		);
		expect(importedGitignorePatterns?.ignores).toEqual(
			expect.arrayContaining(["**/lib/", "**/node_modules/"]),
		);

		// Verify that one of the recommended rules is included in the configuration.
		const recommendedConfig = findConfigObjectByName(
			eslintConfig,
			"eslintjs/recommended",
		);
		expect(recommendedConfig?.rules?.["no-const-assign"]).toEqual("error");

		// Verify that the user-defined configuration is correct.
		const userDefinedConfig = findConfigObjectByName(
			eslintConfig,
			"eslintjs/user-defined-config",
		);
		expect(userDefinedConfig?.languageOptions).toStrictEqual({
			globals: {
				...globals.jest,
				...globals.node,
			},
		});
		expect(userDefinedConfig?.linterOptions).toStrictEqual({
			reportUnusedDisableDirectives: "error",
		});
		expect(userDefinedConfig?.rules?.["camelcase"]).toEqual("error");
		expect(userDefinedConfig?.rules?.["no-console"]).toEqual("warn");
		expect(userDefinedConfig?.rules?.["no-magic-numbers"]).toStrictEqual([
			"error",
			{
				enforceConst: true,
				ignore: [-1, 0, 1],
				ignoreArrayIndexes: true,
			},
		]);
		expect(userDefinedConfig?.rules?.["no-var"]).toEqual("error");

		// Verify that the user-defined overrides configuration for test files are correct.
		const userDefinedTestOverrides = findConfigObjectByName(
			eslintConfig,
			"eslintjs/user-defined-test-overrides",
		);
		expect(userDefinedTestOverrides?.files).toStrictEqual([
			"**/*.test.+(js|jsx|ts|tsx)",
		]);
		expect(userDefinedTestOverrides?.rules).toStrictEqual({
			"no-magic-numbers": "off",
		});

		// Verify that the `jest` user-defined config *is* included.
		const jestUserDefinedConfig = findConfigObjectByName(
			eslintConfig,
			"jest/user-defined-config",
		);
		expect(eslintConfig).toContain(jestUserDefinedConfig);
		expect(typeof jestUserDefinedConfig?.rules).toEqual("object");

		// Verify that the `jsdoc` user-defined config *is* included.
		const jsdocUserDefinedConfig = findConfigObjectByName(
			eslintConfig,
			"jsdoc/user-defined-config",
		);
		expect(eslintConfig).toContain(jsdocUserDefinedConfig);
		expect(typeof jsdocUserDefinedConfig?.rules).toEqual("object");
	});

	test("when linting this devdeps repo (which *does not* have frontend dependencies and *does* depend on TypeScript)", async () => {
		const eslintConfig = await makeESLintConfig();

		const userDefinedConfig = findConfigObjectByName(
			eslintConfig,
			"eslintjs/user-defined-config",
		);
		// Verify that the browser-provided globals *are not* included.
		expect(userDefinedConfig?.languageOptions?.globals).toEqual(
			expect.not.objectContaining(globals.browser),
		);

		// Verify that the `jsdoc` TypeScript-specific config *is* included.
		const jsdocRecommendedTypeScriptErrorConfig = findConfigObjectByName(
			eslintConfig,
			"jsdoc/flat/recommended-typescript-error",
		);
		expect(eslintConfig).toContain(jsdocRecommendedTypeScriptErrorConfig);
		expect(typeof jsdocRecommendedTypeScriptErrorConfig?.rules).toEqual(
			"object",
		);

		// Verify that the `typescript-eslint` user-defined config *is* included.
		const typescripteslintUserDefinedConfig = findConfigObjectByName(
			eslintConfig,
			"typescript-eslint/user-defined-config",
		);
		expect(eslintConfig).toContain(typescripteslintUserDefinedConfig);
		expect(typeof typescripteslintUserDefinedConfig?.rules).toEqual("object");
	});

	describe("when linting a repo that has installed the devdeps package", () => {
		test("which *does* have frontend dependencies", async () => {
			const hasFrontendDependencies = true;
			dependsOnMock.mockResolvedValue(hasFrontendDependencies);

			const eslintConfig = await makeESLintConfig();

			const userDefinedConfig = findConfigObjectByName(
				eslintConfig,
				"eslintjs/user-defined-config",
			);
			// Verify that the browser-provided globals *are* included.
			expect(userDefinedConfig?.languageOptions?.globals).toEqual(
				expect.objectContaining(globals.browser),
			);
		});

		test("which *does not* have a `tsconfig.json` file", async () => {
			accessMock.mockRejectedValue(
				new Error(
					"ENOENT: no such file or directory, access '/Users/username/repos/consuming-repo/tsconfig.json'",
				),
			);

			const eslintConfig = await makeESLintConfig();

			// Verify that the `jsdoc` JavaScript-specific config *is* included.
			const jsdocRecommendedErrorConfig = findConfigObjectByName(
				eslintConfig,
				"jsdoc/flat/recommended-error",
			);
			expect(eslintConfig).toContain(jsdocRecommendedErrorConfig);
			expect(typeof jsdocRecommendedErrorConfig?.rules).toEqual("object");

			const typescripteslintUserDefinedConfigIndex = eslintConfig.findIndex(
				(configObj) =>
					configObj.name === "typescript-eslint/user-defined-config",
			);
			// Verify that the `typescript-eslint` user-defined config *is not* included.
			expect(typescripteslintUserDefinedConfigIndex).toEqual(-1);
		});
	});
});
