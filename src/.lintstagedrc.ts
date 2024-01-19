import type {Config} from "lint-staged";

/** https://github.com/lint-staged/lint-staged */
const lintstagedConfig: Config = {
	// Excerpt from repo's README.md:
	// > Automatically fix code style with prettier for any format Prettier supports.
	"*": "npm run format:check -- --ignore-unknown",
	"*.{js,jsx,ts,tsx}": "npm run lint",
	// This repo has tests for JSON files, so include them here.
	"*.{js,jsx,json,ts,tsx}": "npm test -- --findRelatedTests",
	// TODO: Enable typechecking after relocating tsconfig.json files to avoid the following error:
	// ERROR: Option 'project' cannot be mixed with source files on a command line. ts(5042)
	// "*.{ts,tsx}": "npm run typecheck",
} as const;

export default lintstagedConfig;
