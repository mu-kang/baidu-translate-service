const path = require("path");

module.exports = {
  entry: "./src/index.ts",
  mode: "production",
  module: {
    rules: [
      {
        test: /.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "baiduTranslateService.js",
    path: path.resolve(__dirname, "lib"),
    libraryTarget: "umd",
    libraryExport: "default",
    globalObject: "this",
    library: "baiduTranslateService",
    clean: true,
  },
};

