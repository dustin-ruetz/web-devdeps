import {mkdir, readdir, readFile, writeFile} from "node:fs/promises";

import {nodeModulesPackagePath, packageName} from "../../constants.ts";
import type {PackageJsonTypes} from "../../types.d.ts";

import {getRootPaths} from "./getRootPaths.ts";

const rootPathToReadFrom = getRootPaths().readFrom;
const rootPathToWriteTo = getRootPaths().writeTo;

/** Encoding to use for Node.js file system operations. */
const encoding = {encoding: "utf-8"} as const;

/**
 * Write a new `.gitattributes` file to disk and pre-populate it
 * with a list of file extensions common to web-based projects.
 */
export const writeGitAttributes = async () => {
	await writeFile(
		`${rootPathToWriteTo}/.gitattributes`,
		`
* text=auto

*.css  text
*.html text
*.js   text
*.jsx  text
*.json text
*.md   text
*.scss text
*.svg  text
*.ts   text
*.tsx  text
*.yaml text

*.jpg   binary
*.png   binary
*.woff2 binary
`.trimStart(),
	);
};

/** Write a new `.githooks/` folder to disk, then write the new Git hook files to it. */
export const writeGitHooks = async () => {
	const githooksDirectoryContents = await readdir(
		`${rootPathToReadFrom}/.githooks/`,
		encoding,
	);

	// Filter out the "_" underscore directory since it contains the husky-specific script files.
	const githooksFiles = githooksDirectoryContents.filter(
		(item) => item !== "_",
	);

	await mkdir(`${rootPathToWriteTo}/.githooks/`);
	await Promise.all(
		githooksFiles.map(async (githook) =>
			writeFile(
				`${rootPathToWriteTo}/.githooks/${githook}`,
				`
#!/usr/bin/env sh
./${nodeModulesPackagePath}/.githooks/_/${githook}
`.trimStart(),
			),
		),
	);
};

/** Write a new `.gitignore` file to disk and pre-populate it with the list of common ignore patterns. */
export const writeGitIgnore = async () => {
	await writeFile(
		`${rootPathToWriteTo}/.gitignore`,
		`
.caches/
.pnpm-store/
node_modules/
`.trimStart(),
	);
};

/** Write a new `config/` folder to disk, then write a new `jest.setupFilesAfterEnv.ts` file to it. */
export const writeJestSetupFile = async () => {
	await mkdir(`${rootPathToWriteTo}/config/`);
	await writeFile(
		`${rootPathToWriteTo}/config/jest.setupFilesAfterEnv.ts`,
		`
// **Important**: This file tells TypeScript to load the type definitions for extending
//                Jest's \`expect\` API. This is required to prevent type errors in the
//                IDE when writing frontend tests; see the related files below for how
//                this functionality is actually implemented in the Jest environment.

// Related file: node_modules/web-devdeps/lib/config/jest-utils/setupFilesAfterEnv.cjs
// Related file: node_modules/web-devdeps/lib/config/jest.config.js

import "@testing-library/jest-dom";
`.trimStart(),
	);
};

/** Read the `LICENSE` file, update the copyright year, then write the file to disk. */
export const writeLicense = async () => {
	const fileContents = await readFile(
		`${rootPathToReadFrom}/LICENSE`,
		encoding,
	);
	// Replace the four-digit year in the "Copyright (c) yyyy" substring with the current year.
	const fileContentsWithCurrentYear = fileContents.replace(
		/\d{4}/,
		new Date().getFullYear().toString(),
	);
	await writeFile(`${rootPathToWriteTo}/LICENSE`, fileContentsWithCurrentYear);
};

/**
 * @description Write a new `.node-version` file to disk.
 * @param nodeVersion - The Node.js semantic version (semver) number.
 */
export const writeNodeVersion = async (nodeVersion: string) => {
	await writeFile(`${rootPathToWriteTo}/.node-version`, nodeVersion);
};

/**
 * @description Read the `package.json` file, update its contents, then write the file to disk.
 * @param repoName - The name of the repository.
 * @param configureStylelint - Whether or not to configure Stylelint.
 */
