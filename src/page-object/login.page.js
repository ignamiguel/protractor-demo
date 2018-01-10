const EC = require('protractor').ExpectedConditions;
const browser = require('protractor').browser;
const element = require('protractor').element;
const by = require('protractor').by;
const log4js = require('log4js');

module.exports = function LoginPage() {
  this.usernameField = element(by.id('username'));
  this.passwordField = element(by.id('password'));
  this.loginButton = element(by.css('[class=radius]'));
  this.headerLabel = element(by.css('[class="example"] h2'));
  this.logoutButton = element(by.css('[class="button secondary radius"]'));
  this.successLoginLabel = element(by.css('[class="flash success"]'));
  this.timeout = 600 * 1000;
  this.dreamTime = 5 * 1000;
  this.logger = {};
  
  this.with = (username, password) => {
    console.log(browser.mozartTest);
    this.logger = log4js.getLogger(browser.mozartTest.logName);
    browser.get('http://localhost:9292/login');
    browser.wait(EC.presenceOf(this.headerLabel));
    this.logger.info('FATURITA');

    browser.wait(EC.presenceOf(this.usernameField));
    browser.sleep(this.dreamTime);
    this.usernameField.sendKeys(username);
    this.passwordField.sendKeys(password);
    this.loginButton.click();
    browser.sleep(this.dreamTime);
  };

  this.logout = () => {
    this.logoutButton.click();
    browser.sleep(this.dreamTime);
  }
}
