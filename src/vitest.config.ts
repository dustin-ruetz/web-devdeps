import {defineConfig, type UserConfig} from "vitest/config";

/** https://vitest.dev/config/ */
const vitestConfig: UserConfig = defineConfig({
	test: {
		exclude: ["**/lib/**", "**/node_modules/**"],
		coverage: {
			// Excerpt from https://vitest.dev/config/#coverage-exclude:
			// > List of files excluded from coverage as glob patterns.
			exclude: [
				"lib/**",
				// Vitest excludes certain configuration files by default; use a negated ignore pattern to include them in the coverage report.
				"!src/*.config.*",
			],
			provider: "v8",
			reporter: ["text", "text-summary"],
			thresholds: {
				"100": true,
			},
		},
		// Excerpt from https://vitest.dev/config/#globals:
		// > By default, `vitest` does not provide global APIs for explicitness. If you prefer to use the APIs globally
		// > like Jest, you can pass the `--globals` option to CLI or add `globals: true` in the config.
		//
		// Excerpt from https://vitest.dev/guide/migration.html#globals-as-a-default:
		// > Jest has their globals API enabled by default. Vitest does not. You can either enable globals via the
		// > `globals` configuration setting or update your code to use imports from the `vitest` module instead.
		// >
		// > If you decide to keep globals disabled, be aware that common libraries like `testing-library` will not run auto DOM cleanup.
		globals: true,
	},
} as const);

export default vitestConfig;
