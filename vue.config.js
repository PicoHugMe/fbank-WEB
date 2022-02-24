module.exports = {
		lintOnSave: false,
		devServer: {
				// proxy: 'http://localhost:7260/api'
				proxy: {
						'/api/auth': {
								target: 'https://localhost:7260',
								ws: true,
								changeOrigin: true
						},
						'/api/organization': {
								target: 'https://localhost:7260',
								ws: true,
								changeOrigin: true
						},
						'/api/privatespace': {
								target: 'http://localhost:7260',
								ws: true,
								changeOrigin: true
						},
				}
		}
}
