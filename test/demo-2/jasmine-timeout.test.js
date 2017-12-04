let e = 5;

describe("Jasmine timeout", () => {
  it("Default timeout should be 123000", () => {
    const expectedTimeout = 123000;
    const actualTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    console.log(jasmine.DEFAULT_TIMEOUT_INTERVAL);
    expect(actualTimeout).toBe(expectedTimeout);
  });

  it("Should pass with deferred function after 2 seconds", (done) => {
    const awake = (done) => done();

    setTimeout(() => awake(done), 2000);
  
    expect(true).toBe(true);
  });

  it("Should fail with deferred function after 2 seconds changing specific timeout to 1 millisecond", (done) => {
    const awake = (done) => done();

    setTimeout(() => awake(done), 2000);
  
    expect(true).toBe(true);
  }, 1);
});
