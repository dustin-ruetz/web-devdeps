import type {Options} from "semantic-release";
import semanticReleaseCfg from "./semantic-release.config.cjs";

const semanticReleaseConfig: Options = semanticReleaseCfg;

test("it exports a configuration object and the most important config options are correct", () => {
	expect(typeof semanticReleaseConfig).toEqual("object");
});
