import tsConfig from "../tsconfig.json";
import tsConfigCJS from "../tsconfig.cjs.json";

test("all tsconfig files export a configuration object", () => {
	const tsConfigs = [tsConfig, tsConfigCJS];
	tsConfigs.forEach((tsConfig) => {
		expect(typeof tsConfig).toMatch("object");
	});
});

test("the tsconfig file extends the @tsconfig/strictest configuration", () => {
	expect(tsConfig.extends).toMatch("@tsconfig/strictest/tsconfig.json");
});

test("the tsconfig CJS file extends the base configuration", () => {
	expect(tsConfigCJS.extends).toMatch("./tsconfig.json");
});

describe("the most important compilerOptions are correct for:", () => {
	test("tsconfig.json", () => {
		const {compilerOptions} = tsConfig;

		expect(compilerOptions.module).toMatch(/esnext/i);
		// Verify that `moduleResolution === "node"` to:
		// 1) prevent tsc from checking node_modules/, and
		// 2) allow for .ts/.tsx file imports without file extensions.
		expect(compilerOptions.moduleResolution).toMatch(/node/i);
		expect(compilerOptions.outDir).toMatch("./lib/");
		// Excerpt from https://www.typescriptlang.org/tsconfig#target on not using `"target": "esnext"`:
		// > The special `ESNext` value refers to the highest version your version of TypeScript supports.
		// > This setting should be used with caution, since it doesn't mean the same thing between
		// > different TypeScript versions and can make upgrades less predictable.
		expect(compilerOptions.target).not.toMatch(/esnext/i);
		expect(compilerOptions.verbatimModuleSyntax).toBe(true);
	});

	test("tsconfig.cjs.json", () => {
		const {compilerOptions} = tsConfigCJS;

		// Verify that `isolatedModules === true` due to setting `verbatimModuleSyntax === false`.
		expect(compilerOptions.isolatedModules).toBe(true);
		expect(compilerOptions.module).toMatch(/commonjs/i);
		// Verify that `verbatimModuleSyntax === false` to prevent the following error:
		// > TS1287: A top-level 'export' modifier cannot be used on value declarations
		// > in a CommonJS module when 'verbatimModuleSyntax' is enabled.
		expect(compilerOptions.verbatimModuleSyntax).toBe(false);
	});
});
