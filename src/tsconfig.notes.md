# TypeScript configuration notes

```json
// tsconfig.json
// https://www.typescriptlang.org/tsconfig
// https://www.typescriptlang.org/tsconfig#root-fields
// https://github.com/tsconfig/bases
{
	// Excerpt from https://www.typescriptlang.org/tsconfig#include:
	// > Specifies an array of filenames or patterns to include in the program. These filenames
	// > are resolved relative to the directory containing the `tsconfig.json` file.
	"include": [
		// dotfiles must be included manually, otherwise TypeScript will ignore them.
		// TODO: Consider replacing "include" patterns with a flat "files" list.
	],
	// https://www.typescriptlang.org/tsconfig#compiler-options
	"compilerOptions": {}
	}
}
```
