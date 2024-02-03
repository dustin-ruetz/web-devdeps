import type {Config} from "lint-staged";
import lintstagedConfig from "../lint-staged.config.js";

test("it exports a configuration object", () => {
	expect(typeof lintstagedConfig).toMatch("object");
});

test("it runs the correct commands", () => {
	expect(lintstagedConfig["*" as keyof Config]).toMatch(
		"npm run format -- --check --ignore-unknown",
	);
	expect(lintstagedConfig["*.{js,jsx,ts,tsx}" as keyof Config]).toMatch(
		"npm run lint",
	);
	expect(
		// @ts-expect-error TODO - figure out how to type the function on this configuration object correctly.
		lintstagedConfig["*.{js,jsx,json,ts,tsx}"](["src/lint-staged.config.ts"]),
	).toMatch(
		"npm run vitest -- related --run src/lint-staged.config.ts --coverage.enabled --coverage.include=src/lint-staged.config.ts",
	);
});
