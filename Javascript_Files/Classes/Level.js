"use strict";
import BlockCollider from "./BlockCollider.js";
import LayeredImages from "./layerTheImages.js";
import Matrix from "./Matrix.js";

class Level {
    constructor () {
        this.layer = new LayeredImages();
        this.objects = new Set(); // Sets are like maps but they don't allow duplicates to be added to it
        this.blocks = new Matrix();
        
        this.blockCollider = new BlockCollider(this.blocks);
    }

    updateLevel (refreshRate) {
        this.objects.forEach(object => {
            let gravity = 200;

            object.updateTrait(refreshRate);

            object.position.x += (object.velocity.x * refreshRate);
            this.blockCollider.checkForX(object);

            object.position.y += (object.velocity.y * refreshRate);
            object.velocity.y += (gravity * refreshRate);
            this.blockCollider.checkForY(object);
        })
    }
}

export default Level;