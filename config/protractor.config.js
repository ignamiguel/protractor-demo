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
  onPrepare: () => {
    const PixDiff = require('pix-diff');
    browser.pixDiff = new PixDiff(
        {
            basePath: 'path/to/baseline/',
            diffPath: 'path/to/diff/',
            width: 1366,
            height: 768
        }
    );
},
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
    browser.pixDiff = new PixDiff({
            basePath: 'path/to/baseline/',
            diffPath: 'path/to/diff/',
            width: 1366,
            height: 768
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
