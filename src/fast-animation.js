module.exports = function () {
  const noAnimationScript = `var a = document.createElement('style');
                                    a.innerHTML = '* { animation-duration: 0.3s!important }';
                                    document.body.appendChild(a);`;
  return browser.executeScript(noAnimationScript);
}
