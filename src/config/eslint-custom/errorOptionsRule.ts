import type {Rule} from "eslint";

export const errorOptionsRuleName = "error-options";

const messageIDs = {
	errorOptionsCauseCode: "errorOptionsCauseCode",
	errorOptionsName: "errorOptionsName",
} as const;

export const errorOptionsRule: Rule.RuleModule = {
	meta: {
		docs: {
			description:
				"Enforce that the values in error `options` objects adhere to a strict format in `throw new Error` statements.",
			recommended: true,
		},
		messages: {
			[messageIDs.errorOptionsCauseCode]:
				"Error's `options.cause.code` value must 1) start with the 'ERR_' substring, and 2) be solely comprised of uppercase letters.",
			[messageIDs.errorOptionsName]:
				"Error's `options.name` value must 1) start with an uppercase letter, and 2) end with the 'Error' substring.",
		},
		type: "suggestion",
	},
	create: (context) => ({
		ThrowStatement(node) {
			if (node.argument.type === "NewExpression") {
				const errorOptionsObject = node.argument.arguments.find(
					(argument) => argument.type === "ObjectExpression",
				);
				if (!errorOptionsObject) {
					return;
				}

				// Use two separate immediately invoked function expressions to check
				// for two different kinds of lint violations. Writing IIFEs in this way
				// is helpful for both satisfying all of the type checks as well as
				// `return`ing early when the lint rule's conditions are not met.

				// #region `options.cause.code`
				(() => {
					// Get the `options.cause` object.
					const errorOptionsCauseObject = errorOptionsObject.properties.find(
						(property) =>
							property.type === "Property" &&
							property.key.type === "Identifier" &&
							property.key.name === "cause",
					);
					if (
						!errorOptionsCauseObject ||
						errorOptionsCauseObject.type === "SpreadElement" ||
						errorOptionsCauseObject.value.type !== "ObjectExpression"
					) {
						return;
					}

					// Get the `options.cause.code` property.
					const errorOptionsCauseCodeProperty =
						errorOptionsCauseObject.value.properties.find(
							(property) =>
								property.type === "Property" &&
								property.key.type === "Identifier" &&
								property.key.name === "code",
						);
					/* v8 ignore next 6 */
					if (
						!errorOptionsCauseCodeProperty ||
						errorOptionsCauseCodeProperty.type === "SpreadElement"
					) {
						return;
					}

					// Check the `options.cause.code` value.
					if (
						errorOptionsCauseCodeProperty.value.type === "Literal" &&
						typeof errorOptionsCauseCodeProperty.value.value === "string"
					) {
						const errorOptionsCauseCodeValue =
							errorOptionsCauseCodeProperty.value.value;

						// Report a lint violation if the error's `options.cause.code` value:
						if (
							// 1. Does not start with the "ERR_" substring; or
							!errorOptionsCauseCodeValue.startsWith("ERR_") ||
							// 2. Is not solely comprised of uppercase letters.
							errorOptionsCauseCodeValue !==
								errorOptionsCauseCodeValue.toUpperCase()
						) {
							context.report({
								messageId: messageIDs.errorOptionsCauseCode,
								node: errorOptionsCauseCodeProperty,
							});
						}
					}
				})();
				// #endregion `options.cause.code`

				// #region `options.name`
				(() => {
					// Get the `options.name` property.
					const errorOptionsNameProperty = errorOptionsObject.properties.find(
						(property) =>
							property.type === "Property" &&
							property.key.type === "Identifier" &&
							property.key.name === "name",
					);
					if (
						!errorOptionsNameProperty ||
						errorOptionsNameProperty.type === "SpreadElement"
					) {
						return;
					}

					// Check the `options.name` value.
					if (
						errorOptionsNameProperty.value.type === "Literal" &&
						typeof errorOptionsNameProperty.value.value === "string"
					) {
						const errorOptionsNameValue = errorOptionsNameProperty.value.value;

						// Report a lint violation if the error's `options.name` value:
						if (
							// 1. Does not start with an uppercase letter; or
							!/[A-Z]/.test(errorOptionsNameValue.slice(0, 1)) ||
							// 2. Does not end with the "Error" substring.
							!errorOptionsNameValue.endsWith("Error")
						) {
							context.report({
								messageId: messageIDs.errorOptionsName,
								node: errorOptionsNameProperty,
							});
						}
					}
				})();
			}
			// #endregion `options.name`
		},
	}),
};
