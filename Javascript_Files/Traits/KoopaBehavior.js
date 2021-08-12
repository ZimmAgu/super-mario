"use strict";

// Trait Imports
import Trait from "./Traits.js";

const KOOPATSTATE = {
    WALKING: 'walking',
    HIDING: 'hiding',
    PANIC: 'panic'
}

class KoopaBehavior extends Trait {
    constructor () {
        super('behavior')

        this.state = KOOPATSTATE.WALKING;
        this.hideTime = 0;
        this.hideDuration = 5;
        this.panicSpeed = 400;
    }

    collides (koopa, otherCharacter) {
        if (koopa.ableToDie.isDead == true) {
            return;    // If the koopa is already dead then mario can not bounce on it anymore
        }

      

        if (otherCharacter.stomp) {                     // Mario is the only character with a trait named stomp so the goomba will only react to a collision with mario. Not any other characters
            if (otherCharacter.solid.obstructEnabled == false) {
                return;
            }
             
            if (otherCharacter.velocity.y > koopa.velocity.y) {
                this.handleDeath(koopa, otherCharacter)
            } else {
                this.handleShellPush(koopa, otherCharacter);        // Mario dies if he collides with the koopa but he isn't falling
            }
        }
    }

    handleShellPush (koopa, otherCharacter) {
        if (this.state === KOOPATSTATE.WALKING) {       // If mario is on the ground and runs into a walking Koopa mario will die
            otherCharacter.ableToDie.dies(); 
        } 

        if (this.state === KOOPATSTATE.HIDING) {        // If maario is on the ground and runs into Koopa in a shell Koopa will go into panic mode and his shell will be pushed around the screen
            this.panicKoopa(koopa, otherCharacter);
        }

        if (this.state === KOOPATSTATE.PANIC) {         // If mario runs into Koopas shell when koopa is in panic mode mario will die
            const travelDirection = Math.sign(koopa.velocity.x);
            const impactDirection = Math.sign(koopa.position.x - otherCharacter.position.x)

            if (travelDirection !== 0 && travelDirection !== impactDirection) {
                otherCharacter.ableToDie.dies();   
            }
        }
    }

    handleDeath (koopa, otherCharacter) {
        if (this.state === KOOPATSTATE.WALKING) {       // If mario jumps on Koopa while Koopa is walking around Koopa will go into his shell 
            this.hideKoopa(koopa);
        } else if (this.state === KOOPATSTATE.HIDING) { // If mario jumps on Koopa while Koopa is in his shell Koopa dies
            koopa.velocity.setVector(200, -200);
            koopa.solid.obstructEnabled = false;
            koopa.ableToDie.dies();                
        } else if (this.state === KOOPATSTATE.PANIC) {  // If mario jumps on Koopas shell while hes in panic mode, Koopa goes back into regular hiding mode
            this.hideKoopa(koopa);
        }
    }

    panicKoopa (koopa, otherCharacter) {
        this.state = KOOPATSTATE.PANIC;
        koopa.pendelumWalk.walkEnabled = true; 
        koopa.pendelumWalk.walkSpeed = this.panicSpeed * Math.sign(otherCharacter.velocity.x);
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
        if (this.state === KOOPATSTATE.HIDING || this.state === KOOPATSTATE.PANIC ) {
            this.hideTime += elapsedTime;

            if (this.hideTime > this.hideDuration) {
                this.unhideKoopa(koopa);
                koopa.pendelumWalk.walkSpeed = 30 * Math.sign(koopa.pendelumWalk.walkSpeed);
            }
        }
    }
}

export default KoopaBehavior;