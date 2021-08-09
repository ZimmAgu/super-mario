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
            object.updateTrait(refreshRate, this);

            object.position.x += (object.velocity.x * refreshRate);

            if (object.canCollide) {
                this.blockCollisions.checkForX(object);
            }
            

            object.position.y += (object.velocity.y * refreshRate);

            if (object.canCollide) {
                this.blockCollisions.checkForY(object);
            }
            


            object.velocity.y += (this.gravity * refreshRate);
        })

        this.objects.forEach(object => {
            if (object.canCollide) {
                this.characterCollisions.checkForCharacter(object); // All of the character collisions need to be updated at the same time so this was moved to a seperate loop
            }
        })

        this.objects.forEach(object => {
            object.finalize();  // All of the task it the Traits queue are ran at this moment
        })



        this.totalTime += refreshRate;
    }
}

export default Level;