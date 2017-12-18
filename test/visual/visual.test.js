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
            console.log(platformName);
            // console.log(capabilities);
        });
    });

    beforeEach(() => {
        // browser.pixDiff = new PixDiff({
        //     basePath: 'test/resources/pixdiff/baseline/',
        //     diffPath: 'test/resources/pixdiff/diff/'
        // });
        browser.get('http://localhost:9292/login');
        browser.sleep(2000);
    });

    xit(`should SAVE the login page to path "${screenshotPath}"`, () => {
        // console.log(browser.pixDiff.basePath);
        // console.log(screenshotPath);
        browser.pixDiff.saveScreen(tagLoginScreen)
        .then(() => browser.getCapabilities())
        .then((capabilities) => {
            const platformName = process.env.PLATFORM || capabilities.get('platformName') || capabilities.get('platform');
            // console.log(platformName);
            // console.log(capabilities);
            // const fileName = `${screenshotPath}/${tagScreen}-${_.browserName}-${_.dprWidth}x${_.dprHeight}-dpr-${_.devicePixelRatio}.png`;
            const fileName = `${screenshotPath}/${tagLoginScreen}-${_.browserName}-${platformName}-${_.dprWidth}x${_.dprHeight}.png`;
            console.log(fileName);
            return expect(fs.existsSync(fileName)).toBe(true);
        });
    });

    it('should MATCH the page', () => {
        console.log( _.width, _.height);
        // expect(browser.pixDiff.checkScreen(tagLoginScreen)).toPass();
        browser.pixDiff.checkScreen(tagLoginScreen)
        .then(result => expect(result.code).toEqual(PixDiff.RESULT_IDENTICAL));
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
