"use strict";
// Trait Imports
import Move from "./Classes/MoveTrait.js";
import Jump from "./Classes/jumpTrait.js";

// Class Imports
import OnScreenObject from "./Classes/onScreenObjects.js";

// Javascript File Imports
import { loadMarioSprite } from "./loadSprites.js"


const GRAVITY = 2000;
function createMario () {
    return loadMarioSprite()
        .then(marioSprite => {
            const mario = new OnScreenObject(); 
            mario.size.setVector(32, 42.6);
            mario.addTrait(new Move())
            mario.addTrait(new Jump());  


            const marioFrames = [
                'normal mario run1',
                'normal mario run2',
                'normal mario run3'
            ]
            
            
            function routeFrame () {
                if (mario.move.movementDirection !== 0) {
                    console.log(Math.floor(mario.move.distance / 10)  % marioFrames.length);
                    const currentFrame = Math.floor(mario.move.distance / 10)  % marioFrames.length;
                    return marioFrames[currentFrame];
                } 

                return 'normal mario idle'
            }       


            mario.position.setVector(64, 100);   // Sets the position of mario
            const positionOfMario = mario.position;

            mario.drawObject = (context) => {
                marioSprite.drawTheSprite(routeFrame(this), context, 0, 0);
            }

            return mario;
        })
}

export default createMario;