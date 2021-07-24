// The responsibility of this class is just to draw all of the image layers in a specific order
"use strict";
class layeredImages {
    constructor () {
        this.imageLayers = []    // The drawnlayers will be pushed to this array
    }

    drawTheLayer (currentContext) {     // Will store all of the draw functions that are pushed here into the imageLayers array. This will result in the image being drawn to the screen.   
        this.imageLayers.forEach(layer => {
            layer(currentContext);      // The layer will be drawn on its own context defined in its own function
        })
    }
}

export default layeredImages;