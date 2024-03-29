// The responsibility of this class is just to draw all of the image layers in a specific order
"use strict";
class LayeredImages {
    constructor () {
        this.imageLayers = []    // The drawnlayers will be pushed to this array
    }

    drawTheLayers (currentContext, camera) {     // Will store all of the draw functions that are pushed here into the imageLayers array. This will result in the image being drawn to the screen.   
        this.imageLayers.forEach(layer => {
            layer(currentContext, camera);      // The layer will be drawn on its own context defined in its own function
        })
    }
}

export default LayeredImages;
