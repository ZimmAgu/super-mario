"use strict";

// Trait Imports
import Trait from "./Traits.js";

class PlayerControl extends Trait {
    constructor () {
        super('playerControl');

        this.player = null
    }

    setPlayer (object) {        // Will be used to the player to Mario
        this.player = object;
    }

    updateTrait (object, elapsedTime, level) { 
        if (!level.objects.has(this.player)) {      // If the level no longer has a player
            this.player.ableToDie.respawn();        // then the player is brought back to life 
            this.player.position.setVector(0, 0); // and the player is sent back to the starting point
            level.objects.add(this.player); 
        } 
    }

    drawObject () {

    }
}

export default PlayerControl;