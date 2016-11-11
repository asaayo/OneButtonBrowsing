/**
*
*/
'use strict';

var DEFAULT_FRAMERATE = 30;

/**
*
* @constructor
*/
function Canvas(options) {
    if (!options) {
        options = {};
    }

    //
    var canvasElement = options.canvas || document.getElementById('canvas'),

    //
    canvasContext = options.canvasContext || canvasElement.getContext('2d'),

    //
    drawables = options.drawables || [],

    //
    framerate = options.framerate || DEFAULT_FRAMERATE,

    //
    interval = options.interval || 1000 / framerate,

    //
    animationInterval = '';

    /**
    *
    */
    function resize_full() {
        canvasElement.width = window.innerWidth;
        canvasElement.height = window.innerHeight;
    };

    /**
    *
    */
    window.onresize = function (event) {
        resize_full();
    }

    /**
    *
    */
    this.draw = function () {
        canvasContext.clearRect(0, 0, canvasElement.width, canvasElement.height);
        for (var i = 0; i < drawables.length; i++) {
            var toDraw = drawables[i];
            toDraw.draw(canvasContext);
        }
    }

    /**
    *
    */
    this.startAnimating = function () {
        resize_full();
        animationInterval = setInterval(this.draw, interval);
    }

    /**
    *
    */
    this.stopAnimating = function () {
        clearInterval(animationInterval);
    }
}
