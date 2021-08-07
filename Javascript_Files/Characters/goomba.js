"use strict";
// Class Imports
import OnScreenObject from "../Classes/onScreenObjects.js";

// Javascript File Imports 
import loadSpriteSheet from "../LoadFunctions/loadSpriteSheet.js"
import { routeGoombaFrame } from "../Animations/goombaAnimations.js"

// Trait Imports
import GoombaBehavior from "../Traits/GoombaBehavior.js";
import PendelumWalk from "../Traits/PendelumWalk.js";


function loadGoomba () {
    return loadSpriteSheet('goomba') 
            .then(goombaSprite => {
        return createGoomba(goombaSprite);
    })
}


function createGoomba(sprite) {
    const goomba = new OnScreenObject();
    
    goomba.size.setVector(32, 42.6);
    
    
    goomba.addTrait(new PendelumWalk());
    goomba.addTrait(new GoombaBehavior());
   


    routeGoombaFrame(goomba);

    goomba.drawObject = (context) => { // Draws the mario animations to the screen
        sprite.drawTheSprite(routeGoombaFrame(goomba), context, 0, 0);
    }

    return goomba
}


export default loadGoomba