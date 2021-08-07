"use strict";

// Class Imports
import BlockCollisions from "./BlockCollisions.js";
import CharacterCollisions from "./CharacterCollisions.js";
import LayeredImages from "./LayerTheImages.js";

class Level {
    constructor () {
        this.gravity = 1500;
        this.totalTime = 0;

        this.layer = new LayeredImages();
        this.objects = new Set(); // Sets are like maps but they don't allow duplicates to be added to it
        
        this.characterCollisions = new CharacterCollisions(this.objects);
        this.blockCollisions = null;
    }

    setCollisionGrid (matrix) {
        this.blockCollisions = new BlockCollisions(matrix)
    }

    updateLevel (refreshRate) {
        this.objects.forEach(object => {

            object.updateTrait(refreshRate);

            object.position.x += (object.velocity.x * refreshRate);
            this.blockCollisions.checkForX(object);

            object.position.y += (object.velocity.y * refreshRate);
            this.blockCollisions.checkForY(object);

            object.velocity.y += (this.gravity * refreshRate);
        })
        this.totalTime += refreshRate;
    }
}

export default Level;