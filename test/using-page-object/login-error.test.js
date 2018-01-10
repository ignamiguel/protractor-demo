// login error
const LoginPage = require('../../src/page-object/login.page');
const loginPage = new LoginPage();
const headerLabel = element(by.css('[class="example"] h2'));
const errorLabel = element(by.css('[class="flash error"]'));
const timeout = 600 * 1000;
const dreamTime = 5 * 1000;

describe('"the-internet" Protractor DEMO using page object', ()=> {

  it('should show invalid user alert if no user or password are present', () => {
    browser.mozartTest = { 
      name: 'LOGIN ERROR',
      logName: 'loginError'
    };
    loginPage.with('', '');

    expect(errorLabel.isPresent()).toBe(true);
  }, timeout);
});
