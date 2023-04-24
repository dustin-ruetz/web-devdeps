// Excerpt from https://jestjs.io/docs/configuration#automock-boolean:
// > Node.js core modules, like `fs`, are not mocked by default. They can be mocked explicitly, like `jest.mock("fs")`.

// Excerpt from https://jestjs.io/docs/manual-mocks#mocking-node-modules:
// > CAUTION: If we want to mock Node's built-in modules (e.g.: `fs` or `path`), then explicitly calling
// > e.g. `jest.mock("path")` is required, because built-in modules are not mocked by default.

jest.mock("node:fs/promises");
