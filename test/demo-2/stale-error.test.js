// Stale Element Error
const EC = require('protractor').ExpectedConditions;
const error = require('protractor').error;
const retry = require('../../src/retry');
const successLoginLabel = element(by.css('[class="flash success"]'));
const headerLabel = element(by.css('[class="example"] h3'));
const button = element(by.id('refresh')); 
const timeout = 600 * 1000;
const dreamTime = 1 * 1000;
const HighlightElement = require('../../src/highlight-element');
const h = new HighlightElement();
const duration = 2;

describe('"the-internet" Protractor DEMO', ()=> {
  it('should navigate to stale page', () => {
    browser.get('http://localhost:9292/stale');
    browser.wait(EC.presenceOf(headerLabel));

    expect(headerLabel.getText()).toBe('Stale Element Error');
  }, timeout);

  it('should force the stale element error', () => {
    // let catchError = (detectedError) => {
    //   console.log(`error caused by --> '${detectedError.message}'`);
    //   console.log(`error.StaleElementReferenceError --> ${error.StaleElementReferenceError}`);
    //   console.log(`detectedError --> ${detectedError}`);
    //   console.log(`detectedError.constructor.name --> ${detectedError.constructor.name}`);
    //   console.log(`detectedError.constructor.name === 'StaleElementReferenceError' --> ${detectedError.constructor.name === 'StaleElementReferenceError'}`);
    //   console.log(`typeof detectedError --> ${typeof detectedError}`);
    //   console.log(`typeof error.StaleElementReferenceError --> ${typeof error.StaleElementReferenceError}`);
    //   console.log(`typeof detectedError  typeof error.StaleElementReferenceError ${typeof detectedError === typeof error.StaleElementReferenceError}`);
    //   return false;
    // };

    // for (let index = 0; index < 500; index++) {
    //   button.click()
    //   .then(() => {
    //     console.log('clicked ok!'); 
    //     return true;
    //   }, (err) => {
    //     return catchError(err);
    //   });
    // }

    browser.sleep(5000);
    const tryClick = (element) => {
      return element.click();
    };
    for (let index = 0; index < 500; index++) {
      retry(tryClick, button, ['StaleElementReferenceError'])
      .then(() => {
        console.log('clicked ok!'); 
        return true;
      }, (err) => {
        console.log('err ->', err); 
        return false;
      });
    }
    // expect(successLoginLabel.isPresent()).toBe(true);
  }, timeout);
});

