const path = require('path');
module.exports = {
  mode: 'development',
  entry: path.join(__dirname, 'src', 'index.ts'),
  watch: true,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: "bundle.js",
  },
  module: {
    rules: [{
      test: /.ts$/,
      loader: 'ts-loader',
    }]
  },
  resolve: {
    extensions: ['.json', '.js', '.ts']
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, '/dist/'),
    inline: true,
    host: 'localhost',
    port: 8080,
  }
};
