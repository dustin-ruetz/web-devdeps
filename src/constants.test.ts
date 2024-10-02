import {
	nodeModulesPackagePath,
	packageName,
	packageScopeAndName,
} from "./constants.js";

test("the constants are set to the correct values", () => {
	expect(packageName).toBe("devdeps");
	expect(packageScopeAndName).toBe("@dustin-ruetz/devdeps");
	expect(nodeModulesPackagePath).toBe("node_modules/@dustin-ruetz/devdeps");
});
