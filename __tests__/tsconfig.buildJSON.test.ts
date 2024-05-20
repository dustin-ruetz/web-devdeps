import tsconfigBuildJSON from "../tsconfig.build.json";

test("it exports a configuration object", () => {
	expect(typeof tsconfigBuildJSON).toEqual("object");
});

test("the most important configuration options are correct", () => {
	expect(tsconfigBuildJSON.extends).toEqual("./tsconfig.json");
	expect(tsconfigBuildJSON.exclude).toStrictEqual([
		"**/*.mock.*",
		"**/*.test.*",
	]);

	const {compilerOptions} = tsconfigBuildJSON;
	expect(compilerOptions.noEmitOnError).toBe(true);
	expect(compilerOptions.outDir).toEqual("./lib/");
	expect(compilerOptions.removeComments).toBe(true);
});
