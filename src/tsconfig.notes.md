# TypeScript configuration notes

```json
// tsconfig.json
// https://www.typescriptlang.org/tsconfig
// https://www.typescriptlang.org/tsconfig#root-fields
// https://github.com/tsconfig/bases
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
	// https://www.typescriptlang.org/tsconfig#compiler-options
	"compilerOptions": {}
	}
}
```
