const EC = require('protractor').ExpectedConditions;
const usernameField = element(by.id('username'));
const passwordField = element(by.id('password'));
const loginButton = element(by.css('[class=radius]'));
const headerLabel = element(by.css('[class="example"] h2'));
const successLoginLabel = element(by.css('[class="flash success"]'));

describe('"the-internet" Protractor DEMO', ()=> {
  it('should navigate to login page', () => {
    browser.get('http://localhost:9292/login');
    browser.wait(EC.presenceOf(headerLabel));

    expect(headerLabel.getText()).toBe('Login Page');
  }, 600 * 1000);

  it('should login with user and password', () => {
    browser.wait(EC.presenceOf(usernameField));
    browser.sleep(5 * 1000);
    usernameField.sendKeys('tomsmith');
    passwordField.sendKeys('SuperSecretPassword!');

    loginButton.click();
    browser.sleep(5 * 1000);

    expect(successLoginLabel.isPresent()).toBe(true);
  });
});
