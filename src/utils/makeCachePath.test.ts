import {makeCachePath} from "./makeCachePath.ts";

test("it makes a cache folder", () => {
	expect(makeCachePath(".foldercache/")).toBe(".caches/.foldercache/");
});

test("it makes a cache file", () => {
	expect(makeCachePath(".filecache")).toBe(".caches/.filecache");
});
