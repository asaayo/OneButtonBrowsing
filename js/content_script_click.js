chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.x && request.y) {
      document.elementFromPoint(request.x, request.y).click();
    }
    sendResponse({farewell: "clicking"});
  }
);
