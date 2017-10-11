
exports.config = {
  // seleniumAddress: 'http://localhost:4444/wd/hub',
  multiCapabilities: [{ chromeOptions:
    { args: ['disable-infobars=true']},
      browserName: 'chrome'}],
  specs: ['../test/temp/login.js'],
  onPrepare: function () {
    browser.ignoreSynchronization = true
  }
};
