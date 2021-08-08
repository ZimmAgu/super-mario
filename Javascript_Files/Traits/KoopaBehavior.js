"use strict";

// Trait Imports
import Trait from "./Traits.js";

class KoopaBehavior extends Trait {
    constructor () {
        super('behavior')

        this.state = 'walking'
        this.hideTime = 0;
        this.hideDuration = 5;
    }

    collides (koopa, otherCharacter) {
        if (koopa.ableToDie.isDead == true) {
            return;    // If the koopa is already dead then mario can not bounce on it anymore
        }

        if (otherCharacter.stomp) {                     // Mario is the only character with a trait named stomp so the goomba will only react to a collision with mario. Not any other characters
            if (otherCharacter.velocity.y > koopa.velocity.y) {
                this.handleDeath(koopa, otherCharacter)
            } else {
                otherCharacter.ableToDie.dies();        // Mario dies if he collides with the koopa but he isn't falling
            }
        }
    }

    handleDeath (koopa, otherCharacter) {
        if (this.state == 'walking') {
            // koopa.ableToDie.dies();                // The koopas death trait will be set to true
            this.hideKoopa(koopa);
        }
    }

    hideKoopa (koopa) {
        koopa.velocity.x = 0;                   // Stops koopa from moving any further

        koopa.pendelumWalk.walkEnabled = false; // Sets the pendlum walks speed to 0

        this.state = 'hiding';

        this.hideTime = 0;
    }

    unhideKoopa (koopa) {
        koopa.pendelumWalk.walkEnabled = true;
        this.state = 'walking'
    }

    updateTrait (koopa, elapsedTime) {
        if (this.state === 'hiding') {
            this.hideTime += elapsedTime;

            if (this.hideTime > this.hideDuration) {
                this.unhideKoopa(koopa);
            }
        }
    }
}

export default KoopaBehavior;