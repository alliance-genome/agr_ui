const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
		app.use(
				'/api',
				createProxyMiddleware({
						target:	 process.env.API_URL || 'http://localhost:8080',
						timeout:60000,
						changeOrigin: true,
				})
		);

		app.use(
				'/jbrowse',
				createProxyMiddleware({
						target:	 process.env.API_URL || 'http://localhost:8080',
						changeOrigin: true,
				})
		);
		app.use(
				'/bluegenes',
				createProxyMiddleware({
						target:	 process.env.API_URL || 'http://localhost:8080',
						changeOrigin: true,
				})
		);
		app.use(
				'/swagger-ui',
				createProxyMiddleware({
						target:	 process.env.API_URL || 'http://localhost:8080',
						changeOrigin: true,
				})
		);
		app.use(
				'/openapi',
				createProxyMiddleware({
						target:	 process.env.API_URL || 'http://localhost:8080',
						changeOrigin: true,
				})
		);
};
