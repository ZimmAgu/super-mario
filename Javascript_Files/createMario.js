"use strict";
// Trait Imports
import Move from "./Classes/MoveTrait.js";
import Jump from "./Classes/jumpTrait.js";

// Class Imports
import OnScreenObject from "./Classes/onScreenObjects.js";

// Javascript File Imports
import { loadSpriteSheet } from "./loadFunctions.js"
import { marioRunningRight, marioRunningLeft } from "./animations.js"

function createMario () {
    return loadSpriteSheet('mario') 
            .then(marioSprite => {
        const mario = new OnScreenObject(); 
        mario.size.setVector(32, 42.6);
        mario.addTrait(new Move())
        mario.addTrait(new Jump());  


        function routeFrame () {
            let sign = Math.sign(mario.move.movementDirection)

            if (mario.move.movementDirection === -1 && mario.velocity.x > 0) {  // Break animation runs if user abruptly turns left after going right
                return 'break facing left';
            }

            if (mario.move.movementDirection === 1 && mario.velocity.x < 0) { // Break animation runs if user abruptly turns right  after going left
                return 'break facing right';
            }

            if (mario.move.movementDirection !== 0 && sign === 1) {         // Mario running animation loops when user presses and holds the button to go right
                return marioRunningRight(mario.move.distance);
            } 

            if (mario.move.movementDirection !== 0 && sign === -1) {        // Mario running animation loops when user presses and holds the button to go left
                return marioRunningLeft(mario.move.distance);
            }


            if (mario.move.heading === 1) {

                if (mario.velocity.x > 0) {
                    return marioRunningRight(mario.move.distance); // Mario will take a couple of extra steps before stopping completely
                }

                return 'normal mario idle right'
            } else {
                if (mario.velocity.x < 0) {
                    return marioRunningLeft(mario.move.distance); // Mario will take a couple of extra steps before stopping completely
                }
                return 'normal mario idle left'
            }
        }       


        mario.position.setVector(64, 100);   // Sets the position of mario

        mario.drawObject = (context) => {
            marioSprite.drawTheSprite(routeFrame(this), context, 0, 0);
        }

        return mario;
    })
}

export default createMario;