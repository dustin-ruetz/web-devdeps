import tsConfig from "../tsconfig.json";

test("it exports a configuration object", () => {
	expect(typeof tsConfig).toEqual("object");
});

test("the most important configuration options are correct", () => {
	expect(tsConfig.extends).toEqual("@tsconfig/strictest/tsconfig.json");
	expect(tsConfig.include).toStrictEqual(["./src/"]);

	const {compilerOptions} = tsConfig;
	expect(compilerOptions.module).toEqual("NodeNext");
	expect(compilerOptions.moduleResolution).toEqual("NodeNext");
	expect(compilerOptions.outDir).toEqual("./lib/");
	// Excerpt from https://www.typescriptlang.org/tsconfig#target on not using `"target": "esnext"`:
	// > The special `ESNext` value refers to the highest version your version of TypeScript supports.
	// > This setting should be used with caution, since it doesn't mean the same thing between
	// > different TypeScript versions and can make upgrades less predictable.
	expect(compilerOptions.target).not.toMatch(/esnext/i);
	expect(compilerOptions.target).toEqual("ES2022");
	expect(compilerOptions.verbatimModuleSyntax).toBe(true);
});
