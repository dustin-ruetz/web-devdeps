import tsConfigBuild from "../tsconfig.build.json";

test("it exports a configuration object", () => {
	expect(typeof tsConfigBuild).toEqual("object");
});

test("the most important configuration options are correct", () => {
	expect(tsConfigBuild.extends).toEqual("./tsconfig.json");
	expect(tsConfigBuild.exclude).toStrictEqual(["**/*.mock.*", "**/*.test.*"]);

	const {compilerOptions} = tsConfigBuild;
	expect(compilerOptions.noEmitOnError).toBe(true);
	expect(compilerOptions.outDir).toEqual("./lib/");
	expect(compilerOptions.removeComments).toBe(true);
});
