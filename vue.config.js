module.exports = {
		lintOnSave: false,
		devServer: {
				// proxy: 'https://zzxfkme.icu:5001'
				proxy: {
						'/auth': {
								target: 'https://zzxfkme.icu:5001',
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