/**
*  Canvas TODO: working title
*/
'use strict';

var DEFAULT_FRAMERATE = 30;

/**
* @constructor
* @param canvas: the html element that should be drawing (default: $('#canvas')[0])
* @param canvasContext: the context to draw to (default: derived from canvas)
* @param drawables: an array of objects to draw to the canvas each 'frame'. (default: [])
* @param framerate: how many times the canvas should be refreshed per second (default: DEFAULT_FRAMERATE)
* @param interval: how long should each frame last, this option will replace framerate (default: derived from framerate)
*/
function Canvas(options) {
  if (!options) {
    options = {};
  }

  //TODO: most(all?) of these params are just stuck in a closure, make them attached to the specific instance this.param =
  var canvasElement = options.canvas || document.getElementById('canvas'),
  canvasContext = options.canvasContext || canvasElement.getContext('2d'),
  drawables = options.drawables || [],
  framerate = options.framerate || DEFAULT_FRAMERATE,
  interval = options.interval || 1000 / framerate,

  //  will hold the JS.timeout interval to stop animating
  animationInterval = '';

  // TODO: specific hack for the interface, add option to enable auto resizing(full)
  window.onresize = function(event) {
    resize_full(canvasElement);
  }

  /**
  *   draw: erases the canvas then calls .draw(canvasContext) from each object in the drawables array
  */
  this.draw = function () {
    canvasContext.clearRect(0, 0, canvasElement.width, canvasElement.height);
    for(var i = 0; i < drawables.length; i++) {
      var toDraw = drawables[i];
      toDraw.draw(canvasContext);
    }
  }

  /**
  *   startAnimating: begins repeatedly calling draw() of 'this' every (interval) seconds
  *     it also updates the JS.interval
  */
  this.startAnimating = function () {
    // TODO: specific hack for the interface, add option to enable auto resizing(full)
    resize_full(canvasElement);
    animationInterval = setInterval(this.draw, interval);
  }

  /**
  *   stopAnimating: calls clearInterval on the JS.interval
  */
  this.stopAnimating = function () {
    clearInterval(animationInterval);
  }
}

/**
*   resize_full: will try to resize the drawable area to the full size of the viewport
* @param canvasElement: the canvas that needs to be resized
*/
function resize_full(canvasElement) {
  canvasElement.width = window.innerWidth;
  canvasElement.height = window.innerHeight;
};
