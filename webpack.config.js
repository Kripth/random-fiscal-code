import path from "path";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import StaticSiteGeneratorPlugin from "static-site-generator-webpack-plugin";

const dist = type => [
	{
		entry: `./src/pages/scripts/${type}.ts`,
		target: "web",
		module: {
			rules: [
				{
					test: /\.ts$/,
					use: "ts-loader",
					exclude: /node_modules/,
				},
				{
					test: /\.css$/i,
					use: [MiniCssExtractPlugin.loader, "css-loader"],
				}
			],
		},
		resolve: {
			extensions: [".ts"],
		},
		output: {
			filename: "bundle.js",
			path: path.resolve(type),
			iife: true
		},
		plugins: [new MiniCssExtractPlugin()]
	},
	{
		entry: `./src/pages/${type}.ts`,
		target: "node",
		module: {
			rules: [
				{
					test: /\.ts$/,
					use: "ts-loader",
					exclude: /node_modules/,
				}
			],
		},
		resolve: {
			extensions: [".ts"],
		},
		output: {
			filename: "[name].js",
			path: path.resolve(type),
			libraryTarget: "umd"
		},
		plugins: [new StaticSiteGeneratorPlugin()]
	}
];

export default function(env) {
	if(env.docs) {
		return dist("docs");
	} else if(env.ext) {
		return dist("extension");
	} else {
		return {
			entry: "./src/lib/index.ts",
			target: "node",
			module: {
				rules: [
					{
						test: /\.ts$/,
						use: "ts-loader",
						exclude: /node_modules/,
					}
				],
			},
			resolve: {
				extensions: [".ts"],
			},
			output: {
				filename: "index.js",
				path: path.resolve("dist"),
				library: "generate",
				libraryTarget: "umd",
				globalObject: "window"
			}
		};
	}
};
