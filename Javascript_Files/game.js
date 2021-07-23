"use strict";
import drawBackground from "./drawBackground.js";
import {loadLevel, loadBackgroundSprites, loadMarioSprite} from "./loadFunctions.js";
import spriteSheet from "./spritesheetClass.js";


const canvas = document.getElementById("gameScreen");
const context = canvas.getContext("2d");


Promise.all([   // Will make the Spritesheet and world textures load at the same time instead of one after another
    loadBackgroundSprites(),
    loadLevel('1-1'),
    loadMarioSprite()
]).then(([backgroundSprites, level, marioSprite]) => {   // The image parameter is what is returned from the loadBackgroundSprites() function. The level parameter is what is returned from the loadLevel() function
    drawBackground(level, context, backgroundSprites)
    console.log(marioSprite)
    marioSprite.drawTheSprite('Normal Idle Mario', context, 0, 0)
})