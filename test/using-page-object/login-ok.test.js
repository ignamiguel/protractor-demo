// Login ok
const LoginPage = require('../../src/page-object/login.page');
const loginPage = new LoginPage();
const successLoginLabel = element(by.css('[class="flash success"]'));
const headerLabel = element(by.css('[class="example"] h2'));
const timeout = 600 * 1000;
const dreamTime = 5 * 1000;

describe('"the-internet" Protractor DEMO using page object', ()=> {

  it('should login with user and password', () => {
    browser.mozartTest = { 
      name: 'LOGIN OK',
      logName: 'loginOK'
    };
    loginPage.with('tomsmith', 'SuperSecretPassword!');

    expect(successLoginLabel.isPresent()).toBe(true, 'the success login label is not present');
  }, timeout);

  it('should logout', () => {
    loginPage.logout();

    expect(headerLabel.getText()).toBe('Login Page');
  }, timeout);
});
