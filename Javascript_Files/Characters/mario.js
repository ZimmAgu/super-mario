"use strict";

// Class Imports
import OnScreenObject from "../Classes/onScreenObjects.js";

// Javascript File Imports
import loadSpriteSet from "../LoadFunctions/loadSpriteSet.js"
import { routeMarioFrame } from "../Animations/marioAnimations.js"
import AbleToDie from "../Traits/AbleToDie.js";

// Load Function Imports
import loadSoundBoard from "../LoadFunctions/loadSoundBoard.js";

// Trait Imports
import Jump from "../Traits/Jump.js";
import MarioBehavior from "../Traits/MarioBehavior.js";
import Move from "../Traits/Move.js";
import Solid from "../Traits/Solid.js";
import Stomp from "../Traits/Stomp.js";

const FASTDRAG = 1/10000;
const SLOWDRAG = 1/2000;


function loadMario (audioContext) {
    return Promise.all([
        loadSpriteSet('mario'), // Loads the mario spirites
        loadSoundBoard('marioSoundEffects', audioContext)   // Loads the mario sounds
    ]) 
    .then(([marioSprite, marioAudio]) => {
        return createMario(marioSprite, marioAudio) 
    })
}


function createMario (sprite, audio) {
    const mario = new OnScreenObject(); 
    mario.audio = audio; // Attach the mario soundboard the the "audio" property

    mario.size.setVector(32, 42.6);      // Sets the on screen size of marion

    mario.addTrait(new Solid());
    mario.addTrait(new MarioBehavior());
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