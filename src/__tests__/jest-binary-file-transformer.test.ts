import jestBinaryFileTransformer from "../jest-binary-file-transformer";

test('it transforms binary file paths into `module.exports = "name.extension"`', () => {
	const sourceText = "not applicable";
	const jpgPath = "images/image.jpg";
	const pngPath = "images/image.png";
	const woff2Path = "fonts/font.woff2";

	const jpgTransformed = jestBinaryFileTransformer.process(sourceText, jpgPath);
	const pngTransformed = jestBinaryFileTransformer.process(sourceText, pngPath);
	const woff2Transformed = jestBinaryFileTransformer.process(
		sourceText,
		woff2Path,
	);

	expect(jpgTransformed.code).toMatch('module.exports = "image.jpg"');
	expect(pngTransformed.code).toMatch('module.exports = "image.png"');
	expect(woff2Transformed.code).toMatch('module.exports = "font.woff2"');
});
