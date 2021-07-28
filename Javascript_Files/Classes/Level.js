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

    updateLevel (refreshRate) {
        this.objects.forEach(object => {
            let gravity = 200;

            object.updateTrait(refreshRate);

            object.position.x += (object.velocity.x * refreshRate);
            this.brickCollider.checkForX(object);

            object.position.y += (object.velocity.y * refreshRate);
            object.velocity.y += (gravity * refreshRate);
            this.brickCollider.checkForY(object);
        })
    }
}

export default Level;