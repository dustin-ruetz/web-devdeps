import jestTransformerSVGFile from "./jestTransformerSVGFile.js";

test('it transforms SVG files into `module.exports = "<svg>{...}</svg>"`', () => {
	const svgSourceText = `
<svg
  aria-labelledby="svg-id"
  role="img"
  xmlns="http://www.w3.org/2000/svg"
>
  <title id="svg-id">SVG title.</title>
</svg>
`;

	const svgTransformed = jestTransformerSVGFile.process(svgSourceText);

	expect(svgTransformed.code).toContain("module.exports =");
	expect(svgTransformed.code).toContain("svg-id");
	expect(svgTransformed.code).toContain("SVG title.");
});
