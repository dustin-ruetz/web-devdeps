import {makeCachePath} from "./makeCachePath.js";

test("it makes a cache folder", () => {
	expect(makeCachePath(".foldercache/")).toEqual(".caches/.foldercache/");
});

test("it makes a cache file", () => {
	expect(makeCachePath(".filecache")).toEqual(".caches/.filecache");
});
