"use strict";

// Trait Imports
import Trait from "./Traits.js";

class GoombaBehavior extends Trait {
    constructor () {
        super('behavior')
    }

    collides (goomba, otherCharacter) {
        if (otherCharacter.stomp) {                 // Mario is the only character with a trait named stomp so the goomba will only react to a collision with mario. Not any other characters
            goomba.pendelumWalk.walkSpeed = 0;      // The goomba will stop in place
            goomba.ableToDie.dies();                // The goombas death trait will be set to tru
            otherCharacter.stomp.bounceUpward()
        }
    }
}

export default GoombaBehavior;