const getLogger = require('log4js').getLogger;
const clc = require('cli-color');
let SpecReporter = require('jasmine-spec-reporter').SpecReporter;
const sauceConnectLauncher = require('sauce-connect-launcher');
const uuidv1 = require('uuid/v1');
const tunnelName = uuidv1().substring(1, 10);

const logOk = (message) => {
  return console.log(clc.green(message));  
};

exports.config = {
  sauceUser: process.env.SAUCE_USERNAME,
  sauceKey: process.env.SAUCE_ACCESS_KEY,
  sauceTunnel: undefined,

  suites: {
    demo1: [
      '../test/demo-1/login-ok.test.js'
    ]
  },
  beforeLaunch: () => {
    console.log('TUNNEL ID: ', tunnelName);
    return new Promise((resolve, reject) => {
      sauceConnectLauncher({
        username: process.env.SAUCE_USERNAME,
        accessKey: process.env.SAUCE_ACCESS_KEY,
        tunnelIdentifier: tunnelName,
        verbose: false,
        verboseDebugging: false,
        // logger: console.log,
        connectRetries: 3,
        connectRetryTimeout: 60000
      }, (err, tunnel) => {
        if (err) {
          console.error('ERROR WHEN OPENING SAUCELABS TUNNEL:', err);
          reject(err);
        }
        logOk('SAUCELABS TUNNEL OPENED OK');
        this.config.sauceTunnel = tunnel;
        resolve();
      });
    });
  },
  afterLaunch: () => {
    return new Promise((resolve, reject) => {
      if (this.config.sauceTunnel !== undefined) {
        const tunnel = this.config.sauceTunnel;
        tunnel.close(() => {
          logOk('SAUCE CONNECT TUNNEL CLOSED OK');
          resolve();
        });
      } else {
        reject();
      }
    });
  },
  onPrepare: function () {
      var caps = browser.getCapabilities();
      browser.ignoreSynchronization = true,
      jasmine.getEnv().addReporter(new SpecReporter({
        spec: {
          displayStacktrace: true
        }
      }));
  },
  jasmineNodeOpts: {
    defaultTimeoutInterval: 123000,
    print: function() {}
 },

  multiCapabilities: [{
      browserName: 'firefox',
      'tunnel-identifier': tunnelName,
      version: 'latest',
      platform: 'OS X 10.10',
      name: "firefox-tests",
      shardTestFiles: true,
      maxInstances: 25
  }, {
      browserName: 'chrome',
      'tunnel-identifier': tunnelName,
      version: '41',
      platform: 'Windows 7',
      name: "chrome-tests",
      shardTestFiles: true,
      maxInstances: 25
  },{
    browserName: 'internet explorer',
    'tunnel-identifier': tunnelName,
    version: '11.0',
    platform: 'Windows 7',
    name: "ie-tests",
    shardTestFiles: true,
    maxInstances: 25
  }],

  onComplete: function () {
    //   var printSessionId = function (jobName) {
    //       browser.getSession().then(function (session) {
    //           console.log('SauceOnDemandSessionID=' + session.getId() + ' job-name=' + jobName);
    //       });
    //   }
    //   printSessionId("Insert Job Name Here");
  }
}
