"use strict";

// Class Imports
import Vector from "../Classes/Vector.js"

// Trait Imports
import Trait from "./Traits.js";

class PlayerControl extends Trait {
    constructor () {
        super('playerControl');
        this.player = null;
        this.enemies = [];
        this.checkPoint = new Vector(0, 0);
    }

    setPlayer (object) {        // Will be used to the player to Mario
        this.player = object;
    }

    setEnemies (enemies) {
        enemies.forEach(enemy => {
            this.enemies.push(enemy)
        })
    }

    updateTrait (object, elapsedTime, level) { 
        if (!level.objects.has(this.player)) {      // If the level no longer has a player
            level.countdown = 400;

            this.player.ableToDie.respawn(this.player);        // then the player is brought back to life 
            this.player.ableToDie.respawnEnemies(this.enemies);

            this.player.position.setVector(this.checkPoint.x, this.checkPoint.y);
            level.objects.add(this.player); 

            this.enemies.forEach(enemy => {
                const randomX = Math.floor(Math.random() * 6000) + 1000;
                enemy.position.setVector(randomX, 20);
                level.objects.add(enemy); 
            })
        } else {
            if (level.countdown > 1) {
                level.countdown -= (elapsedTime * 2);    // If there is still time to count down then count down
            } else {
                this.player.velocity.y = -800;
                this.player.ableToDie.dies();           // If the countdwon gets to 0 then mario dies;
                this.player.solid.obstructEnabled = false;
            }
        }
    }

    drawObject () {

    }
}

export default PlayerControl;