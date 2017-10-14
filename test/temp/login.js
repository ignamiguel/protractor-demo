const timeout = 10 * 1000;

describe('Protractor DEMO', () => {
  it('should naviage the login page at "the-internet"', () => {
    browser.get('http://localhost:9292/login');
    browser.sleep(5 * 1000);
  }, timeout)
});

