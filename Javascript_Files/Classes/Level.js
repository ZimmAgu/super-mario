"use strict";
import BlockCollider from "./BlockCollider.js";
import LayeredImages from "./layerTheImages.js";
import Matrix from "./Matrix.js";

class Level {
    constructor () {
        this.gravity = 200;
        this.totalTime = 0;

        this.layer = new LayeredImages();
        this.objects = new Set(); // Sets are like maps but they don't allow duplicates to be added to it
        this.blocks = new Matrix();
        
        this.blockCollider = new BlockCollider(this.blocks);
    }

    updateLevel (refreshRate) {
        this.objects.forEach(object => {

            object.updateTrait(refreshRate);

            object.position.x += (object.velocity.x * refreshRate);
            this.blockCollider.checkForX(object);

            object.position.y += (object.velocity.y * refreshRate);
            object.velocity.y += (this.gravity * refreshRate);
            this.blockCollider.checkForY(object);
        })
        this.totalTime += refreshRate;
    }
}

export default Level;