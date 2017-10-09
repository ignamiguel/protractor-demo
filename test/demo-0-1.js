// login not ok
const EC = require('protractor').ExpectedConditions;
const usernameField = element(by.id('username'));
const passwordField = element(by.id('password'));
const loginButton = element(by.css('[class=radius]'));
const headerLabel = element(by.css('[class="example"] h2'));
const logoutButton = element(by.css('[class="button secondary radius"]'));
const errorLabel = element(by.css('[class="flash error"]'));
const timeout = 600 * 1000;
const dreamTime = 5 * 1000;

describe('"the-internet" Protractor DEMO', ()=> {
  it('should navigate to login page', () => {
    browser.get('http://localhost:9292/login');
    browser.wait(EC.presenceOf(headerLabel));

    expect(headerLabel.getText()).toBe('Login Page');
  }, timeout);

  it('should show invalid user alert if no user or password are present', () => {
    browser.wait(EC.presenceOf(usernameField));
    browser.sleep(dreamTime);

    loginButton.click();
    browser.sleep(dreamTime);

    expect(errorLabel.isPresent()).toBe(true);
  }, timeout);
});
