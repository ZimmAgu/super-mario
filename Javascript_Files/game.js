"use strict";
import drawBackground from "./drawBackground.js";
import {loadLevel} from "./loadFunctions.js";
import { loadBackgroundSprites, loadMarioSprite} from "./sprites.js"

const canvas = document.getElementById("gameScreen");
const context = canvas.getContext("2d");


Promise.all([   // Will make the Spritesheet and world textures load at the same time instead of one after another
    loadBackgroundSprites(),
    loadLevel('1-1'),
    loadMarioSprite()
]).then(([backgroundSprites, level, marioSprite]) => {   // The image parameter is what is returned from the loadBackgroundSprites() function. The level parameter is what is returned from the loadLevel() function
    drawBackground(level, context, backgroundSprites)
    
    const positionOfMario = {
        x: 64,
        y: 294
    }

    marioSprite.drawTheSprite('Normal Idle Mario', context, positionOfMario.x, positionOfMario.y)
})