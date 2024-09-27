/**
 * @description Generate the a path to a location in the `.caches/` directory.
 * @param path - The location (either a folder or file) to store the cached data.
 * @returns The path to the cache location.
 */
export const makeCachePath = (path: string) => `.caches/${path}`;
