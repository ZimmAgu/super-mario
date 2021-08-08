"use strict";

// Trait Imports
import Trait from "./Traits.js";

class KoopaBehavior extends Trait {
    constructor () {
        super('behavior')
    }

    collides (koopa, otherCharacter) {
        if (koopa.ableToDie.isDead == true) {
            return;    // If the goomba is already dead then mario can not bounce on it anymor
        }

        if (otherCharacter.stomp) {                     // Mario is the only character with a trait named stomp so the goomba will only react to a collision with mario. Not any other characters
            if (otherCharacter.velocity.y > koopa.velocity.y) {
                koopa.pendelumWalk.walkSpeed = 0;      // The goomba will stop in place
                koopa.ableToDie.dies();                // The goombas death trait will be set to true
                otherCharacter.stomp.bounceUpward()    
            } else {
                otherCharacter.ableToDie.dies();        // Mario dies if he collides with the goomba but he isn't falling
            }
        }
    }
}

export default KoopaBehavior;