var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, './output');
var APP_DIR = path.resolve(__dirname, './src');

// var config = {
//   entry: APP_DIR + './index.js',
//   output: {
//     path: BUILD_DIR,
//     filename: 'bundle.js'
//   }
//   module : {
//     loaders : [
//       {
//         test : /\.jsx?/,
//         include : APP_DIR,
//         loader : 'babel'
//       }
//     ]
//   }
// };

//module.exports = config;

module.exports = {
  entry: APP_DIR + '/index.js',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  devServer: {
    //contentBase: './docs',
    inline: true,
    hot: true
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.css$/,
        loaders: [
        'style?sourceMap',
        'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
    ]
      },
    ]
  },
};
