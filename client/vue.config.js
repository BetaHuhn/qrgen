module.exports = {
    publicPath: '/',
    configureWebpack: {
        module: {
            rules: [
                {
                    test: /\.sass$/,
                    use: [
                        "vue-style-loader",
                        {
                            loader: "sass-loader",
                            options: {
                                indentedSyntax: true,
                                sassOptions: {
                                    indentedSyntax: true
                                }
                            }
                        },
                        "css-loader"
                    ]
                }
            ]
        }
    },
    devServer: {
        disableHostCheck: true,
        proxy: 'http://localhost:4200'
    }
}
