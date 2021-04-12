// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
	publicPath: '/',
	devServer: {
		disableHostCheck: true,
		proxy: 'http://localhost:5600'
	},
	configureWebpack: {
		resolve: {
			alias: {
				'@': path.resolve(__dirname, 'src/ui/')
			},
		},
		plugins: [
            new CopyWebpackPlugin([{ from: 'src/ui/public/', to: '.' }])
        ],
	},
	chainWebpack: config => {
		config
		  .plugin('html')
		  .tap(args => {
			args[0].template = './src/ui/public/index.html'
			return args
		  })
	}
}