const sauceConnectLauncher = require('sauce-connect-launcher');
const uuidv1 = require('uuid/v1');
const tunnelName = uuidv1().substring(1, 10);
let sauceConnectProcess;

const argv = require('yargs').argv;
const { spawnSync } = require('child_process');

const setUp = async () => {
  return new Promise((resolve, reject) => {
    console.log('TUNNEL ID: ', tunnelName);
    sauceConnectLauncher({
      username: process.env.SAUCE_USERNAME,
      accessKey: process.env.SAUCE_ACCESS_KEY,
      // tunnelIdentifier: tunnelName,
      verbose: true,
      verboseDebugging: true,
      logger: console.log,
      connectRetries: 3,
      connectRetryTimeout: 60000
    }, (err, tunnel) => {
      if (err) {
        console.error('ERROR WHEN OPENING SAUCELABS TUNNEL:', err);
        reject(err);
      }
      console.log('OPENING SAUCELABS TUNNEL OK');
      resolve(tunnel);
    });
  });
}

const executeTest = async () => {
  return new Promise((resolve) => {
    const protractorArgs = [];
    protractorArgs.push('config/sauce.config.js');  
    process.env.specs = argv.specs;
    process.env.suite = argv.suite || process.env.SUITE;
    process.env.highlightAll = argv.highlightAll;
    process.env.maxInstances = argv.maxInstances || process.env.MAX_INSTANCES || 3;
  
    spawnSync('protractor',
                      protractorArgs,
                      { stdio: [process.stdin, process.stdout, process.stderr] });
    resolve();
  });
  
}

const cleanUp = async () => {
  return new Promise((resolve) => {
    if(sauceConnectProcess != undefined) {
      sauceConnectProcess.close(() => {
        console.log('SAUCELABS TUNNEL CLOSED OK');
      });
    }
    resolve();
  });
}

const run = async () => {
  sauceConnectProcess = await setUp();
  await executeTest();
  await cleanUp();
}

run();
