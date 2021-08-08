"use strict";

// Trait Imports
import Trait from "./Traits.js";

class AbleToDie extends Trait {
    constructor () {
        super('ableToDie')
        this.isDead = false;
        
        this.timeOfDeath = 0;
        this.timeOfRemoval = 2;
    }

    dies () {
        this.isDead = true;
    }

    updateTrait (object, elapsedTime, level) {
        if (this.isDead) {
            this.timeOfDeath += elapsedTime

            if (this.timeOfDeath > this.timeOfRemoval) {
                level.objects.delete(object);
            }
        }
    }
}

export default AbleToDie;