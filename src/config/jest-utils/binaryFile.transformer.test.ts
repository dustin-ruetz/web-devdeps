import binaryFileTransformer from "./binaryFile.transformer.ts";

test('it transforms binary file paths into `module.exports = "name.extension"`', () => {
	const sourceText = "";

	const transformedJPG = binaryFileTransformer.process(
		sourceText,
		"images/image.jpg",
	);
	const transformedPNG = binaryFileTransformer.process(
		sourceText,
		"images/image.png",
	);
	const transformedWOFF2 = binaryFileTransformer.process(
		sourceText,
		"fonts/font.woff2",
	);

	expect(transformedJPG.code).toBe('module.exports = "image.jpg"');
	expect(transformedPNG.code).toBe('module.exports = "image.png"');
	expect(transformedWOFF2.code).toBe('module.exports = "font.woff2"');
});
