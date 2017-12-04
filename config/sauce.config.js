const sauceConnectLauncher = require('sauce-connect-launcher');
const tunnelName = require('uuid/v1');

exports.config = {
  sauceUser: process.env.SAUCE_USERNAME,
  sauceKey: process.env.SAUCE_ACCESS_KEY,

  // For testing in Saucelabs without tunnels
  // specs: ['../test/saucelabs/*.js'],

  // For testing in Saucelabs with tunnels
  suites: {
    demo1: [
      '../test/demo-1/*.js'
    ]
  },

  beforeLaunch: () => {
    return new Promise((resolve, reject) => {
      sauceConnectLauncher({
        username: process.env.SAUCE_USERNAME,
        accessKey: process.env.SAUCE_ACCESS_KEY,
        tunnelIdentifier: tunnelName,
        verbose: true,
        verboseDebugging: true,
        connectRetries: 3,
        connectRetryTimeout: 60000
      }, (err, tunnel) => {
        if (err) {
          console.error('ERROR WHEN OPENING SAUCELABS TUNNEL:', err);
          reject(err);

          return;
        }
        console.log('OPENING SAUCELABS TUNNEL OK');
        sauceConnectProcess = tunnel;
        resolve();
      });
    });
  },

  onCleanup: () => {
    if (process.env.SAUCE) {
      return new Promise((resolve) => {
        sauceConnectProcess.close(() => {
          console.log('Closed Sauce Connect process');
        });
        resolve();
      });
    }

    return Promise.resolve();
  },

  onPrepare: function () {
      var caps = browser.getCapabilities();
      browser.ignoreSynchronization = true
  },

  multiCapabilities: [{
      browserName: 'firefox',
      version: 'latest',
      platform: 'OS X 10.10',
      name: "firefox-tests",
      shardTestFiles: true,
      maxInstances: 25
  }, {
      browserName: 'chrome',
      version: '41',
      platform: 'Windows 7',
      name: "chrome-tests",
      shardTestFiles: true,
      maxInstances: 25
  }],

  onComplete: function () {
      var printSessionId = function (jobName) {
          browser.getSession().then(function (session) {
              console.log('SauceOnDemandSessionID=' + session.getId() + ' job-name=' + jobName);
          });
      }
      printSessionId("Insert Job Name Here");
  }
}
