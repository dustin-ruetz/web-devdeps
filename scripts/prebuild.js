import {rm} from "node:fs/promises";

const prebuild = async () => {
	// Delete the lib/ directory.
	// The following line simulates behavior of the Unix `rm -rf directoryName/` command,
	// but since this is a Node script this operation can be run in a cross-platform way.
	await rm("lib/", {force: true, recursive: true});
};
prebuild();
