# @dustin-ruetz/devdeps

Package that provides development dependencies and standardized configurations for other JavaScript/TypeScript projects (both web and Node.js) to consume.

## Purpose

`@dustin-ruetz/devdeps` provides `devDependencies` and configuration files for:

- Building and typechecking using [`typescript`](https://www.typescriptlang.org).
- Cleaning using [`rimraf`](https://github.com/isaacs/rimraf).
- Formatting using [`prettier`](https://prettier.io).
- Linting using [`eslint`](https://eslint.org) for JavaScript and TypeScript.
- Linting using [`stylelint`](https://stylelint.io) for CSS/SCSS/JSX/TSX (the latter two file types being relevant for "CSS-in-JS" solutions like `styled-components`).
- Releasing using [`semantic-release`](https://semantic-release.gitbook.io/semantic-release).
- Testing using [`jest`](https://jestjs.io) for unit and integration tests.
- Validating commit messages using [`commitlint`](https://commitlint.js.org).
- Validating the codebase prior to any changes being committed using [`lint-staged`](https://github.com/lint-staged/lint-staged) and [`husky`](https://typicode.github.io/husky) Git hooks.

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

1. Use `npx` to execute this package's `init-repo` script to write the initial files needed for web-/Node.js-based projects when creating a new Git repository. Pass the `--help` flag to print the documentation for the command:

   ```sh
   npx @dustin-ruetz/devdeps init-repo --help
   ```

2. Execute `npm install` to install the version of this `@dustin-ruetz/devdeps` package listed in the written `package.json` file.

3. Execute `npm run fix/format` to automatically format all of the written files.

4. Note how the key files (`package.json`, `README.md`, `tsconfig.json`, etc.) and folders (`.githooks/`, `.vscode/`) have all been initialized. Open each file and make changes as needed.

### Local Development

Note that [`fnm`](https://github.com/Schniz/fnm) (Fast Node Manager) can be installed and configured to automatically switch to the Node.js version number specified in the [`.node-version`](./.node-version) file.

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

Note that [`act`](https://nektosact.com) can be used to locally test the GitHub Actions workflow files located in [`.github/workflows/`](.github/workflows/) as well:

```sh
# Simulate a dry-run release in the CI/CD context.
npm run .github/release

# Simulate the full suite of validation checks in the CI/CD context.
npm run .github/validate
```
