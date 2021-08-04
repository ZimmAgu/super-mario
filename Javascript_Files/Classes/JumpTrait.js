"use strict";
import Trait from "./Traits.js";

class Jump extends Trait {
    constructor () {
        super('jump');

        this.jumpIsReady = false;
        this.duration = 0.5; // How long the jump lasts
        this.jumpVelocity = 200;
        this.engageTime = 0;

        this.requestTime = 0;   // The request time and the grace period give the user a certain amount of time before the land on the ground to press the jump button again & trigger another jump
        this.gracePeriod = 0.1;
    }

    startJump () {  // Triggers the jump functionality defined in the updateTrait function below 
        this.requestTime = this.gracePeriod;
    }

    cancelJump () {
        this.engageTime = 0;    //Cancels the jump
        this.requestTime = 0;
    }

    obstruct (object, side) {
        if (side === 'bottom') {    // When mario is touching the ground then he is given the ability to jump
            this.jumpIsReady = true;
        }

        if (side == 'top') {
            console.log('jump cancelled')
            this.cancelJump()
        }
    }


    updateTrait (object, elapsedTime) {             // Holds all of the functionality of a jump

        if (this.requestTime > 0) {                 // If the jump button is pressed  and the user is in the air then the jump funcitonality is triggered 
            if (this.jumpIsReady) {
                this.engageTime = this.duration;    // Starts the jump by giving the update function the condition to change the velocity
                this.requestTime = 0;
            }

            this.requestTime -= elapsedTime;        // Eventually sets the request time back to 0
        }

        if (this.engageTime > 0) {
            object.velocity.y = -this.jumpVelocity
            this.engageTime -= elapsedTime;
        }

        this.jumpIsReady = false;
    }
}

export default Jump;
