import type {Linter} from "eslint";

type ConfigObject = Pick<Linter.Config, "name" | "rules" | "settings">;

export const findConfigObjectByName = (
	configArray: ConfigObject[],
	name: string,
) =>
	configArray.find((configObject: ConfigObject) => configObject.name === name);
