"use strict";

import spriteSheet from "./spritesheetClass.js";
import {loadImage} from "./loadFunctions.js";

function loadBackgroundSprites () {     // Saves the sprites for the backgrounds of all of the levels
    return loadImage("/Spritesheet_Images/world.png")
        .then(image => {
            const worldSprite = new spriteSheet(image, 16, 16);

            worldSprite.saveTheSprite('ground', 0, 0, 16, 16);
            worldSprite.saveTheSprite('sky', 48, 368, 16, 16);

            return worldSprite;
        })
}



function loadMarioSprite () {
    return loadImage("/Spritesheet_Images/characters.png")
        .then(image => {
            const marioSprite = new spriteSheet(image, 15, 20);

            marioSprite.saveTheSprite('Normal Idle Mario', 275.25, 41, 30, 40)

            return marioSprite
        })
}


export {loadBackgroundSprites, loadMarioSprite}