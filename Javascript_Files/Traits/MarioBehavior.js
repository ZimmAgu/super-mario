"use strict";

// Class Imports
import MusicPlayer from "../Classes/MusicPlayer.js";

// Trait Imports
import Trait from "./Traits.js";

class MarioBehavior extends Trait { 
    constructor () {
        super("behavior")

        this.state = 'alive'
    }

    collides (mario, otherCharacter) {

        if (mario.solid.obstructEnabled == false) {
            return;
        }

        if (mario.ableToDie.isDead) {
            this.handleDeath(mario, otherCharacter)
        }
    }


    handleDeath (mario, otherCharacter) {
        const music = new MusicPlayer();

        mario.velocity.y = -800;
        mario.solid.obstructEnabled = false;
    }
}

export default MarioBehavior;