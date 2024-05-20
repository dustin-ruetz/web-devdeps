import tsconfigBuildJSON from "../tsconfig.build.json";

test("it is a configuration object and the most important config options are correct", () => {
	expect(typeof tsconfigBuildJSON).toEqual("object");

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
