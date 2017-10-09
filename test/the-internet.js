const EC = require('protractor').ExpectedConditions;
const usernameField = element(by.id('username'));
const passwordField = element(by.id('password'));
const loginButton = element(by.css('[class=radius]'));

describe('"the-internet" Protractor DEMO', ()=> {
  it('should navigate to login page', () => {
    browser.get('http://localhost:9292/login');
    
    browser.wait(EC.presenceOf(usernameField));

    usernameField.sendKeys('tomsmith');
    passwordField.sendKeys('SuperSecretPassword!');

    loginButton.click();

    browser.sleep(10 * 1000);
  })
});
