module.exports = function retry(retryFunction, element, errorsMatch, attempts = 4, timeBetweenAttempts = 10) {
    return retryFunction(element)
    .then((value) => value,
    (detectedError) => {
      console.log(`warning retry caused by --> '${detectedError.message}'`);
      console.log(`warning attempts --> '${attempts}'`);
      console.log(`warning detectedError.constructor.name --> ${detectedError.constructor.name}`);
      if (errorsMatch.indexOf(detectedError.constructor.name) >= 0) {
        if (attempts > 0) {
          console.log(`calling '${retryFunction}' again`);
          browser.sleep(timeBetweenAttempts);
          return retry(retryFunction, element, errorsMatch, attempts - 1, timeBetweenAttempts);
        }
      }
      throw detectedError;
    });
}; 
