"use strict";

// Trait Imports
import Trait from "./Traits.js";

class GoombaBehavior extends Trait {
    constructor () {
        super('behavior')
    }

    collides (goomba, otherCharacter) {
        goomba.pendelumWalk.walkSpeed = 0;
    }
}

export default GoombaBehavior;