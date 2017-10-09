const HighlightElement = require('../src/highlight-element');
const h = new HighlightElement();
const EC = require('protractor').ExpectedConditions;
const usernameField = element(by.id('username'));
const passwordField = element(by.id('password'));
const loginButton = element(by.css('[class=radius]'));
const logoutButton = element(by.css('[class="button secondary radius"]'));

describe('"the-internet" Protractor DEMO', ()=> {
  it('should navigate to login page', () => {
    browser.get('http://localhost:9292/login');
    
    browser.wait(EC.presenceOf(usernameField));

    h.highlightElement(true, usernameField, 5);
    usernameField.sendKeys('tomsmith');
    h.highlightElement(true, passwordField, 5);
    passwordField.sendKeys('SuperSecretPassword!');

    h.highlightElement(true, loginButton, 5);
    loginButton.click();

    browser.sleep(5 * 1000);

    h.highlightElement(true, logoutButton, 5);
    logoutButton.click();

    browser.sleep(5 * 1000);
  }, 600 * 1000)
});
