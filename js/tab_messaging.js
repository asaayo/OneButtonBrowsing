// TODO: will be the sender receiver for the options and browser_actions now
// on option change, send message to tab and update interface
// also save options in local storage

//TODO: listen for the 'button' messages back, forward, favorites
'use strict';

document.addEventListener('DOMContentLoaded', function() {

  //TODO: catch other active events? back/forward/url/etc?
  chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log(sender.tab ?
                    "from a content script:" + sender.tab.url :
                    "from the extension");
        if (request.message)
            console.log(request.message);
    }
  );
});
