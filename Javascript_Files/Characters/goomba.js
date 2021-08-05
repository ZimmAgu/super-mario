// Class Imports
import OnScreenObject from "../Classes/onScreenObjects.js";

import { loadSpriteSheet } from "../loadFunctions.js";


function loadGoomba () {
    return loadSpriteSheet('goomba') 
            .then(goombaSprite => {
        return createGoomba(goombaSprite);
    })
}


function createGoomba(sprite) {
    const goomba = new OnScreenObject();
    goomba.size.setVector(32, 42.6);
    goomba.position.setVector(70, 100);


    return goomba
}


export default loadGoomba