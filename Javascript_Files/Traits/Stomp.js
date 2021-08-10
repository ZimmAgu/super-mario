"use strict";
import Trait from "./Traits.js";

class Stomp extends Trait {
    constructor () {
        super('stomp');
        this.bounceSpeed = 1000;
        this.score = 0
    }

    bounceUpward (mario, otherCharacter) {
        mario.hitbox.bottom = otherCharacter.hitbox.top;
        mario.velocity.y += -this.bounceSpeed;
    }

    collides (mario, otherCharacter) {
        if (!otherCharacter.ableToDie || otherCharacter.ableToDie.isDead) {
            return;
        }

        if (mario.velocity.y > otherCharacter.velocity.y) {
            this.score += 100;
            this.bounceUpward(mario, otherCharacter);   
        }
    }

}

export default Stomp;