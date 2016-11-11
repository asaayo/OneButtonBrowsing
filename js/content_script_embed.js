/**
 * TODO: build out and refacor this before adding features
 */
function prepareDom() {
    var canvasElement = document.createElement('canvas');
    canvasElement.id = "js-crosshair-canvas";
    canvasElement.width = window.width;
    canvasElement.height = window.height;
    document.body.appendChild(canvasElement);

    prepareInterface();
}

function prepareInterface() {
    var crossHair = new Interface({}),
        drawables = [crossHair],
        canvas = new Canvas({ 'drawables': drawables, 'canvas': document.getElementById('js-crosshair-canvas') });

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

prepareDom();
/**
* Main loop outline
 * initalize canvas as transparent and resize to active tab
 * initalize interfaces
 * start scanning on x axis
 * await input event
    * on input
    * record x axis value
 * start scanning y axis
 * await input event
    * on input
    * record y axis value
    * send x and y values to tab as a click
    * set x and y values to zero
*/
