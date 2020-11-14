module.exports = {
    publicPath: '/',
     indexPath: 'main.html',
    devServer: {
        disableHostCheck: true,
        proxy: 'http://localhost:5600'
    }
}
