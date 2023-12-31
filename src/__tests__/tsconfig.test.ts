import tsConfigBase from "../tsconfig.base.json";
import tsConfigCJS from "../tsconfig.cjs.json";
import tsConfigESM from "../tsconfig.esm.json";

test("all tsconfig files export a configuration object", () => {
	const tsConfigs = [tsConfigBase, tsConfigCJS, tsConfigESM];
	tsConfigs.forEach((tsConfig) => {
		expect(typeof tsConfig).toMatch("object");
	});
});

test("the tsconfig base file extends the @tsconfig/strictest configuration", () => {
	expect(tsConfigBase.extends).toMatch("@tsconfig/strictest/tsconfig.json");
});

test("the tsconfig CJS and ESM files extend the base configuration", () => {
	[tsConfigCJS, tsConfigESM].forEach((tsConfig) => {
		expect(tsConfig.extends).toMatch("./tsconfig.base.json");
	});
});

describe("the most important compilerOptions are correct for:", () => {
	test("tsconfig.base.json", () => {
		const {compilerOptions} = tsConfigBase;

		// Verify that `moduleResolution === "node"` to:
		// 1) prevent tsc from checking node_modules/, and
		// 2) allow for .ts/.tsx file imports without file extensions.
		expect(compilerOptions.moduleResolution).toMatch(/node/i);
		// Excerpt from https://www.typescriptlang.org/tsconfig#target on not using `"target": "esnext"`:
		// > The special `ESNext` value refers to the highest version your version of TypeScript supports.
		// > This setting should be used with caution, since it doesn't mean the same thing between
		// > different TypeScript versions and can make upgrades less predictable.
		expect(compilerOptions.target).not.toMatch(/esnext/i);
	});

	test("tsconfig.cjs.json", () => {
		const {compilerOptions} = tsConfigCJS;

		// Verify that `isolatedModules === true` due to setting `verbatimModuleSyntax === false`.
		expect(compilerOptions.isolatedModules).toBe(true);
		expect(compilerOptions.module).toMatch(/commonjs/i);
		expect(compilerOptions.outDir).toMatch("../lib/cjs/");
		// Verify that `verbatimModuleSyntax === false` to prevent the following error:
		// > TS1287: A top-level 'export' modifier cannot be used on value declarations
		// > in a CommonJS module when 'verbatimModuleSyntax' is enabled.
		expect(compilerOptions.verbatimModuleSyntax).toBe(false);
	});

	test("tsconfig.esm.json", () => {
		const {compilerOptions} = tsConfigESM;

		expect(compilerOptions.module).toMatch(/esnext/i);
		expect(compilerOptions.outDir).toMatch("../lib/esm/");
		expect(compilerOptions.verbatimModuleSyntax).toBe(true);
	});
});
