const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'htps://assignment2-2022.herokuapp.com',
      changeOrigin: true,
    })
  );
};