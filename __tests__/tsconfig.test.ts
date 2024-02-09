import tsConfig from "../tsconfig.json";
import tsConfigCJS from "../tsconfig.cjs.json";

test("all tsconfig files export a configuration object", () => {
	const tsConfigs = [tsConfig, tsConfigCJS];
	tsConfigs.forEach((tsConfig) => {
		expect(typeof tsConfig).toEqual("object");
	});
});

test("the tsconfig file extends the @tsconfig/strictest configuration", () => {
	expect(tsConfig.extends).toEqual("@tsconfig/strictest/tsconfig.json");
});

test("the tsconfig CJS file extends the base configuration", () => {
	expect(tsConfigCJS.extends).toEqual("./tsconfig.json");
});

describe("the most important compilerOptions are correct for:", () => {
	test("tsconfig.json", () => {
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

	test("tsconfig.cjs.json", () => {
		const {compilerOptions} = tsConfigCJS;

		expect(compilerOptions.module).toEqual("CommonJS");
		expect(compilerOptions.moduleResolution).toEqual("Node10");
		// Verify that `verbatimModuleSyntax === false` to prevent the following error:
		// > TS1287: A top-level 'export' modifier cannot be used on value declarations
		// > in a CommonJS module when 'verbatimModuleSyntax' is enabled.
		expect(compilerOptions.verbatimModuleSyntax).toBe(false);
	});
});
