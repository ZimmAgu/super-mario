"use strict";
import Trait from "./Traits.js";

class GoombaWalk extends Trait {
    constructor () {
        super('goombaWalk');

        this.walkSpeed = 30;
    }

    updateTrait (object, elapsedTime) {
        object.lifetime += elapsedTime;
        object.velocity.x = this.walkSpeed
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

export default GoombaWalk