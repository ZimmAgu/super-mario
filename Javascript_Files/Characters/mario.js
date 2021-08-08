"use strict";
// Trait Imports
import Jump from "../Traits/Jump.js";
import Move from "../Traits/Move.js";
import Stomp from "../Traits/Stomp.js";

// Class Imports
import OnScreenObject from "../Classes/onScreenObjects.js";

// Javascript File Imports
import loadSpriteSheet from "../LoadFunctions/loadSpriteSheet.js"
import { routeMarioFrame } from "../Animations/marioAnimations.js"
import AbleToDie from "../Traits/AbleToDie.js";



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

    mario.addTrait(new Move());
    mario.addTrait(new Jump());  
    mario.addTrait(new Stomp());
    mario.addTrait(new AbleToDie());


    
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