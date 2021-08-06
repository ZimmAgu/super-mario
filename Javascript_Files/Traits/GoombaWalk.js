"use strict";
import Trait from "./Traits.js";

class GoombaWalk extends Trait {
    constructor () {
        super('goombaWalk');

        this.walkSpeed = 30;
    }

    updateTrait (object) {
        object.velocity.x = this.walkSpeed
    }
}

export default GoombaWalk