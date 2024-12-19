import {nodeModulesPackagePath, packageName} from "./constants.js";

test("the constants are set to the correct values", () => {
	expect(packageName).toBe("web-devdeps");
	expect(nodeModulesPackagePath).toBe("node_modules/web-devdeps");
});
