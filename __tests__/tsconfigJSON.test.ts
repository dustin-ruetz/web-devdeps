import tsconfigJSON from "../tsconfig.json" with {type: "json"};

test("it is a configuration object and the most important config options are correct", () => {
	expect(typeof tsconfigJSON).toBe("object");

	// https://github.com/tsconfig/bases/blob/main/bases/strictest.json
	expect(tsconfigJSON.extends).toBe("@tsconfig/strictest/tsconfig.json");
	expect(tsconfigJSON.include).toStrictEqual(["./__tests__/", "./src/"]);

	const {compilerOptions} = tsconfigJSON;
	expect(compilerOptions.module).toBe("NodeNext");
	expect(compilerOptions.resolveJsonModule).toBe(true);
	expect(compilerOptions.rewriteRelativeImportExtensions).toBe(true);
	// Excerpt from https://www.typescriptlang.org/tsconfig#target on not using `"target": "esnext"`:
	// > The special `ESNext` value refers to the highest version your version of TypeScript supports.
	// > This setting should be used with caution, since it doesn't mean the same thing between
	// > different TypeScript versions and can make upgrades less predictable.
	expect(compilerOptions.target).not.toMatch(/esnext/i);
	expect(compilerOptions.target).toBe("ES2023");
	expect(compilerOptions.verbatimModuleSyntax).toBe(true);
});
