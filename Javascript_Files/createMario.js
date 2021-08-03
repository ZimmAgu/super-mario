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
            
            if (mario.move.movementDirection !== 0 && sign === 1) {
                return marioRunningRight(mario.move.distance);
            } 

            if (mario.move.movementDirection !== 0 && sign === -1) {
                return marioRunningLeft(mario.move.distance);
            }


            if (mario.move.heading === 1) {
                if (mario.velocity.x > 0) {
                    return marioRunningRight(mario.move.distance);
                }

                return 'normal mario idle right'
            } else {
                if (mario.velocity.x < 0) {
                    return marioRunningLeft(mario.move.distance);
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