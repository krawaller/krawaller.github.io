module.exports = {
  entry: './main.js',
  output: {
    filename: 'appbundle.js'
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        test: /\.js/,
        query: {
          presets: ['es2015','stage-0']
        }
      }
    ]
  }
}