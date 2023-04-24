import {rm} from "node:fs/promises";
import {deleteDirectoriesInLib} from "../deleteDirectoriesInLib.js";

test("it removes the lib/cjs/ and lib/esm/ directories with the force and recursive options", async () => {
	const rmOptions = {force: true, recursive: true};

	await deleteDirectoriesInLib();

	// Verify that `rm` was called twice on the correct directories and with the correct options.
	expect(rm).toHaveBeenCalledTimes(2);
	expect(rm).toHaveBeenNthCalledWith(1, "lib/cjs/", rmOptions);
	expect(rm).toHaveBeenNthCalledWith(2, "lib/esm/", rmOptions);
});
