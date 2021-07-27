"use strict";
import Trait from "./Traits.js";

class Jump extends Trait {
    constructor () {
        super('jump');

        this.duration = 0.5; // How long the jump lasts
        this.jumpVelocity = 200;
        this.engageTime = 0;
    }

    start () {
        this.engageTime = this.duration;
        console.log('Engage time ', this.engageTime)
    }


    updateTrait (object, elapsedTime) {
        if (this.engageTime > 0) {
            console.log('truuuuu')
            object.velocity.y = -this.jumpVelocity
            this.engageTime -= elapsedTime;
        }
    }
}

export default Jump;