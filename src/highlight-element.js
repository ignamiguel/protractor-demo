module.exports = function() {
  const defaultTimeout = 10000;
  this.started = false;

  this.init = () =>  {
    if (!this.started) {
      const createKeyFrameScript = `
      var style = document.createElement('style');\
      style.type = 'text/css';\
      var keyFrames = '\
      @keyframes animateBorderOne {\
          to {\
            outline-color: #FF0000;\
            box-shadow: 0 0 0 5px #E0E4CC;\
          }\
        }';
    style.innerHTML = keyFrames;
    document.getElementsByTagName('head')[0].appendChild(style);`;
      browser.executeScript(createKeyFrameScript);
      // this.started = true;
    }
  }

  this.highlightElement = (element, duration) => {
    if(duration == null) {
      duration = 2;
    }
    this.init();
    browser.wait(ExpectedConditions.elementToBeClickable(element), this.defaultTimeout);
    return element.getAttribute('style').then((originalStyle) => {
      browser.executeScript('arguments[0].setAttribute(arguments[1], arguments[2])',
      element.getWebElement(),
      'style',
      `color: #FFFF00;\
      outline: 5px dashed #FFFF00;\
      box-shadow: 0 0 0 5px #69D2E7;\
      animation: 0.2s animateBorderOne ease infinite`);

      browser.sleep(duration * 1000);

      return browser.executeScript('arguments[0].setAttribute(arguments[1], arguments[2])',
        element.getWebElement(),
        'style',
        originalStyle);
    });
  }
}
