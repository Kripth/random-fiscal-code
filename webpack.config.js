import path from "path";

export default {
	entry: "./src/index.ts",
	target: "node",
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: [".ts"],
	},
	output: {
		filename: "index.js",
		path: path.resolve("extension"),
		library: "generate",
		libraryTarget: "umd",
		globalObject: "window"
	},
};
