"use strict";
import BrickCollider from "./BrickCollider.js";
import LayeredImages from "./layerTheImages.js";
import Matrix from "./Matrix.js";

class Level {
    constructor () {
        this.layer = new LayeredImages();
        this.objects = new Set(); // Sets are like maps but they don't allow duplicates to be added to it
        this.bricks = new Matrix();
        
        this.brickCollider = new BrickCollider(this.bricks);
    }
}

export default Level;