import type {Config} from "lint-staged";
import lintstagedConfig from "../lint-staged.config.js";

test("it exports a configuration object", () => {
	expect(typeof lintstagedConfig).toEqual("object");
});

test("it runs the correct commands", () => {
	expect(lintstagedConfig["*" as keyof Config]).toEqual(
		"npm run format -- --ignore-unknown --write",
	);
	expect(lintstagedConfig["*.{js,jsx,ts,tsx}" as keyof Config]).toEqual(
		"npm run lint -- --fix",
	);
	expect(
		// @ts-expect-error TODO - figure out how to type the function on this configuration object correctly.
		lintstagedConfig["*.{js,jsx,json,ts,tsx}"](["src/lint-staged.config.ts"]),
	).toEqual(
		"npm run vitest -- related --run src/lint-staged.config.ts --coverage.enabled --coverage.include=src/lint-staged.config.ts",
	);
});
