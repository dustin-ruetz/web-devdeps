import {rm} from "node:fs/promises";
import {clean} from "./clean.js";

jest.mock("node:fs/promises");
const consoleLogSpy = jest.spyOn(console, "log").mockImplementation();

test("it removes the lib/ directory with the 'force' and 'recursive' options", async () => {
	await clean();

	expect(consoleLogSpy).toHaveBeenCalledTimes(1);
	expect(consoleLogSpy).toHaveBeenCalledWith("🧹 Removing lib/ directory");
	expect(rm).toHaveBeenCalledTimes(1);
	expect(rm).toHaveBeenCalledWith("lib/", {
		force: true,
		recursive: true,
	});
});
