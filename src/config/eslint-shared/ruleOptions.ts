/** @see {@link https://eslint.org/docs/latest/rules/no-magic-numbers#options} */
export const noMagicNumbersRuleOptions = {
	/**
	 * > A boolean to specify if we should check for the `const`
	 * > keyword in variable declaration of numbers.
	 */
	enforceConst: true,
	// Allow the following numbers since they're commonly used when working with array methods.
	ignore: [-1, 0, 1],
	// Allow numbers to be used directly when working with arrays to
	// avoid overly-verbose `const firstIndex = 0` declarations.
	ignoreArrayIndexes: true,
} as const;

/** @see {@link https://eslint.org/docs/latest/rules/no-shadow#options} */
export const noShadowRuleOptions = {
	/**
	 * > If `true`, the rule prevents shadowing of built-in global
	 * > variables: `Object`, `Array`, `Number`, and so on.
	 */
	builtinGlobals: true,
	/** > Reports all shadowing before the outer variables/functions are defined. */
	hoist: "all",
	/**
	 * > If `true`, it prevents reporting shadowing of variables in their initializers
	 * > when the shadowed variable is presumably still uninitialized. The shadowed
	 * > variable must be on the left side. The shadowing variable must be on
	 * > the right side and declared in a callback function or in an IIFE.
	 */
	ignoreOnInitialization: true,
} as const;
