"use strict";
import drawBackground from "./drawBackground.js";
import {loadLevel} from "./loadFunctions.js";
import { loadBackgroundSprites, loadMarioSprite} from "./loadSprites.js"

const canvas = document.getElementById("gameScreen");
const context = canvas.getContext("2d");


Promise.all([   // Will make the Spritesheet and world textures load at the same time instead of one after another
    loadBackgroundSprites(),
    loadLevel('1-1'),
    loadMarioSprite()
]).then(([backgroundSprites, level, marioSprite]) => {   // The image parameter is what is returned from the loadBackgroundSprites() function. The level parameter is what is returned from the loadLevel() function
    
    const backgroundLayer = document.createElement("canvas");  // A new canvas is specifically for the background so I have more control over the size of the background instead of just locking it in the html file 
    backgroundLayer.width = 800;
    backgroundLayer.height = 400;
    const backgroundLayerContext = backgroundLayer.getContext('2d')


    drawBackground(level, backgroundLayerContext, backgroundSprites)


    const positionOfMario = {
        x: 64,
        y: 0
    }
    
    function updateMario () {
        context.drawImage(backgroundLayer, 0, 0) // Draws the background image on the screen on a canvas that is seperate from the actual game screen
        marioSprite.drawTheSprite('Normal Idle Mario', context, positionOfMario.x, positionOfMario.y);
        positionOfMario.x +=2;
        positionOfMario.y +=2;
        requestAnimationFrame(updateMario);
    }

    updateMario()
    
})