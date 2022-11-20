const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
    module.exports = function(app) {
        app.use(
          createProxyMiddleware(["/api", , "/otherApi"], { target: "htps://assignment2-2022.herokuapp.com" })
        );
      };
};