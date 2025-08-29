import eslintPluginReact from "eslint-plugin-react";
import typescripteslint from "typescript-eslint";
import type {ConfigArray} from "typescript-eslint";

import {reactFilesGlobPattern} from "../eslint-utils/reactFilesGlobPattern.ts";

/**
 * @description  React-specific linting rules for ESLint.
 * @returns Configuration for the React ESLint plugin.
 * @see {@link https://github.com/jsx-eslint/eslint-plugin-react}
 */
export const reactPlugin: ConfigArray = typescripteslint.config({
	name: "react/user-defined-config",
	files: [reactFilesGlobPattern],
	// Excerpt from https://github.com/jsx-eslint/eslint-plugin-react/#flat-configs:
	// > `jsx-runtime` - Add this if you are using React 17+.
	...eslintPluginReact.configs.flat["jsx-runtime"],
	...eslintPluginReact.configs.flat["recommended"],
});
