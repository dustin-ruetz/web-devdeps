/** NPM user-scoped namespace. */
const packageScope = "@dustin-ruetz";

/** NPM package name. */
export const packageName = "devdeps";

/** Combined NPM package scope and name (i.e. the `package.json` file's `"name"` property). */
export const packageScopeAndName = `${packageScope}/${packageName}`;

/** Relative path to package when installed as a dependency in a consuming project's `node_modules/` directory. */
export const nodeModulesPackagePath = `node_modules/${packageScopeAndName}`;
