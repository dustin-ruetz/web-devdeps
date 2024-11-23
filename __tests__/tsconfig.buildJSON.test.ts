import tsconfigBuildJSON from "../tsconfig.build.json";

test("it is a configuration object and the most important config options are correct", () => {
	expect(typeof tsconfigBuildJSON).toBe("object");

	expect(tsconfigBuildJSON.extends).toBe("./tsconfig.json");
	expect(tsconfigBuildJSON.exclude).toStrictEqual([
		"**/*.mock.*",
		"**/*.test.*",
	]);

	const {compilerOptions} = tsconfigBuildJSON;
	expect(compilerOptions.declaration).toBe(true);
	expect(compilerOptions.noEmitOnError).toBe(true);
	expect(compilerOptions.outDir).toBe("./lib/");
	expect(compilerOptions.removeComments).toBe(true);
});
