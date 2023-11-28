const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = (env) => {
  return merge(common, {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
      port: env.PORT,
      hot: true,
      historyApiFallback: true,
      watchFiles: {
        paths: [
          'src/**/*.{js,html,css}',
          'src/components/**/*.{js,html}',
          'src/assets/**/*{js,scss}',
        ],
      },
    },
    watchOptions: {
      poll: 1000,
      followSymlinks: true,
    },
    module: {
      rules: [
        {
          test: /\.(scss|css)$/,
          use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
          generator: {
            filename: 'assets/styles/[name][ext][query]',
          },
        },
      ],
    },
  });
};
