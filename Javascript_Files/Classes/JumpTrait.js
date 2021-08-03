"use strict";
import Trait from "./Traits.js";

class Jump extends Trait {
    constructor () {
        super('jump');

        this.jumpIsReady = false;
        this.duration = 0.5; // How long the jump lasts
        this.jumpVelocity = 100;
        this.engageTime = 0;
    }

    startJump () {
        if (this.jumpIsReady) {
            this.engageTime = this.duration;    // Starts the jump by giving the update function the condition to change the velocity
        }
    }

    cancelJump () {
        this.engageTime = 0;    //Cancels the jump
    }

    obstruct (object, side) {
        if (side === 'bottom') {    // When mario is touching the ground then he is given the ability to jump
            this.jumpIsReady = true;
        }
    }


    updateTrait (object, elapsedTime) { // Holds all of the functionality of a jump
        console.log('can jump? ', this.ready)

        if (this.engageTime > 0) {
            object.velocity.y = -this.jumpVelocity
            this.engageTime -= elapsedTime;
        }

        this.jumpIsReady = false;
    }
}

export default Jump;
