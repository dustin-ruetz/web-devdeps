import {rm} from "node:fs/promises";
import {prebuild} from "../prebuild";

// Excerpt from https://jestjs.io/docs/configuration#automock-boolean:
// > Node.js core modules, like `fs`, are not mocked by default. They can be mocked explicitly, like `jest.mock("fs")`.
jest.mock("node:fs/promises", () => ({
	rm: jest.fn(),
}));

test("it removes the lib/ directory with the force and recursive options", async () => {
	await prebuild();

	expect(rm).toHaveBeenCalledTimes(1);
	expect(rm).toHaveBeenCalledWith("lib/", {
		force: true,
		recursive: true,
	});
});
