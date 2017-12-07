const sauceConnectLauncher = require('sauce-connect-launcher');
const uuidv1 = require('uuid/v1');
const tunnelName = uuidv1().substring(1, 10);
let sauceConnectProcess;

const setSCProcess = (process) => {
    console.log('SET SC PROCESS');
    sauceConnectProcess = process;
};
// For testing in Saucelabs without tunnels
// specs: ['../test/saucelabs/*.js'],

// For testing in Saucelabs with tunnels

exports.config = {
  sauceUser: process.env.SAUCE_USERNAME,
  sauceKey: process.env.SAUCE_ACCESS_KEY,

  suites: {
    demo1: [
      '../test/demo-1/login-ok.test.js'
    ]
  },

  beforeLaunch: () => {
    // console.log('TUNNEL ID: ', tunnelName);
    // return new Promise((resolve, reject) => {
    //   sauceConnectLauncher({
    //     username: process.env.SAUCE_USERNAME,
    //     accessKey: process.env.SAUCE_ACCESS_KEY,
    //     // tunnelIdentifier: tunnelName,
    //     verbose: true,
    //     verboseDebugging: true,
    //     logger: console.log,
    //     connectRetries: 3,
    //     connectRetryTimeout: 60000
    //   }, (err, tunnel) => {
    //     if (err) {
    //       console.error('ERROR WHEN OPENING SAUCELABS TUNNEL:', err);
    //       reject(err);
    //     }
    //     console.log('OPENING SAUCELABS TUNNEL OK');
    //     console.log('tunnel', tunnel);
    //     if(tunnel != undefined) {
    //       tunnel.close(() => {
    //         console.log('Closed Sauce Connect process');
    //       });
    //     }
    //     resolve();
    //   });
    // });
  },

  onCleanUp: () => {
    return new Promise((resolve, reject) => {
        // console.log('CLEAN UP');
        // console.log(sauceConnectProcess);
        // if(sauceConnectProcess != undefined) {
        //   sauceConnectProcess.close(() => {
        //     console.log('Closed Sauce Connect process');
        //   });
        // }
        resolve();
    });
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
    //   var printSessionId = function (jobName) {
    //       browser.getSession().then(function (session) {
    //           console.log('SauceOnDemandSessionID=' + session.getId() + ' job-name=' + jobName);
    //       });
    //   }
    //   printSessionId("Insert Job Name Here");
  }
}
