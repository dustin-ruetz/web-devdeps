const jestTransformerSVGFile = {
	process(sourceText) {
		return {
			// Replace the SVG file import with its file contents.
			code: `module.exports = ${JSON.stringify(sourceText)}`,
		};
	},
};

export default jestTransformerSVGFile;
