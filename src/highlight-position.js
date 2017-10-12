module.exports = function() {
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

  this.checkError = (error) => {
    const msg = error.message;
    let startingPoint = msg.indexOf('is not clickable at point');
    let endingPoint = msg.indexOf('. Other element would receive the click:');
    const offset = 26;

    const point = msg.slice(startingPoint + offset, endingPoint);

    // console.log(point);
    startingPoint = point.indexOf('(');
    endingPoint = point.indexOf(',');
    const top = point.slice(startingPoint + 1, endingPoint);
    startingPoint = point.indexOf(',');
    endingPoint = point.indexOf(')');
    const left = point.slice(startingPoint + 2, endingPoint);

    // console.log(`top='${top}' left='${left}'`);
    this.highlightPosition(left, top, 10);
  }

  this.highlightPosition = (top, left, duration) => {
    this.init();
    const script = `var a = document.createElement("div");\
    a.setAttribute("style",\
    "top: ${top}px;left: ${left}px;color: #FFFF00; outline: 5px dashed #FFFF00;\
    box-shadow: 0 0 0 5px #69D2E7; animation: 0.2s animateBorderOne ease infinite;\
    z-index: 5000; position: absolute; width: 20px; height: 20px;");\
    document.children[0].children[1].appendChild(a);
    a.innerHTML = '<img id="image-w3css" src="https://cdn4.iconfinder.com/data/icons/dot/256/arrow_up_left_2.png"\
    width="20px" height="20px">';
    setTimeout(function(){ a.remove(); }, ${duration} * 1000);`;
    browser.executeScript(script);
    return browser.sleep(duration * 1000);
  }
}
