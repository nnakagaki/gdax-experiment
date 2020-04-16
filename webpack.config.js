const path = require('path');

module.exports = {
  node: {
    global : true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  entry: './src/index.jsx',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  externals: ['aws-sdk', 'utf-8-validate', 'bufferutil']
};