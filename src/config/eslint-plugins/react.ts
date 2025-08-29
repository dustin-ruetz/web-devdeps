import eslintPluginReact from "eslint-plugin-react";
import typescripteslint from "typescript-eslint";
import type {ConfigArray} from "typescript-eslint";

import {reactFilesGlobPattern} from "../eslint-utils/reactFilesGlobPattern.ts";

const configs = {
	"jsx-runtime": eslintPluginReact.configs["jsx-runtime"],
	recommended: eslintPluginReact.configs.recommended,
} as const;

/**
 * @description  React-specific linting rules for ESLint.
 * @returns Configuration for the React ESLint plugin.
 * @see {@link https://github.com/jsx-eslint/eslint-plugin-react}
 */
export const reactPlugin: ConfigArray = typescripteslint.config({
	name: "react/user-defined-config",
	files: [reactFilesGlobPattern],
	languageOptions: {
		// **Note:** The `parserOptions` are identical between the `recommended` and
		//           `jsx-runtime` configs, with the exception that the latter has
		//            the `jsxPragma` property.
		parserOptions: configs["jsx-runtime"].parserOptions,
	},
	plugins: {
		react: eslintPluginReact,
	},
	rules: {
		// **Note:** The order of the configuration objects is important, since the
		//           `jsx-runtime` rules override some of the `recommended` ones.
		// Excerpt from https://github.com/jsx-eslint/eslint-plugin-react/#flat-configs:
		// > `jsx-runtime` - Add this if you are using React 17+.
		...configs.recommended.rules,
		...configs["jsx-runtime"].rules,
	},
});
