# web-devdeps

Package that provides development dependencies for other web projects (both browser- and Node.js-based) to consume.

## Goals

`TL;DR` version: make web dev dependencies DRY, like a cocktail in a desert 🍸 🏜️

1. Avoid having to repeatedly install the same development dependencies in web projects that all use the same foundational tooling. With a small number of exceptions, these are generally CLI-based `devDependencies` that aren't typically `import`ed in the `src/` files of an application.
1. Provide [standardized configuration files](./src/config/) that work with both CLI programs and IDE extensions while also preventing the repetitive cluttering up of repository roots with the same boilerplate `*.config.js` files over-and-over again.
1. Provide [standardized scripts](./src/scripts/) that automatically add useful arguments and determine the path to their configuration files.
1. Provide [`make*Config`](./src/exports.ts) functions that allow for the standardized configurations to be extended and customized to suit the specific requirements of the consuming project.

## Features and Purpose

`web-devdeps` provides `devDependencies` and configuration files for:

- Automated dependency updates using [`renovate`](https://docs.renovatebot.com).
- Building and typechecking using [`typescript`](https://www.typescriptlang.org).
- Formatting using [`prettier`](https://prettier.io) and its plugins.
- Linting using [`eslint`](https://eslint.org) and its plugins (including [`typescript-eslint`](https://typescript-eslint.io)) for JavaScript and TypeScript.
- Linting using [`stylelint`](https://stylelint.io) for CSS/SCSS/JSX/TSX (the latter two file types being relevant for "CSS-in-JS" solutions like `styled-components`).
- Releasing using [`semantic-release`](https://semantic-release.gitbook.io/semantic-release).
- Testing using [`jest`](https://jestjs.io) for unit and integration tests.
- Validating commit messages using [`commitlint`](https://commitlint.js.org).
- Validating the codebase prior to any changes being committed using [`lint-staged`](https://github.com/lint-staged/lint-staged) and [`husky`](https://typicode.github.io/husky) Git hooks.

Additional details:

- The idea for this package was inspired by Kent C. Dodds' [`kcd-scripts`][kcd-scripts] CLI toolbox, with a key difference being the preference for a fully-tested TypeScript codebase using modern ES Module syntax.
- This project bootstraps and dogfoods its own configuration files by 1) using `tsc` to compile the `src/` directory's `*.ts` files to the `lib/` directory's `*.js` files, and 2) pointing all configuration paths to the compiled `lib/config/*.js` files.

## Usage and Development

Prerequisite: The following instructions assume that [Node.js](https://nodejs.org/en/download) and [pnpm](https://pnpm.io/installation#using-corepack) are installed.

### Usage in Projects

Note that `web-devdeps` requires the project to have the following commonly-used folder/file structure:

```text
// Created using the `Shinotatwu-DS.file-tree-generator` extension for Visual Studio Code.
📂 the-project
┣ 📂 node_modules
┃ ┗ 📂 web-devdeps
┃ ┃ ┗ 📂 lib/config
┃ ┃ ┃ ┗ 📄 *.config.js
┃ ┃ ┗ 📄 tsconfig.json
┗ 📄 package.json
┗ 📄 tsconfig.json
```

#### Starting a New Project

<details>

**Important:** Replace the `repo-name` placeholder in the commands below with the actual name of the repository.

```sh
# 1. Create and initialize a new Git repository:
mkdir repo-name && cd repo-name && git init

# 2. Use `pnpx` to execute this package's `init-repo` script to write the initial files
#    needed for web-/Node.js-based projects when creating a new Git repository.
#
#    **Tip:** Pass the `--help` flag to print the documentation for the command's flags.
pnpx web-devdeps init-repo repo-name

# 3. Configure the repo to use the Git hooks files in the written `.githooks/` directory
#    and modify their permissions to make all files executable:
git config core.hooksPath ./.githooks/ && chmod u+x ./.githooks/*

# 4. Install the `web-devdeps` version listed in the written `package.json` file:
pnpm install

# 5. (optional) Automatically fix the formatting for all of the written files:
pnpm fix.format

# 6. Note how the key files (`package.json`, `README.md`, `tsconfig.json`, etc.)
#    and folders (`.githooks/`, `.vscode/`) have all been initialized. Open each
#    written file and make updates as needed, then add and commit everything:
git add --all && git commit -m "feat: initial commit"

# 7. Verify that the Git hooks ran automatically and the relevant checks
#    (formatting, linting, testing, typechecking, etc.) were successful.
```

</details>

#### Adding to an Existing Project

<details>

1. Create the `.githooks/` directory and populate it with the following three files:

A. `.githooks/commit-msg`

```sh
#!/usr/bin/env sh
./node_modules/web-devdeps/.githooks/_/commit-msg
```

B. `.githooks/pre-commit`

```sh
#!/usr/bin/env sh
./node_modules/web-devdeps/.githooks/_/pre-commit
```

C. `.githooks/pre-push`

```sh
#!/usr/bin/env sh
./node_modules/web-devdeps/.githooks/_/pre-push
```

2. Create the `.vscode/` directory and populate it with the `settings.json` file:

```json
{
	"eslint.options": {
		"overrideConfigFile": "node_modules/web-devdeps/lib/config/eslint.config.js"
	},
	"prettier.configPath": "node_modules/web-devdeps/lib/config/prettier.config.js",
	"prettier.ignorePath": ".gitignore",
	// (optional) Modify or remove the Stylelint-related lines below as per the tooling needs of the project.
	"stylelint.configFile": "node_modules/web-devdeps/lib/config/stylelint.config.js",
	"stylelint.validate": ["css", "javascriptreact", "scss", "typescriptreact"]
}
```

3. (optional) If it's a frontend project that uses TypeScript, create the `config/` directory and populate it with the `jest.setupFilesAfterEnv.ts` file:

```ts
import "@testing-library/jest-dom";
```

4. Create the `.node-version` file:

```
22
```

5. Install the package as a development dependency:

```sh
pnpm add --save-dev --save-exact web-devdeps
```

6. Go through the `package.json` file and add the following `scripts`, making modifications as needed (i.e. a non-TypeScript project has no use for the `check.types` script, a non-frontend project has no use for the `lint.styles` scripts, a React project that doesn't use a CSS-in-JS runtime library like `styled-components` doesn't need to check `.jsx` or `.tsx` files for linting issues with the styling, etc.):

```json
{
	"scripts": {
		"build": "...",
		"check": "pnpm --parallel /check.*/",
		"check.format": "pnpm format --check ./",
		"check.lint.js-ts": "pnpm lint.js-ts ./",
		"check.lint.styles": "pnpm lint.styles '**/*.{css,scss,jsx,tsx}'",
		"check.types": "tsc --noEmit",
		"clean": "pnpm --parallel /clean.*/",
		"clean.caches": "jest --clear-cache && web-devdeps clean ./.caches/",
		"clean.deps": "web-devdeps clean ./node_modules/ ./package-lock.json",
		"format": "web-devdeps format",
		"fix": "pnpm --parallel /fix.*/",
		"fix.format": "pnpm format --write ./",
		"fix.lint.js-ts": "pnpm lint.js-ts --fix ./",
		"fix.lint.styles": "pnpm lint.styles --fix '**/*.{css,scss,jsx,tsx}'",
		"githooks.commit-msg": "web-devdeps githooks.commit-msg",
		"githooks.pre-commit": "web-devdeps githooks.pre-commit",
		"githooks.pre-push": "pnpm validate",
		"init": "git config core.hooksPath ./.githooks/ && pnpm install && pnpm validate",
		"lint.js-ts": "web-devdeps lint.js-ts",
		"lint.styles": "web-devdeps lint.styles",
		"test.unit": "web-devdeps test.unit",
		"test.unit.coverage": "pnpm test.unit --coverage",
		"test.unit.coverage-watch-all": "pnpm test.unit.coverage --watch-all",
		"test.unit.watch": "pnpm test.unit.coverage --watch",
		"validate": "pnpm build && pnpm check && pnpm test.unit.coverage"
	}
}
```

7. Create the `renovate.json` file:

```json
{
	"$schema": "https://docs.renovatebot.com/renovate-schema.json",
	"extends": ["github>dustin-ruetz/web-devdeps:renovate.json"]
}
```

8. (optional) If it's a TypeScript project, create the `tsconfig.json` file and make modifications as needed:

```json
{
	"extends": "./node_modules/web-devdeps/tsconfig.json",
	"include": ["./config/", "./src/"],
	"exclude": ["..."],
	"compilerOptions": {
		"outDir": "..."
	}
}
```

9. Try running the validation script:

```sh
pnpm validate
```

10. Remove any previous development dependencies and configuration files that are no longer needed now that they're being provided by the `web-devdeps` package:

```sh
pnpm remove --save-dev eslint jest prettier stylelint # (etc.)
```

</details>

#### Customizing Configurations

Similar to [`kcd-scripts`][kcd-scripts], this `web-devdeps` package defaults to supplying standardized configuration files for all of the development dependency tooling that it offers. Both packages also pass along any additional flags and arguments to their respective CLI scripts.

Where it diverges from the `kcd-scripts` approach is that it doesn't do any automatic detection of configuration files or config overrides based on the files that are present in the repo. This difference is _intentional_ in order to both 1) reduce code complexity, and 2) avoid any perceived attempts at "magic" (i.e. hiding key details instead of surfacing them to make it clearer as to what's happening).

So, in the scenario where a repo wants to both 1) use the `web-devdeps` CLI scripts, and 2) extend its built-in configurations and customize them in order to suit the project's specific requirements, this can be achieved in a very straightforward and transparent way.

By way of example, here's how this package's ESLint configuration could be extended and customized:

<details>

1. Create the `config/eslint.config.js` file (note that the directory, filename and extension are all arbitrary; it can be located anywhere, it can be named anything, it can be a ".mjs" file, etc.) and customize it:

```js
// Refer to the `https://github.com/dustin-ruetz/web-devdeps/blob/main/src/exports.ts` file
// for the full list of `make*Config` functions that this package offers.
import {makeESLintConfig} from "web-devdeps";

export default [
	...(await makeESLintConfig()),
	{
		rules: {
			// Note: This rule is configured to `"warn"` by default.
			"no-console": "error",
		},
	},
];
```

2. Modify the following two files so that they point to the custom `config/eslint.config.js` file:

A. `.vscode/settings.json`

```json
{
	"eslint.options": {
		"overrideConfigFile": "config/eslint.config.js"
	}
}
```

B. `package.json`

```json
{
	"scripts": {
		"lint.js-ts": "web-devdeps lint.js-ts --config ./config/eslint.config.js"
	}
}
```

3. In VS Code, restart the ESLint server or reload the window.

4. Open a JS or TS file, add a `console.log()` statement to it, then verify that both the ESLint IDE extension and the `lint.js-ts` script report the file as having the `no-console` error.

As a final related note on providing transparency and avoiding "magic", this is also why the package's CLI scripts include their paths and flags (both the built-in ones that are automatically added, as well as any additional passed flags) in the terminal output when they're run. In this example, executing the `lint.js-ts` script will produce the following output:

```txt
pnpm lint.js-ts ./src/no-console.ts

> the-project@1.0.0 lint.js-ts
> web-devdeps lint.js-ts --config ./config/eslint.config.js ./src/no-console.ts

📚 eslint command being run (as generated by ./node_modules/web-devdeps/lib/scripts/runCLI.js):
> eslint --config ./config/eslint.config.js --cache --cache-location ./.caches/.eslintcache ./src/no-console.ts

/Users/username/repos/the-project/src/no-console.ts
  1:1  error  Unexpected console statement  no-console

✖ 1 problem (1 error, 0 warnings)

📚 eslint terminated with non-zero exit code 1.
```

</details>

### Local Development

Note that [`fnm`](https://github.com/Schniz/fnm) (Fast Node Manager) can be installed and configured to automatically switch to the Node.js version number specified in the [`.node-version`](./.node-version) file.

Start by initializing the repo for local development:

1. Clone the repository and `cd` into it.
1. Execute the `pnpm run init` command in order to:
   1. Configure Git hooks;
   1. Install dependencies; and
   1. Validate the codebase.

Below is a list of the most useful scripts in alphabetical order (execute the `pnpm run` command to print the full list):

```sh
# Compile the codebase (from src/*.ts to lib/*.js).
pnpm build

# Check the codebase for problems (formatting, linting and typechecking).
pnpm check

# Compile the codebase and recompile the output whenever the source changes.
pnpm dev

# Check the codebase for problems and automatically fix them where possible (formatting and linting).
pnpm fix

# Run the unit tests in various modes.
pnpm test.unit
pnpm test.unit.coverage
pnpm test.unit.coverage-watch-all
pnpm test.unit.watch

# Run the full validation suite (🛠️ build, 🧐 check, 🧪 test).
pnpm validate
```

Note that [`act`](https://nektosact.com) can be used to locally test the GitHub Actions workflow files located in [`.github/workflows/`](.github/workflows/) as well:

```sh
# Simulate a dry-run release in the CI/CD context.
pnpm github.release

# Simulate the full validation suite running in the CI/CD context.
pnpm github.validate
```

[kcd-scripts]: https://github.com/kentcdodds/kcd-scripts
