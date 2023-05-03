const path = require('path');

module.exports = {
    mode: "development",
    devtool: "inline-source-map",
    entry: "./static/src/entry.ts",
    output: {
        path: path.resolve(__dirname, 'static/bld'),
        filename: "bundle.js"
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".json"]
    },
    module: {
        rules: [
            // all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
            { test: /\.tsx?$/, use: ["ts-loader"], exclude: /node_modules/ }
        ]
    }
}