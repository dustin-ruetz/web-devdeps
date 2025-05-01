import tsconfigJSON from "../tsconfig.json" with {type: "json"};

test("it is a configuration object and the most important config options are correct", () => {
	expect(typeof tsconfigJSON).toBe("object");

	// https://github.com/tsconfig/bases/blob/main/bases/strictest.json
	expect(tsconfigJSON.extends).toBe("@tsconfig/strictest/tsconfig.json");
	expect(tsconfigJSON.include).toStrictEqual(["./__tests__/", "./src/"]);

	const {compilerOptions} = tsconfigJSON;
	expect(compilerOptions.declaration).toBe(true);
	expect(compilerOptions.erasableSyntaxOnly).toBe(true);
	expect(compilerOptions.module).toBe("NodeNext");
	expect(compilerOptions.resolveJsonModule).toBe(true);
	expect(compilerOptions.rewriteRelativeImportExtensions).toBe(true);
	expect(compilerOptions.verbatimModuleSyntax).toBe(true);

	// Excerpt from https://www.typescriptlang.org/tsconfig/#lib:
	// > You may want to change these for a few reasons:
	// > - Your program doesn’t run in a browser, so you don’t want the `"dom"` type definitions
	//
	// Paraphrased excerpt from https://www.totaltypescript.com/tsconfig-cheat-sheet#not-running-in-the-dom:
	// > If your code _doesn't_ run in the DOM, you'll want `lib: ["es20yy"]`.
	// > This excludes the `dom` and `dom.iterable` typings.
	const [lib] = compilerOptions.lib;
	const {target} = compilerOptions;
	expect(lib).toBe("ES2024");
	expect(target).toBe("ES2024");
	expect(lib).toBe(target);
});
