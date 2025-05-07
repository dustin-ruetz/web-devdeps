import {access} from "node:fs/promises";

import globals from "globals";
import type {ConfigArray} from "typescript-eslint";

import {dependsOnMock} from "../utils/dependsOn.mock.ts";

import {makeESLintConfig} from "./eslint.config.ts";

jest.mock("node:fs/promises");
const accessMock = jest.mocked(access);

afterEach(() => {
	jest.clearAllMocks();
});

const findConfigObjectByName = (eslintConfig: ConfigArray, name: string) =>
	eslintConfig.find((configObj) => configObj.name === name);

describe("it exports a configuration array and the most important config options are correct", () => {
	test("for the parts of the config that *are not* affected by conditional logic", async () => {
		expect.hasAssertions();

		const eslintConfig = await makeESLintConfig();

		expect(Array.isArray(eslintConfig)).toBe(true);

		// Verify that the contents of the `.gitignore` file are successfully read and included as patterns.
		const importedGitignorePatterns = findConfigObjectByName(
			eslintConfig,
			"Imported .gitignore patterns",
		);
		expect(importedGitignorePatterns?.ignores).toStrictEqual(
			expect.arrayContaining(["**/lib/", "**/node_modules/"]),
		);

		// Verify that one of the recommended rules is included in the configuration.
		const recommendedConfig = findConfigObjectByName(
			eslintConfig,
			"eslintjs/recommended",
		);
		expect(recommendedConfig?.rules?.["no-const-assign"]).toBe("error");

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
			reportUnusedInlineConfigs: "error",
		});
		expect(userDefinedConfig?.rules?.["camelcase"]).toBe("error");
		expect(userDefinedConfig?.rules?.["no-console"]).toBe("warn");
		expect(userDefinedConfig?.rules?.["no-magic-numbers"]).toStrictEqual([
			"error",
			{
				enforceConst: true,
				ignore: [-1, 0, 1],
				ignoreArrayIndexes: true,
			},
		]);
		expect(userDefinedConfig?.rules?.["no-var"]).toBe("error");

		// Verify that the user-defined overrides configuration for test files are correct.
		const userDefinedTestOverrides = findConfigObjectByName(
			eslintConfig,
			"eslintjs/user-defined-test-overrides",
		);
		expect(userDefinedTestOverrides?.files).toStrictEqual([
			"**/*.+(mock|test).+(js|jsx|ts|tsx)",
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
		expect(typeof jestUserDefinedConfig?.rules).toBe("object");

		// Verify that the `jsdoc` user-defined config *is* included.
		const jsdocUserDefinedConfig = findConfigObjectByName(
			eslintConfig,
			"jsdoc/user-defined-config",
		);
		expect(eslintConfig).toContain(jsdocUserDefinedConfig);
		expect(typeof jsdocUserDefinedConfig?.rules).toBe("object");

		// Verify that the `import` user-defined config *is* included.
		const importUserDefinedConfig = findConfigObjectByName(
			eslintConfig,
			"import/user-defined-config",
		);
		expect(eslintConfig).toContain(jsdocUserDefinedConfig);
		expect(typeof importUserDefinedConfig?.rules).toBe("object");
	});

	test("when linting this `web-devdeps` repo (which *does not* have frontend dependencies and *does* depend on TypeScript)", async () => {
		expect.hasAssertions();

		const eslintConfig = await makeESLintConfig();

		const userDefinedConfig = findConfigObjectByName(
			eslintConfig,
			"eslintjs/user-defined-config",
		);
		// Verify that the browser-provided globals *are not* included.
		expect(userDefinedConfig?.languageOptions?.globals).toStrictEqual(
			expect.not.objectContaining(globals.browser),
		);

		// Verify that the `jsdoc` TypeScript-specific config *is* included.
		const jsdocRecommendedTypeScriptErrorConfig = findConfigObjectByName(
			eslintConfig,
			"jsdoc/flat/recommended-typescript-error",
		);
		expect(eslintConfig).toContain(jsdocRecommendedTypeScriptErrorConfig);
		expect(typeof jsdocRecommendedTypeScriptErrorConfig?.rules).toBe("object");

		// Verify that the `typescript-eslint` user-defined config *is* included.
		const typescripteslintUserDefinedConfig = findConfigObjectByName(
			eslintConfig,
			"typescript-eslint/user-defined-config",
		);
		expect(eslintConfig).toContain(typescripteslintUserDefinedConfig);
		expect(typeof typescripteslintUserDefinedConfig?.rules).toBe("object");
	});

	describe("when linting a repo that has installed the `web-devdeps` package", () => {
		test("which *does* have frontend dependencies", async () => {
			expect.hasAssertions();

			const hasFrontendDependencies = true;
			dependsOnMock.mockResolvedValue(hasFrontendDependencies);

			const eslintConfig = await makeESLintConfig();

			const userDefinedConfig = findConfigObjectByName(
				eslintConfig,
				"eslintjs/user-defined-config",
			);
			// Verify that the browser-provided globals *are* included.
			expect(userDefinedConfig?.languageOptions?.globals).toStrictEqual(
				expect.objectContaining(globals.browser),
			);
		});

		test("which *does* depend on React", async () => {
			expect.hasAssertions();

			const hasReactDependency = true;
			dependsOnMock.mockResolvedValue(hasReactDependency);

			const eslintConfig = await makeESLintConfig();

			const jsxA11yConfig = findConfigObjectByName(
				eslintConfig,
				"jsx-a11y/strict",
			);
			// Verify that one of the `eslint-plugin-jsx-a11y` strict rules is included in the configuration.
			expect(jsxA11yConfig?.rules?.["jsx-a11y/alt-text"]).toBe("error");

			const reactConfig = findConfigObjectByName(
				eslintConfig,
				"react/user-defined-config",
			);
			// Verify that one of the `eslint-plugin-react` rules is included in the configuration.
			expect(reactConfig?.rules?.["react/display-name"]).toBe(2);

			const reactHooksConfig = findConfigObjectByName(
				eslintConfig,
				"react-hooks/recommended",
			);
			// Verify that one of the `eslint-plugin-react-hooks` rules is included in the configuration.
			expect(reactHooksConfig?.rules?.["react-hooks/rules-of-hooks"]).toBe(
				"error",
			);
		});

		test("which *does not* have a `tsconfig.json` file", async () => {
			expect.hasAssertions();

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
			expect(typeof jsdocRecommendedErrorConfig?.rules).toBe("object");

			const typescripteslintUserDefinedConfigIndex = eslintConfig.findIndex(
				(configObj) =>
					configObj.name === "typescript-eslint/user-defined-config",
			);
			// Verify that the `typescript-eslint` user-defined config *is not* included.
			expect(typescripteslintUserDefinedConfigIndex).toBe(-1);
		});
	});
});
