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


            const marioRunningRight = createAnimation(
                                        [
                                            'normal mario run right 1',
                                            'normal mario run right 2',
                                            'normal mario run right 3'
                                        ], 
                                        10
                                    )

            const marioRunningLeft = createAnimation(
                                        [
                                            'normal mario run left 1',
                                            'normal mario run left 2',
                                            'normal mario run left 3'
                                        ],
                                        10
                                    )
            
            
            function routeFrame () {
                let sign = Math.sign(mario.move.movementDirection)
                let previousSign = 0
                
                if (mario.move.movementDirection !== 0 && sign === 1) {
                    previousSign = sign;
                    
                    // console.log(mario.move.movementDirection % marioFrames.length)
                    return marioRunningRight(mario.move.distance)
                } 

                if (mario.move.movementDirection !== 0 && sign === -1) {
                    previousSign = sign;

                    return marioRunningLeft(mario.move.distance)
                }
               

                return 'normal mario idle right'
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