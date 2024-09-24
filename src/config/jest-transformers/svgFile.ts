/** Replace the SVG file import with its file contents. */
const jestTransformerSVGFile = {
	process(sourceText: string) {
		return {
			code: `module.exports = ${JSON.stringify(sourceText)}`,
		};
	},
} as const;

export default jestTransformerSVGFile;
