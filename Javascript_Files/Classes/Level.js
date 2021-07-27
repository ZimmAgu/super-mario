"use strict";

import LayeredImages from "./layerTheImages.js";

class Level {
    constructor () {
        this.layer = new LayeredImages();
        this.objects = new Set(); // Sets are like maps but they don't allow duplicates to be added to it
    }
}

export default Level;