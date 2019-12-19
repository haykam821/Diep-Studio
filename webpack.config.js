const path = require("path");

const ManifestPlugin = require("webpack-pwa-manifest");

module.exports = {
	entry: "./src/index.jsx",
	mode: process.env.WEBPACK_MODE || "production",
	module: {
		rules: [{
			test: /\.jsx$/,
			use: "jsx-loader",
		}],
	},
	output: {
		filename: "index.js",
		path: path.join(__dirname, "/dist"),
	},
	plugins: [
		new ManifestPlugin({
			/* eslint-disable camelcase */
			display: "standalone",
			fingerprints: false,
			inject: false,
			lang: "en",
			name: "Diep Studio",
			short_name: "Studio",
			/* eslint-enable camelcase */
		}),
	],
};