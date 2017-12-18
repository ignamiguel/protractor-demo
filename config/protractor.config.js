let SpecReporter = require('jasmine-spec-reporter').SpecReporter;
let AllureReporter = require('jasmine-allure-reporter');
const PixDiff = require('pix-diff');

exports.config = {
  // seleniumAddress: 'http://localhost:4444/wd/hub',
  multiCapabilities: [{ chromeOptions:
    { args: ['disable-infobars=true']},
      browserName: 'chrome',
      maxInstances: 2,
      shardTestFiles: true
    }],
  //specs: ['../test/temp/login.js'],
  onPrepare: function () {
    jasmine.getEnv().addReporter(new SpecReporter({
      spec: {
        displayStacktrace: true
      }
    }));
    browser.ignoreSynchronization = true
    jasmine.getEnv().addReporter(new AllureReporter({
      resultsDir: 'allure-results'
    }));
    // PixDiff.loadMatchers();
    return browser.getCapabilities().then((capabilities) => {
      const platformName = process.env.PLATFORM || capabilities.get('platformName') || capabilities.get('platform');

      browser.pixDiff = new PixDiff({
        basePath: 'test/resources/pixdiff/baseline/',
        diffPath: 'test/resources/pixdiff/diff/',
        formatImageName: `{tag}-{browserName}-${platformName}-{width}x{height}`
      });
    });
  },
  jasmineNodeOpts: {
    defaultTimeoutInterval: 123000,
    print: function() {}
 },
 suites: {
   demo1: [
     '../test/demo-1/*.js'
   ]
 },
//  SELENIUM_PROMISE_MANAGER: false
};
