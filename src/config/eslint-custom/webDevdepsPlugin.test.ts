import {webDevdepsPlugin} from "./webDevdepsPlugin.ts";

test("the custom `web-devdeps` ESLint plugin uses the correct namespace", () => {
	expect(webDevdepsPlugin.name).toBe("web-devdeps");
});
