"use strict";
// Trait Imports
import Move from "./Classes/MoveTrait.js";
import Jump from "./Classes/jumpTrait.js";
import VectorUpdate from "./Classes/VectorTrait.js";

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
            // mario.addTrait(new VectorUpdate());
                   

            mario.position.setVector(64, 100);   // Sets the position of mario
            const positionOfMario = mario.position;

            mario.drawObject = (context) => {
                marioSprite.drawTheSprite('Normal Idle Mario', context, 0, 0);
            }

            return mario;
        })
}

export default createMario;