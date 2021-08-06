"use strict";
// Class Imports
import OnScreenObject from "../Classes/onScreenObjects.js";

// Javascript File Imports 
import { loadSpriteSheet } from "../loadFunctions.js";
import { routeKoopaFrame } from "../Animations/koopaAnimations.js"


function loadKoopa () {
    return loadSpriteSheet('koopa')
            .then(koopaSprite => {
        return createKoopa(koopaSprite);
    })
}



function createKoopa (sprite) {
    const koopa = new OnScreenObject

    koopa.size.setVector(32, 42.6);
    koopa.position.setVector(550, 100);

    routeKoopaFrame();

    koopa.drawObject = (context) => { // Draws the mario animations to the screen
        sprite.drawTheSprite(routeKoopaFrame(), context, 0, 0);
    }

    return koopa
}


export default loadKoopa;