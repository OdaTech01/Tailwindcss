const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const dependencies = require("./package.json").dependencies;

const PORT = 3000;

module.exports = {
    entry: path.resolve(__dirname, "./src/index.js"),
    devServer: {
        port: PORT,
        historyApiFallback: true
    },
    output: {
        publicPath: "auto",
        // filename: "[name].bundle.js",
        // path: path.join(__dirname, "dist"),
    },
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".css"],
    },
    optimization: {
        splitChunks: false,
    },
    module: {
        rules: [
            {
                test: /\.(scss|css)$/,
                use: [
                    "style-loader", "css-loader", 
                    {
                        loader: "postcss-loader",
                        // options: {
                        //     name: "images/[hash]-[name].[ext]"
                        // }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "images/[hash]-[name].[ext]"
                        }
                    }
                ]
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: ["@babel/preset-env", "@babel/preset-react"]
                        }
                    }
                ],
            },
        ],
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'dashboardApp',
            filename: 'remoteEntry.js',
            exposes: {
                // './styles': './src/index.css',
            },
            remotes: {
                headerApp: 'headerApp@http://localhost:3001/remoteEntry.js',
            },
            shared: {
                // ...dependencies,
                // react: {
                //     singleton: true,
                //     // eager: true,
                //     requiredVersion: dependencies["react"],
                // },
                // "react-dom": {
                //     singleton: true,
                //     // eager: true,
                //     requiredVersion: dependencies["react-dom"],
                // },
            },
        }),
        new HtmlWebpackPlugin({
            template: "./public/index.html",
        }),
    ],
    target: "web"
};
