const PROXY_CONFIG = [
  {
    context: ['/auth', '/api', '/swagger-ui', '/v3'],
    target: 'http://localhost:8080',
    secure: false,
    bypass: function (req) {
      if (req.headers.accept && req.headers.accept.indexOf('text/html') !== -1) {
        return '/index.html';
      }
      return null;
    }
  }
];

module.exports = PROXY_CONFIG;
