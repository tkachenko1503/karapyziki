var webpack = require("webpack");
var config = require("./webpack.server.js");

config.cache   = true;
config.debug   = true;

config.plugins = [
	new webpack.DefinePlugin({__CLIENT__: false, __SERVER__: true, __PRODUCTION__: false, __DEV__: true}),
	new webpack.NoErrorsPlugin()
];

module.exports = config;
