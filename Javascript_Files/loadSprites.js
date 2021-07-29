"use strict";

import SpriteSheet from "./Classes/spritesheetClass.js";
import {loadImage} from "./loadFunctions.js";



function loadMarioSprite () {
    return loadImage("/Spritesheet_Images/characters.png")
        .then(image => {
            const marioSprite = new SpriteSheet(image, 15, 20);

            marioSprite.saveTheSprite('Normal Idle Mario', 275, 42, 32, 42.6)

            return marioSprite
        })
}


export { loadMarioSprite }