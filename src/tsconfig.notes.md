# TypeScript configuration notes

```json
// tsconfig.json
// https://www.typescriptlang.org/tsconfig
// https://www.typescriptlang.org/tsconfig#root-fields
{
	// Excerpt from https://www.typescriptlang.org/tsconfig#files:
	// > Specifies an allowlist of files to include in the program. An error occurs if any of the files can't be found.
	// > This is useful when you only have a small number of files and don't need to use
	// > a glob to reference many files. If you need that then use `include`.
	"files": [],
	// Excerpt from https://www.typescriptlang.org/tsconfig#include:
	// > Specifies an array of filenames or patterns to include in the program. These filenames
	// > are resolved relative to the directory containing the tsconfig.json file.
	"include": [
		// Note that dotfiles (even a TypeScript file like `.dotfile.ts`) must be
		// specified manually in `include` because tsc ignores them by default.
	],
	// Excerpt from https://www.typescriptlang.org/tsconfig#exclude:
	// > Specifies an array of filenames or patterns that should be skipped when resolving `include`.
	// >
	// > **Important:** `exclude` _only_ changes which files are included as a result of the `include` setting. A file
	// > specified by `exclude` can still become part of your codebase due to an `import` statement in your code,
	// > a `types` inclusion, a `/// <reference` directive, or being specified in the `files` list.
	// >
	// > It is not a mechanism that **prevents** a file from being included in
	// > the codebase - it simply changes what the `include` setting finds.
	"exclude": [],
	// https://www.typescriptlang.org/tsconfig#compiler-options
	"compilerOptions": {}
}
```
