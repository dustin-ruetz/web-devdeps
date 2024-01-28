import type {Config} from "jest";
import jestConfig, {getTransformConfig} from "./jest.config.js";

/** Jest configuration specifically for running the tests on this `dr-devdeps` repository. */
const jestConfigDevDeps: Config = {
	...jestConfig,
	rootDir: "../",
	transform: getTransformConfig({isDevDepsJestConfig: true}),
};

export default jestConfigDevDeps;
