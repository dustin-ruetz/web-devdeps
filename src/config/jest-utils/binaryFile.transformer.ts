import path from "node:path";

/** Replace the binary file import with its filename. */
const binaryFileTransformer = {
	process(_sourceText: string, sourcePath: string) {
		return {
			// Excerpt from https://jestjs.io/docs/code-transformation#transforming-images-to-their-path:
			// > Importing [binary files like fonts or] images is a way to include them in your browser bundle, but they are
			// > not valid JavaScript. One way of handling it in Jest is to replace the imported value with its filename.
			code: `module.exports = ${JSON.stringify(path.basename(sourcePath))}`,
		};
	},
} as const;

export default binaryFileTransformer;
