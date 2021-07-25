"use strict";
// Class Imports
import layeredImages from "./Classes/layerTheImages.js"
import Timer from "./Classes/timer.js";

//Javascript File imports
import createMario from "./createMario.js";
import drawBackground from "./drawBackground.js";
import { loadLevel } from "./loadFunctions.js";
import { drawSpriteLayer, loadBackgroundSprites, loadMarioSprite} from "./loadSprites.js"

const canvas = document.getElementById("gameScreen");
const context = canvas.getContext("2d");


Promise.all([   // Will make the Spritesheet and world textures load at the same time instead of one after another
    loadBackgroundSprites(),
    loadLevel('1-1'),
    createMario()
]).then(([backgroundSprites, level, mario]) => {   // The image parameter is what is returned from the loadBackgroundSprites() function. The level parameter is what is returned from the loadLevel() function
    const layer = new layeredImages();

    const backgroundLayer = drawBackground(level, context, backgroundSprites);
    // layer.imageLayers.push(backgroundLayer);    // Adds the background image to the array of layers



    const marioDrawing = mario.drawMario(context); // Draws mario to the screen
    layer.imageLayers.push(marioDrawing);  // Adds mario to the array of layers
 
    const marioTimer = new Timer(1/60);

    marioTimer.updateMario = (refreshRate) => {
        layer.drawTheLayer(context);
        mario.vectorUpdate(refreshRate);
    }

    marioTimer.startTimer();
})