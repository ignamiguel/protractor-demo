let SpecReporter = require('jasmine-spec-reporter').SpecReporter;

exports.config = {
  // seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['../test/spec.js'],
  onPrepare: function () {
    jasmine.getEnv().addReporter(new SpecReporter({
      spec: {
        displayStacktrace: true
      }
    }));
    browser.ignoreSynchronization = true
  },
  jasmineNodeOpts: {
    print: function() {}
 }
};
