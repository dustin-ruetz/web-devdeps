import reactHooks from "eslint-plugin-react-hooks";
import typescripteslint, {type ConfigArray} from "typescript-eslint";

/** Specify the list of file extensions that can be used by React. */
export const reactFilesGlobPattern = "**/*.+(js|jsx|ts|tsx)";

/**
 * @description React Hooks-specific linting rules.
 * @returns Configuration for the React Hooks ESLint plugin.
 * @see {@link https://www.npmjs.com/package/eslint-plugin-react-hooks}
 */
export const reactHooksPlugin: ConfigArray = typescripteslint.config({
	name: "react-hooks/config",
	files: [reactFilesGlobPattern],
	/**
	 * @see {@link https://github.com/facebook/react/pull/30774}
	 * @todo Check if this config can be simplified after `eslint-plugin-react-hooks`
	 *       gets a new release and/or updates its docs via the above PR.
	 */
	plugins: {
		"react-hooks": reactHooks,
	},
	rules: reactHooks.configs.recommended.rules,
});
