"use strict";
// Trait Imports
import Move from "./Classes/MoveTrait.js";
import Jump from "./Classes/jumpTrait.js";

// Class Imports
import OnScreenObject from "./Classes/onScreenObjects.js";

// Javascript File Imports
import { loadSpriteSheet } from "./loadFunctions.js"
import { routeFrame } from "./animations.js"

function createMario () {
    return loadSpriteSheet('mario') 
            .then(marioSprite => {
        const mario = new OnScreenObject(); 
        mario.size.setVector(32, 42.6);
        mario.addTrait(new Move())
        mario.addTrait(new Jump());  
      
        routeFrame(mario);

        mario.position.setVector(64, 100);   // Sets the position of mario

        mario.drawObject = (context) => {
            marioSprite.drawTheSprite(routeFrame(mario), context, 0, 0);
        }

        return mario;
    })
}

export default createMario;