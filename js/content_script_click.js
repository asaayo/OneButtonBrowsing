

// TODO: will probably be the receiver for the options now
// on option change send message to tab and update interface
// also save options in local storage
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.x && request.y) {
      document.elementFromPoint(request.x, request.y).click();
    }
    sendResponse({farewell: "clicking"});
  }
);
