"use strict";

import spriteSheet from "./Classes/spritesheetClass.js";
import {loadImage} from "./loadFunctions.js";

function drawSpriteLayer (sprite, spriteName, context, position) {
    return () => {
        sprite.drawTheSprite(spriteName, context, position.x, position.y);
    }
}


function loadBackgroundSprites () {     // Saves the sprites for the backgrounds of all of the levels
    return loadImage("/Spritesheet_Images/world.png")
        .then(image => {
            const worldSprite = new spriteSheet(image, 16, 16);

            worldSprite.saveTheSprite('ground', 0, 0, 32, 32);
            worldSprite.saveTheSprite('sky', 48, 368, 34, 34);

            return worldSprite;
        })
}



function loadMarioSprite () {
    return loadImage("/Spritesheet_Images/characters.png")
        .then(image => {
            const marioSprite = new spriteSheet(image, 15, 20);

            marioSprite.saveTheSprite('Normal Idle Mario', 275, 42, 33, 44)

            return marioSprite
        })
}


export {drawSpriteLayer,loadBackgroundSprites, loadMarioSprite}