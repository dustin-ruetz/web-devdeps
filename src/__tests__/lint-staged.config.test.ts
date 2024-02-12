import {type Config} from "lint-staged";
import lintstagedConfig from "../lint-staged.config.js";

test("it exports a configuration object", () => {
	expect(typeof lintstagedConfig).toEqual("object");
});

test("it runs the correct commands for Prettier and ESLint", () => {
	expect(lintstagedConfig["*" as keyof Config]).toEqual(
		"npm run format -- --ignore-unknown --write",
	);
	expect(lintstagedConfig["*.{js,jsx,ts,tsx}" as keyof Config]).toEqual(
		"npm run lint -- --fix",
	);
});

describe("it runs the correct commands for unit testing when the TEST_RUNNER environment variable is equal to", () => {
	/* eslint-disable dot-notation */
	const relativePaths = ["src/lint-staged.config.ts"] as const;
	const [relativePath] = relativePaths;

	test("jest", () => {
		process.env["TEST_RUNNER"] = "jest";

		expect(
			// @ts-expect-error TODO: Figure out how to type the function on this configuration object correctly.
			lintstagedConfig["*.{js,jsx,json,ts,tsx}"](relativePaths),
		).toEqual(
			`npm run jest:coverage -- --findRelatedTests --collectCoverageFrom= ${relativePath}`,
		);
	});

	test("vitest", () => {
		process.env["TEST_RUNNER"] = "vitest";

		expect(
			// @ts-expect-error TODO
			lintstagedConfig["*.{js,jsx,json,ts,tsx}"](relativePaths),
		).toEqual(
			`npm run vitest -- related --run ${relativePath} --coverage.enabled --coverage.include=${relativePath}`,
		);
	});
	/* eslint-enable dot-notation */
});
