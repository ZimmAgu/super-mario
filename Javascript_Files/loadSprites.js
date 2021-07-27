"use strict";

import SpriteSheet from "./Classes/spritesheetClass.js";
import {loadImage} from "./loadFunctions.js";

function loadBackgroundSprites () {     // Saves the sprites for the backgrounds of all of the levels
    return loadImage("/Spritesheet_Images/world.png")
        .then(image => {
            const worldSprite = new SpriteSheet(image, 16, 16);

            worldSprite.saveTheSprite('ground', 0, 0, 32, 32);
            worldSprite.saveTheSprite('sky', 48, 368, 34, 34);

            return worldSprite;
        })
}



function loadMarioSprite () {
    return loadImage("/Spritesheet_Images/characters.png")
        .then(image => {
            const marioSprite = new SpriteSheet(image, 15, 20);

            marioSprite.saveTheSprite('Normal Idle Mario', 275, 42, 32, 42.6)

            return marioSprite
        })
}


export {loadBackgroundSprites, loadMarioSprite}