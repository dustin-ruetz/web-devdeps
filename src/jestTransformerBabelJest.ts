// Note that `babel-jest` is not listed in the package.json `dependencies` because
// it's installed to node_modules/ by default as part of the Jest installation.
import babelJest from "babel-jest";

const jestTransformerBabelJest = babelJest.createTransformer({
	// Set presets to enable certain JavaScript features to work with Jest.
	presets: [
		// Enable ESModule import/export syntax in .js and .jsx files.
		"@babel/preset-env",
	],
});

export default jestTransformerBabelJest;
