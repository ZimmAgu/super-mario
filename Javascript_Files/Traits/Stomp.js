"use strict";
import Trait from "./Traits.js";

class Stomp extends Trait {
    constructor () {
        super('stomp');
        this.bounceSpeed = 500;
    }

    bounceUpward (mario, otherCharacter) {
        mario.hitbox.bottom = otherCharacter.hitbox.top;
        mario.velocity.y += -this.bounceSpeed;
    }

    collides (mario, otherCharacter) {
        if (otherCharacter.ableToDie && mario.velocity.y > otherCharacter.velocity.y) {
            this.bounceUpward(mario, otherCharacter);
        }
    }

    updateTrait (object) {
        if (this.bounce) {
            object.velocity.y = -this.bounceSpeed; // If the bounce method is called the object will fly upward at bounceSpeed
            this.bounce = false
        }
    }
}

export default Stomp;