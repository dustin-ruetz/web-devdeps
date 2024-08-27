import {
	nodeModulesPackagePath,
	packageName,
	packageScope,
} from "./constants.js";

test("the constants are set to the correct values", () => {
	expect(packageScope).toEqual("@dustin-ruetz");
	expect(packageName).toEqual("devdeps");
	expect(nodeModulesPackagePath).toEqual("node_modules/@dustin-ruetz/devdeps");
});
