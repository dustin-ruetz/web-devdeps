import type {Config} from "lint-staged";
import lintstagedConfig from "./lint-staged.config.js";

test("it exports a configuration object", () => {
	expect(typeof lintstagedConfig).toEqual("object");
});

/**
 * @todo Figure out how to correctly type the objects on `lintstagedConfig`, then
 *       remove the `eslint-disable` and `@ts-expect-error` comments in this file.
 */

/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call */
describe("it runs the correct commands for", () => {
	const relativePaths = ["src/lint-staged.config.ts"] as const;
	const [relativePath] = relativePaths;

	test("formatting", () => {
		expect(lintstagedConfig["*" as keyof Config]).toEqual(
			"npm run format -- --ignore-unknown --write",
		);
	});

	test("linting files with styles", () => {
		expect(lintstagedConfig["*.{css,scss,jsx,tsx}" as keyof Config]).toEqual(
			"npm run lint/styles -- --fix",
		);
	});

	const [lintJavaScriptTypeScriptCommand, typecheckCommand, unitTestCommand] =
		// @ts-expect-error - See above to-do comment.
		lintstagedConfig["*.{js,jsx,ts,tsx}"](relativePaths);

	test("linting JS and TS files", () => {
		expect(lintJavaScriptTypeScriptCommand).toEqual(
			`npm run lint/js-ts -- --fix ${relativePath}`,
		);
	});

	test("typechecking", () => {
		expect(typecheckCommand).toEqual("npm run check/types");
	});

	test("unit testing", () => {
		expect(unitTestCommand).toEqual(
			`npm run test/unit/coverage -- --findRelatedTests --collectCoverageFrom= ${relativePath}`,
		);
	});
});

describe("when the staged changes include untestable TypeScript declaration files and file mocks, the unit test command", () => {
	const untestableRelativePaths = [
		"src/declarations.d.ts",
		"src/javascriptFile.mock.js",
		"src/typescriptFile.mock.ts",
	] as const;

	test("_is not_ executed when there are no other staged files", () => {
		const [, , unitTestCommand] =
			// @ts-expect-error - See above to-do comment.
			lintstagedConfig["*.{js,jsx,ts,tsx}"](untestableRelativePaths);

		expect(unitTestCommand).toEqual(undefined);
	});

	test("_is_ executed when there are other staged files, but does not try to find related tests for the declaration/mock files", () => {
		const relativePaths = [
			"src/lint-staged.config.ts",
			...untestableRelativePaths,
		] as const;
		const [
			relativePathToFindRelatedTestsFor,
			typescriptDeclarationFilePath,
			javascriptFileMockPath,
			typescriptFileMockPath,
		] = relativePaths;

		const [, , unitTestCommand] =
			// @ts-expect-error - See above to-do comment.
			lintstagedConfig["*.{js,jsx,ts,tsx}"](relativePaths);

		expect(unitTestCommand).toEqual(
			`npm run test/unit/coverage -- --findRelatedTests --collectCoverageFrom= ${relativePathToFindRelatedTestsFor}`,
		);
		expect(unitTestCommand).not.toContain(typescriptDeclarationFilePath);
		expect(unitTestCommand).not.toContain(javascriptFileMockPath);
		expect(unitTestCommand).not.toContain(typescriptFileMockPath);
	});
});
/* eslint-enable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call */
