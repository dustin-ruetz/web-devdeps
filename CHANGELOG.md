# CHANGELOG

## [1.25.0](https://github.com/dustin-ruetz/devdeps/compare/v1.24.1...v1.25.0) (2024-11-23)

### Features

* **tsconfig.build.json:** set 'declaration: true' in order to emit '.d.ts' files ([519f15d](https://github.com/dustin-ruetz/devdeps/commit/519f15d78b3ebcee88ff7457557f8062ee9ab8eb))

### Bug Fixes

* **config/eslint:** specify return type from 'makeESLintConfig' function ([b2e0ff4](https://github.com/dustin-ruetz/devdeps/commit/b2e0ff43d5b96c3d15b1eb68fc034f295d302ae8))
* **config:** standardize all configuration files to export 'make' functions ([cc94689](https://github.com/dustin-ruetz/devdeps/commit/cc9468924a848d29d3bcd039883aca8134c5cd1d))
* **exports:** simplify package's exports file ([cafc6d9](https://github.com/dustin-ruetz/devdeps/commit/cafc6d90111be6d649da825732b40bf2f22d30c6))
* **utils/CustomError:** allow error 'name' to be any string ([dfa0207](https://github.com/dustin-ruetz/devdeps/commit/dfa020760d608b9665cdb5df8ecebe12ddb1aa07))

## [1.24.1](https://github.com/dustin-ruetz/devdeps/compare/v1.24.0...v1.24.1) (2024-11-20)

### Bug Fixes

* **🤖 dependencies:** update dependencies (non-major versions) ([#68](https://github.com/dustin-ruetz/devdeps/issues/68)) ([9949d09](https://github.com/dustin-ruetz/devdeps/commit/9949d09e70905d3d9ccc24a48e74d9fc7bb21630))

## [1.24.0](https://github.com/dustin-ruetz/devdeps/compare/v1.23.0...v1.24.0) (2024-11-20)

### Features

* **package-lock.json:** update 'lockfileVersion' (from 2 to 3) ([7c3ef68](https://github.com/dustin-ruetz/devdeps/commit/7c3ef682b6841d9fdf339f773f93b6be1c179e15))

### Bug Fixes

* **dependencies:** update 'husky' to latest version ([4db3247](https://github.com/dustin-ruetz/devdeps/commit/4db32476b5d09f95123d3ffa251a92f178f0fc7f))
* **package-lock.json:** rebuild lockfile ([a11e039](https://github.com/dustin-ruetz/devdeps/commit/a11e039ffce7c5e980f5ed1bac959a1551b3e1ed))

## [1.23.0](https://github.com/dustin-ruetz/devdeps/compare/v1.22.0...v1.23.0) (2024-11-17)

### Features

* **tsconfig:** change 'compilerOptions.target' to 'ES2023' ([019e7e6](https://github.com/dustin-ruetz/devdeps/commit/019e7e62ddfbfe3e07216ee8267452a5b629f0c0))

## [1.22.0](https://github.com/dustin-ruetz/devdeps/compare/v1.21.0...v1.22.0) (2024-11-17)

### Features

* **config/jest:** lower 'coverageThreshold' targets and remove 'v8 ignore' code comments ([2280e03](https://github.com/dustin-ruetz/devdeps/commit/2280e038dc61c154e7344d30cf942b4f41c1202a))
* run 'clean/caches' command as part of 'validate' ([56434ca](https://github.com/dustin-ruetz/devdeps/commit/56434caf5d8891e73a06812f38135cc756fb8d07))
* **utils/getAbsoluteRepoRootPath:** simplify code with 'URL()' and a relative path ([30c9f21](https://github.com/dustin-ruetz/devdeps/commit/30c9f210bf09b3fd92ca855218d5b551a5452850))

## [1.21.0](https://github.com/dustin-ruetz/devdeps/compare/v1.20.0...v1.21.0) (2024-11-15)

### Features

* **config/lint-staged.config:** remove '--collectCoverageFrom' flag from unit test command ([e1e4a17](https://github.com/dustin-ruetz/devdeps/commit/e1e4a1729e0a66071aa2e8b4f1db6519b0af0820))

### Bug Fixes

* **dependencies:** update packages to latest versions ([0b9a8c4](https://github.com/dustin-ruetz/devdeps/commit/0b9a8c4d6c34202488e9dc2c982d3c7f948d4337))
* **exports:** change object from namespaced export to default export ([1e61a33](https://github.com/dustin-ruetz/devdeps/commit/1e61a330690add3e0a12e8d7ea515af9e0083d46))

## [1.20.0](https://github.com/dustin-ruetz/devdeps/compare/v1.19.0...v1.20.0) (2024-11-06)

### Features

* **modules.d.ts:** improve type declarations for 'eslint-plugin' packages ([8fd2807](https://github.com/dustin-ruetz/devdeps/commit/8fd2807bc9ff1a33f4af93e770d1bb3dcc64b662))

### Bug Fixes

* **dependencies:** update packages to latest versions ([864dff7](https://github.com/dustin-ruetz/devdeps/commit/864dff7a3354d05a10360909d3a75064ecaa7b30))
* **types.d.ts:** specify that 'PackageJsonTypes.files' is an array of strings ([93808c5](https://github.com/dustin-ruetz/devdeps/commit/93808c5ae6cd89bd6c4dadf2b78db02ef914a10d))
* upgrade 'eslint-plugin-jest' to latest version and remove manual type declarations ([bf26269](https://github.com/dustin-ruetz/devdeps/commit/bf26269e91e91570151b32023ac1234dc347b261))

## [1.19.0](https://github.com/dustin-ruetz/devdeps/compare/v1.18.0...v1.19.0) (2024-11-03)

### Features

* **.node-version:** use Node.js v22 now that it's entered LTS status ([82af488](https://github.com/dustin-ruetz/devdeps/commit/82af488aa8ea97512320a8f130968f35fce95ad3))

## [1.18.0](https://github.com/dustin-ruetz/devdeps/compare/v1.17.2...v1.18.0) (2024-11-03)

### Features

* **config/eslint:** add 'jsx-a11y' and 'react-hooks' ESLint plugins ([50ab7f8](https://github.com/dustin-ruetz/devdeps/commit/50ab7f8fbe75815fbfd441dfbb2f5ad2043e0936))
* **modules.d.ts:** remove manual declaration of '@eslint/js' since it now provides its own types ([5663c3e](https://github.com/dustin-ruetz/devdeps/commit/5663c3e67917da226293fb334892fd87157a4054))

### Bug Fixes

* **dependencies:** update ESLint-related packages to latest versions ([2bf34c5](https://github.com/dustin-ruetz/devdeps/commit/2bf34c523343d9c4272a4fe038cf39df1c78a8ce))
* **dependencies:** update packages to latest versions ([db28c52](https://github.com/dustin-ruetz/devdeps/commit/db28c52031c981f76bcf472db75c0544dd208406))
* **dependencies:** update packages to latest versions ([9663230](https://github.com/dustin-ruetz/devdeps/commit/966323057d0913990f68c5ce3c420f7750d5c678))

## [1.17.2](https://github.com/dustin-ruetz/devdeps/compare/v1.17.1...v1.17.2) (2024-10-18)

### Bug Fixes

* **dependencies:** update packages to latest versions ([ac2099b](https://github.com/dustin-ruetz/devdeps/commit/ac2099b5135c5ef917d77e34ed60d4667a677156))

## [1.17.1](https://github.com/dustin-ruetz/devdeps/compare/v1.17.0...v1.17.1) (2024-10-16)

### Bug Fixes

* **dependencies:** update packages to latest versions ([a038338](https://github.com/dustin-ruetz/devdeps/commit/a038338b70b7d567601b7fc391d1898b144599e1))

## [1.17.0](https://github.com/dustin-ruetz/devdeps/compare/v1.16.1...v1.17.0) (2024-10-02)

### Features

* **config/eslint-plugins/jest:** initial configuration and unit test ([7268a05](https://github.com/dustin-ruetz/devdeps/commit/7268a05e007b6455ceadf7d2de8568926113c9e1))
* **config/eslint.config:** implement configuration for Jest plugin ([151f30c](https://github.com/dustin-ruetz/devdeps/commit/151f30cd9a88ba1443a26fba8296bedb43d8a4a1))
* **dependencies:** install the 'eslint-plugin-jest' package ([b263fdc](https://github.com/dustin-ruetz/devdeps/commit/b263fdcdf40c4a4a00e53e9ccf530b88868ebd15))

### Bug Fixes

* **.githooks/_/husky:** improve 'echo' logs ([dc47f6f](https://github.com/dustin-ruetz/devdeps/commit/dc47f6f530a55e80b35ce150bd8fbef0219dc085))
* **config/eslint-plugins/jest:** remove 'consistent-test-it' rule ([cae27fa](https://github.com/dustin-ruetz/devdeps/commit/cae27fa6160cfe86e7bbadedd9f4a2e6575137f5))
* **dependencies:** update packages to latest versions ([dff7de6](https://github.com/dustin-ruetz/devdeps/commit/dff7de6c30517ca790986aa83a3bb52e7396fdc8))
* errors identified in unit tests ([caf1953](https://github.com/dustin-ruetz/devdeps/commit/caf1953266192763a88354f0d9d99e116345ee54))
* **eslint:** update test files glob pattern to include mock files as well ([7c1cfde](https://github.com/dustin-ruetz/devdeps/commit/7c1cfdeea7b8bb02c737bfbf2f9e4aef9a218778))

## [1.16.1](https://github.com/dustin-ruetz/devdeps/compare/v1.16.0...v1.16.1) (2024-09-27)

### Bug Fixes

* **dependencies:** update packages to latest versions ([769279c](https://github.com/dustin-ruetz/devdeps/commit/769279c2cc6dd8cddf7a98f87de90ba80c8a0dc1))

## [1.16.0](https://github.com/dustin-ruetz/devdeps/compare/v1.15.0...v1.16.0) (2024-09-27)

### Features

* **config/eslint-plugins/jsdoc:** initial configuration and unit test ([18ecd0b](https://github.com/dustin-ruetz/devdeps/commit/18ecd0b8761e6f047bb53927b136c91db151159b))
* **config/eslint.config:** implement configuration for JSDoc plugin ([ff59db3](https://github.com/dustin-ruetz/devdeps/commit/ff59db3cb2e64b142526187f78c2a86474344834))
* **dependencies:** install the 'eslint-plugin-jsdoc' package ([4de3138](https://github.com/dustin-ruetz/devdeps/commit/4de3138195f261e1d81323a74e39953b6806300d))

### Bug Fixes

* errors identified in JSDoc code comments ([dcd9f7f](https://github.com/dustin-ruetz/devdeps/commit/dcd9f7f3fa65bb122fc83f3184a35e1e1556a446))

## [1.15.0](https://github.com/dustin-ruetz/devdeps/compare/v1.14.0...v1.15.0) (2024-09-25)

### Features

* change 'ValidationError' to 'CustomError' and make it more flexible/generic ([05f9613](https://github.com/dustin-ruetz/devdeps/commit/05f9613bdb7965689bd2cab57b6d6e08f539df8e))
* **utils/CustomError:** throw errors if 'code' or 'name' strings are invalid ([dae5701](https://github.com/dustin-ruetz/devdeps/commit/dae57013a8fe023c4e8d6c08d790dd130caedd6a))

### Bug Fixes

* **utils/CustomError:** clarify error message when error 'code' contains lowercase characters ([9a9907e](https://github.com/dustin-ruetz/devdeps/commit/9a9907e82a2ecff75c5327d6e9df29c8246e3f97))
* **utils/CustomError:** work around erronerous 'uncovered line [#s](https://github.com/dustin-ruetz/devdeps/issues/s)' test coverage error ([84e9231](https://github.com/dustin-ruetz/devdeps/commit/84e9231e02542a29a7f9466e57d284e2daa86d7a))

## [1.14.0](https://github.com/dustin-ruetz/devdeps/compare/v1.13.1...v1.14.0) (2024-09-25)

### Features

* **config/eslint.config:** conditionally include 'globals.browser' and 'typescript-eslint' configurations ([5ac6768](https://github.com/dustin-ruetz/devdeps/commit/5ac67687fa13c7e7a891cd76f1cc1cb6f6a781c9))

### Bug Fixes

* **dependencies:** update packages to latest versions ([56d1497](https://github.com/dustin-ruetz/devdeps/commit/56d1497388485a20d9ae8fa90d934d2bea6a5a73))

## [1.13.1](https://github.com/dustin-ruetz/devdeps/compare/v1.13.0...v1.13.1) (2024-09-24)

### Bug Fixes

* **dependencies:** update packages to latest versions ([c15269a](https://github.com/dustin-ruetz/devdeps/commit/c15269a6c0fef475074be985501794217ed8beb5))

## [1.13.0](https://github.com/dustin-ruetz/devdeps/compare/v1.12.0...v1.13.0) (2024-09-21)

### Features

* initial exports file ([9b0843c](https://github.com/dustin-ruetz/devdeps/commit/9b0843ce8aa9f21df51ab74fb4c95ebb7151540f))
* **package.json:** initial 'dev/link' and 'dev/unlink' NPM helper scripts ([d20d86a](https://github.com/dustin-ruetz/devdeps/commit/d20d86a0c0161fcd6dfa1fdb9e4c63875372de97))

### Bug Fixes

* **package.json:** correct 'dev/unlink' NPM script ([ddbd5ad](https://github.com/dustin-ruetz/devdeps/commit/ddbd5ad7b2645e4b778f00ed5e61a8750c96fdf8))

## [1.12.0](https://github.com/dustin-ruetz/devdeps/compare/v1.11.0...v1.12.0) (2024-09-20)

### Features

* initial 'runCLI' script ([#62](https://github.com/dustin-ruetz/devdeps/issues/62)) ([b2d146f](https://github.com/dustin-ruetz/devdeps/commit/b2d146f4236ed8bc722c1fb9b61e1a6e205d53ff))

## [1.11.0](https://github.com/dustin-ruetz/devdeps/compare/v1.10.0...v1.11.0) (2024-09-20)

### Features

* **config/jest.config:** use 'makeCachePath' to set the value of 'cacheDirectory' ([9577158](https://github.com/dustin-ruetz/devdeps/commit/9577158f595997286e50ffc86b7de4166ff1fe23))
* **scripts/helpers/initRepoHelpers:** remove unneeded scripts and sort them in written package.json ([54cf42f](https://github.com/dustin-ruetz/devdeps/commit/54cf42ff4d74fd881f7867f5cf389b32d00de525))
* **utils/makeCachePath:** initial function and unit test ([4988c96](https://github.com/dustin-ruetz/devdeps/commit/4988c96812eb644d06650900c4446c60f9807f32))

### Bug Fixes

* correct misidentified 'Languages' percentages for repo on GitHub.com UI ([42d2f25](https://github.com/dustin-ruetz/devdeps/commit/42d2f2527d67ae9a4eebba016a57076edbca5aae))
* **dependencies:** update packages to latest versions ([c116313](https://github.com/dustin-ruetz/devdeps/commit/c11631376a26436044c24e5b2dc43336a859ee7d))

## [1.10.0](https://github.com/dustin-ruetz/devdeps/compare/v1.9.3...v1.10.0) (2024-09-14)

### Features

* **config/lint-staged.config:** do not pass untestable files to lint-staged unit test command ([25bde56](https://github.com/dustin-ruetz/devdeps/commit/25bde562065ae076e2eb009d932bbf66388234b1))

### Bug Fixes

* **declarations.d.ts:** improve '@eslint/js' type declaration ([4932808](https://github.com/dustin-ruetz/devdeps/commit/4932808c5bf2fa909fca4a17f00edfd737b668ad))
* rename shared types file (from 'types.ts' to 'types.d.ts') ([c35bcea](https://github.com/dustin-ruetz/devdeps/commit/c35bcea245b38f16709fe9729df674927eb0a53f))

## [1.9.3](https://github.com/dustin-ruetz/devdeps/compare/v1.9.2...v1.9.3) (2024-09-12)

### Bug Fixes

* **dependencies:** update '@prettier/plugin-pug' package to latest version ([1eeaa3c](https://github.com/dustin-ruetz/devdeps/commit/1eeaa3cd1b0376ac93927bda471f4695431b85e7))
* **dependencies:** update 'eslint' packages to latest versions ([12fd88b](https://github.com/dustin-ruetz/devdeps/commit/12fd88b444ab3a7bee309c3ba43bee837f7c7e2a))
* **dependencies:** update 'husky' to latest version ([7842c13](https://github.com/dustin-ruetz/devdeps/commit/7842c13ef0cffe27f7edc8d31ab0dd6e4f490f0b))
* **dependencies:** update 'typescript' package to latest version ([cc31f5a](https://github.com/dustin-ruetz/devdeps/commit/cc31f5a6225834dfd26126c801dadd727864ea64))
* **dependencies:** update packages to latest versions ([06cde88](https://github.com/dustin-ruetz/devdeps/commit/06cde88e6c17187e579906495cb1f97e09f805c6))

## [1.9.2](https://github.com/dustin-ruetz/devdeps/compare/v1.9.1...v1.9.2) (2024-09-04)

### Bug Fixes

* **dependencies:** update husky to latest version ([00f7b77](https://github.com/dustin-ruetz/devdeps/commit/00f7b77953578489ab63f6402013ba097c27ae2c))
* **dependencies:** update packages to latest versions ([644084a](https://github.com/dustin-ruetz/devdeps/commit/644084a4492401d06eb6a5508cddd4ea73db424b))

## [1.9.1](https://github.com/dustin-ruetz/devdeps/compare/v1.9.0...v1.9.1) (2024-08-30)

### Bug Fixes

* **dependencies:** update packages to latest versions ([f8148a5](https://github.com/dustin-ruetz/devdeps/commit/f8148a5ee016a63219227964803d0015ef5a8f6c))

## [1.9.0](https://github.com/dustin-ruetz/devdeps/compare/v1.8.0...v1.9.0) (2024-08-30)

### Features

* **config/lint-staged.config:** remove '.json' files from file extensions and simplify file ([61cad4b](https://github.com/dustin-ruetz/devdeps/commit/61cad4bf31f1a52ab1a6b87c69e1292b33edd343))

### Bug Fixes

* **dependencies:** update packages to latest versions ([f8eefd8](https://github.com/dustin-ruetz/devdeps/commit/f8eefd8849a88be7dfc821e8ba3c2485d6cec0f0))

## [1.8.0](https://github.com/dustin-ruetz/devdeps/compare/v1.7.0...v1.8.0) (2024-08-30)

### Features

* enable typed linting feature of `typescript-eslint` ([#59](https://github.com/dustin-ruetz/devdeps/issues/59)) ([4a0026d](https://github.com/dustin-ruetz/devdeps/commit/4a0026da15483df7946d530c0aa0404069f414be))

## [1.7.0](https://github.com/dustin-ruetz/devdeps/compare/v1.6.0...v1.7.0) (2024-08-28)

### Features

* **.actrc:** initial 'act' configuration file ([fa55478](https://github.com/dustin-ruetz/devdeps/commit/fa55478fe70aad9307e5281af1733ab487f9b301)), closes [/github.com/nektos/act/issues/2239#issuecomment-1979819940](https://github.com/dustin-ruetz//github.com/nektos/act/issues/2239/issues/issuecomment-1979819940)
* **package.json:** run 'npx jest --clearCache' command as part of 'clean/caches' NPM script ([0f1dfd5](https://github.com/dustin-ruetz/devdeps/commit/0f1dfd5b2f0284eb1c5c470257de24981a1a2b35))

### Bug Fixes

* correct 'getRootPaths' and rename test output folder for 'init-repo' script ([f7e5a39](https://github.com/dustin-ruetz/devdeps/commit/f7e5a3927b4a2e0c15f91c4a02997063601eb7f4))
* **dependencies:** update packages to latest versions ([db4b4fc](https://github.com/dustin-ruetz/devdeps/commit/db4b4fca6b4a978bb3ec46adec4c666fbd1ae269))
* npm audit issue(s) ([77125aa](https://github.com/dustin-ruetz/devdeps/commit/77125aa4603cad7e5d969cc862acab8109b144fc))

## [1.6.0](https://github.com/dustin-ruetz/devdeps/compare/v1.5.0...v1.6.0) (2024-08-22)

### Features

* **constants:** initial constants file and unit test ([aa391d8](https://github.com/dustin-ruetz/devdeps/commit/aa391d8f343c2f0eb69697a8bf297aac2e67799d))
* move all configuration files into dedicated 'config/' directory ([a81f942](https://github.com/dustin-ruetz/devdeps/commit/a81f9426dd3353fa4c432bb9584d5bf87f951f19))
* **utils/getIsDevDepsRepo:** initial function and unit test ([c5b77ca](https://github.com/dustin-ruetz/devdeps/commit/c5b77caa96700141b186c4b947c6c6840b15be3a))

### Bug Fixes

* add 'v8 ignore next #' comments to work around erroneous 'Uncovered Line [#s](https://github.com/dustin-ruetz/devdeps/issues/s)' errors ([83633c6](https://github.com/dustin-ruetz/devdeps/commit/83633c677fc046e7b33c9c733c0d162c685f03b4))
* **dependencies:** update packages to latest versions ([84e2d6c](https://github.com/dustin-ruetz/devdeps/commit/84e2d6c353c6b60a238912e004129d10ff0fd994))
* **scripts/helpers/getRootPaths:** switch from 'absoluteRootDir' to 'cwd' of Node.js process ([0035a1c](https://github.com/dustin-ruetz/devdeps/commit/0035a1cfe3cd4f72c6f8cff5ca9d2e2972f12af6))

## [1.5.0](https://github.com/dustin-ruetz/devdeps/compare/v1.4.1...v1.5.0) (2024-08-19)

### Features

* remove CommonJS (.cjs) and CommonTS (.cts) file extensions from Jest config ([#53](https://github.com/dustin-ruetz/devdeps/issues/53)) ([4d8d197](https://github.com/dustin-ruetz/devdeps/commit/4d8d1975d4a66b57bcb747dd58ac5e02cba8a4bc))

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
