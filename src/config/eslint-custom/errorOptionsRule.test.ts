import {RuleTester} from "eslint";

import {errorOptionsRule, errorOptionsRuleName} from "./errorOptionsRule.ts";

const errorOptionsCauseCode = "errorOptionsCauseCode";
const errorOptionsName = "errorOptionsName";

// eslint-disable-next-line jest/require-hook
new RuleTester().run(`"${errorOptionsRuleName}" rule`, errorOptionsRule, {
	// ✅ Correct code.
	valid: [
		// Standard `Error` object.
		{
			code: `throw new Error("message");`,
		},
		{
			code: `throw new Error("message", {cause: {code: "ERR_CODE_STARTS_WITH_ERR_SUBSTRING"}});`,
		},
		{
			code: `throw new Error("message", {cause: {code: "ERR_CODE_USES_ONLY_UPPERCASE_LETTERS"}});`,
		},
		{
			code: `throw new Error("message", {cause: {code: "ERR_CODE_WITH_NUMBERS_400"}});`,
		},
		{
			code: `throw new Error("message", {name: "NameStartsWithUppercaseLetterError"});`,
		},
		{
			code: `throw new Error("message", {name: "NameEndsWithErrorSubstringError"});`,
		},
		{
			code: `throw new Error("message", {cause: {code: "ERR_VALID_CODE"}, name: "ValidNameError"});`,
		},
		// Custom error class.
		{code: `throw new CustomError("message");`},
		{
			code: `throw new CustomError("message", {cause: {code: "ERR_CODE_STARTS_WITH_ERR_SUBSTRING"}});`,
		},
		{
			code: `throw new CustomError("message", {cause: {code: "ERR_CODE_USES_ONLY_UPPERCASE_LETTERS"}});`,
		},
		{
			code: `throw new CustomError("message", {cause: {code: "ERR_CODE_WITH_NUMBERS_400"}});`,
		},
		{
			code: `throw new CustomError("message", {name: "NameStartsWithUppercaseLetterError"});`,
		},
		{
			code: `throw new CustomError("message", {name: "NameEndsWithErrorSubstringError"});`,
		},
		{
			code: `throw new CustomError("message", {cause: {code: "ERR_VALID_CODE"}, name: "ValidNameError"});`,
		},
	],
	// ❌ 1. Incorrect code > 💡 2. Raises error.
	invalid: [
		// Standard `Error` object.
		{
			code: `throw new Error("message", {cause: {code: "CODE_DOES_NOT_START_WITH_ERR_SUBSTRING"}});`,
			errors: [{messageId: errorOptionsCauseCode}],
		},
		{
			code: `throw new Error("message", {cause: {code: "ERR_code_uses_lowercase_letters"}});`,
			errors: [{messageId: errorOptionsCauseCode}],
		},
		{
			code: `throw new Error("message", {name: "nameDoesNotStartWithUppercaseLetterError"});`,
			errors: [{messageId: errorOptionsName}],
		},
		{
			code: `throw new Error("message", {name: "NameDoesNotEndWithErrorSubstring"});`,
			errors: [{messageId: errorOptionsName}],
		},
		{
			code: `throw new Error("message", {cause: {code: "invalid_code"}, name: "invalidName"});`,
			errors: [
				{messageId: errorOptionsCauseCode},
				{messageId: errorOptionsName},
			],
		},
		// Custom error class.
		{
			code: `throw new CustomError("message", {cause: {code: "CODE_DOES_NOT_START_WITH_ERR_SUBSTRING"}});`,
			errors: [{messageId: errorOptionsCauseCode}],
		},
		{
			code: `throw new CustomError("message", {cause: {code: "ERR_code_uses_lowercase_letters"}});`,
			errors: [{messageId: errorOptionsCauseCode}],
		},
		{
			code: `throw new CustomError("message", {name: "nameDoesNotStartWithUppercaseLetterError"});`,
			errors: [{messageId: errorOptionsName}],
		},
		{
			code: `throw new CustomError("message", {name: "NameDoesNotEndWithErrorSubstring"});`,
			errors: [{messageId: errorOptionsName}],
		},
		{
			code: `throw new CustomError("message", {cause: {code: "invalid_code"}, name: "invalidName"});`,
			errors: [
				{messageId: errorOptionsCauseCode},
				{messageId: errorOptionsName},
			],
		},
	],
});
