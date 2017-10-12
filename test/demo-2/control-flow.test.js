// Login ok
const EC = require('protractor').ExpectedConditions;
const promise = require('protractor').promise;
const usernameField = element(by.id('username'));
const passwordField = element(by.id('password'));
const loginButton = element(by.css('[class=radius]'));
const headerLabel = element(by.css('[class="example"] h2'));
const logoutButton = element(by.css('[class="button secondary radius"]'));
const successLoginLabel = element(by.css('[class="flash success"]'));
const timeout = 600 * 1000;
const dreamTime = 3 * 1000;

describe('Protractor DEMO with ControlFlow off', ()=> {
  beforeAll(()=> {
    // Disable the Control Flow in config
    console.log(`promise.USE_PROMISE_MANAGER=${promise.USE_PROMISE_MANAGER}`);
  }, timeout);

  // it('should navigate to login page', () => {
  //   return browser.get('http://localhost:9292/login')
  //   .then(_ => browser.wait(EC.presenceOf(headerLabel))
  //   .then(_ => expect(headerLabel.getText()).toBe('Login Page'))
  //   );
  // }, timeout);

  it('should navigate to login page', async () => {
    await browser.get('http://localhost:9292/login');
    await browser.wait(EC.presenceOf(headerLabel));
    await expect(headerLabel.getText()).toBe('Login Page');
  }, timeout);

  it('should login with user and password', () => {
    return browser.wait(EC.presenceOf(usernameField))
    .then(_ => browser.sleep(dreamTime))
    .then(_ => usernameField.sendKeys('tomsmith'))
    .then(_ => passwordField.sendKeys('SuperSecretPassword!'))
    .then(_ => loginButton.click())
    .then(_ => browser.sleep(dreamTime))
    .then(_ => expect(successLoginLabel.isPresent()).toBe(true));
  }, timeout);

  it('should logout', () => {
    return logoutButton.click()
    .then(_ => browser.sleep(dreamTime))
    .then(_ => expect(headerLabel.getText()).toBe('Login Page'));s
  }, timeout);
});
