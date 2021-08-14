"use strict";

// Trait Imports
import Trait from "./Traits.js";

class AbleToDie extends Trait {
    constructor () {
        super('ableToDie')
        this.isDead = false;
        
        this.timeOfDeath = 0;
        this.timeOfRemoval = 2.5;
    }

    dies () {
        this.queue(() => this.isDead = true);   // Queues a death to happen
    }

    respawn (character) {
        character.lives -= 1;
        console.log(character.lives);
        character.score = 0;
        character.solid.obstructEnabled = true;
        this.isDead = false;
        this.timeOfDeath = 0;
    }

    updateTrait (object, elapsedTime, level) {
        if (this.isDead) {
            this.timeOfDeath += elapsedTime
            if (this.timeOfDeath > this.timeOfRemoval) {
                this.queue(() => {
                    level.objects.delete(object); 
                })
            }
        }
    }
}

export default AbleToDie;