import {
	nodeModulesPackagePath,
	packageName,
	packageScopeAndName,
} from "./constants.js";

test("the constants are set to the correct values", () => {
	expect(packageName).toEqual("devdeps");
	expect(packageScopeAndName).toEqual("@dustin-ruetz/devdeps");
	expect(nodeModulesPackagePath).toEqual("node_modules/@dustin-ruetz/devdeps");
});
