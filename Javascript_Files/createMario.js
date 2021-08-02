"use strict";
// Trait Imports
import Move from "./Classes/MoveTrait.js";
import Jump from "./Classes/jumpTrait.js";

// Class Imports
import OnScreenObject from "./Classes/onScreenObjects.js";

// Javascript File Imports
import { loadMarioSprite } from "./loadSprites.js"

function createAnimation (allFrames, frameLength) {
    return (distance) => {
        const currentFrame = Math.floor(distance / frameLength)  % allFrames.length;
        const frames = allFrames[currentFrame];
        return frames 
    }
}

function createMario () {
    return loadMarioSprite()
        .then(marioSprite => {
            const mario = new OnScreenObject(); 
            mario.size.setVector(32, 42.6);
            mario.addTrait(new Move())
            mario.addTrait(new Jump());  


            const marioFrames = createAnimation([
                                    'normal mario run1',
                                    'normal mario run2',
                                    'normal mario run3'
                                    ], 
                                    10
                                )
            
            
            function routeFrame () {
                if (mario.move.movementDirection !== 0) {
                    return marioFrames(mario.move.distance)
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