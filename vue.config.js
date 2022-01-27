module.exports = {
		lintOnSave: false,
		devServer: {
				// proxy: 'http://152.136.109.47:5000/api'
				proxy: {
						'/Auth': {
								target: 'http://152.136.109.47:5000/api',
								ws: true,
								changeOrigin: true
						},
						'/api/file': {
								target: 'http://zzxfkme.icu:5888',
								ws: true,
								changeOrigin: true
						},
						'/api/privatespace': {
								target: 'http://zzxfkme.icu:5000'
						}
				}
		}
}