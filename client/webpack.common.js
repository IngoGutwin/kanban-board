const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    bundle: path.resolve(__dirname, 'src/App.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    filename: '[name][contenthash].js',
    assetModuleFilename: '[name][ext]',
  },
  resolve: {
    alias: {
      '@@': path.resolve(__dirname, 'src/'),
      Styles: path.resolve(__dirname, 'src/assets/styles/'),
    },
  },
  optimization: {
    moduleIds: 'deterministic',
    minimize: false,
    runtimeChunk: 'single',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Kanban-Board',
      filename: 'index.html',
      template: 'src/index.html',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.(woff2?|ttf|otf|eot|svg)$/,
        type: 'asset/resource',
        include: /assets[\\/]fonts/, // handles fonts from `assets/fonts` directory only
        generator: {
          filename: 'assets/fonts/[name][ext][query]',
        },
      },
      {
        test: /\.(svg|jpe?g|webp|png)$/i,
        type: 'asset/resource',
        include: /assets[\\/]images/, // handle images from `assets/images` directory only
        generator: {
          filename: 'assets/images/[name].[hash:8][ext]',
        },
      },
    ],
  },
};
