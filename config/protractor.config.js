let SpecReporter = require('jasmine-spec-reporter').SpecReporter;

exports.config = {
  // seleniumAddress: 'http://localhost:4444/wd/hub',
  multiCapabilities: [{ chromeOptions:
    { args: ['disable-infobars=true']},
      browserName: 'chrome'}],
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
