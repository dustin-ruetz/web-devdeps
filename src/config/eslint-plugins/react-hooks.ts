import {configs} from "eslint-plugin-react-hooks";
import typescripteslint, {type ConfigArray} from "typescript-eslint";

import {reactFilesGlobPattern} from "../eslint-utils/reactFilesGlobPattern.ts";

/**
 * @description React Hooks-specific linting rules.
 * @returns Configuration for the React Hooks ESLint plugin.
 * @see {@link https://www.npmjs.com/package/eslint-plugin-react-hooks}
 */
export const reactHooksPlugin: ConfigArray = typescripteslint.config({
	files: [reactFilesGlobPattern],
	...configs["recommended-latest"],
});
