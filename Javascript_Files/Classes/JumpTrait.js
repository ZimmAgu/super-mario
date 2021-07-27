"use strict";
import Trait from "./Traits.js";

class Jump extends Trait {
    constructor () {
        super('jump');

        this.duration = 0.5; // How long the jump lasts
        this.jumpVelocity = 1000;
        this.engageTime = 0;
    }

    startJump () {
        this.engageTime = this.duration;    // Starts the jump by giving the update function the condition to change the velocity
        console.log('Jump started');
    }

    cancelJump () {
        this.engageTime = 0;    //Cancels the jump
        console.log('Jump cancelled');
    }


    updateTrait (object, elapsedTime) { // Holds all of the functionality of a jump
        if (this.engageTime > 0) {
            console.log('truuuuu')
            object.velocity.y = -this.jumpVelocity
            this.engageTime -= elapsedTime;
        }
    }
}

export default Jump;
