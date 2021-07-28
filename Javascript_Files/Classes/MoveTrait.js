"use strict";
import Trait from "./Traits.js";

class Move extends Trait {
    constructor () {
        super('move');

        this.movementDirection = 0; // How long the jump lasts
        this.movementSpeed = 4000;
    }

    updateTrait (object, elapsedTime) { // Holds all of the functionality of a jump
        object.velocity.x = this.movementSpeed * this.movementDirection * elapsedTime;
    }
}

export default Move;
