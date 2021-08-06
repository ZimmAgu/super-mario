"use strict";
// Class Imports
import OnScreenObject from "../Classes/onScreenObjects.js";

// Javascript File Imports 
import { loadSpriteSheet } from "../loadFunctions.js";
import {routeGoombaFrame} from "../animations.js"

// Trait Imports
import GoombaWalk from "../Traits/GoombaWalk.js";


function loadGoomba () {
    return loadSpriteSheet('goomba') 
            .then(goombaSprite => {
        return createGoomba(goombaSprite);
    })
}


function createGoomba(sprite) {
    const goomba = new OnScreenObject();
    
    goomba.size.setVector(32, 42.6);
    goomba.position.setVector(190, 100);
    
    goomba.addTrait(new GoombaWalk());
   


    routeGoombaFrame(goomba);

    goomba.drawObject = (context) => { // Draws the mario animations to the screen
        sprite.drawTheSprite(routeGoombaFrame(goomba), context, 0, 0);
    }

    return goomba
}


export default loadGoomba