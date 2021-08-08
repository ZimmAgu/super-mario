"use strict";

// Trait Imports
import Trait from "./Traits.js";

const KOOPATSTATE = {
    WALKING: 'walking',
    HIDING: 'hiding'
}

class KoopaBehavior extends Trait {
    constructor () {
        super('behavior')

        this.state = KOOPATSTATE.WALKING;
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
                this.handleShellPush(koopa, otherCharacter);        // Mario dies if he collides with the koopa but he isn't falling
            }
        }
    }

    handleShellPush (koopa, otherCharacter) {
        if (this.state === KOOPATSTATE.WALKING) {
            otherCharacter.ableToDie.dies(); 
        } 

        if (this.state === KOOPATSTATE.HIDING) {
            koopa.pendelumWalk.walkEnabled = true; 
            koopa.pendelumWalk.walkSpeed = 400;
        }
    }

    handleDeath (koopa, otherCharacter) {
        if (this.state === KOOPATSTATE.WALKING) {
            this.hideKoopa(koopa);
        } else if (this.state === KOOPATSTATE.HIDING) {
            koopa.velocity.setVector(200, -200);
            koopa.canCollide = false;
            koopa.ableToDie.dies();                // The koopas death trait will be set to true
        }
    }

    hideKoopa (koopa) {
        koopa.velocity.x = 0;                   // Stops koopa from moving any further

        koopa.pendelumWalk.walkEnabled = false; // Sets the pendlum walks speed to 0
        
        this.state = KOOPATSTATE.HIDING;

        this.hideTime = 0;
    }

    unhideKoopa (koopa) {
        koopa.pendelumWalk.walkEnabled = true;
        this.state = KOOPATSTATE.WALKING
    }

    updateTrait (koopa, elapsedTime) {
        if (this.state === KOOPATSTATE.HIDING) {
            this.hideTime += elapsedTime;

            if (this.hideTime > this.hideDuration) {
                this.unhideKoopa(koopa);
                koopa.pendelumWalk.walkSpeed = 30;
            }
        }
    }
}

export default KoopaBehavior;