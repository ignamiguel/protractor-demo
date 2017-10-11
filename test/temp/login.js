const timeout = 10 * 1000;

describe('DEMO Protractor', () => {
  it('should navigate to login page at "the-internet"', () => {
    browser.get('http://localhost:9292/login');
    browser.sleep(timeout);
    
    expect().toBe();
  });
});
