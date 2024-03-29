"use strict";

import CurrentPlayer from "./CurrentPlayer.js";
// Class Imports
import Level from "../Classes/Level.js"

// Javascript File Imports
import {findPlayers} from "../playerSpawn.js"

// Trait Imports
import Trait from "./Traits.js";



function getCurrentPlayer (level) {
    for (const object of findPlayers(level)) {
        return object.player;
    }
}



class Stomp extends Trait {
    constructor () {
        super('stomp');
        this.bounceSpeed = 1000;
        this.enemyStomped = false;
    }

    bounceUpward (mario, otherCharacter) {
        mario.hitbox.bottom = otherCharacter.hitbox.top;
        mario.velocity.y += -this.bounceSpeed;
    }

    collides (mario, otherCharacter) {
        if (!otherCharacter.ableToDie || otherCharacter.ableToDie.isDead) {
            return;
        }

        if (mario.solid.obstructEnabled == false) {
            return;
        }

        if (mario.velocity.y > otherCharacter.velocity.y) {
            mario.player.score += 100;
            this.bounceUpward(mario, otherCharacter);   
            this.enemyStomped = true;
        }
    }


    updateTrait (object, elapsedTime) {
        if (this.enemyStomped) {
            object.audio.playAudio('stomp');
            this.enemyStomped = false;
        }
    }

}

export default Stomp;