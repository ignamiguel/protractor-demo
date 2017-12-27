const PixDiff = require('pix-diff');
const fs = require('fs');
const path = require('path');
const screenshotPath = path.resolve(__dirname, '../resources/pixdiff/baseline/');
const differencePath = path.resolve(__dirname, '../resources/pixdiff/diff/');
const tagLoginScreen = 'loginScreen';
const tagUserAndPasswordRegion = 'userAndPasswordRegion';
const regionElement = element(by.id('content'));
const devicePixelRatio = { 'chrome': 2, 'firefox': 1 };
let platformName;
const _ = {
    browserName: 'chrome',
    width: 1200,
    height: 746,
    dprWidth: 1200 * devicePixelRatio['chrome'],
    dprHeight: 746 * devicePixelRatio['chrome'],
    devicePixelRatio: devicePixelRatio['chrome']
};


describe("the-internet visual demo", () => {
    beforeAll(() => {
      console.log('PixDiff.OUTPUT_ALL', PixDiff.OUTPUT_ALL);
      console.log('PixDiff.OUTPUT_DIFFERENT', PixDiff.OUTPUT_DIFFERENT);
      console.log('PixDiff.OUTPUT_SIMILAR', PixDiff.OUTPUT_SIMILAR);
      console.log('browser.pixDiff.diffPath', browser.pixDiff.diffPath);

      const getResolutionScript = () => {
            return {
                height: window.screen.height,
                width: window.screen.width,
                availHeight: window.screen.availHeight,
                availWidth: window.screen.availWidth
            };
          }
        return browser.driver.manage().window().setPosition(0, 0)
        .then(() => browser.executeScript(getResolutionScript))
        .then((result) => {
          _.width = result.width;
          _.height = result.height;
        })
        .then(() => browser.getCapabilities())
        .then((capabilities) => {
            platformName = process.env.PLATFORM || capabilities.get('platformName') || capabilities.get('platform');
        })
        .then(() => browser.get('http://localhost:9292/login'))
        .then(() => browser.sleep(2000));  
    });

    it('should throw error if baseline is not found', () => {
      browser.pixDiff.checkScreen('notExist')
      .then(() => {}, (error) => {
        console.log('ERROR => ', error);
        return expect(error.code).toEqual('ENOENT');
      });
    });

    it('should MATCH the page', () => {
        browser.pixDiff.checkScreen(tagLoginScreen)
        .then(result => {
          console.log('PixDiff.RESULT_IDENTICAL', PixDiff.RESULT_IDENTICAL);
          console.log('result.code', result.code);
          return expect(result.code).toEqual(PixDiff.RESULT_IDENTICAL)
        });
    });

    xit('should SAVE the user and password region', () => {
        browser.pixDiff.saveRegion(regionElement, tagUserAndPasswordRegion)
        .then(() => {
            const fileName = `${screenshotPath}/${tagUserAndPasswordRegion}-${_.browserName}-${platformName}-${_.dprWidth}x${_.dprHeight}.png`;
            expect(fs.existsSync(fileName)).toBe(true)
        });
    });

    it('should MATCH the user and password region', () => {
        browser.pixDiff.checkRegion(regionElement, tagUserAndPasswordRegion)
        .then(result => expect(result.code).toEqual(PixDiff.RESULT_IDENTICAL))
    });
});
