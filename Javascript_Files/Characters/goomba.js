// Class Imports
import OnScreenObject from "../Classes/onScreenObjects.js";

import { loadSpriteSheet } from "../loadFunctions.js";
import {routeGoombaFrame} from "../animations.js"


function loadGoomba () {
    return loadSpriteSheet('goomba') 
            .then(goombaSprite => {
        return createGoomba(goombaSprite);
    })
}


function createGoomba(sprite) {
    const goomba = new OnScreenObject();
    goomba.size.setVector(64, 42.6);
    goomba.position.setVector(200, 100);

    routeGoombaFrame(goomba);

    goomba.drawObject = (context) => { // Draws the mario animations to the screen
        sprite.drawTheSprite(routeGoombaFrame(goomba), context, 0, 0);
    }

    return goomba
}


export default loadGoomba