// **Important:** This file is CommonJS because Jest fails to parse it as an ES module.

// Excerpt from https://github.com/testing-library/jest-dom/releases/tag/v6.0.0:
// > Users can now use the following import paths to automatically
// > extend "expect" for their chosen test platform:
// >
// > - @testing-library/jest-dom - jest (@types/jest)
// > - @testing-library/jest-dom/jest-globals - @jest/globals
// > - @testing-library/jest-dom/vitest - vitest
// >
// > For example:
// >
// > ```ts
// > import "@testing-library/jest-dom";
// > ```
// >
// > Importing from one of the above paths will augment the appropriate matcher interfaces
// > for the given test platform, assuming the import is done in a `.ts` file
// > that is included in the user's `tsconfig.json`.

// eslint-disable-next-line @typescript-eslint/no-require-imports
require("@testing-library/jest-dom");
