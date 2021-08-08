"use strict";
import Trait from "./Traits.js";

class PendelumWalk extends Trait {
    constructor () {
        super('pendelumWalk');
        this.walkSpeed = 30;
        this.walkEnabled = true;
    }

    updateTrait (object, elapsedTime) {
        object.lifetime += elapsedTime;
        if (this.walkEnabled) {
            object.velocity.x = this.walkSpeed
        }
    }

    obstruct (object, side) {
        if (side === 'left') {   
            this.walkSpeed = -this.walkSpeed    // If the goomba hits the left side of a block its walk speed will be reversed
        }

        if (side == 'right') {
            this.walkSpeed = -this.walkSpeed    // If the goomba hits the right side of a block its walk speed will be reversed
        }
    }
}

export default PendelumWalk;