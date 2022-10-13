const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const pkgJson = require('./package.json');

module.exports = {
  mode: 'development',
  entry: {
    popup: path.join(__dirname, './src/popup/index.tsx'),
    onboarding: path.join(__dirname, './src/onboarding/index.tsx'),
    serviceworker: path.join(__dirname, './src/serviceworker/index.ts'),
    contentscript: path.join(__dirname, './src/scripts/contentscript/index.ts'),
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'js/[name].js',
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              ['@babel/preset-react', { runtime: 'automatic' }],
              '@babel/preset-typescript',
            ],
          },
        },
        exclude: /node_modules/,
        include: [path.resolve(__dirname, 'src')],
      },
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'img/[hash][ext][query]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[hash][ext][query]',
        },
      },
    ],
  },
  plugins: [
    new NodePolyfillPlugin(),
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
    }),
    new HtmlWebpackPlugin({
      filename: 'popup.html',
      template: 'src/popup/index.html',
      chunks: ['popup'],
    }),
    new HtmlWebpackPlugin({
      filename: 'onboarding.html',
      template: 'src/onboarding/index.html',
      chunks: ['onboarding'],
    }),
    new CopyPlugin({
      patterns: [
        {
          from: 'public/icons',
          to: 'icons',
        },
        {
          from: 'public/manifest.json',
          transform: (buffer) => {
            const manifestJson = JSON.parse(buffer.toString());
            manifestJson.name = pkgJson.name;
            manifestJson.version = pkgJson.version;
            manifestJson.description = pkgJson.description;
            return Buffer.from(JSON.stringify(manifestJson));
          },
        },
      ],
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
  devtool: 'source-map',
};
