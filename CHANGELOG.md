# CHANGELOG

## [1.4.1](https://github.com/dustin-ruetz/devdeps/compare/v1.4.0...v1.4.1) (2024-08-17)

### Bug Fixes

* **dependencies:** update packages to latest versions ([d8f5437](https://github.com/dustin-ruetz/devdeps/commit/d8f54372956d8de71ae3d670ea66b46fda20bf51))
* **scripts/helpers/initRepoHelpers:** format 'package.json' + '.vscode/settings.json' files w/ tabs ([a8e4fca](https://github.com/dustin-ruetz/devdeps/commit/a8e4fca18a1d3180f7b9a6bdcc572933572358ea))

## [1.4.0](https://github.com/dustin-ruetz/devdeps/compare/v1.3.1...v1.4.0) (2024-08-17)

### Features

* upgrade ESLint from v8 to v9 ([#52](https://github.com/dustin-ruetz/devdeps/issues/52)) ([6246dba](https://github.com/dustin-ruetz/devdeps/commit/6246dba9dfd60b014abfa0c38aa101fac67aca35))

## [1.3.1](https://github.com/dustin-ruetz/devdeps/compare/v1.3.0...v1.3.1) (2024-08-15)

### Bug Fixes

* **dependencies:** update packages to latest versions ([92017b8](https://github.com/dustin-ruetz/devdeps/commit/92017b80c0eb5b65db9fc22a59a73aba17dc77f7))
* **jest.config:** modify '@swc/jest' config to handle JSX/TSX files when testing React components ([89c1de1](https://github.com/dustin-ruetz/devdeps/commit/89c1de1d5da45773c8a7d92815dac6f7243e1a60))

## [1.3.0](https://github.com/dustin-ruetz/devdeps/compare/v1.2.0...v1.3.0) (2024-08-13)

### Features

* **.gitignore:** ignore '_/' underscore directory ([a95a181](https://github.com/dustin-ruetz/devdeps/commit/a95a1810a88184836f1d36b9691b231678347b33))
* **package.json:** add 'init-repo' NPM script for purposes of local development/testing ([239881f](https://github.com/dustin-ruetz/devdeps/commit/239881fa1a77848704d767ae8fe8ca6149b9ebee))
* **package.json:** add 'test/unit/coverage-watchAll' NPM script ([eded75a](https://github.com/dustin-ruetz/devdeps/commit/eded75a9f760ceece437137d5e2615476411a60d))
* **scripts/helpers/getRootPaths:** initial 'getRootPaths' function and unit test ([1ef08e1](https://github.com/dustin-ruetz/devdeps/commit/1ef08e1d79bdbde695e36f5019cca07fe182937e))
* **scripts/helpers/initRepoHelpers:** initial 'initRepoHelpers' functions and unit tests ([7188eb4](https://github.com/dustin-ruetz/devdeps/commit/7188eb416690712b3ef99aa2dfc3dc504e2c0462))
* **scripts/helpers/semVerRegExp:** initial 'semVerRegExp' function and unit test ([d1d1010](https://github.com/dustin-ruetz/devdeps/commit/d1d1010d71cc95ae036788ea4387d31b19973fa5))
* **scripts/initRepo:** initial 'initRepo' function and unit tests ([6abee1a](https://github.com/dustin-ruetz/devdeps/commit/6abee1aaf9852001632e1ca8698f913c71a04584))
* **src/index:** add 'eslint sort-keys' code comment to ensure alphabetical 'scripts' object keys ([b8e1532](https://github.com/dustin-ruetz/devdeps/commit/b8e1532fff8f753b4002b9fc3dbf02a712f0080f))
* **src/index:** initial 'runScript' index and unit tests ([f5bfcec](https://github.com/dustin-ruetz/devdeps/commit/f5bfcec796527f40308ace5541df35ffc3a222ef))

### Bug Fixes

* add 'v8 ignore next #' comments to work around erroneous 'Uncovered Line [#s](https://github.com/dustin-ruetz/devdeps/issues/s)' errors ([5295eef](https://github.com/dustin-ruetz/devdeps/commit/5295eef607ecda32f33bea4f03506aec843b7ea1))
* add 'v8 ignore next #' comments to work around erroneous 'Uncovered Line [#s](https://github.com/dustin-ruetz/devdeps/issues/s)' errors ([b36eaaf](https://github.com/dustin-ruetz/devdeps/commit/b36eaaff8190c02d55ecdf31fe23101418180cc3))
* change output path of 'init-repo' script (from '_/' to '.initRepoScriptTestOutput/') ([47ee350](https://github.com/dustin-ruetz/devdeps/commit/47ee350859f01f6864cfdf392edf92770fd02e13))
* **dependencies:** update husky to latest version ([c9e80a9](https://github.com/dustin-ruetz/devdeps/commit/c9e80a9c07394776ff5769a52bbfb98baddaa3ea))
* **dependencies:** update packages to latest versions ([8087b39](https://github.com/dustin-ruetz/devdeps/commit/8087b397de124f0f45119dabebd78b0357d20cc8))
* **eslint.config:** remove unnecessary 'no-undefined': 'error' rule ([d69f209](https://github.com/dustin-ruetz/devdeps/commit/d69f20931988f6397115a565a3ea3264ae7e03b0))
* **package.json:** improve format of 'repository.url' value ([d4e0d77](https://github.com/dustin-ruetz/devdeps/commit/d4e0d7778133629039851526ef4d318ea3ad2f35))
* **utils/dependsOn:** explicitly check if 'dep' is an empty string ([60fd183](https://github.com/dustin-ruetz/devdeps/commit/60fd183f432ebfcb13f8299100d3d30a5d32037c))

## [1.2.0](https://github.com/dustin-ruetz/devdeps/compare/v1.1.0...v1.2.0) (2024-08-01)

### Features

* include '.node-version' file in published NPM package ([c3bc22f](https://github.com/dustin-ruetz/devdeps/commit/c3bc22faba825e16e471696b26bad9aec59c1c69))

## [1.1.0](https://github.com/dustin-ruetz/devdeps/compare/v1.0.2...v1.1.0) (2024-07-25)

### Features

* **.githooks/_/husky:** prefix error message with 'ERR_HUSKY' code ([1bcdcd2](https://github.com/dustin-ruetz/devdeps/commit/1bcdcd2461ccac4ce05699d128a6a59b11c91197))
* **eslint.config:** turn off 'no-unused-vars' in favor of 'typescript-eslint/no-unused-vars' ([d6f949e](https://github.com/dustin-ruetz/devdeps/commit/d6f949e17b2dd4a909c7cb1bd804af06b42b34a5))

### Bug Fixes

* **dependencies:** update packages to latest versions ([3f66286](https://github.com/dustin-ruetz/devdeps/commit/3f6628678cbf7a789c88b050c874a3e70d93fccf))

## [1.0.2](https://github.com/dustin-ruetz/devdeps/compare/v1.0.1...v1.0.2) (2024-06-24)

### Bug Fixes

* **dependencies:** update packages to latest versions ([4092f6b](https://github.com/dustin-ruetz/devdeps/commit/4092f6b5a4a3e6d3f14174c569fff3ffa850be82))

## [1.0.1](https://github.com/dustin-ruetz/devdeps/compare/v1.0.0...v1.0.1) (2024-06-19)

### Bug Fixes

* npm audit issue(s) ([2f31aa6](https://github.com/dustin-ruetz/devdeps/commit/2f31aa67e52cea5f17e16593e0c507a9a5787a1c))

## 1.0.0 (2024-06-19)

### Features

* initial release of devdeps package
