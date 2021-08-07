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
        this.characters = new Set(); // Sets are like maps but they don't allow duplicates to be added to it
        
        this.characterCollisions = new CharacterCollisions(this.characters);
        this.blockCollisions = null;
    }

    setCollisionGrid (matrix) {
        this.blockCollisions = new BlockCollisions(matrix)
    }

    updateLevel (refreshRate) {
        this.characters.forEach(character => {

            character.updateTrait(refreshRate);

            character.position.x += (character.velocity.x * refreshRate);
            this.blockCollisions.checkForX(character);

            character.position.y += (character.velocity.y * refreshRate);
            this.blockCollisions.checkForY(character);

            character.velocity.y += (this.gravity * refreshRate);
        })
        this.totalTime += refreshRate;
    }
}

export default Level;