"use strict";
// Class Imports
import OnScreenObject from "../Classes/onScreenObjects.js";

// Javascript File Imports 
import { loadSpriteSheet } from "../loadFunctions.js";
import { routeKoopaFrame } from "../Animations/koopaAnimations.js"

// Trait Imports
import PendelumWalk from "../Traits/PendelumWalk.js";

function loadKoopa () {
    return loadSpriteSheet('koopa')
            .then(koopaSprite => {
        return createKoopa(koopaSprite);
    })
}



function createKoopa (sprite) {
    const koopa = new OnScreenObject

    koopa.size.setVector(32, 42.6);
    koopa.position.setVector(150, 100);

    koopa.addTrait(new PendelumWalk());

    routeKoopaFrame(koopa);

    koopa.drawObject = (context) => { // Draws the mario animations to the screen
        sprite.drawTheSprite(routeKoopaFrame(koopa), context, 0, 0);
    }

    return koopa
}


export default loadKoopa;