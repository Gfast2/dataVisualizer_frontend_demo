const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = function (evn) {

  console.log('=====================================================');
  console.log();
  console.log('current mode:', evn);
  console.log();
  console.log('Options: ');
  console.log('SET NODE_ENV=dev   -> start webpack-dev-server');
  console.log('SET_NODE_ENV=build -> for production build and good performance!');
  console.log();
  console.log('=====================================================')

  const dPlugs = evn == 'dev'
    ? []
    : [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      new UglifyJSPlugin({
        parallel: 4,
        uglifyOptions: {
          compress: {
            drop_console: true,
          }
        }
      }),
      new BundleAnalyzerPlugin({
        analyzerMode: 'static', // single HTML file with bundle reports
        reportFilename: 'bundleAnalyzerReport.html'
      }), // for analysing what is in compiled package
      new CompressionPlugin({
        test: /\.js/,
        algorithm: 'gzip',
        threshold: 0,
        minRatio: 0.8,
        deleteOriginalAssets: false
      })
    ];

  return ({
    entry: {
      app: './js/index.js'
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.less$/, // This loader still not works correctly ( We have not compile some .less style sheet in this project yet)
          use: [
            {
              loader: 'style-loader' // creates style nodes from JS strings
            },
            {
              loader: 'css-loader'   // translates CSS into CommonJS
            },
            {
              loader: 'less-loader', // compiles Less to CSS
              options: {
                strictMath: true,
                noIeCompat: true
              }
            }
          ]
        },
        {
          test: /\.(js|jsx)$/,
          exclude: [
            /node_modules/,
          ],
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-react',
              '@babel/preset-env'
            ],
            plugins: [
              ['@babel/plugin-proposal-decorators', { "legacy": true }],
              "@babel/plugin-proposal-export-namespace-from",
              "@babel/plugin-proposal-function-sent",
              "@babel/plugin-proposal-numeric-separator",
              "@babel/plugin-proposal-throw-expressions"
            ]
          }
        },
        { test: /\.(ttf|eot|svg|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader?name=./font/[name].[ext]' },
        { test: /\.(jpg|png)$/, loader: 'url-loader?mimetype=image/png' },
        { test: /\.html$/, loader: 'html-loader', options: { minimize: true } },
        { test: /\.ts$/, loaders: ['babel-loader', 'ts-loader'], exclude: /node_modules/ },
        { test: require.resolve('jquery'), loader: 'expose-loader?$!expose-loader?jQuery' },  // window.$ & window.jQuery for bootstrap-switch
      ]
    },
    optimization: {
      splitChunks: {
        chunks: 'all'
      },
      minimize: true
    },
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
      }),
      ...dPlugs
    ],
    output: {
      path: __dirname + '/dist/',
      filename: 'app/module_[name].js'
    },
    devServer: {
      port: 8080,
      host: '0.0.0.0',
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    }
  });
};