export const writePackageJson = async (
	repoName: string,
	configureStylelint: boolean,
) => {
	const packageJsonPath = `${rootPathToReadFrom}/package.json`;
	const packageJsonContents = await readFile(packageJsonPath, encoding);
	// eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
	const packageJson = JSON.parse(packageJsonContents) as PackageJsonTypes;

	packageJson.name = repoName;
	packageJson.version = "0.0.0";
	packageJson.description = "";

	// Update the `init` script to ensure that pnpm installs
	// both `dependencies` and `devDependencies`.
	const initScript = String(packageJson.scripts["init"]);
	packageJson.scripts["init"] = initScript.replace(
		"pnpm install --no-optional",
		"pnpm install",
	);

	// Remove the "JSON code comment" entries and the scripts that aren't needed for the initialized repo.
	delete packageJson.scripts["// githooks.*"];
	delete packageJson.scripts["// github.*"];
	delete packageJson.scripts["preinit-repo"];
	delete packageJson.scripts["init-repo"];

	packageJson.scripts = Object.entries(packageJson.scripts).reduce(
		(scriptsObject: PackageJsonTypes["scripts"], [scriptKey, scriptValue]) => {
			/**
			 * The following `String` conversion prevents TypeScript from reporting the following error:
			 * > `"scriptValue" is of type "unknown". ts(18046)`
			 *
			 * This is a safe conversion because `packageJson.scripts` will _always_ be an object of scripts
			 * that are in the format of key/value strings, so convert it here to keep TypeScript happy.
			 */
			const scriptValueString = String(scriptValue);

			let updatedScriptValue = scriptValueString;
			if (scriptValueString.includes("node ./lib/")) {
				updatedScriptValue = scriptValueString.replace(
					"node ./lib/",
					packageName,
				);
			}
			scriptsObject[scriptKey] = updatedScriptValue;
			return scriptsObject;
		},
		{},
	);
	if (configureStylelint) {
		packageJson.scripts["lint.styles"] = `${packageName} lint.styles`;
		packageJson.scripts["check.lint.styles"] =
			"pnpm lint.styles '**/*.{css,scss,jsx,tsx}'";
		packageJson.scripts["fix.lint.styles"] =
			"pnpm lint.styles --fix '**/*.{css,scss,jsx,tsx}'";

		// The object's keys are no longer in alphabetical order now that the above scripts
		// have been added, so 1) sort them, then 2) rewrite the object with the new values.
		packageJson.scripts = Object.fromEntries(
			// Function to sort object keys adapted from prototype's 2015-Oct-10 answer to the following Stack Overflow question:
			// https://stackoverflow.com/questions/9658690/is-there-a-way-to-sort-order-keys-in-javascript-objects/33049762#33049762
			Object.entries(packageJson.scripts).sort((key1, key2) => {
				/* v8 ignore next 7 */
				if (key1 < key2) {
					return -1;
				} else if (key1 > key2) {
					return +1;
				} else {
					return 0;
				}
			}),
		);
	}

	packageJson.files = [];
	delete packageJson.publishConfig;
	packageJson.repository.url = packageJson.repository.url.replace(
		packageName,
		repoName,
	);
	packageJson.dependencies = {};
	packageJson.devDependencies = {
		[packageName]: "^1.0.0",
	};

	await writeFile(
		`${rootPathToWriteTo}/package.json`,
		JSON.stringify(packageJson, null, "\t"),
	);
};

/**
 * @description Write a new `README.md` file to disk and set the header to the name of the repository.
 * @param repoName - The name of the repository.
 */
export const writeReadme = async (repoName: string) => {
	await writeFile(`${rootPathToWriteTo}/README.md`, `# ${repoName}`);
};

/** Write a new `renovate.json` file to disk and make it extend this repo's configuration. */
export const writeRenovate = async () => {
	await writeFile(
		`${rootPathToWriteTo}/renovate.json`,
		`
{
	"$schema": "https://docs.renovatebot.com/renovate-schema.json",
	"extends": ["github>dustin-ruetz/web-devdeps:renovate.json"]
}
`.trimStart(),
	);
};

/** Write a new `tsconfig.build.json` file to disk and make it extend this repo's configuration. */
export const writeTsConfigBuild = async () => {
	await writeFile(
		`${rootPathToWriteTo}/tsconfig.build.json`,
		`{"extends": "./${nodeModulesPackagePath}/tsconfig.build.json"}`,
	);
};

/** Write a new `tsconfig.json` file to disk and make it extend this repo's configuration. */
export const writeTsConfig = async () => {
	await writeFile(
		`${rootPathToWriteTo}/tsconfig.json`,
		`{"extends": "./${nodeModulesPackagePath}/tsconfig.json"}`,
	);
};

/**
 * @description Write a new `.vscode/` folder to disk, then write a new `settings.json` file to it.
 * @param configureStylelint - Whether or not to configure Stylelint.
 */
export const writeVsCodeSettings = async (configureStylelint: boolean) => {
	const vsCodeSettingsJson: Record<string, unknown> = {
		"eslint.options": {
			overrideConfigFile: `${nodeModulesPackagePath}/lib/config/eslint.config.js`,
		},
		"prettier.configPath": `${nodeModulesPackagePath}/lib/config/prettier.config.js`,
		"prettier.ignorePath": ".gitignore",
	};

	if (configureStylelint) {
		vsCodeSettingsJson["stylelint.configFile"] =
			`${nodeModulesPackagePath}/lib/config/stylelint.config.js`;
		vsCodeSettingsJson["stylelint.validate"] = [
			"css",
			"javascriptreact",
			"scss",
			"typescriptreact",
		];
	}

	await mkdir(`${rootPathToWriteTo}/.vscode/`);
	await writeFile(
		`${rootPathToWriteTo}/.vscode/settings.json`,
		JSON.stringify(vsCodeSettingsJson, null, "\t"),
	);
};
