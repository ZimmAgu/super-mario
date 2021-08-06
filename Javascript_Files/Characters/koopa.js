"use strict";
// Class Imports
import OnScreenObject from "../Classes/onScreenObjects.js";

// Javascript File Imports 
import { loadSpriteSheet } from "../loadFunctions.js";


function loadKoopa () {
    return loadSpriteSheet('koopa')
            .then(koopaSprite => {
        return createKoopa(koopaSprite);
    })
}



function createKoopa (sprite) {
    const koopa = new OnScreenObject

    koopa.size.setVector(32, 42.6);
    koopa.position.setVector(300, 100);

    
}


export default loadKoopa;