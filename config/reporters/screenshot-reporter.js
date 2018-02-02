
const mkdirp = require('mkdirp');
const fs = require('fs');
const path = require('path');

const ScreenshotReporter = function (dir_) {
  console.log()
  console.log(__dirname);
  const dir = (dir_ || 'test/resources/screenshots/');

  // base function to take a screenshot -- change path as needed
  const screenshot = (testDescription) => {
    // set file name
    const fname = `${testDescription.replace(/\s/g, '_')}.png`;
    // make sure the directory exists
    mkdirp(dir);
    // take screenshot
    browser.takeScreenshot().then((png) => {
      // save the taken screenshot
      const stream = fs.createWriteStream(path.join(dir, fname));
      stream.write(new Buffer(png, 'base64'));
      stream.end();
    });
  };

  this.specDone = (result) => {
    // for each test failure
    if (result.failedExpectations && result.failedExpectations.length > 0) {
      screenshot(result.fullName, 'end');
    }
  };
};

module.exports = ScreenshotReporter;
