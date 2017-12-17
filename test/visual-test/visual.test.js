const PixDiff = require('pix-diff');
PixDiff.loadMatchers();

describe("Example page", () => {

    beforeEach(() => {
        browser.pixDiff = new PixDiff({
            basePath: './test/desktop/',
            diffPath: './diff/'
        });
        browser.get('http://localhost:9292');
    });

    it("should match the page", () => {
        expect(browser.pixDiff.checkScreen('examplePage')).toPass();
    });

    it("should match the page title", () => {
        expect(browser.pixDiff.checkRegion(element(by.css('h1')), 'exampleRegion')).toPass();
    });

    it("should not match the page title", () => {
        expect(browser.pixDiff.checkRegion(element(by.cc('a')), 'exampleRegion')).not.toPass();
    });
});
