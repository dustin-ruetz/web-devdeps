import {rm} from "node:fs/promises";
import {clean} from "./clean.js";

jest.mock("node:fs/promises");

test("it removes the lib/ directory with the force and recursive options", async () => {
	await clean();

	expect(rm).toHaveBeenCalledTimes(1);
	expect(rm).toHaveBeenCalledWith("lib/", {
		force: true,
		recursive: true,
	});
});
