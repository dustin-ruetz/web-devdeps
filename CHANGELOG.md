# CHANGELOG

## [1.8.0](https://github.com/dustin-ruetz/web-dev-deps/compare/v1.7.0...v1.8.0) (2024-06-03)


### Features

* **scripts/clean:** simplify 'clean' function and its associated unit test ([57c700d](https://github.com/dustin-ruetz/web-dev-deps/commit/57c700d4022b53e898bd4508582af0ea2b35fb97))

## [1.7.0](https://github.com/dustin-ruetz/web-dev-deps/compare/v1.6.0...v1.7.0) (2024-06-02)


### Features

* remove Vitest files and related code ([cbca928](https://github.com/dustin-ruetz/web-dev-deps/commit/cbca9282788175bca0f15949c693274d965cce34))


### Bug Fixes

* **dependencies:** update packages to latest versions ([9b4df9e](https://github.com/dustin-ruetz/web-dev-deps/commit/9b4df9e8546023f078fb39a6b663475780299dce))

## [1.6.0](https://github.com/dustin-ruetz/web-dev-deps/compare/v1.5.0...v1.6.0) (2024-05-29)


### Features

* **semantic-release.config:** change file format (from CommonJS to ES Module) ([24288f4](https://github.com/dustin-ruetz/web-dev-deps/commit/24288f40b31469c08424ad6d20ec970a9a5038db))


### Bug Fixes

* **dependencies:** update packages to latest versions ([cc8eb8d](https://github.com/dustin-ruetz/web-dev-deps/commit/cc8eb8d3ce4d5f735cefb65e27ec88440cf21d0d))

## [1.5.0](https://github.com/dustin-ruetz/web-dev-deps/compare/v1.4.1...v1.5.0) (2024-05-29)


### Features

* **package.json:** re-add 'validate' script ([a82f19d](https://github.com/dustin-ruetz/web-dev-deps/commit/a82f19d31590569c928c7ac55e40e445fc944fef))


### Bug Fixes

* **.github/check-and-test/action:** delete unused 'check-and-test' composite action ([1abcda9](https://github.com/dustin-ruetz/web-dev-deps/commit/1abcda9ac088b94a31baacab6d1cbda660d3e70d))
* **.github/setup/action:** remove 'build' script from 'setup' composite action ([a60e5da](https://github.com/dustin-ruetz/web-dev-deps/commit/a60e5da3056e00f1f1609bb19c580daa00b10c61))

## [1.4.1](https://github.com/dustin-ruetz/web-dev-deps/compare/v1.4.0...v1.4.1) (2024-05-28)


### Bug Fixes

* **semantic-release.config:** use 'Date.toISOString' for date time string in release commit message ([b7a853b](https://github.com/dustin-ruetz/web-dev-deps/commit/b7a853bd53221bbeba13d406fa8ccebaa31297ad))

## [1.4.0](https://github.com/dustin-ruetz/web-dev-deps/compare/v1.3.0...v1.4.0) (2024-05-28)


### Features

* **semantic-release.config:** add date time to release commit message ([15ad8d2](https://github.com/dustin-ruetz/web-dev-deps/commit/15ad8d25f04c93e8b751f592b7e7d3ca617aeed6))


### Bug Fixes

* **package.json:** remove '.node-version' from allowlisted files in published NPM package ([8db9a20](https://github.com/dustin-ruetz/web-dev-deps/commit/8db9a2072bb1ef196448f0023e0ad76d035edd14))

# [1.3.0](https://github.com/dustin-ruetz/web-dev-deps/compare/v1.2.2...v1.3.0) (2024-05-27)


### Bug Fixes

* replace 'postinstall' scripts with more appropriate 'prepublishOnly' hook ([d165ecd](https://github.com/dustin-ruetz/web-dev-deps/commit/d165ecdb6534bff1ba10021a1c45db10f4034ed7))


### Features

* **package.json:** ensure only allowlisted files and folders are included in published NPM package ([1f98429](https://github.com/dustin-ruetz/web-dev-deps/commit/1f9842925afc48c8154b58d9b31b9f72f49a556b))

## [1.2.2](https://github.com/dustin-ruetz/web-dev-deps/compare/v1.2.1...v1.2.2) (2024-05-24)


### Bug Fixes

* **dependencies:** update packages to latest versions ([#32](https://github.com/dustin-ruetz/web-dev-deps/issues/32)) ([27b7d1f](https://github.com/dustin-ruetz/web-dev-deps/commit/27b7d1f592949a16ac30ae0e1f81200a32149f0c))

## [1.2.1](https://github.com/dustin-ruetz/web-dev-deps/compare/v1.2.0...v1.2.1) (2024-05-24)


### Bug Fixes

* **.github/workflows/check-and-test:** simplify 'actions/checkout' config by removing 'fetch-depth' ([c7a7c72](https://github.com/dustin-ruetz/web-dev-deps/commit/c7a7c72cb25cdffbfe0f1413ee3f00ca8ddc747a))

# [1.2.0](https://github.com/dustin-ruetz/web-dev-deps/compare/v1.1.0...v1.2.0) (2024-05-24)


### Features

* **.vscode/extensions.json:** specify Visual Studio Code extensions recommended for this repo ([dbb412c](https://github.com/dustin-ruetz/web-dev-deps/commit/dbb412c0e1ff7cd115b30d52b75417a583a05609))

# [1.1.0](https://github.com/dustin-ruetz/web-dev-deps/compare/v1.0.6...v1.1.0) (2024-05-24)


### Features

* improve GitHub Actions workflows ([#31](https://github.com/dustin-ruetz/web-dev-deps/issues/31)) ([53f9fb2](https://github.com/dustin-ruetz/web-dev-deps/commit/53f9fb21510dfce5be3170dc43ac94b1c4cfb91e))

## [1.0.6](https://github.com/dustin-ruetz/web-dev-deps/compare/v1.0.5...v1.0.6) (2024-05-23)


### Bug Fixes

* **.gitignore:** add CHANGELOG.md file ([cde9751](https://github.com/dustin-ruetz/web-dev-deps/commit/cde975114db1df1b4b9421e6e7739f4fbcb6f1d0))
* **CHANGELOG.md:** remove extraneous 'CHANGELOG' term ([02c97a1](https://github.com/dustin-ruetz/web-dev-deps/commit/02c97a191c4cf92c4a4b4bd26cdc687a8f6ec685))

## [1.0.5](https://github.com/dustin-ruetz/web-dev-deps/compare/v1.0.4...v1.0.5) (2024-05-23)


### Bug Fixes

* **semantic-release.config:** set changelog title as a Markdown H1 tag ([e8f9273](https://github.com/dustin-ruetz/web-dev-deps/commit/e8f9273e67a8dd7ecbc2fdfafd141e16f325b983))

## [1.0.4](https://github.com/dustin-ruetz/web-dev-deps/compare/v1.0.3...v1.0.4) (2024-05-22)


### Bug Fixes

* **package.json:** set 'publishConfig.access' to 'public' ([#30](https://github.com/dustin-ruetz/web-dev-deps/issues/30)) ([1dcfb9a](https://github.com/dustin-ruetz/web-dev-deps/commit/1dcfb9a7537dce42d8594b7fb8c1f2a40e731f41))
