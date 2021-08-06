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

}


export default loadKoopa;