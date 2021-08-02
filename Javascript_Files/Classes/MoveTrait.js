"use strict";
import Trait from "./Traits.js";

class Move extends Trait {
    constructor () {
        super('move');

        this.movementDirection = 0; // How long the jump lasts
        this.movementSpeed = 6000;  // How fast mario moves

        this.distance = 0;
        this.heading = 1;
    }

    updateTrait (object, elapsedTime) { // Holds all of the functionality of a jump
        object.velocity.x = this.movementSpeed * this.movementDirection * elapsedTime;

        if (this.movementDirection) { // If the character is moving, then the distance variable is incremented up regardless of what direction the character is moving in
            this.heading = this.movementDirection;
            this.distance += Math.abs(object.velocity.x) * elapsedTime;
        } else {    // If the character is not moving, the distance gets reset to 0
            this.distance = 0;
        }
        
    }
}

export default Move;
