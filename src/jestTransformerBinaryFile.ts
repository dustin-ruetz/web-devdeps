// Excerpt from https://jestjs.io/docs/code-transformation#transforming-images-to-their-path:
// > Importing images is a way to include them in your browser bundle, but they are not valid JavaScript.
// > One way of handling it in Jest is to replace the imported value with its filename.

import path from "path";

const jestTransformerBinaryFile = {
	// The Jest docs "Transforming images to their path" example says that the first parameter of `process` is `sourceText`,
	// but since it's not actually being used within the function body then we can tell TypeScript to ignore the error.
	// @ts-ignore
	process(sourceText: string, sourcePath: string) {
		return {
			// Keep this as `module.exports` because `export default` breaks the Jest transformer.
			code: `module.exports = ${JSON.stringify(path.basename(sourcePath))}`,
		};
	},
};

export default jestTransformerBinaryFile;
