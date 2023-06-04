// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const stylesHandler = MiniCssExtractPlugin.loader;

const config = {
  mode: "development",
  context: __dirname,
  entry: ["regenerator-runtime/runtime.js", "./src/index.tsx"],
  output: {
    path: path.resolve( __dirname, 'build' ),
    filename: 'app.js',
    publicPath: '/',
  },
  devServer: {
    historyApiFallback: true
 },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve( __dirname, 'public/index.html' ),
      filename: 'index.html'
    }),
    new MiniCssExtractPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/i,
        loader: "babel-loader",
        options: {
          presets: [
            "@babel/preset-env",
            "@babel/preset-react",
            "@babel/preset-typescript",
          ],
        },
      },
      {
        test: /\.css$/i,
        use: [
          {
          loader: stylesHandler, 
          }, 
          {
          loader: "css-loader", 
            options: {
              modules: false,
            },
          }, 
          {
          loader:"postcss-loader",
          }
        
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
        use: 'file-loader'
      },
      {
        test: /\.(jsx|tsx)?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
            cacheDirectory: true,
            cacheCompression: false,
            envName: "development"
          }
        }
      }
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", "ts", "tsx"]  
  },
  devServer: {
    historyApiFallback: true,
  },
};
