const HighlightPosition = require('../src/highlight-position');
const protractor = require('protractor');
const h = new HighlightPosition();
const fastAnimation = require('../src/fast-animation');
const EC = require('protractor').ExpectedConditions;
const squareDiv = element(by.id('my-div'));

describe('"the-internet" Protractor DEMO', ()=> {
  it('should locate the square', () => {
    browser.get('http://localhost:9292/transition');
    browser.wait(EC.presenceOf(squareDiv));
    browser.sleep(5 * 1000);
    
    squareDiv.click();
    browser.sleep(5 * 1000);
  }, 600 * 1000);

  it('should locate the fast square', () => {
    fastAnimation();
    
    browser.sleep(5 * 1000);
    squareDiv.click().then(() => {}, (error) => {
      h.checkError(error);
    });
    browser.sleep(5 * 1000);
  }, 600 * 1000)
});
