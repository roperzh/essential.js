var sharedConfig = require('./shared.conf');

module.exports = function(config) {
  sharedConfig(config);

  config.set({
    coverageReporter: {
      reporters: [{
        type: 'lcov',
        dir: 'test/coverage/'
      }, {
        type: 'text',
        dir: 'test/coverage'
      }]
    }
  })
};
