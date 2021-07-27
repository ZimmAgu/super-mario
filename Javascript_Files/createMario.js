"use strict";
// Trait Imports
import Jump from "./Classes/jumpTrait.js";
import vectorUpdate from "./Classes/VectorTrait.js";

// Class Imports
import OnScreenObject from "./Classes/onScreenObjects.js";

// Javascript File Imports
import { loadMarioSprite } from "./loadSprites.js"
import { drawSpriteLayer } from "./loadSprites.js"


const GRAVITY = 2000;
function createMario () {
    return loadMarioSprite()
        .then(marioSprite => {
            const mario = new OnScreenObject(); 
            mario.addTrait(new vectorUpdate());
            mario.addTrait(new Jump());         

            mario.position.setVector(64, 100);   // Sets the position of mario
            const positionOfMario = mario.position;

            mario.drawMario = (context) => {
                return drawSpriteLayer(marioSprite, 'Normal Idle Mario', context, positionOfMario);
            }

            return mario;
        })
}

export default createMario;