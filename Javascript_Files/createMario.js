"use strict";
// Trait Imports
import Jump from "./Classes/jumpTrait.js";
import vectorUpdate from "./Classes/VectorTrait.js";

// Class Imports
import OnScreenObject from "./Classes/onScreenObjects.js";

// Javascript File Imports
import { loadMarioSprite } from "./loadSprites.js"


const GRAVITY = 2000;
function createMario () {
    return loadMarioSprite()
        .then(marioSprite => {
            const mario = new OnScreenObject(); 
            mario.addTrait(new Jump());  
            mario.addTrait(new vectorUpdate());
                   

            mario.position.setVector(64, 100);   // Sets the position of mario
            const positionOfMario = mario.position;

            mario.drawObject = (context) => {
                marioSprite.drawTheSprite('Normal Idle Mario', context, positionOfMario.x, positionOfMario.y);
            }

            return mario;
        })
}

export default createMario;