# @dustin-ruetz/devdeps

Package that provides development dependencies and standardized configurations for other JavaScript/TypeScript projects (both web and Node.js) to consume.

## Purpose

`@dustin-ruetz/devdeps` provides `devDependencies` and configuration files for:

- Building and typechecking using `typescript`.
- Cleaning using `rimraf`.
- Formatting using `prettier`.
- Linting using `eslint` for JS/TS and `stylelint` for CSS/SCSS/JSX/TSX (the latter two being relevant for "CSS-in-JS" solutions like `styled-components`).
- Releasing using `semantic-release`.
- Testing using `jest` for unit and integration tests.
- Validating commit messages using `commitlint`.
- Validating the codebase prior to any changes being committed using `lint-staged` and `husky` Git hooks.

Additional details:

- The idea for this package was inspired by Kent C. Dodds' [kcd-scripts](https://github.com/kentcdodds/kcd-scripts) CLI toolbox, with a key difference being the preference for a fully-TypeScript codebase using modern ES Module syntax.
- This project bootstraps and dogfoods its own configuration files by 1) using `tsc` to compile the `src/` directory's `*.ts` files to the `lib/` directory's `*.js` files, and 2) pointing all config paths to the compiled `lib/\*.js` files.

## Usage and Development

Prerequisite: The following instructions assume that [Node.js](https://nodejs.org/en/download) is installed, which includes [NPM](https://www.npmjs.com).

### Usage in Projects

Note that `@dustin-ruetz/devdeps` requires the project to have the following commonly-used folder/file structure:

```text
// Created using the `Shinotatwu-DS.file-tree-generator` extension for Visual Studio Code.
📂 the-project
┣ 📂 node_modules
┃ ┗ 📂 @dustin-ruetz/devdeps
┃ ┃ ┗ 📂 lib
┃ ┃ ┃ ┗ 📄 *.config.js
┃ ┃ ┗ 📄 tsconfig.json
┗ 📄 package.json
┗ 📄 tsconfig.json
```

Start by installing the package as a development dependency:

```sh
npm install --save-dev @dustin-ruetz/devdeps
```

Then make the following changes:

1. Modify the `scripts` object in the project's `package.json` file depending on the CLI tools that are needed. The simplest way to do this is to copy the `scripts` from this repo's `package.json` file and then update the configuration file paths. Here's an example:

   ```json
   // package.json
   {
   	"scripts": {
   		".githooks/commit-msg": "commitlint --config ./node_modules/@dustin-ruetz/devdeps/lib/commitlint.config.js --edit",
   		".githooks/pre-commit": "lint-staged --config ./node_modules/@dustin-ruetz/devdeps/lib/lint-staged.config.js --relative",
   		"format": "prettier --config ./node_modules/@dustin-ruetz/devdeps/lib/prettier.config.js --ignore-path ./.gitignore",
   		"lint/js-ts": "eslint --config ./node_modules/@dustin-ruetz/devdeps/lib/eslint.config.cjs --ignore-path ./.gitignore",
   		"lint.styles": "stylelint --config ./node_modules/@dustin-ruetz/devdeps/lib/stylelint.config.js --ignore-path ./.gitignore",
   		"test/unit": "jest --config ./node_modules/@dustin-ruetz/devdeps/lib/jest.config.js"
   	}
   }
   ```

1. Modify the `extends` value in the project's `tsconfig.json` file:

   ```json
   // tsconfig.json
   {
   	"extends": "./node_modules/@dustin-ruetz/devdeps/tsconfig.json"
   }
   ```

1. Modify (or create) the project's three `.githooks/` files (`commit-msg`, `pre-commit` and `pre-push`) and have them call the Git hooks in this `devdeps` repo directly. Here's the `.githooks/commit-msg` file as an example:

   ```sh
   #!/usr/bin/env sh
   ./node_modules/@dustin-ruetz/devdeps/.githooks/_/commit-msg
   ```

1. Modify (or create) the project's `.vscode/settings.json` file depending on the VS Code extensions that are needed. For example:

   ```json
   // .vscode/settings.json
   {
   	// https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
   	"eslint.options": {
   		"overrideConfigFile": "node_modules/@dustin-ruetz/devdeps/lib/eslint.config.cjs",
   		"ignorePath": ".gitignore"
   	},
   	// https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
   	"prettier.configPath": "node_modules/@dustin-ruetz/devdeps/lib/prettier.config.js",
   	"prettier.ignorePath": ".gitignore",
   	// https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint
   	"stylelint.configFile": "node_modules/@dustin-ruetz/devdeps/lib/stylelint.config.js",
   	"stylelint.validate": ["css", "javascriptreact", "scss", "typescriptreact"]
   }
   ```

### Local Development

Start by initializing the repo for local development:

1. Clone the repository and `cd` into it.
1. Execute the `npm run init` command in order to:
   1. Configure Git hooks;
   1. Install dependencies; and
   1. Validate the codebase.

Below is a list of the most useful NPM scripts in alphabetical order (execute the `npm run` command to print the full list):

```sh
# Compile the codebase from src/*.ts to lib/*.js.
npm run build

# Check the codebase for problems (formatting, linting and typechecking).
npm run check

# Run all the `clean/*` scripts.
npm run clean

# Run the TypeScript compiler in "watch" mode.
npm run dev

# Check the codebase for problems and automatically fix them where possible (formatting and linting).
npm run fix

# Run the unit tests and collect code coverage.
npm run test/unit/coverage

# Run the unit tests in "watch" mode.
npm run test/unit/watch

# Run the full suite of validation checks (🛠️ build, 🧐 check, 🧪 test).
npm run validate
```

Note that [`act`]() can be used to locally test the GitHub Actions workflow files located in [`.github/workflows/`](.github/workflows/) as well:

```sh
# Simulate a dry-run release in the CI/CD context.
npm run .github/release

# Simulate the full suite of validation checks in the CI/CD context.
npm run .github/validate
```
