import lintstagedConfig from "../lint-staged.config.js";

test("it exports a configuration object", () => {
	expect(typeof lintstagedConfig).toMatch("object");
});

test("it runs the correct test command", () => {
	expect(
		// @ts-expect-error TODO - figure out how to type the configuration object/this function correctly.
		lintstagedConfig["*.{js,jsx,json,ts,tsx}"](["src/lint-staged.config.ts"]),
	).toMatch(
		"npm run vitest -- related --run src/lint-staged.config.ts --coverage.enabled --coverage.include=src/lint-staged.config.ts",
	);
});
