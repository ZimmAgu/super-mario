"use strict";
// Trait Imports
import Move from "./Classes/MoveTrait.js";
import Jump from "./Classes/jumpTrait.js";

// Class Imports
import OnScreenObject from "./Classes/onScreenObjects.js";

// Javascript File Imports
import { loadSpriteSheet } from "./loadFunctions.js"
import { routeFrame } from "./animations.js"



const FASTDRAG = 1/10000;
const SLOWDRAG = 1/2000;

function createMario () {
    return loadSpriteSheet('mario') 
            .then(marioSprite => {
        const mario = new OnScreenObject(); 
        mario.size.setVector(32, 42.6);
        mario.addTrait(new Move())
        mario.addTrait(new Jump());  

        
        mario.move.drag = SLOWDRAG;

        mario.turbo = (turboOn) => { // Controls the turbo functionallity for mario. The turbo button is O right now btw
            mario.move.drag = turboOn ? FASTDRAG : SLOWDRAG;
        }
      
        routeFrame(mario);

        mario.position.setVector(64, 100);   // Sets the position of mario

        mario.drawObject = (context) => { // Draws the mario animations to the screen
            marioSprite.drawTheSprite(routeFrame(mario), context, 0, 0);
        }

        return mario;
    })
}

export default createMario;