/**
 * TODO: build out and refacor this before adding features
 */


/**
*   TODO:::
*   IIFE to make for easy starting point, not sure the direction this is going to go.
*   things to add:
*   load OPTIONS from local storage
*   set up listeners to the popup.html for menu changes and events
*/

/*
*   prepareDom: Creates elements needed for the interface and injects them into the current tab
*/
(function prepareDom() {
  var canvasElement = document.createElement('canvas');
  canvasElement.id = "js-crosshair-canvas";
  canvasElement.width = window.width;
  canvasElement.height = window.height;
  document.body.appendChild(canvasElement);

  prepareInterface();
})();

/**
*  prepareInterface: main entry point for starting the interface
*   creates the interface object
*   creates the canvas object
*   adds event listeners fo the DOM
*   starts the interface animating and listening for events
* @param options: nothing specific for prepareInterface, see canvas.js/Canvas
*/
function prepareInterface(options) {
  var crossHair = new Interface({}),
      drawables = [crossHair],
      //TODO: get these from local storage
      options = {'drawables': drawables, 'canvas': document.getElementById('js-crosshair-canvas')},
      canvas = new Canvas(options);


  //  TODO: generalize the event emitter to keyboard/mouse
  // TODO: generalize the input as just 'start' 'stop'
  // todo hold onto timing states and whatnot inside of crosshair (do not create logic around input)
  document.addEventListener('mousedown', function () {
      crossHair.slow();
  });
  document.addEventListener("mouseup", function() {
      var value = crossHair.acceptInput();
      if (value) {
          document.elementFromPoint(value.x, value.y).click();
          crossHair.resetSpeed();
      }
  });

  canvas.startAnimating();
}
