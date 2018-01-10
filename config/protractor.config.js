let SpecReporter = require('jasmine-spec-reporter').SpecReporter;
let AllureReporter = require('jasmine-allure-reporter');
const PixDiff = require('pix-diff');
const log4js = require('log4js');
const chromeArgs =
  process.env.HEADLESS === "true"
    ? ["disable-infobars=true", "--headless", "--disable-gpu", "--window-size=1920x1080"]
    : ["disable-infobars=true"];

const setLogger = () => {
  log4js.configure({
    appenders: {
      loginOk: { type: 'file', filename: 'loginOk.log' },
      loginError: { type: 'file', filename: 'loginError.log' },
      console: { type: 'console' }
    },
    categories: {
      loginOK: { appenders: ['loginOk'], level: 'info' },
      loginError: { appenders: ['loginError'], level: 'trace' },
      default: { appenders: ['console'], level: 'trace' }
    }
  });
};

exports.config = {
  // seleniumAddress: 'http://localhost:4444/wd/hub',
  multiCapabilities: [{ chromeOptions:
    { args: chromeArgs},
      browserName: 'chrome',
      maxInstances: 2,
      shardTestFiles: true
    }],
  //specs: ['../test/temp/login.js'],
  framework: 'jasmine2',
  onPrepare: function () {
    setLogger();
    jasmine.getEnv().addReporter(new SpecReporter({
      spec: {
        displayStacktrace: true
      }
    }));
    browser.ignoreSynchronization = true
    jasmine.getEnv().addReporter(new AllureReporter({
      resultsDir: 'allure-results'
    }));
    PixDiff.loadMatchers();
    return browser.getCapabilities().then((capabilities) => {
      const platformName = process.env.PLATFORM || capabilities.get('platformName') || capabilities.get('platform');

      browser.pixDiff = new PixDiff({
        basePath: 'test/resources/pixdiff/baseline/',
        diffPath: 'test/resources/pixdiff/',
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
