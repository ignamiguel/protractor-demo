// navigation
const EC = require('protractor').ExpectedConditions;
const homeHeaderLabel = element(by.css('.heading'));
const loginHeaderLabel = element(by.css('[class="example"] h2'));
const abTestLabel = element(by.css('[class="example"] h3'));
const shortTimeout = 10000;
const timeout = 600 * 1000;
const dreamTime = 5 * 1000;
const homePageURL = 'http://localhost:9292/x';
const loginPageURL = 'http://localhost:9292/login';
const abTestPage = 'http://localhost:9292/abtest';

describe('"the-internet" Protractor Navigation', ()=> {
  describe('Test 1: Home Page', () => {
    it(`should navigate to "${homePageURL}"`, () => {
      browser.get(homePageURL);
      browser.wait(EC.presenceOf(homeHeaderLabel), shortTimeout);
      
      expect(homeHeaderLabel.getText()).toBe('Welcome to the-internet');
    }, timeout);
  });

  describe('Test 2: Login Page', () => {
    it(`should navigate to "${loginPageURL}"`, () => {
      browser.get(loginPageURL);
      browser.wait(EC.presenceOf(loginHeaderLabel), shortTimeout);
      
      expect(loginHeaderLabel.getText()).toBe('Login Page');
    }, timeout);
  });

  describe('Test 3: A/B Page', () => {
    it(`should navigate to "${abTestPage}"`, () => {
      browser.get(abTestPage);
      browser.wait(EC.presenceOf(abTestLabel), shortTimeout);
      
      expect(abTestLabel.getText()).toBe('No A/B Test');
    }, timeout);
  });
});
