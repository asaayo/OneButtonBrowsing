/**
*  TODO: should probably move menu constants
*/
'use strict';

var DEFAULT_SPEED = 3;
var DEFAULT_BOUNCE = false;  // should lines travel back across screen or wrap around screen
var DEFAULT_OFFSET = 0;
var DEFAULT_COLOR = '#000';
var DEFAULT_BORDER_SIZE = 0;
var DEFAULT_BORDER_COLOR = '#fff';
var DEFAULT_TRANSPARENCY = '1';  // how opaque to make lines and interface: 0 (transparent) to 1 (opaque)
var DEFAULT_CLICK_DELAY = 200;

var MENU_SETTINGS = [ //TODO: create menu to choose options and save in local storage
'speed',
'bounce',
'offset',
'color',

'outline_width',  // to help visibility on different backgrounds interface line gets sandwiched between lines
'outline_color',
'transparency'
];

/**
*
* @constructor
*/
function InterfaceLine(options) {
    if (!options) {
        options = {};
    }

    // how far up/down or left/right
    var value = 0,

    // how fast the lines scan
    speed = options.speed || DEFAULT_SPEED,

    // should the line be delayed or advanced
    offset = options.offset || DEFAULT_OFFSET,

    // what color is this line
    color = options.color || DEFAULT_COLOR,

    //
    orientation = options.orientation || 'x',

    /**
    *
    */
    getCoordinates = function (context, scanning) {
        if (scanning) {
            value += speed;
        }
        var startX = 0,
            startY = 0,
            endX = 0,
            endY = 0;

        if (orientation === 'x') {
            value %= context.canvas.width;
            startX = value;
            endX = value;
            endY = context.canvas.height;
        } else if (orientation === 'y') {
            value %= context.canvas.height;
            startY = value;
            endY = value;
            endX = context.canvas.width;
        } else {
            throw { name: 'BadOrientation', message: 'Incorrect orientation of "' + orientation + '" please use only "x" and "y"' };
        }
        return {
            'startX': startX,
            'endX': endX,
            'startY': startY,
            'endY': endY,
        }
    };

    /**
    *
    */
    this.get_value = function () {
        return value;
    };

    /**
    *
    */
    this.draw = function (context, scanning) {
        //TODO: make more general for multiple lines/colors/shapes?
        var coordinates = getCoordinates(context, scanning);
        context.beginPath();
        context.moveTo(coordinates.startX, coordinates.startY);
        context.lineTo(coordinates.endX, coordinates.endY);
        context.stroke();
    };

    /**
    *
    */
    this.hold = function () {
        value += offset;
        return this;
    };

    /**
    *
    */
    this.restart = function () {
        value = 0;
        return this;
    };

    this.slow = function () {
        console.log("slow called on " + orientation.toString());
        speed = speed / 2;
    }

    this.resetSpeed = function() {
        console.log("resetSpeed called");
        if (this.options && this.options.speed) {
            speed = this.options.speed;
        } else {
            speed = DEFAULT_SPEED;
        }
    }
}


/**
*
* @constructor
*/
function Interface(options) {
    if (!options) {
        options = {};
    }

    // an object holds both lines of the interface indexed by their orientation
    var lines = {
        'x': new InterfaceLine(Object.assign({ orientation: 'x' }, options)),
        'y': new InterfaceLine(Object.assign({ orientation: 'y' }, options))
    },

    // an event emitter is needed to notify the scan when to stop (the button)
    // emitter = options.emitter,

    // which direction is currently scanning
    activeOrientation = options.activeOrientation || 'x',

    //
    clickDelay = options.click_delay || DEFAULT_CLICK_DELAY;

    //emitter.on('signal', acceptInput());  // TODO: need to hook this guy up still

    /**
    *
    */
    this.get_value = function () {
        return {
            'x': lines['x'].get_value(),
            'y': lines['y'].get_value()
        }
    };

    /**
    *
    */
    this.draw = function (context) {
        lines['x'].draw(context, activeOrientation === 'x');
        lines['y'].draw(context, activeOrientation === 'y');
    };

    /**
    *  acceptInput is the function that receives input to stop the scrolling of the
    *  interface and select the coordinate (x or y).
    */
    this.acceptInput = function () {
        if (activeOrientation !== 'pause') {
            lines[activeOrientation].hold();
            stepActiveOrientation();
        }

        if (activeOrientation === 'pause') {
            return this.get_value();
        }
        return null;
    }

    /**
    *
    */
    function stepActiveOrientation() {
        if (activeOrientation === 'x') {
            activeOrientation = 'y';
        } else if (activeOrientation === 'y') {
            activeOrientation = 'pause';
            setTimeout(function () {
                forwardClick(lines['x'].get_value(), lines['y'].get_value());
            }, clickDelay);
        } else if (activeOrientation === 'pause') {

        } else {
            // TODO: exceptions
        }
    }

    /**
    *
    */
    function forwardClick (x, y) {
        var onscreen_keyboard = false;
        activeOrientation = 'x';
        lines['y'].restart();
        lines['x'].restart();
        // TODO: determine if on screen keyboard
        if (onscreen_keyboard) {
            // TODO: see if onscreen keyboard has an api
            // TODO: send keydown/keyup into canvas
        } else {
            // TODO: send x,y click into canvas
        }
    }

    this.slow = function () {
        console.log("calling slow on lines");
        if (activeOrientation === "x") lines["x"].slow();
        if (activeOrientation === "y") lines["y"].slow();
    }

    this.resetSpeed = function() {
        console.log("calling resetSpeed");
        lines["x"].resetSpeed();
        lines["y"].resetSpeed();
    }
}
