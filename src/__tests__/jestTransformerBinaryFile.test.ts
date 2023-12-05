import jestTransformerBinaryFile from "../jestTransformerBinaryFile";

test('it transforms binary file paths into `module.exports = "name.extension"`', () => {
	const sourceText = "";
	const jpgPath = "images/image.jpg";
	const pngPath = "images/image.png";
	const woff2Path = "fonts/font.woff2";

	const jpgTransformed = jestTransformerBinaryFile.process(sourceText, jpgPath);
	const pngTransformed = jestTransformerBinaryFile.process(sourceText, pngPath);
	const woff2Transformed = jestTransformerBinaryFile.process(
		sourceText,
		woff2Path,
	);

	expect(jpgTransformed.code).toMatch('module.exports = "image.jpg"');
	expect(pngTransformed.code).toMatch('module.exports = "image.png"');
	expect(woff2Transformed.code).toMatch('module.exports = "font.woff2"');
});
