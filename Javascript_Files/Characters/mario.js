"use strict";
// Trait Imports
import Move from "../Traits/Move.js";
import Jump from "../Traits/Jump.js";

// Class Imports
import OnScreenObject from "../Classes/onScreenObjects.js";

// Javascript File Imports
import loadSpriteSheet from "../LoadFunctions/loadSpriteSheet.js"
import { routeMarioFrame } from "../Animations/marioAnimations.js"



const FASTDRAG = 1/10000;
const SLOWDRAG = 1/2000;

function loadMario () {
    return loadSpriteSheet('mario') 
            .then(marioSprite => {
        return createMario(marioSprite);
    })
}


function createMario (sprite) {
    const mario = new OnScreenObject(); 

    mario.size.setVector(32, 42.6);      // Sets the on screen size of marion
    mario.position.setVector(64, 100);   // Sets the starting position of mario on the screen

    mario.addTrait(new Move());
    mario.addTrait(new Jump());  

    
    mario.move.drag = SLOWDRAG;

    mario.turbo = (turboOn) => { // Controls the turbo functionallity for mario. The turbo button is O right now btw
        mario.move.drag = turboOn ? FASTDRAG : SLOWDRAG;
    }
    


    routeMarioFrame(mario);  // Adds all of the mario animation frames

    mario.drawObject = (context) => { // Draws the mario animations to the screen
        sprite.drawTheSprite(routeMarioFrame(mario), context, 0, 0);
    }

    return mario;
}

export default loadMario;