import {packageName} from "../../constants.ts";

import {errorOptionsRule, errorOptionsRuleName} from "./errorOptionsRule.ts";

export const webDevdepsPlugin = {
	name: packageName,
	rules: {
		[errorOptionsRuleName]: errorOptionsRule,
	},
} as const;
