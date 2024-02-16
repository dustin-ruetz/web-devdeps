import {type Config} from "lint-staged";
import lintstagedConfig from "../lint-staged.config.js";

test("it exports a configuration object", () => {
	expect(typeof lintstagedConfig).toEqual("object");
});

describe("it runs the correct commands for", () => {
	test("formatting", () => {
		expect(lintstagedConfig["*" as keyof Config]).toEqual(
			"npm run format -- --ignore-unknown --write",
		);
	});

	test("linting", () => {
		expect(lintstagedConfig["*.{js,jsx,ts,tsx}" as keyof Config]).toEqual(
			"npm run lint -- --fix",
		);
	});

	describe("unit testing when the TEST_RUNNER environment variable is set to", () => {
		const relativePaths = ["src/lint-staged.config.ts"] as const;
		const [relativePath] = relativePaths;

		/* eslint-disable dot-notation */
		test("jest", () => {
			process.env["TEST_RUNNER"] = "jest";
			// @ts-expect-error TODO: Figure out how to type the function on this configuration object correctly.
			expect(lintstagedConfig["*.{js,jsx,json,ts,tsx}"](relativePaths)).toEqual(
				`npm run jest:coverage -- --findRelatedTests --collectCoverageFrom= ${relativePath}`,
			);
		});

		test("vitest", () => {
			process.env["TEST_RUNNER"] = "vitest";
			// @ts-expect-error TODO: See above comment.
			expect(lintstagedConfig["*.{js,jsx,json,ts,tsx}"](relativePaths)).toEqual(
				`npm run vitest -- related --run ${relativePath} --coverage.enabled --coverage.include=${relativePath}`,
			);
		});
		/* eslint-enable dot-notation */
	});

	test("typechecking", () => {
		// @ts-expect-error TODO: See above comment.
		expect(lintstagedConfig["*.{ts,tsx}"]()).toEqual("npm run typecheck");
	});
});
