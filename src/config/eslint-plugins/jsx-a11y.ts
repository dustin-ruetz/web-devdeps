import jsxA11y from "eslint-plugin-jsx-a11y";
import typescripteslint from "typescript-eslint";
import {reactFilesGlobPattern} from "./react-hooks.ts";

/**
 * @description Accessibility-specific linting rules for elements written in JSX syntax.
 * @returns Configuration for the JSX A11y ESLint plugin.
 * @see {@link https://github.com/jsx-eslint/eslint-plugin-jsx-a11y}
 */
export const jsxA11yPlugin = typescripteslint.config({
	files: [reactFilesGlobPattern],
	...jsxA11y.flatConfigs.strict,
});
