import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import typescripteslint, {type ConfigArray} from "typescript-eslint";

/** Specify the list of file extensions that can be used by React. */
export const reactFilesGlobPattern = "**/*.+(js|jsx|ts|tsx)";

/**
 * @description React Hooks-specific linting rules.
 * @returns Configuration for the React Hooks ESLint plugin.
 * @see {@link https://www.npmjs.com/package/eslint-plugin-react-hooks}
 */
export const reactHooksPlugin: ConfigArray = typescripteslint.config({
	files: [reactFilesGlobPattern],
	...eslintPluginReactHooks.configs["recommended-latest"],
});
