import {mkdir, readdir, readFile, writeFile} from "node:fs/promises";
import {getRepoMetadata} from "../../utils/getRepoMetadata.js";
import {getRootPaths} from "./getRootPaths.js";

const {dependencyPartialPath} = getRepoMetadata();

const rootPathToReadFrom = getRootPaths().readFrom;
const rootPathToWriteTo = getRootPaths().writeTo;

/** Encoding to use for Node.js file system operations. */
const encoding = {encoding: "utf-8"} as const;

/**
 * Write a new `.gitattributes` file to disk and pre-populate it with a list
 * of file extensions common to web-/Node.js-based projects.
 */
export const writeGitAttributes = async () => {
	await writeFile(
		`${rootPathToWriteTo}/.gitattributes`,
		`
* text=auto

*.css  text
*.js   text
*.jsx  text
*.json text
*.md   text
*.scss text
*.svg  text
*.ts   text
*.tsx  text
*.yaml text

*.jpg binary
*.png binary
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
		githooksFiles.map((githook) =>
			writeFile(
				`${rootPathToWriteTo}/.githooks/${githook}`,
				`
#!/usr/bin/env sh
./${dependencyPartialPath}/.githooks/_/${githook}
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
node_modules/
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

/** Write a new `.node-version` file to disk. */
export const writeNodeVersion = async (nodeVersion: string) => {
	await writeFile(`${rootPathToWriteTo}/.node-version`, nodeVersion);
};

/** Read the `package.json` file, update its contents, then write the file to disk. */
export const writePackageJson = async (
	repoName: string,
	configureStylelint: boolean,
) => {
	const packageJsonContents = await readFile(
		`${rootPathToReadFrom}/package.json`,
		encoding,
	);
	const packageJson = JSON.parse(packageJsonContents);

	const devdepsVersion = packageJson.version;

	packageJson.name = repoName;
	packageJson.version = "0.0.0";
	packageJson.description = "";

	packageJson.scripts = Object.entries(packageJson.scripts).reduce(
		(scriptsObject: Record<string, string>, [scriptKey, scriptValue]) => {
			/**
			 * The following `String` conversion prevents TypeScript from reporting the following error:
			 * > `"scriptValue" is of type "unknown". ts(18046)`
			 *
			 * This is a safe conversion because `packageJson.scripts` will _always_ be an object of scripts
			 * that are in the format of key/value strings, so convert it here to keep TypeScript happy.
			 */
			const scriptValueString = String(scriptValue);

			let updatedScriptValue = scriptValueString;
			if (scriptValueString.includes("--config ./lib/")) {
				updatedScriptValue = scriptValueString.replace(
					"--config ./",
					`--config ./${dependencyPartialPath}/`,
				);
			}
			scriptsObject[scriptKey] = updatedScriptValue;
			return scriptsObject;
		},
		{},
	);
	if (configureStylelint) {
		packageJson.scripts["lint/styles"] =
			`stylelint --config ./${dependencyPartialPath}/lib/stylelint.config.js --cache --cache-location ./.caches/.stylelintcache --ignore-path ./.gitignore`;
		packageJson.scripts["check/lint/styles"] =
			"npm run lint/styles -- '**/*.{css,scss,jsx,tsx}'";
		packageJson.scripts["fix/lint/styles"] =
			"npm run lint/styles -- --fix '**/*.{css,scss,jsx,tsx}'";
	}

	packageJson.files = [];
	packageJson.repository.url = packageJson.repository.url.replace(
		"devdeps",
		repoName,
	);
	delete packageJson.publishConfig;
	packageJson.dependencies = {};
	packageJson.devDependencies = {
		"@dustin-ruetz/devdeps": devdepsVersion,
	};

	await writeFile(
		`${rootPathToWriteTo}/package.json`,
		JSON.stringify(packageJson, null, "\t"),
	);
};

/** Write a new `README.md` file to disk and set the header to the name of the repository. */
export const writeReadme = async (repoName: string) => {
	await writeFile(`${rootPathToWriteTo}/README.md`, `# ${repoName}`);
};

/** Write a new `tsconfig.build.json` file to disk and make it extend this repo's configuration. */
export const writeTsConfigBuild = async () => {
	await writeFile(
		`${rootPathToWriteTo}/tsconfig.build.json`,
		`{"extends": "./${dependencyPartialPath}/tsconfig.build.json"}`,
	);
};

/** Write a new `tsconfig.json` file to disk and make it extend this repo's configuration. */
export const writeTsConfig = async () => {
	await writeFile(
		`${rootPathToWriteTo}/tsconfig.json`,
		`{"extends": "./${dependencyPartialPath}/tsconfig.json"}`,
	);
};

/** Write a new `.vscode/` folder to disk, then write a new `settings.json` file to it. */
export const writeVsCodeSettings = async (configureStylelint: boolean) => {
	const vsCodeSettingsJson: Record<string, unknown> = {
		"eslint.options": {
			overrideConfigFile: `${dependencyPartialPath}/lib/eslint.config.js`,
		},
		"prettier.configPath": `${dependencyPartialPath}/lib/prettier.config.js`,
		"prettier.ignorePath": ".gitignore",
	};

	if (configureStylelint) {
		vsCodeSettingsJson["stylelint.configFile"] =
			`${dependencyPartialPath}/lib/stylelint.config.js`;
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
