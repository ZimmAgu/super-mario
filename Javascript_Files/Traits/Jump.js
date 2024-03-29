"use strict";
import Trait from "./Traits.js";

class Jump extends Trait {
    constructor () {
        super('jump');

        this.jumpIsReady = false;
        this.duration = 0.3; // How long the jump lasts
        this.jumpVelocity = 350;
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

        if (side == 'top') {        // If mario hits his head on a block then his jump is cancaled and he returns back to the ground
            this.cancelJump()
        }
    }


    updateTrait (object, elapsedTime) {             // Holds all of the functionality of a jump
        if (this.requestTime > 0) {                 // If the jump button is pressed  and the user is in the air then the jump funcitonality is triggered 
            if (this.jumpIsReady) {
                object.audio.playAudio('jump');       // When mario jumps a jump sound effect will play
                this.engageTime = this.duration;    // Starts the jump by giving the update function the condition to change the velocity
                this.requestTime = 0;
            }

            this.requestTime -= elapsedTime;        // Eventually sets the request time back to 0
        }

        if (this.engageTime > 0) {
            const absoluteObjectVelocity = Math.abs(object.velocity.x);
            const SPEEDBOOST = 0.3;


            object.velocity.y = -(this.jumpVelocity + absoluteObjectVelocity * SPEEDBOOST);  // Mario will jump higher when he has more speed to run
            this.engageTime -= elapsedTime;
        }

        this.jumpIsReady = false;
    }
}

export default Jump;
