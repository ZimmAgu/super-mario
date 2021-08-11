"use strict";

// Trait Imports
import Trait from "./Traits.js";

class MarioBehavior extends Trait { 
    constructor () {
        super("behavior")
    }

    collides (mario, otherCharacter) {
        if (mario.ableToDie.isDead == true) {
            this.handleDeath(mario, otherCharacter);
        }
    }


    handleDeath (mario, otherCharacter) {
        mario.canCollide = false;
        mario.velocity.y = 200;
    }
}

export default MarioBehavior;