import {makeCachesPath} from "./makeCachesPath.ts";

test("it makes a cache folder", () => {
	expect(makeCachesPath(".foldercache/")).toBe(".caches/.foldercache/");
});

test("it makes a cache file", () => {
	expect(makeCachesPath(".filecache")).toBe(".caches/.filecache");
});
