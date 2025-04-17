import eslintPluginJSXa11y from "eslint-plugin-jsx-a11y";
import typescripteslint, {type ConfigArray} from "typescript-eslint";
import {reactFilesGlobPattern} from "../eslint-shared/reactFilesGlobPattern.ts";

/**
 * @description Accessibility-specific linting rules for elements written in JSX syntax.
 * @returns Configuration for the JSX A11y ESLint plugin.
 * @see {@link https://github.com/jsx-eslint/eslint-plugin-jsx-a11y}
 */
export const jsxA11yPlugin: ConfigArray = typescripteslint.config({
	files: [reactFilesGlobPattern],
	...eslintPluginJSXa11y.flatConfigs.strict,
});
